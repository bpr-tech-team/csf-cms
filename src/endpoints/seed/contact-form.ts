import { RequiredDataFromCollectionSlug } from "payload";

export const contactForm: RequiredDataFromCollectionSlug<"forms"> = {
    confirmationMessage: {
        root: {
            type: "root",
            children: [
                {
                    type: "heading",
                    children: [
                        {
                            type: "text",
                            detail: 0,
                            format: 0,
                            mode: "normal",
                            style: "",
                            text: "Děkujeme, vaši poptávku jsme přijali.",
                            version: 1,
                        },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    tag: "h2",
                    version: 1,
                },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
        },
    },
    confirmationType: "message",
    createdAt: "2023-01-12T21:47:41.374Z",
    emails: [
        {
            emailFrom: '"CSF web" \u003Cinfo@csf.cz\u003E',
            emailTo: "info@csf.cz",
            message: {
                root: {
                    type: "root",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "{{*:table}}",
                                    version: 1,
                                },
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            textFormat: 0,
                            version: 1,
                        },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    version: 1,
                },
            },
            replyTo: "{{email}}",
            subject: "Nová poptávka z webu od {{name}}",
        },
        {
            emailFrom: '"CSF" \u003Cinfo@csf.cz\u003E',
            emailTo: "{{email}}",
            message: {
                root: {
                    type: "root",
                    children: [
                        {
                            type: "paragraph",
                            children: [
                                {
                                    type: "text",
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: "Vaši poptávku jsme přijali a co nejdříve se vám ozveme.",
                                    version: 1,
                                },
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            textFormat: 0,
                            version: 1,
                        },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    version: 1,
                },
            },
            subject: "Potvrzení přijetí poptávky",
        },
    ],
    fields: [
        {
            name: "name",
            blockName: "name",
            blockType: "text",
            label: "Jméno",
            required: true,
            width: 50,
        },
        {
            name: "email",
            blockName: "email",
            blockType: "email",
            label: "E-mail",
            required: true,
            width: 50,
        },
        {
            name: "message",
            blockName: "message",
            blockType: "textarea",
            label: "Zpráva",
            required: true,
            width: 100,
        },
        {
            name: "consent",
            blockName: "consent",
            blockType: "checkbox",
            label: "Souhlasím se zpracováním osobních údajů.",
            required: true,
            width: 100,
        },
    ],
    redirect: undefined,
    submitButtonLabel: "Odeslat poptávku",
    title: "Kontaktní formulář",
    updatedAt: "2023-01-12T21:47:41.374Z",
};
