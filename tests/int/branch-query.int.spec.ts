import { afterEach, describe, expect, it, vi } from "vitest";
import { getBranches } from "@/utilities/getBranches";

const mocks = vi.hoisted(() => ({ find: vi.fn() }));
vi.mock("payload", () => ({ getPayload: async () => ({ find: mocks.find }) }));
vi.mock("@payload-config", () => ({ default: {} }));
vi.mock("next/cache", () => ({ unstable_cache: (fn: unknown) => fn }));

afterEach(() => vi.clearAllMocks());

describe("Branch grid queries", () => {
    it("enforces public access and queries only selected branch pages", async () => {
        mocks.find.mockResolvedValue({ docs: [{ id: 1 }] });
        expect(await getBranches([1, 2], "cs")).toEqual([{ id: 1 }]);
        expect(mocks.find).toHaveBeenCalledWith(
            expect.objectContaining({
                collection: "pages",
                draft: false,
                overrideAccess: false,
                where: {
                    and: [
                        { id: { in: [1, 2] } },
                        { pageType: { equals: "branch" } },
                    ],
                },
            }),
        );
    });

    it("reads drafts only when explicitly rendering an authorized preview", async () => {
        mocks.find.mockResolvedValue({ docs: [] });
        await getBranches([1], "en", true);
        expect(mocks.find).toHaveBeenCalledWith(
            expect.objectContaining({
                draft: true,
                overrideAccess: true,
                locale: "en",
            }),
        );
    });

    it("does not query all pages for an empty selection", async () => {
        expect(await getBranches([], "cs")).toEqual([]);
        expect(mocks.find).not.toHaveBeenCalled();
    });
});
