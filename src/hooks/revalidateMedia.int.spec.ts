import { beforeEach, describe, expect, it, vi } from "vitest";

const cache = vi.hoisted(() => ({ path: vi.fn(), tag: vi.fn() }));
vi.mock("next/cache", () => ({
    revalidatePath: cache.path,
    revalidateTag: cache.tag,
}));

import { revalidateMedia } from "./revalidateMedia";

type Args = Parameters<typeof revalidateMedia>[0];
const run = (operation: Args["operation"], context = {}) => {
    const result = {
        id: 1,
        filename: "replacement.webp",
        _objectKey: "new-key",
    };
    const returned = revalidateMedia({
        operation,
        result,
        req: { context },
    } as Args);
    expect(returned).toBe(result);
};

beforeEach(() => vi.clearAllMocks());

describe("public pages after media changes", () => {
    it.each(["updateByID", "deleteByID"] as const)(
        "%s refreshes both locale trees and cached media relationships",
        (operation) => {
            run(operation);
            expect(cache.path).toHaveBeenCalledWith("/(frontend)", "layout");
            expect(cache.path).toHaveBeenCalledWith("/(frontend-en)", "layout");
            for (const tag of ["global_footer", "branches", "post-cards"]) {
                expect(cache.tag).toHaveBeenCalledWith(tag, { expire: 0 });
            }
        },
    );

    it.each(["find", "findByID", "create"] as const)(
        "%s leaves published page caches intact",
        (operation) => {
            run(operation);
            expect(cache.path).not.toHaveBeenCalled();
            expect(cache.tag).not.toHaveBeenCalled();
        },
    );

    it.each([{ disableRevalidate: true }, { skipCloudStorage: true }])(
        "respects maintenance and nested upload context: %j",
        (context) => {
            run("updateByID", context);
            expect(cache.path).not.toHaveBeenCalled();
            expect(cache.tag).not.toHaveBeenCalled();
        },
    );
});
