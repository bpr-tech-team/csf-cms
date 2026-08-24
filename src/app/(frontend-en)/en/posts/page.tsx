import {
    generatePostsArchiveMetadata,
    PostsArchiveTemplate,
} from "@/app/(frontend)/_templates/PostsArchiveTemplate";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page() {
    return <PostsArchiveTemplate locale="en" />;
}

export function generateMetadata() {
    return generatePostsArchiveMetadata({ locale: "en" });
}
