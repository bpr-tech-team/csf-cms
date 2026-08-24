import {
    generatePostsArchiveMetadata,
    generatePostsPageStaticParams,
    PostsArchiveTemplate,
} from "@/app/(frontend)/_templates/PostsArchiveTemplate";

export const revalidate = 600;

type Args = {
    params: Promise<{
        pageNumber: string;
    }>;
};

export default async function Page({ params: paramsPromise }: Args) {
    const { pageNumber } = await paramsPromise;

    return <PostsArchiveTemplate locale="en" pageNumber={Number(pageNumber)} />;
}

export async function generateMetadata({ params: paramsPromise }: Args) {
    const { pageNumber } = await paramsPromise;

    return generatePostsArchiveMetadata({ locale: "en", pageNumber });
}

export async function generateStaticParams() {
    return generatePostsPageStaticParams("en");
}
