"use client";
import { useLocale } from "@/providers/Locale";
import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";

export const Message: React.FC<{ message: DefaultTypedEditorState }> = ({
    message,
}) => {
    const locale = useLocale();
    return (
        <div className="my-12">
            {message && <RichText locale={locale} data={message} />}
        </div>
    );
};
