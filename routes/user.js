import { Router } from "express";
import z, { email } from "zod";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorLogger } from "../config";

const userRouter = Router();
userRouter.get('/', async (req, res) => {
  // /user/ endpoint, send msg to redirect to signin page
  res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
})

// user signup
userRouter.post('/signup', async (req, res) => {
  // signup endpoint
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const signupBody = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.user.role
  }

  const signupValidationSchema = z.object({
    email: z.email(),
    username: z.string().min(3).max(20),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
    role: z.enum(["user"], {
      error: "Role must be user"
    })
  })
  const signupParse = signupValidationSchema.safeParse(signupBody);
  if (!signupParse.success) {
    res.status(400).json({ error: "Invalid format" })
    return;
  }
  const foundUser = await userModel.findOne({
    $or: [
      { email: signupBody.email },
      { username: signupBody.username }
    ]
  });

  if (foundUser) {
    res.status(400).json({
      error: "user already exists"
    });
    return;
  }
  try {
    const hashedPassword = bcrypt.hash(signupBody.password, 5);
    await UserModel.create({
      email: signupBody.email,
      username: signupBody.username,
      password: hashedPassword,
      role: signupBody.role
    });
    res.status(200).json({
      msg: "You are signed up"
    })
  } catch (err) {
    errorLogger(req, res, err);
  }

});

// user signin
userRouter.post('/signin', async (req, res) => {
  // signin endpoint
  const signinBody = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.user.role
  }
  const signinValidationSchema = z.object({
    email: z.email().optional(),
    username: z.string().min(3).max(20).optional(),
    password: z.string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/[0-9]/)
      .regex(/[^A-za-z0-9]/),
    role: z.enum("user")
  });

  const signinParse = signinValidationSchema.safeParse(signinBody);
  if (!signinParse.success) {
    res.status(400).json({
      error: "Invalid format"
    });
    return;
  }
  const foundUser = await UserModel.findOne({
    email: signinBody.email,
    username: signinBody.username
  });
  if (!foundUser) {
    res.status(400).json({
      error: "User not found"
    });
    return;
  }
  const passwordMatches = bcrypt.verify(signinBody.password, foundUser.password);
  if (!passwordMatches) {
    res.status(401).json({
      error: "Invalid credentials"
    });
    return;
  }


  //validation ends here
  const token = jwt.sign({
    id: foundUser._id.toString(),
    email: foundUser.email,
    username: foundUser.UserModel
  }, JWT_SECRET);

  res.setHeader("Authorization", token);
  res.status(200).json({
    msg: "You are signed in"
  })
})

userRouter.get('/me', userAuth, async (req, res) => {
  // send signedin user details
  const { email, username } = req.user;
  res.status(200).json({
    email: email,
    username: username
  });
})

export default userRouter;
