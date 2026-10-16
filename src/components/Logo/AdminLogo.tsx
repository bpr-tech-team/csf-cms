import Image from "next/image";

export const AdminLogo = () => (
    <Image
        alt="CSF"
        src="/csf-logo.png"
        width={681}
        height={230}
        loading="eager"
        unoptimized
        style={{ width: "240px", maxWidth: "100%", height: "auto" }}
    />
);
