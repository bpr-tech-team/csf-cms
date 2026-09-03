import { nodemailerAdapter } from "@payloadcms/email-nodemailer";

type SMTPEnvironment = {
    SMTP_FROM_ADDRESS?: string;
    SMTP_FROM_NAME?: string;
    SMTP_HOST?: string;
    SMTP_PASS?: string;
    SMTP_PORT?: string;
    SMTP_SECURE?: string;
    SMTP_SKIP_VERIFY?: string;
    SMTP_USER?: string;
};

const parseBoolean = ({
    defaultValue,
    name,
    value,
}: {
    defaultValue: boolean;
    name: string;
    value?: string;
}) => {
    if (!value) return defaultValue;
    if (value === "true") return true;
    if (value === "false") return false;

    throw new Error(`${name} must be either "true" or "false".`);
};

export const createSMTPEmailAdapter = (
    environment: SMTPEnvironment = process.env,
) => {
    const host = environment.SMTP_HOST?.trim();

    if (!host) return undefined;

    const port = Number(environment.SMTP_PORT || "587");
    if (!Number.isInteger(port) || port < 1 || port > 65_535) {
        throw new Error("SMTP_PORT must be an integer between 1 and 65535.");
    }

    const user = environment.SMTP_USER?.trim();
    const pass = environment.SMTP_PASS;
    if (Boolean(user) !== Boolean(pass)) {
        throw new Error("SMTP_USER and SMTP_PASS must be configured together.");
    }

    return nodemailerAdapter({
        defaultFromAddress:
            environment.SMTP_FROM_ADDRESS?.trim() || "info@csf.cz",
        defaultFromName: environment.SMTP_FROM_NAME?.trim() || "CSF",
        skipVerify: parseBoolean({
            defaultValue: false,
            name: "SMTP_SKIP_VERIFY",
            value: environment.SMTP_SKIP_VERIFY,
        }),
        transportOptions: {
            host,
            port,
            secure: parseBoolean({
                defaultValue: port === 465,
                name: "SMTP_SECURE",
                value: environment.SMTP_SECURE,
            }),
            ...(user && pass
                ? {
                      auth: {
                          pass,
                          user,
                      },
                  }
                : {}),
        },
    });
};
