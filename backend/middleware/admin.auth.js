
import jwt from "jsonwebtoken";
import "dotenv/config";
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

export default function adminAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      error: "Please Sign in"
    });
    return;
  }
  const adminData = jwt.verify(token, ADMIN_JWT_SECRET);
  if (!adminData) {
    res.status(403).json({
      error: "Invalid user token"
    });
    return;
  }
  if (adminData.role != "admin") {
    res.status(403).json({
      error: "Please sign in as Admin"
    });
    return;
  }
  req.user = adminData;
  next();
}
