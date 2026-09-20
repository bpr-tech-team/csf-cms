import type { AppLocale } from "@/i18n/config";
import type { BranchInfo } from "@/utilities/branchData";
import { applyTypography } from "@/utilities/typography";

export const BranchOpeningHours = ({
    hours,
    locale,
}: {
    hours: NonNullable<BranchInfo["openingHours"]>;
    locale: AppLocale;
}) => (
    <dl className="grid max-w-md grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-6 gap-y-1 text-body-md">
        {hours.map((row, index) => (
            <div className="contents" key={row.id ?? index}>
                <dt className="wrap-anywhere">
                    {applyTypography(row.days, { locale })}
                </dt>
                <dd className="wrap-anywhere">
                    {applyTypography(row.hours, { locale })}
                </dd>
            </div>
        ))}
    </dl>
);
