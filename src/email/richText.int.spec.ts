import { describe, expect, it, vi } from "vitest";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { preserveFormEmailColors, renderFormEmail } from "./richText";

const message = (
    text: string,
    style = "color: #123456;",
): DefaultTypedEditorState =>
    ({
        root: {
            type: "root",
            version: 1,
            direction: null,
            format: "",
            indent: 0,
            children: [
                {
                    type: "heading",
                    tag: "h2",
                    version: 1,
                    direction: null,
                    format: "",
                    indent: 0,
                    children: [
                        {
                            type: "text",
                            version: 1,
                            text,
                            style,
                            format: 1,
                            mode: "normal",
                            detail: 0,
                        },
                    ],
                },
            ],
        },
    }) as DefaultTypedEditorState;

describe("Colored form emails", () => {
    it("preserves heading, bold and color while escaping submitted values", () => {
        const html = renderFormEmail(message("Hello {{name}}"), [
            { field: "name", value: "<img src=x onerror=alert(1)>" },
        ]);
        expect(html).toContain("<h2");
        expect(html).toContain(
            '<span style="color: #123456"><strong>Hello &lt;img',
        );
        expect(html).not.toContain("<img");
    });

    it("keeps the form plugin's all-fields and submission-ID placeholders", () => {
        const html = renderFormEmail(
            message("{{*}} {{*:table}} {{formSubmissionID}}"),
            [
                { field: "name", value: "A & B" },
                { field: "formSubmissionID", value: 7 },
            ],
        );
        expect(html).toContain("name : A &amp; B <br /> formSubmissionID : 7");
        expect(html).toContain("<tr><td>name</td><td>A &amp; B</td></tr>");
        expect(html).toContain("</table> 7");
    });

    it("updates only colored email bodies and leaves delivery headers untouched", async () => {
        const email = {
            from: "from@example.invalid",
            to: "to@example.invalid",
            cc: "cc@example.invalid",
            bcc: "bcc@example.invalid",
            replyTo: "reply@example.invalid",
            subject: "Subject",
            html: "Original HTML",
        };
        const findByID = vi.fn().mockResolvedValue({
            emails: [
                { message: message("ID: {{formSubmissionID}}") },
                { message: message("Uncolored", "") },
            ],
        });
        const args = {
            data: { form: 4, submissionData: [] },
            doc: { id: 7 },
            req: { locale: "cs", payload: { findByID } },
        } as unknown as Parameters<typeof preserveFormEmailColors>[1];
        const result = await preserveFormEmailColors([email, email], args);
        expect(result[0]).toMatchObject({
            ...email,
            html: expect.stringContaining("color: #123456"),
        });
        expect(result[0].html).toContain("ID: 7");
        expect(result[1]).toBe(email);
        expect(findByID).toHaveBeenCalledWith(
            expect.objectContaining({
                collection: "forms",
                id: 4,
                req: args.req,
            }),
        );
    });
});
