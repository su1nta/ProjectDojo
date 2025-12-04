import React from "react";
import Heading from "../components/heading";
import CourseCard from "../components/course-card";
import UserCounseCatalogue from "../components/user-course-catalogue";
import FeedbackCard from "../components/feedback-card";
import Footer from "../components/footer";

type Props = {};

const Courses = (props: Props) => {
    return (
        <div className="w-full max-w-6xl border-x border-outline/5 flex flex-col items-center gap-20">
            <Heading
                subtitle="What are you going to learn today"
                title="Good Morning, Jimmy"
            />
            <UserCounseCatalogue>
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </UserCounseCatalogue>
            <FeedbackCard />
            <Footer />
        </div>
    );
};

export default Courses;
