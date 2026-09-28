import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { FlexibleContentBlock } from "@/blocks/FlexibleContent/Component";
import { ServiceSectionIntroBlock } from "@/blocks/ServiceSectionIntro/Component";
import { SplitContentBlock } from "@/blocks/SplitContent/Component";
import type {
    FlexibleContentBlock as FlexibleContent,
    Media,
} from "@/payload-types";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
    title: "Ukázky oddělovačů | CSF",
    robots: { index: false, follow: false },
};

const richText = (text: string): NonNullable<FlexibleContent["intro"]> => ({
    root: {
        type: "root",
        version: 1,
        direction: "ltr",
        format: "",
        indent: 0,
        children: [
            {
                type: "paragraph",
                version: 1,
                direction: "ltr",
                format: "",
                indent: 0,
                children: [
                    {
                        type: "text",
                        version: 1,
                        text,
                        format: 0,
                        mode: "normal",
                        style: "",
                        detail: 0,
                    },
                ],
            },
        ],
    },
});

const media: Media = {
    id: 0,
    alt: "Virtualizace ICT infrastruktury",
    url: "/media/block/section-divider-example/ict-virtualization.jpg",
    width: 1089,
    height: 711,
    mimeType: "image/jpeg",
    createdAt: "2026-09-28T00:00:00.000Z",
    updatedAt: "2026-09-28T00:00:00.000Z",
};

export default async function DividerExamples({
    searchParams,
}: {
    searchParams: Promise<{ mode?: string }>;
}) {
    // Review real block components on preview deployments, never on production.
    if (
        process.env.NODE_ENV === "production" &&
        process.env.VERCEL_ENV !== "preview"
    ) {
        notFound();
    }
    const divider = (await searchParams).mode === "none" ? "none" : "line";

    return (
        <main className="pt-24">
            <div className="container py-12">
                <h1 className="text-4xl font-bold">Ukázky oddělovačů</h1>
                <p className="mt-4">
                    {divider === "line" ? "S oddělovačem" : "Bez oddělovače"}
                </p>
                <nav
                    aria-label="Varianty oddělovače"
                    className="mt-6 flex flex-wrap gap-6 underline"
                >
                    <Link href="?mode=line">S oddělovačem</Link>
                    <Link href="?mode=none">Bez oddělovače</Link>
                    <a href="#flexible-intro">Flexibilní obsah — úvod</a>
                    <a href="#flexible-columns">Flexibilní obsah — sloupce</a>
                    <a href="#split-content">Dvousloupcový obsah</a>
                    <a href="#service-intro">Nadpis a popis</a>
                </nav>
            </div>
            <FlexibleContentBlock
                blockType="flexibleContent"
                anchorId="flexible-intro"
                heading="IT Outsourcing"
                intro={richText(
                    "Fungující firemní IT v dnešní době nestojí na nutnosti rozsáhlých investic do vlastního interního oddělení. Služba IT outsourcing je vhodná pro všechny společnosti, které chtějí své IT potřeby svěřit do rukou našim expertům.",
                )}
                columns={[]}
                divider={divider}
                theme="light"
            />
            <FlexibleContentBlock
                blockType="flexibleContent"
                anchorId="flexible-columns"
                heading="Stavíme základy pro váš digitální úspěch."
                divider={divider}
                theme="dark"
                columns={[
                    {
                        horizontalAlign: "left",
                        verticalAlign: "center",
                        elements: [
                            {
                                blockType: "flexHeading",
                                heading: "Virtualizace",
                            },
                            {
                                blockType: "flexText",
                                richText: richText(
                                    "Virtualizace je nedílnou součástí moderního IT a firmám pomáhá s optimalizací využití zdrojů, zvyšováním efektivity a snižováním nákladů.",
                                ),
                            },
                        ],
                    },
                    {
                        horizontalAlign: "left",
                        verticalAlign: "center",
                        elements: [
                            {
                                blockType: "flexMedia",
                                media,
                                aspectRatio: "landscape",
                                fit: "cover",
                            },
                        ],
                    },
                ]}
            />
            <SplitContentBlock
                blockType="splitContent"
                anchorId="split-content"
                sectionHeading="Stavíme základy pro váš digitální úspěch."
                highlightedTexts={[{ text: "základy" }, { text: "úspěch" }]}
                heading="Virtualizace"
                richText={richText(
                    "Virtualizační platformy umožňují rychlejší nasazení virtuálních serverů a aplikací. Nabízí efektivní zálohování a případnou obnovu dat, a tím i snížení doby výpadku služby. Díky virtualizaci je možné jednoduše škálovat zdroje.",
                )}
                media={media}
                mediaPosition="right"
                theme="light"
                divider={divider}
            />
            <ServiceSectionIntroBlock
                blockType="serviceSectionIntro"
                anchorId="service-intro"
                heading="Správa ICT"
                description="Správa IT prostředků hraje klíčovou roli v hladkém a bezproblémovém chodu každého podniku."
                divider={divider}
            />
        </main>
    );
}
