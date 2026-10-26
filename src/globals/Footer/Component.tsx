import Link from "next/link";

import { ContentIcon } from "@/components/ContentIcon";
import { CMSLink } from "@/components/Link";
import { Logo } from "@/components/Logo/Logo";
import { MediaAsset } from "@/components/MediaAsset";
import RichText from "@/components/RichText";
import { FooterBranchesMapBlock } from "./BranchesMap";
import { defaultLocale, withLocalePrefix, type AppLocale } from "@/i18n/config";
import { frontendMessages } from "@/i18n/frontend";
import type {
    Footer as FooterData,
    FooterContactsBlock,
    ContactDetails as ContactData,
} from "@/payload-types";
import type { ContentIconValue } from "@/utilities/contentIcon";
import { phoneHref } from "@/utilities/branchData";
import { getLinkHref } from "@/utilities/getLinkHref";
import { applyTypography } from "@/utilities/typography";

type Column = NonNullable<FooterData["layout"]>[number];
type ContentBlock = NonNullable<Column["content"]>[number];

const contactLinkClassName =
    "flex max-w-full items-start gap-3 wrap-anywhere no-underline transition-colors duration-fast hover:text-brand-400 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary";

type ContactRow = {
    id: string;
    text: string;
    href?: string;
    icon?: ContentIconValue | null;
    newTab?: boolean;
};

function ContactDetails({
    block,
    contacts,
    locale,
}: {
    block: FooterContactsBlock;
    contacts: ContactData;
    locale: AppLocale;
}) {
    const items = (block.items ?? []).flatMap<ContactRow>((item, index) => {
        if (item.kind === "socialLink") {
            const social = contacts.socialLinks?.find(
                ({ id }) => id === item.socialLinkId,
            );
            return social?.url?.trim() && social.label?.trim()
                ? [
                      {
                          id: item.id ?? String(index),
                          text: item.label || social.label,
                          href: social.url,
                          icon: item.icon,
                          newTab: true,
                      },
                  ]
                : [];
        }
        const value =
            contacts[item.kind === "dataBox" ? "dataBoxId" : item.kind];
        if (!value?.trim()) return [];

        const href =
            item.kind === "phone"
                ? phoneHref(value)
                : item.kind === "email"
                  ? `mailto:${value}`
                  : undefined;
        const label =
            item.label ||
            (item.kind === "dataBox"
                ? frontendMessages[locale].footerDataBoxLabel
                : undefined);
        const text = label ? `${label}: ${value}` : value;

        return [
            {
                id: item.id ?? String(index),
                href,
                text,
                icon: item.icon,
            },
        ];
    });

    if (!items.length) return null;

    return (
        <address className="flex flex-col items-start gap-4 text-body-md leading-6 font-normal text-neutral-inverse-muted not-italic">
            {items.map((item) => {
                const content = (
                    <>
                        <ContentIcon
                            className="mt-0.5 size-5 text-brand-400"
                            icon={item.icon}
                        />
                        <span>{item.text}</span>
                    </>
                );

                return item.href ? (
                    <a
                        className={contactLinkClassName}
                        href={item.href}
                        key={item.id}
                        {...(item.newTab
                            ? { rel: "noopener noreferrer", target: "_blank" }
                            : {})}
                    >
                        {content}
                    </a>
                ) : (
                    <p
                        className="flex max-w-full items-start gap-3 wrap-anywhere"
                        key={item.id}
                    >
                        {content}
                    </p>
                );
            })}
        </address>
    );
}

function FooterBlock({
    block,
    contacts,
    heading,
    locale,
}: {
    block: ContentBlock;
    contacts: ContactData;
    heading?: string | null;
    locale: AppLocale;
}) {
    switch (block.blockType) {
        case "footerBranchesMap":
            return <FooterBranchesMapBlock block={block} locale={locale} />;
        case "footerBrand":
            return (
                <div className="flex flex-col items-start gap-6">
                    <Link
                        aria-label={frontendMessages[locale].homeLinkLabel}
                        className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-olive-950"
                        href={withLocalePrefix("/", locale)}
                    >
                        {block.logo && typeof block.logo === "object" ? (
                            <MediaAsset
                                alt={block.logo.alt || "CSF"}
                                className="h-auto w-30 object-contain xl:w-40"
                                resource={block.logo}
                                sizes="160px"
                            />
                        ) : (
                            <Logo />
                        )}
                    </Link>
                    {block.description && (
                        <p className="text-body-sm leading-6 font-normal whitespace-pre-line text-neutral-inverse-muted">
                            {applyTypography(block.description, { locale })}
                        </p>
                    )}
                </div>
            );
        case "footerContacts":
            return (
                <ContactDetails
                    block={block}
                    contacts={contacts}
                    locale={locale}
                />
            );
        case "footerText":
            return block.text ? (
                <RichText
                    className="w-full text-body-sm text-neutral-inverse-muted"
                    data={block.text}
                    enableGutter={false}
                    locale={locale}
                />
            ) : null;
        case "footerLinks": {
            const links = (block.links ?? []).filter(({ link }) =>
                getLinkHref(link, locale),
            );
            if (!links.length) return null;

            return (
                <nav
                    aria-label={
                        heading || frontendMessages[locale].footerLinksLabel
                    }
                >
                    <ul className="flex flex-col items-start gap-4">
                        {links.map(({ link, id }, index) => (
                            <li key={id ?? index}>
                                <CMSLink
                                    {...link}
                                    className={contactLinkClassName}
                                    locale={locale}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
            );
        }
    }
}

export function Footer({
    contacts,
    data,
    locale = defaultLocale,
}: {
    data: FooterData;
    contacts: ContactData;
    locale?: AppLocale;
}) {
    return (
        <footer
            className="mt-auto border-t border-border-dark bg-olive-950 text-white"
            data-theme="dark"
        >
            <div className="container flex flex-col-reverse gap-x-6 gap-y-10 py-16 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] lg:items-center">
                {(data.layout ?? []).map((column, index) => (
                    <div
                        className="flex min-w-0 flex-col items-start gap-6 max-lg:empty:hidden"
                        key={column.id ?? index}
                    >
                        {column.heading && (
                            <h2 className="text-xs leading-4 font-bold tracking-widest text-brand-400 uppercase xl:text-lg xl:leading-6">
                                {applyTypography(column.heading, { locale })}
                            </h2>
                        )}
                        {(column.content ?? []).map((block, blockIndex) => (
                            <FooterBlock
                                block={block}
                                contacts={contacts}
                                heading={column.heading}
                                key={block.id ?? blockIndex}
                                locale={locale}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </footer>
    );
}
