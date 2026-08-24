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
    return generatePageStaticParams("cs");
}

export default async function Page({ params }: Args) {
    return <PageTemplate locale="cs" params={params} />;
}

export async function generateMetadata({ params }: Args) {
    return generatePageMetadata({ locale: "cs", params });
}
