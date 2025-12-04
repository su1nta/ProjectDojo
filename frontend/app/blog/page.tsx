import React from "react";
import Heading from "../components/heading";
import FeedbackCard from "../components/feedback-card";
import Footer from "../components/footer";

import BlogCatalogue from "../components/blog-catalogue";
import BlogCard from "../components/blog-card";

type Props = {};

const Blog = (props: Props) => {
    return (
        <div className="w-full max-w-6xl border-x border-outline/5 flex flex-col items-center gap-20">
            <Heading title="Dojo Log" />
            <BlogCatalogue>
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </BlogCatalogue>
            <FeedbackCard />
            <Footer />
        </div>
    );
};

export default Blog;
