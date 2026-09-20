import type { BranchDetailsBlock as Props, Page } from "@/payload-types";
import { BranchOpeningHours } from "@/components/BranchOpeningHours";
import { defaultLocale, type AppLocale } from "@/i18n/config";
import {
    branchLabels,
    isGoogleMapsEmbedURL,
    phoneHref,
} from "@/utilities/branchData";
import { applyTypography } from "@/utilities/typography";

export const BranchDetailsBlock = ({
    anchorId,
    contactHeading,
    hoursHeading,
    page,
    locale = defaultLocale,
}: Props & { page?: Page; locale?: AppLocale }) => {
    if (page?.pageType !== "branch" || !page.branchInfo) return null;
    const info = page.branchInfo;
    const labels = branchLabels[locale];
    const billing = [
        info.companyName,
        info.companyId && `IČ: ${info.companyId}`,
        info.vatId && `DIČ: ${info.vatId}`,
    ]
        .filter(Boolean)
        .join(", ");
    const mapUrl =
        info.mapEmbedUrl && isGoogleMapsEmbedURL(info.mapEmbedUrl)
            ? info.mapEmbedUrl
            : null;
    const linkClassName =
        "underline underline-offset-4 hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

    return (
        <section
            className="scroll-mt-24 bg-paper-0 py-20 text-ink-950 md:py-24 xl:py-28"
            id={anchorId || undefined}
        >
            <div className="container grid items-start gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
                <div>
                    <h2 className="text-3xl font-bold md:text-heading-lg">
                        {applyTypography(contactHeading || labels.contacts, {
                            locale,
                        })}
                    </h2>
                    <dl className="mt-8 space-y-2 text-body-md wrap-anywhere">
                        <div>
                            <dt className="inline font-medium">
                                {labels.address}:{" "}
                            </dt>
                            <dd className="inline whitespace-pre-line">
                                {applyTypography(info.address, { locale })}
                            </dd>
                        </div>
                        <div>
                            <dt className="inline font-medium">
                                {labels.phone}:{" "}
                            </dt>
                            <dd className="inline">
                                {info.phones?.map(({ number, id }, index) => (
                                    <span key={id ?? index}>
                                        {index > 0 && ", "}
                                        <a
                                            href={phoneHref(number)}
                                            className={linkClassName}
                                        >
                                            {number}
                                        </a>
                                    </span>
                                ))}
                            </dd>
                        </div>
                        <div>
                            <dt className="inline font-medium">
                                {labels.email}:{" "}
                            </dt>
                            <dd className="inline">
                                <a
                                    href={`mailto:${info.email}`}
                                    className={linkClassName}
                                >
                                    {info.email}
                                </a>
                            </dd>
                        </div>
                        {billing && (
                            <div>
                                <dt className="inline font-medium">
                                    {labels.billing}:{" "}
                                </dt>
                                <dd className="inline">
                                    {applyTypography(billing, { locale })}
                                </dd>
                            </div>
                        )}
                    </dl>
                    {info.openingHours?.length ? (
                        <div className="mt-12">
                            <h2 className="mb-8 text-3xl font-bold md:text-heading-lg">
                                {applyTypography(hoursHeading || labels.hours, {
                                    locale,
                                })}
                            </h2>
                            <BranchOpeningHours
                                hours={info.openingHours}
                                locale={locale}
                            />
                        </div>
                    ) : null}
                </div>
                {mapUrl && (
                    <iframe
                        className="aspect-[447/411] w-full rounded-lg border border-border-light bg-paper-50"
                        src={mapUrl}
                        title={`${labels.map}: ${page.title}`}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                )}
            </div>
        </section>
    );
};
