"use client";
import type {
    Form as FormType,
    FormBlock as GeneratedFormBlock,
} from "@/payload-types";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { fields } from "./fields";
import { getClientSideURL } from "@/utilities/getURL";
import { cn } from "@/utilities/ui";

export type FormBlockType = Omit<GeneratedFormBlock, "form"> & {
    form: FormType;
};

export const FormBlock: React.FC<
    {
        id?: null | string;
    } & FormBlockType
> = (props) => {
    const {
        appearance,
        enableIntro,
        eyebrow,
        form: formFromProps,
        introContent,
    } = props;
    const {
        confirmationMessage,
        confirmationType,
        redirect,
        submitButtonLabel,
    } = formFromProps;
    const formID = String(formFromProps.id);

    const formMethods = useForm({
        defaultValues: formFromProps.fields || [],
    });
    const {
        control,
        formState: { errors },
        handleSubmit,
        register,
    } = formMethods;

    const [isLoading, setIsLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState<boolean>();
    const [error, setError] = useState<
        { message: string; status?: string } | undefined
    >();
    const router = useRouter();
    const isHomepageDark = appearance === "homepageDark";

    const onSubmit = useCallback(
        (data: FieldValues) => {
            let loadingTimerID: ReturnType<typeof setTimeout>;
            const submitForm = async () => {
                setError(undefined);

                const dataToSend = Object.entries(data).map(
                    ([name, value]) => ({
                        field: name,
                        value,
                    }),
                );

                // delay loading indicator by 1s
                loadingTimerID = setTimeout(() => {
                    setIsLoading(true);
                }, 1000);

                try {
                    const req = await fetch(
                        `${getClientSideURL()}/api/form-submissions`,
                        {
                            body: JSON.stringify({
                                form: formID,
                                submissionData: dataToSend,
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: "POST",
                        },
                    );

                    const res = await req.json();

                    clearTimeout(loadingTimerID);

                    if (req.status >= 400) {
                        setIsLoading(false);

                        setError({
                            message:
                                res.errors?.[0]?.message ||
                                "Internal Server Error",
                            status: res.status,
                        });

                        return;
                    }

                    setIsLoading(false);
                    setHasSubmitted(true);

                    if (confirmationType === "redirect" && redirect) {
                        const { url } = redirect;

                        const redirectUrl = url;

                        if (redirectUrl) router.push(redirectUrl);
                    }
                } catch (err) {
                    console.warn(err);
                    setIsLoading(false);
                    setError({
                        message: "Something went wrong.",
                    });
                }
            };

            void submitForm();
        },
        [router, formID, redirect, confirmationType],
    );

    return (
        <section
            className={cn(
                isHomepageDark
                    ? "bg-ink-950 py-20 text-paper-0 md:py-24"
                    : "my-16",
            )}
            data-theme={isHomepageDark ? "dark" : undefined}
            id={isHomepageDark ? "kontakt" : undefined}
        >
            <div className="container lg:max-w-[46rem]">
                {eyebrow && isHomepageDark && !hasSubmitted && (
                    <Eyebrow align="center" className="mb-5" tone="inverse">
                        {eyebrow}
                    </Eyebrow>
                )}
                {enableIntro && introContent && !hasSubmitted && (
                    <RichText
                        className={cn(
                            "mb-8 lg:mb-12",
                            isHomepageDark &&
                                "text-center [&_h1]:text-heading-xl [&_h1]:font-bold [&_h2]:text-heading-xl [&_h2]:font-bold [&_p]:text-paper-0/90",
                        )}
                        data={introContent}
                        enableGutter={false}
                    />
                )}
                <div
                    className={cn(
                        "rounded-md border border-border p-4 lg:p-6",
                        isHomepageDark &&
                            "border-brand-500/20 bg-olive-950 p-6 md:p-10 [&_input]:h-12 [&_input]:rounded-xs [&_input]:border-brand-500/20 [&_input]:bg-olive-850 [&_label]:text-eyebrow [&_label]:font-medium [&_label]:uppercase [&_textarea]:min-h-28 [&_textarea]:rounded-xs [&_textarea]:border-brand-500/20 [&_textarea]:bg-olive-850",
                    )}
                >
                    <FormProvider {...formMethods}>
                        {!isLoading &&
                            hasSubmitted &&
                            confirmationType === "message" &&
                            confirmationMessage && (
                                <RichText data={confirmationMessage} />
                            )}
                        {isLoading && !hasSubmitted && (
                            <p>Loading, please wait...</p>
                        )}
                        {error && (
                            <div>{`${error.status || "500"}: ${error.message || ""}`}</div>
                        )}
                        {!hasSubmitted && (
                            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
                                <div className="-mx-2 -mb-6 flex flex-wrap">
                                    {formFromProps &&
                                        formFromProps.fields &&
                                        formFromProps.fields?.map(
                                            (field, index) => {
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                const Field: React.FC<any> =
                                                    fields?.[
                                                        field.blockType as keyof typeof fields
                                                    ];
                                                if (Field) {
                                                    const width =
                                                        "width" in field &&
                                                        field.width
                                                            ? field.width
                                                            : 100;

                                                    return (
                                                        <div
                                                            className="mb-6 w-full px-2 sm:w-[var(--form-field-width)]"
                                                            key={index}
                                                            style={
                                                                {
                                                                    "--form-field-width": `${width}%`,
                                                                } as React.CSSProperties
                                                            }
                                                        >
                                                            <Field
                                                                form={
                                                                    formFromProps
                                                                }
                                                                {...field}
                                                                {...formMethods}
                                                                control={
                                                                    control
                                                                }
                                                                errors={errors}
                                                                register={
                                                                    register
                                                                }
                                                                width={100}
                                                            />
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            },
                                        )}
                                </div>

                                <Button
                                    className={cn(
                                        isHomepageDark && "mt-8 w-full",
                                    )}
                                    form={formID}
                                    type="submit"
                                    variant="default"
                                >
                                    {submitButtonLabel}
                                </Button>
                            </form>
                        )}
                    </FormProvider>
                </div>
            </div>
        </section>
    );
};
