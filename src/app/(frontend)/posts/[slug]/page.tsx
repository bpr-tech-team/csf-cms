import {
    generatePostMetadata,
    generatePostStaticParams,
    PostTemplate,
} from "@/app/(frontend)/_templates/PostTemplate";

type Args = {
    params: Promise<{
        slug?: string;
    }>;
};

export async function generateStaticParams() {
    return generatePostStaticParams("cs");
}

export default async function Post({ params }: Args) {
    return <PostTemplate locale="cs" params={params} />;
}

export async function generateMetadata({ params }: Args) {
    return generatePostMetadata({ locale: "cs", params });
}
