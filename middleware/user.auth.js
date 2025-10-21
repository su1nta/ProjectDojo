import jwt from "jsonwebtoken";
import "dotenv/config";
const JWT_SECRET = process.env.JWT_SECRET;

export default function userAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      error: "Please Sign in"
    });
    return;
  }
  const userData = jwt.verify(token, JWT_SECRET);
  if (!userData) {
    res.status(403).json({
      error: "Invalid user token"
    });
    return;
  }
  res.user = userData;
  next();
}
