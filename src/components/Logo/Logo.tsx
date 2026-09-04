import clsx from "clsx";
import React from "react";

interface Props {
    className?: string;
    loading?: "lazy" | "eager";
    priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
    const {
        loading: loadingFromProps,
        priority: priorityFromProps,
        className,
    } = props;

    const loading = loadingFromProps || "lazy";
    const priority = priorityFromProps || "low";

    return (
        /* eslint-disable @next/next/no-img-element */
        <img
            alt="CSF"
            width={681}
            height={230}
            loading={loading}
            fetchPriority={priority}
            decoding="async"
            className={clsx("h-auto w-25 object-contain", className)}
            src="/media/homepage/header/image-01.png"
        />
    );
};
