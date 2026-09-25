# Page URLs

The frontend uses Next.js App Router segments, configuration redirects and
`NextResponse.redirect` in Proxy. Payload stores the page type and a localized
slug; the routing policy lives in `src/utilities/getPagePath.ts`.

| Page type  | Czech              | English                |
| ---------- | ------------------ | ---------------------- |
| `standard` | `/{slug}`          | `/en/{slug}`           |
| `service`  | `/sluzby/{slug}`   | `/en/services/{slug}`  |
| `computer` | `/pocitace/{slug}` | `/en/computers/{slug}` |
| `branch`   | `/kontakt/{slug}`  | `/en/contact/{slug}`   |

Czech is the default locale and has no `/cs` prefix. A standard page with slug
`home` uses `/` or `/en`. Other types keep `home` as a regular slug within their
section. Page types cannot be changed after the first save.

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
admin, posts and canonical Czech branch routes bypass it. Its Payload lookup
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
