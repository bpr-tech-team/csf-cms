import {
    beforeChangeTraverseFields,
    sanitizeFields,
    type Field,
    type PayloadRequest,
    type ValidationFieldError,
} from "payload";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { FormBlock } from "@/blocks/Form/config";

const employee = {
    photo: 1,
    name: "Pavel Aliger",
    position: "Obchodní ředitel",
    phone: "+420 495 533 495",
    email: "obchod@csf.cz",
    address: "Střelecká 672\n500 02 Hradec Králové",
};

let fields: Field[];

beforeAll(async () => {
    fields = await sanitizeFields({
        config: {
            db: { defaultIDType: "number", init: vi.fn() },
            secret: "form-employee-validation",
        },
        fields: [
            {
                name: "layout",
                type: "blocks",
                blocks: [
                    {
                        ...FormBlock,
                        fields: FormBlock.fields.filter(
                            (field) =>
                                "name" in field &&
                                ["enableEmployee", "employee"].includes(
                                    field.name,
                                ),
                        ),
                    },
                ],
            },
        ],
        parentIsLocalized: false,
        validRelationships: ["media"],
    });
});

// Exercise Payload's server validation traversal, including the parent group's
// condition. Only media lookup is stubbed; no running database is needed.
async function validate(block: Record<string, unknown>) {
    const data = { layout: [{ blockType: "formBlock", ...block }] };
    const errors: ValidationFieldError[] = [];
    const req = {
        payload: {
            blocks: {},
            config: { localization: false },
            collections: { media: { customIDType: "number" } },
            logger: { error: vi.fn() },
        },
        payloadDataLoader: {
            find: vi.fn().mockResolvedValue({ docs: [{ id: 1 }] }),
        },
        i18n: { language: "cs", fallbackLanguage: "en" },
        t: (key: string) => key,
    } as unknown as PayloadRequest;

    await beforeChangeTraverseFields({
        collection: null,
        global: null,
        context: {},
        data,
        doc: {},
        docWithLocales: {},
        errors,
        fieldLabelPath: "",
        fields,
        mergeLocaleActions: [],
        operation: "create",
        overrideAccess: false,
        parentIndexPath: "",
        parentPath: "",
        parentSchemaPath: "",
        req,
        siblingData: data,
        siblingDoc: {},
        siblingDocWithLocales: {},
    });

    return errors;
}

describe("Form employee validation", () => {
    it("accepts existing forms and disabled employee cards", async () => {
        expect(await validate({})).toEqual([]);
        expect(
            await validate({ enableEmployee: false, employee: { name: " " } }),
        ).toEqual([]);
    });

    it("accepts a complete employee", async () => {
        expect(await validate({ enableEmployee: true, employee })).toEqual([]);
    });

    it("requires the employee group when enabled", async () => {
        const errors = await validate({ enableEmployee: true });
        expect(errors.map(({ path }) => path).sort()).toEqual(
            Object.keys(employee)
                .map((key) => `layout.0.employee.${key}`)
                .sort(),
        );
    });

    it.each(Object.keys(employee))("rejects a missing %s", async (key) => {
        const errors = await validate({
            enableEmployee: true,
            employee: { ...employee, [key]: undefined },
        });
        expect(errors).toEqual([
            expect.objectContaining({ path: `layout.0.employee.${key}` }),
        ]);
    });

    it.each(["name", "position", "phone", "email", "address"])(
        "rejects whitespace-only %s",
        async (key) => {
            const errors = await validate({
                enableEmployee: true,
                employee: { ...employee, [key]: " \n\t " },
            });
            expect(errors).toEqual([
                expect.objectContaining({ path: `layout.0.employee.${key}` }),
            ]);
        },
    );

    it("rejects an invalid email and a photo outside the image filter", async () => {
        const errors = await validate({
            enableEmployee: true,
            employee: { ...employee, email: "not-an-email", photo: 2 },
        });
        expect(errors.map(({ path }) => path).sort()).toEqual([
            "layout.0.employee.email",
            "layout.0.employee.photo",
        ]);
    });
});
