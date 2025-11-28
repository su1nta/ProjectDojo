import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
const jwt_env = process.env.JWT_SECRET;
if (!jwt_env) {
    throw new Error("JWT secret for admin not defined");
}
const JWT_SECRET = String(jwt_env);

export default function userAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({
            error: "Please Sign in",
        });
        return;
    }
    const userData = jwt.verify(token, JWT_SECRET);
    if (!userData) {
        res.status(403).json({
            error: "Invalid user token",
        });
        return;
    }
    req.user = userData;
    next();
}
