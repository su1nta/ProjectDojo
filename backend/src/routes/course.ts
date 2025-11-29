import { Router } from "express";
import mongoose from "mongoose";
import { CourseModel, PurchaseModel } from "../db.js";
import { errorLogger } from "../config.js";
import userAuth from "../middleware/user.auth.js";
import { success } from "zod";

const courseRouter = Router();
courseRouter.get("/explore", async (req, res) => {
    // show all courses
    try {
        const response = await CourseModel.find({});
        if (!response) {
            res.status(404).json({
                success: false,
                message: "No courses",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Fetched All courses",
            data: [response],
        });
    } catch (err) {
        if (err) {
            const error = String(err);
            errorLogger(req, res, error);
        }
    }
});

courseRouter.get("/", userAuth, async (req, res) => {
    // show user's bought courses
    const user = req.user;
    if (!user) {
        res.status(400).json({
            success: false,
            message: "user is not defined",
            data: null,
        });
        return;
    }
    if (user.role != "user") {
        res.status(400).json({
            success: false,
            message: "Please sign in as an user",
            data: null,
        });
        return;
    }

    try {
        const purchasedCourses = await PurchaseModel.find({
            userId: user.id,
        }).populate("courseId");
        if (!purchasedCourses) {
            res.status(404).json({
                success: false,
                message: "No purchased courses",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Fetched all purchased courses",
            data: [purchasedCourses],
        });
    } catch (err) {
        if (err) {
            const error = String(err);
            errorLogger(req, res, error);
        }
    }
});

courseRouter.post("/:id/purchase", userAuth, async (req, res) => {
    // purchase a course
    const { id } = req.params;
    if (!req.user) {
        res.status(400).json({
            success: false,
            message: "user not defined",
            data: null,
        });
        return;
    }
    if (req.user.role != "user") {
        res.status(403).json({
            success: false,
            message: "Please sign in as an user",
            data: null,
        });
        return;
    }
    const userId = req.user.id;

    try {
        const foundCourse = await CourseModel.findById(id);
        if (!foundCourse) {
            res.status(404).json({
                success: false,
                message: "Course not found",
                data: null,
            });
            return;
        }
        const status = await PurchaseModel.create({
            userId: userId,
            courseId: foundCourse.id,
        });
        if (!status) {
            res.status(400).json({
                success: false,
                message: "cannot add purchase",
                data: null,
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Course Purchased",
            data: [foundCourse],
        });
    } catch (err) {
        if (err) {
            const error = String(err);
            errorLogger(req, res, error);
        }
    }
});

courseRouter.post("/:id/content", async (req, res) => {
    // access a course content, query param contains course id
    const { id } = req.params;
    res.send(
        `Reached ${req.originalUrl}, Method ${req.method}, course ${id} contents`
    );
});

export default courseRouter;
