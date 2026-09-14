import { Mail, Phone } from "lucide-react";

import { MediaAsset } from "@/components/MediaAsset";
import type { AppLocale } from "@/i18n/config";
import type { FormBlock } from "@/payload-types";
import { applyTypography } from "@/utilities/typography";
import { cn } from "@/utilities/ui";

type EmployeeCardProps = {
    employee: NonNullable<FormBlock["employee"]>;
    inverse: boolean;
    locale: AppLocale;
};

export const EmployeeCard = ({
    employee,
    inverse,
    locale,
}: EmployeeCardProps) => {
    const { photo, name, position, phone, email, address } = employee;
    const linkClassName =
        "flex min-h-6 w-full flex-row flex-nowrap items-center gap-3 rounded-xs not-italic no-underline transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

    return (
        <aside
            aria-label={name}
            className="mx-auto flex w-full min-w-0 max-w-sm flex-col items-center text-center xl:col-start-2 xl:row-start-1"
        >
            <div className="relative mb-4 aspect-square w-40 max-w-full overflow-hidden rounded-sm border border-brand-500/50 md:w-44">
                <MediaAsset
                    alt={name}
                    className="object-cover"
                    fill
                    resource={photo}
                    sizes="(min-width: 768px) 176px, 160px"
                />
            </div>
            <h3 className="text-heading-md font-medium wrap-anywhere">
                {applyTypography(name, { locale })}
            </h3>
            <p
                className={cn(
                    "mt-2 text-body-lg wrap-anywhere",
                    inverse ? "text-brand-500" : "text-foreground",
                )}
            >
                {applyTypography(position, { locale })}
            </p>
            <address className="mt-3 flex w-full flex-col items-center text-body-md not-italic">
                <div className="flex w-fit max-w-full flex-col">
                    <a
                        className={linkClassName}
                        href={`tel:${phone?.replace(/[^\d+]/g, "")}`}
                    >
                        <Phone
                            aria-hidden
                            className={cn(
                                "size-5 shrink-0",
                                inverse && "text-brand-500",
                            )}
                        />
                        <span className="flex-1 text-center whitespace-nowrap">
                            {phone}
                        </span>
                    </a>
                    <a className={linkClassName} href={`mailto:${email}`}>
                        <Mail
                            aria-hidden
                            className={cn(
                                "size-5 shrink-0",
                                inverse && "text-brand-500",
                            )}
                        />
                        <span className="flex-1 text-center whitespace-nowrap">
                            {email}
                        </span>
                    </a>
                </div>
                <p className="mt-4 text-body-sm whitespace-pre-line wrap-anywhere">
                    {applyTypography(address, { locale })}
                </p>
            </address>
        </aside>
    );
};
