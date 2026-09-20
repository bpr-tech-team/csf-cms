import type { BranchesGridBlock as Props } from "@/payload-types";
import { CardIcon } from "@/components/CardIcon";
import { CMSLink } from "@/components/Link";
import { SectionHeading } from "@/components/SectionHeading";
import { BranchOpeningHours } from "@/components/BranchOpeningHours";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import { getBranches } from "@/utilities/getBranches";
import { getPagePath } from "@/utilities/getPagePath";
import { branchLabels, phoneHref } from "@/utilities/branchData";
import { applyTypography } from "@/utilities/typography";
import { cn } from "@/utilities/ui";

export const BranchesGridBlock = async ({
    anchorId,
    heading,
    highlightedTexts,
    items,
    locale = defaultLocale,
    draft = false,
}: Props & { locale?: AppLocale; draft?: boolean }) => {
    const ids = Array.from(
        new Set(
            items
                .map(({ branch }) =>
                    typeof branch === "object" ? branch?.id : branch,
                )
                .filter((id): id is number => typeof id === "number"),
        ),
    );
    const branches = await getBranches(ids, locale, draft);
    const byId = new Map(branches.map((branch) => [branch.id, branch]));
    const labels = branchLabels[locale];

    return (
        <section
            className="scroll-mt-24 bg-paper-0 py-20 text-ink-950 md:py-24"
            id={anchorId || undefined}
        >
            <div className="container">
                <SectionHeading
                    heading={heading}
                    highlightedTexts={highlightedTexts}
                    locale={locale}
                    showRule={false}
                />
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-6 xl:gap-8">
                    {items.map((item, index) => {
                        const branch = byId.get(
                            (typeof item.branch === "object"
                                ? item.branch?.id
                                : item.branch) ?? -1,
                        );
                        if (!branch?.branchInfo) return null;
                        const info = branch.branchInfo;
                        return (
                            <article
                                key={item.id ?? index}
                                className={cn(
                                    "min-w-0 rounded-xl border border-border-light bg-white p-8 xl:p-10",
                                    item.width === "wide"
                                        ? "xl:col-span-3"
                                        : "xl:col-span-2",
                                )}
                            >
                                <CardIcon resource={info.icon} />
                                <h3 className="mt-8 text-heading-md font-bold uppercase">
                                    <CMSLink
                                        type="custom"
                                        url={getPagePath(branch)}
                                        label={branch.title}
                                        locale={locale}
                                        className="hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                                    />
                                </h3>
                                <address className="mt-4 text-body-md not-italic text-neutral-secondary wrap-anywhere">
                                    <p className="whitespace-pre-line">
                                        {applyTypography(info.address, {
                                            locale,
                                        })}
                                    </p>
                                    <p>
                                        {labels.phone}:{" "}
                                        {info.phones?.map(
                                            ({ number, id }, phoneIndex) => (
                                                <span key={id ?? phoneIndex}>
                                                    {phoneIndex > 0 && ", "}
                                                    <a
                                                        className="underline underline-offset-4 hover:text-brand-600"
                                                        href={phoneHref(number)}
                                                    >
                                                        {number}
                                                    </a>
                                                </span>
                                            ),
                                        )}
                                    </p>
                                    <p>
                                        {labels.email}:{" "}
                                        <a
                                            className="underline underline-offset-4 hover:text-brand-600"
                                            href={`mailto:${info.email}`}
                                        >
                                            {info.email}
                                        </a>
                                    </p>
                                </address>
                                {item.showOpeningHours !== false &&
                                info.openingHours?.length ? (
                                    <div className="mt-6 text-neutral-secondary">
                                        <h4 className="mb-2 text-body-md font-bold">
                                            {labels.hours}
                                        </h4>
                                        <BranchOpeningHours
                                            hours={info.openingHours}
                                            locale={locale}
                                        />
                                    </div>
                                ) : null}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
