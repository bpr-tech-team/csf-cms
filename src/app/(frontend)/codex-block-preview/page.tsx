import { getPayload } from "payload";
import { notFound } from "next/navigation";
import config from "@payload-config";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import type { Page } from "@/payload-types";
import { clientServiceDefaults } from "@/blocks/ClientService/defaults";

export const metadata = { robots: { index: false, follow: false } };

export default async function CapturePage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; block?: string; demo?: string }>;
}) {
    if (process.env.NODE_ENV !== "development") notFound();
    const query = await searchParams;
    let page: Page | undefined;
    let block: Page["layout"][number] | undefined;
    if (query.demo) {
        if (query.demo === "client-service")
            block = {
                blockType: "clientService",
                ...clientServiceDefaults,
            };
        if (query.demo === "cta")
            block = {
                blockType: "centeredCta",
                heading: "Pojďme společně vyřešit vaše IT",
                link: {
                    type: "custom",
                    url: "/",
                    label: "Domluvit konzultaci",
                    appearance: "default",
                },
            };
    } else {
        const payload = await getPayload({ config });
        const id = Number(query.page);
        if (![4, 5, 6, 8, 21, 22].includes(id)) notFound();
        page = await payload.findByID({
            collection: "pages",
            id,
            locale: "cs",
            depth: 2,
            overrideAccess: false,
        });
        block = page.layout[Number(query.block)];
    }
    if (!block) notFound();
    const dark = [
        "metricsStrip",
        "logoMarquee",
        "centeredCta",
        "formBlock",
        "clientService",
        "hero",
        "homepageHero",
    ].includes(block.blockType);
    const background = dark
        ? block.blockType === "hero"
            ? "#111111"
            : "#0e0e0e"
        : "#fafcf8";
    return (
        <>
            <style>{`body > header, body > footer, .admin-bar, body > .pointer-events-none { display: none !important; } body { background: ${background}; } #csf-capture { min-height: 800px; display: flex; align-items: center; background: ${background}; } #csf-capture > div { width: 100%; }`}</style>
            <main id="csf-capture" data-block-type={block.blockType}>
                <div>
                    <RenderBlocks blocks={[block]} page={page} locale="cs" />
                </div>
            </main>
        </>
    );
}
