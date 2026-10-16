import type { TextFieldServerComponent } from "payload";

import { SocialLinkSelect } from "./SocialLinkSelect";

export const SocialLinkField: TextFieldServerComponent = async ({
    clientField,
    path,
    readOnly,
    req,
}) => {
    const contacts = await req.payload.findGlobal({
        slug: "contact-details",
        depth: 0,
        overrideAccess: false,
        req,
    });

    return (
        <SocialLinkSelect
            field={clientField}
            path={path}
            readOnly={readOnly}
            options={(contacts.socialLinks ?? []).flatMap(({ id, label }) =>
                id ? [{ label, value: id }] : [],
            )}
        />
    );
};
