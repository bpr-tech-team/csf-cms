import {
    generatePageMetadata,
    generatePageStaticParams,
    PageTemplate,
} from "@/app/(frontend)/_templates/PageTemplate";

type Args = {
    params: Promise<{
        slug?: string;
    }>;
};

export async function generateStaticParams() {
    return generatePageStaticParams("cs", "post");
}

export default async function Post({ params }: Args) {
    return <PageTemplate locale="cs" params={params} pageType="post" />;
}

export async function generateMetadata({ params }: Args) {
    return generatePageMetadata({ locale: "cs", params, pageType: "post" });
}
