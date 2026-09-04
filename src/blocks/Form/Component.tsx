"use client";
import type {
    Form as FormType,
    FormBlock as GeneratedFormBlock,
} from "@/payload-types";

import { Eyebrow } from "@/components/Eyebrow";
import RichText from "@/components/RichText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getClientSideURL } from "@/utilities/getURL";
import { cn } from "@/utilities/ui";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import { fields } from "./fields";

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
        formState: { isSubmitting },
        handleSubmit,
    } = formMethods;

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [error, setError] = useState<string>();
    const router = useRouter();
    const isHomepageDark = appearance === "homepageDark";

    const onSubmit = useCallback(
        async (data: FieldValues) => {
            setError(undefined);

            const dataToSend = Object.entries(data).map(([name, value]) => ({
                field: name,
                value,
            }));

            try {
                const response = await fetch(
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

                if (!response.ok) {
                    setError(
                        "Formulář se nepodařilo odeslat. Zkuste to prosím znovu.",
                    );
                    return;
                }

                setHasSubmitted(true);

                if (confirmationType === "redirect" && redirect?.url) {
                    router.push(redirect.url);
                }
            } catch (submissionError) {
                console.warn(submissionError);
                setError(
                    "Při odesílání formuláře došlo k chybě. Zkuste to prosím znovu.",
                );
            }
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
                    <Form {...formMethods}>
                        {hasSubmitted &&
                            confirmationType === "message" &&
                            confirmationMessage && (
                                <Alert
                                    aria-live="polite"
                                    className="mb-6"
                                    role="status"
                                    variant="success"
                                >
                                    <CircleCheck aria-hidden />
                                    <AlertTitle>
                                        Formulář byl odeslán
                                    </AlertTitle>
                                    <AlertDescription>
                                        <RichText data={confirmationMessage} />
                                    </AlertDescription>
                                </Alert>
                            )}
                        {error && (
                            <Alert
                                className="mb-6"
                                role="alert"
                                variant="destructive"
                            >
                                <CircleAlert aria-hidden />
                                <AlertTitle>Odeslání se nezdařilo</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {!hasSubmitted && (
                            <form
                                aria-busy={isSubmitting}
                                id={formID}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <fieldset
                                    className="m-0 min-w-0 border-0 p-0"
                                    disabled={isSubmitting}
                                >
                                    <div className="-mx-2 -mb-6 flex flex-wrap">
                                        {formFromProps.fields?.map(
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
                                        type="submit"
                                        variant="default"
                                    >
                                        {isSubmitting && (
                                            <LoaderCircle
                                                aria-hidden
                                                className="animate-spin"
                                            />
                                        )}
                                        {isSubmitting
                                            ? "Odesílání…"
                                            : submitButtonLabel}
                                    </Button>
                                </fieldset>
                            </form>
                        )}
                    </Form>
                </div>
            </div>
        </section>
    );
};
