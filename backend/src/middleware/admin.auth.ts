import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

const jwt_env = process.env.ADMIN_JWT_SECRET;
if (!jwt_env) {
    throw new Error("JWT secret for admin not defined");
}
const ADMIN_JWT_SECRET = String(jwt_env);

type AdminPayload = JwtPayload & {
    id: string;
    email: string;
    username: string;
    role: "admin";
};

function adminAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({
            error: "Please Sign in",
        });
        return;
    }
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);
    const adminData = decoded as AdminPayload;
    if (!adminData) {
        res.status(403).json({
            error: "Invalid user token",
        });
        return;
    }
    if (adminData.role != "admin") {
        res.status(403).json({
            error: "Please sign in as Admin",
        });
        return;
    }
    req.user = adminData;
    next();
}

export default adminAuth;
