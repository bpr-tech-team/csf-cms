import {
    generatePageMetadata,
    PageTemplate,
} from "@/app/(frontend)/_templates/PageTemplate";

const params = Promise.resolve({});

export default async function Page() {
    return <PageTemplate locale="en" params={params} />;
}

export async function generateMetadata() {
    return generatePageMetadata({ locale: "en", params });
}
