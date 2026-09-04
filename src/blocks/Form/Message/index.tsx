import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import React from "react";

export const Message: React.FC<{ message: DefaultTypedEditorState }> = ({
    message,
}) => {
    return (
        <div className="my-12">{message && <RichText data={message} />}</div>
    );
};
