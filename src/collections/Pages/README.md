# Page URLs

The frontend uses Next.js App Router segments, configuration redirects and
`NextResponse.redirect` in Proxy. Payload stores the page type and a localized
slug; the routing policy lives in `src/utilities/getPagePath.ts`.

| Page type  | Czech              | English               |
| ---------- | ------------------ | --------------------- |
| `standard` | `/{slug}`          | `/en/{slug}`          |
| `service`  | `/sluzby/{slug}`   | `/en/services/{slug}` |
| `computer` | `/produkty/{slug}` | `/en/products/{slug}` |
| `branch`   | `/kontakt/{slug}`  | `/en/contact/{slug}`  |
| `post`     | `/posts/{slug}`    | `/en/posts/{slug}`    |

Czech is the default locale and has no `/cs` prefix. A standard page with slug
`home` uses `/` or `/en`. Other types keep `home` as a regular slug within their
section. Page types cannot be changed after the first save.

The product section retains the internal `computer` value for compatibility with
stored pages and versions. Its admin labels are Product / Produkt / Produkty.
The erroneous `/pocitace/{slug}` and `/en/computers/{slug}` prefixes have no routes
or aliases; products use only `/produkty/{slug}` and `/en/products/{slug}`.

Each page has one canonical URL per locale. An English page without a translated
slug uses the Czech slug in the English section. If the English slug exists,
requests using the Czech slug redirect to it. Old flat service/computer URLs,
the former Czech aliases, and `/en/kontakt/{slug}` also redirect to the canonical
URL with HTTP 308 before rendering. `/home`, `/en/home` and the old
`/en/kontakt/{slug}` prefix use configuration redirects without a CMS lookup.
The latter can take a second hop if its slug also needs an English translation.

Section pages select only their own page type. Proxy also recognizes explicitly
listed legacy aliases. An alias never renders another copy of the page. Missing/unpublished
pages retain the existing Payload Redirects lookup and then return not found.
Draft preview continues to work on the canonical typed route.

Static generation and on-demand revalidation remain enabled. Proxy matches only
page URLs that need alias or localized-slug resolution; homepages, assets, API,
admin and canonical Czech branch/post routes bypass it. Its Payload lookup
selects only `slug` and `pageType` at depth 0 with public access. An English
fallback may need two extra reads to resolve the document's translated slug.
No additional persistent routing cache or service is introduced. Draft-preview
requests bypass the public redirect lookup; Next.js validates the preview cookie
in the renderer, which still enforces the canonical path.

Redirects run before ISR because Next.js 16.3.6 can emit duplicate `Location`
headers when generating a cached redirect on demand
([upstream issue](https://github.com/vercel/next.js/issues/82117)). This keeps
canonical pages static without patching Next.js or rendering every page per request.

Links, rich text, emails, preview, SEO, sitemap and exact cache invalidation use
the same mapping. Cache invalidation includes redirect entry points and both
localized slugs. Slug history is not stored automatically: use the existing
Payload Redirects collection for renamed slugs that must continue to work.

To introduce a new page type, add its CS/EN sections to `pagePathPrefixes`, list
any actual legacy prefixes, and add the corresponding Next.js route files. Both
maps are checked against the generated Payload page-type union by TypeScript.
Do not derive stable URLs from translated admin labels.

Articles are regular `pages` documents with `pageType: "post"`. Their title,
preview image and short text feed article cards; the detail page renders only
layout blocks. Preview and metadata tabs (authors and related
articles) are shown for this type only. Related articles target `pages` filtered
to `post`, and the related-posts block controls their position in the layout.

The article migration adds the `post` page type, preview fields and related-posts
block, and removes the legacy `posts` and `categories` collections with their
data and tables. Existing pages and their layout tables are preserved.
Independent product groups inside catalog blocks are unaffected.

The Posts grid (`postsGrid`) layout block automatically lists published `post`
pages with title search, newest/oldest sorting by `publishedAt`, and pagination.
Editors can choose light or dark appearance, an optional heading/anchor, section
spacing, and 6, 12 (default), or 24 cards per page. The existing Card and grid are
shared with the standalone archive. Multiple blocks keep independent URL state
under `posts_<blockId>_q`, `posts_<blockId>_sort`, and `posts_<blockId>_page`.

The first page is rendered on the server and cached with the `post-cards` tag;
published post changes and deletions expire that tag in both locales. Browser
interactions use the no-store `/api/post-cards` endpoint. Query parameters apply
after hydration so adding a block does not change a CMS page's ISR mode. Public
selection always enforces `pageType=post`, `_status=published`, `draft=false`,
and collection read access, including in layout preview. Search uses the existing
case/accent-insensitive `contains` operator and the displayed title: English when
present, otherwise Czech. Bodies, authors, and media captions are excluded from
card responses. The block migration includes localized layouts and versions and
fills missing published post dates from creation dates; these derived dates are
retained on rollback. Ordinary edits preserve the publication date.

The standard list view's Create button inherits a single page type from the
current filters, preserving the locale and configured admin route. The create
form resolves that validated type as its initial default; this applies to every
page type. Unfiltered and mixed-type lists use the standard create form. The
existing rule that a saved page cannot change type remains in force.
