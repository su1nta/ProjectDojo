import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
const jwt_env = process.env.JWT_SECRET;
if (!jwt_env) {
    throw new Error("JWT secret for admin not defined");
}
const JWT_SECRET = String(jwt_env);

interface UserPayload extends JwtPayload {
    id: string;
    email: string;
    username: string;
    role: "user";
}

export default function userAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({
            success: false,
            message: "Please Sign in",
            data: null,
        });
        return;
    }
    let userData: UserPayload;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === "string") {
            throw new Error("Invalid token payload");
        }
        userData = decoded as UserPayload;
        if (!userData) {
            res.status(403).json({
                success: false,
                message: "Invalid user token",
                data: null,
            });
            return;
        }
    } catch (err) {
        res.status(403).json({
            success: false,
            message: "Invalid user token",
            data: null,
        });
        return;
    }
    req.user = userData;
    next();
}
