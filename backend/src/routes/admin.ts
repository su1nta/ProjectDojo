import { Router } from "express";
import z from "zod";
import { AdminModel, CourseModel } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { errorLogger } from "../config.js";
import chalk from "chalk";
import mongoose from "mongoose";
import adminAuth from "../middleware/admin.auth.js";

const jwt_env = process.env.ADMIN_JWT_SECRET;
if (!jwt_env) {
    throw new Error("JWT Secret is not defined");
}
const ADMIN_JWT_SECRET = jwt_env;
const adminRouter = Router();
adminRouter.get("/", async (req, res) => {
    // admin endpoint, send res to redirect to login page
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
});

adminRouter.post("/signup", async (req, res) => {
    const signupBody = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    };

    const signupSchema = z.object({
        email: z.email(),
        username: z.string().min(3),
        password: z
            .string()
            .min(8)
            .regex(/^(?=.*[A-Z]).{8,}$/, { error: "Invalid Password" }),
    });
    const signupParse = signupSchema.safeParse(signupBody);
    if (!signupParse.success) {
        res.status(400).json({
            success: false,
            message: "Invalid format",
            data: null,
        });
        return;
    }

    const foundAdmin = await AdminModel.findOne({
        $or: [{ email: signupBody.email }, { username: signupBody.username }],
    });

    if (foundAdmin) {
        res.status(400).json({
            success: false,
            message: "Admin with this credentials already exists",
            data: null,
        });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(signupBody.password, 5);
        const status = await AdminModel.create({
            email: signupBody.email,
            username: signupBody.username,
            password: hashedPassword,
        });
        if (!status) {
            res.status(400).json({
                success: false,
                message: "Cannot create Admin right now",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: null,
        });
    } catch (err) {}
});
adminRouter.post("/signin", async (req, res) => {
    // sign admin in
    const signinBody = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    };

    if (!signinBody.role || signinBody.role != "admin") {
        res.status(403).json({
            success: false,
            message: "Access Denied",
            data: null,
        });
        return;
    }

    const signinSchema = z.object({
        email: z.email().optional(),
        username: z.string().min(3).optional(),
        password: z
            .string()
            .min(8)
            .regex(/^(?=.*[A-Z]).{8,}$/, { error: "Invalid Password" }),
    });

    const signinParse = signinSchema.safeParse(signinBody);
    if (!signinParse.success) {
        res.status(400).json({
            success: false,
            message: "Invalid format",
            data: null,
        });
        return;
    }

    try {
        const foundUser = await AdminModel.findOne({
            $or: [
                { email: signinBody.email },
                { username: signinBody.username },
            ],
        });
        if (!foundUser) {
            res.status(403).json({
                success: false,
                message: "Admin not found",
                data: null,
            });
            return;
        }

        const storedPassword = foundUser.password;
        if (!storedPassword) {
            res.status(400).json({
                success: false,
                message: "invalid credentials",
                data: null,
            });
            return;
        }

        const status = await bcrypt.compare(
            signinBody.password,
            storedPassword
        );
        if (!status) {
            res.status(403).json({
                success: false,
                message: "Invalid username or password",
                data: null,
            });
            return;
        }

        const token = jwt.sign(
            {
                id: foundUser._id,
                email: foundUser.email,
                username: foundUser.username,
                role: signinBody.role,
            },
            ADMIN_JWT_SECRET
        );

        res.setHeader("Authorization", token);
        res.status(200).json({
            success: true,
            message: "Admin Signed in",
            data: null,
        });
    } catch (err) {
        if (err) {
            const error = String(err);
            errorLogger(req, res, error);
        }
    }
});

adminRouter.post("/course", adminAuth, async (req, res) => {
    // add a course
    if (!req.user) {
        res.status(400).json({
            success: false,
            message: "user not found",
            data: null,
        });
        return;
    }
    const addCourseBody = {
        creatorId: new mongoose.Types.ObjectId(req.user.id),
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
    };

    const addCourseSchema = z.object({
        creatorId: z.instanceof(mongoose.Types.ObjectId),
        title: z.string().min(5),
        description: z.string().min(5),
        price: z.number(),
        imagrUrl: z.url().optional(),
    });

    const addCourseParse = addCourseSchema.safeParse(addCourseBody);
    if (!addCourseParse.success) {
        res.status(400).json({
            success: false,
            message: "Invalid format",
            data: null,
        });
        return;
    }

    try {
        await CourseModel.create(addCourseBody);
        res.status(200).json({
            success: true,
            message: "Course Added",
            data: null,
        });
    } catch (err) {
        if (err) {
            const error = String(err);
            errorLogger(req, res, error);
        }
    }
});

adminRouter.put("/course/:id", adminAuth, async (req, res) => {
    // update a course
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Course ID missing",
            data: null,
        });
        return;
    }
    const courseUpdateBody = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
    };

    const courseUpdateSchema = z.object({
        title: z.string().min(5).optional(),
        description: z.string().min(5).optional(),
        price: z.number().optional(),
        imageUrl: z.url().optional(),
    });
    const courseUpdateParse = courseUpdateSchema.safeParse(courseUpdateBody);
    if (!courseUpdateParse.success) {
        res.status(400).json({
            success: false,
            message: "Invalid format",
            data: null,
        });
        return;
    }

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
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            id,
            { $set: courseUpdateBody },
            { new: true }
        );
        if (!updatedCourse) {
            res.status(404).json({
                success: false,
                message: "Course not found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: [updatedCourse],
        });
    } catch (err) {
        if (err) {
            const error = String(err);
            errorLogger(req, res, error);
        }
    }
});

adminRouter.put("/course/:id/content", adminAuth, async (req, res) => {
    // add content to a course
    const { id } = req.params;
    res.send(
        `Reached ${req.originalUrl}, Method ${req.method}, add content to course ${id}`
    );
});

adminRouter.delete("/course/:id", adminAuth, async (req, res) => {
    // remove a course
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Course Id not found",
            data: null,
        });
        return;
    }
    try {
        const deletedCourse = await CourseModel.findByIdAndDelete(id);
        if (!deletedCourse) {
            res.status(404).json({
                success: false,
                message: "Course not found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Course Deleted",
            data: null,
        });
    } catch (err) {
        if (err) {
            const error = String(err);
            errorLogger(req, res, error);
        }
    }
});

export default adminRouter;
