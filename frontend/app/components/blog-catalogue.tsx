import React from "react";

type Props = {
    children?: React.ReactNode;
};

const BlogCatalogue = ({ children }: Props) => {
    return (
        <div className="w-full max-w-4xl flex flex-col gap-4">{children}</div>
    );
};

export default BlogCatalogue;
