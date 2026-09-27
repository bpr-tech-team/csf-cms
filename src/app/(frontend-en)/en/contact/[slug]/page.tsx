import {
    generatePageMetadata,
    generatePageStaticParams,
    PageTemplate,
} from "@/app/(frontend)/_templates/PageTemplate";

type Args = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return generatePageStaticParams("en", "branch");
}

export default async function Page({ params }: Args) {
    return <PageTemplate locale="en" params={params} pageType="branch" />;
}

export async function generateMetadata({ params }: Args) {
    return generatePageMetadata({ locale: "en", params, pageType: "branch" });
}
