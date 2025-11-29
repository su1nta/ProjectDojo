import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorLogger } from "../config.js";
import { UserModel } from "../db.js";
import userAuth from "../middleware/user.auth.js";
import "dotenv/config";
import { fa } from "zod/locales";

// api response format
// {
//     sucess: boolean,
//     message: string,
//     data: [] | null
// }

const jwt_env = process.env.JWT_SECRET;
if (!jwt_env) {
    throw new Error("JWT Secret not defined");
}
const JWT_SECRET = String(jwt_env);

const userRouter = Router();
userRouter.get("/", async (req, res) => {
    // /user/ endpoint, send msg to redirect to signin page
    res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
});

// user signup
userRouter.post("/signup", async (req, res) => {
    // signup endpoint

    const signupBody = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    };

    if (!signupBody.role || signupBody.role != "user") {
        res.status(403).json({
            success: false,
            message: "Invalid role, you're an user right?",
            data: null,
        });
        return;
    }

    const signupValidationSchema = z.object({
        email: z.email(),
        username: z.string().min(3).max(20),
        password: z
            .string()
            .min(8)
            .regex(/^(?=.*[A-Z]).{8,}$/, { error: "Invalid Password" }),
        role: z.string(),
    });
    const signupParse = signupValidationSchema.safeParse(signupBody);
    if (!signupParse.success) {
        res.status(400).json({
            success: false,
            message: "Invalid format",
            data: null,
        });
        return;
    }
    const foundUser = await UserModel.findOne({
        $or: [{ email: signupBody.email }, { username: signupBody.username }],
    });

    if (foundUser) {
        res.status(400).json({
            success: false,
            message: "user already exists",
            data: null,
        });
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(signupBody.password, 5);
        await UserModel.create({
            email: signupBody.email,
            username: signupBody.username,
            password: hashedPassword,
        });
        res.status(200).json({
            success: true,
            message: "You are signed up",
            data: null,
        });
    } catch (err) {
        if (err) {
            const error = String(err);
            errorLogger(req, res, error);
        }
    }
});

// user signin
userRouter.post("/signin", async (req, res) => {
    // signin endpoint
    const signinBody = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
    };

    if (!signinBody.role || signinBody.role != "user") {
        res.status(403).json({
            success: false,
            message: "You are an user right?",
            data: null,
        });
        return;
    }
    const signinValidationSchema = z.object({
        email: z.email().optional(),
        username: z.string().min(3).max(20).optional(),
        password: z
            .string()
            .min(8)
            .regex(/^(?=.*[A-Z]).{8,}$/, { error: "Invalid Password" }),
        role: z.string(),
    });

    const signinParse = signinValidationSchema.safeParse(signinBody);
    if (!signinParse.success) {
        res.status(400).json({
            success: false,
            message: "Invalid format",
            data: null,
        });
        return;
    }
    const foundUser = await UserModel.findOne({
        $or: [{ email: signinBody.email }, { username: signinBody.username }],
    });
    if (!foundUser) {
        res.status(400).json({
            success: false,
            message: "User not found",
            data: null,
        });
        return;
    }
    const storedPassword = foundUser.password;
    if (!storedPassword) {
        res.status(500).json({
            success: false,
            message: "Stored password unavailable",
            data: null,
        });
        return;
    }
    const passwordMatches = await bcrypt.compare(
        signinBody.password,
        storedPassword
    );
    if (!passwordMatches) {
        res.status(401).json({
            success: false,
            message: "Invalid credentials",
            data: null,
        });
        return;
    }

    //validation ends here
    const token: string = jwt.sign(
        {
            id: foundUser._id.toString(),
            email: foundUser.email,
            username: foundUser.username,
            role: "user",
        },
        JWT_SECRET
    );

    res.setHeader("Authorization", token);
    res.status(200).json({
        success: true,
        message: "You are signed in",
        data: null,
    });
});

userRouter.get("/me", userAuth, async (req, res) => {
    // send signedin user details
    if (!req.user) {
        res.status(400).json({
            success: false,
            message: "user not found",
            data: null,
        });
        return;
    }
    const { id, email, username } = req.user;
    res.status(200).json({
        success: true,
        message: "user found",
        data: [
            {
                id: id,
                email: email,
                username: username,
            },
        ],
    });
});

export default userRouter;
