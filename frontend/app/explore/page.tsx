import React from "react";
import Heading from "../components/heading";
import CourseCatalogue from "../components/course-catalogue";
import CourseCard from "../components/course-card";
import CategoryCard from "../components/category-card";
import FeedbackCard from "../components/feedback-card";
import Footer from "../components/footer";
type Props = {};

export default function Explore({}: Props) {
    return (
        <div className="w-full max-w-6xl flex flex-col items-center gap-y-20 border-x border-accent/50">
            <Heading
                subtitle="Explore our dojo collection"
                title={`Good Morning, Jimmy`}
            />
            <CourseCatalogue title="Newly Opened" childType="CourseCard">
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </CourseCatalogue>

            <CourseCatalogue title="Top Dojo" childType="CourseCard">
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </CourseCatalogue>

            <CourseCatalogue title="Categories" childType="CategoryCard">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </CourseCatalogue>
            <FeedbackCard />
            <Footer />
        </div>
    );
}
