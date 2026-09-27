import {
    generatePageMetadata,
    generatePageStaticParams,
    PageTemplate,
} from "@/app/(frontend)/_templates/PageTemplate";

type Args = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return generatePageStaticParams("en", "service");
}

export default async function Page({ params }: Args) {
    return <PageTemplate locale="en" params={params} pageType="service" />;
}

export async function generateMetadata({ params }: Args) {
    return generatePageMetadata({ locale: "en", params, pageType: "service" });
}
