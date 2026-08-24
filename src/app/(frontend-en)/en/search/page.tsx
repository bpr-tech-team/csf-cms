import {
    generateSearchMetadata,
    SearchTemplate,
} from "@/app/(frontend)/_templates/SearchTemplate";

type Args = {
    searchParams: Promise<{
        q?: string;
    }>;
};

export default async function Page({ searchParams }: Args) {
    return <SearchTemplate locale="en" searchParams={searchParams} />;
}

export function generateMetadata() {
    return generateSearchMetadata("en");
}
