import { Router } from "express";
import z from "zod";
import { AdminModel, CourseModel } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { errorLogger } from "../config";
import chalk from 'chalk';
import mongoose from "mongoose";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;
const adminRouter = Router();
adminRouter.get('/', async (req, res) => {
  // admin endpoint, send res to redirect to login page
  res.send(`Reached ${req.originalUrl}, Method ${req.method}`);
})

adminRouter.post('/signin', async (req, res) => {
  // sign admin in
  const signinBody = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  }

  if (!signinBody.role || signinBody.role != "admin") {
    res.status(403).json({
      error: "Access Denied"
    })
    return;
  }

  const signinSchema = z.object({
    email: z.email(),
    username: z.string().min(3),
    password: z.string().min(8)
      .regex(/^(?=.*[A-Z]).{8,}$/, { error: "Invalid Password" })
  })

  const signinParse = signinSchema.safeParse(signinBody);
  if (!signinParse.success) {
    res.status(400).json({
      error: "Invalid format"
    });
    return;
  }

  try {
    const foundUser = await AdminModel.findOne({
      $or: [
        { email: signinBody.email },
        { username: signinBody.username }
      ]
    });
    if (!foundUser) {
      res.status(403).json({
        error: "Admin not found"
      });
      return;
    }

    const status = await bcrypt.compare(signinBody.password, foundUser.password);
    if (!status) {
      res.status(403).json({
        error: "Invalid username or password"
      });
      return;
    }

    const token = jwt.sign({
      id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
      role: foundUser.role
    }, ADMIN_JWT_SECRET);

    res.setHeader("Authorization", token);
    res.status(200).json({
      msg: "Admin Signed in"
    })

  } catch (err) {
    errorLogger(req, res, err);
  }

});

adminRouter.post('/course', adminAuth, async (req, res) => {
  // add a course
  const addCourseBody = {
    creatorId: new mongoose.Schema.ObjectId(req.user.id),
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl
  };

  const addCourseSchema = z.object({
    creatorId: z.instanceof(mongoose.Types.ObjectId),
    title: z.string().min(5),
    description: z.string().min(5),
    price: z.number(),
    imagrUrl: z.url()
  });

  const addCourseParse = addCourseSchema.safeParse(addCourseBody);
  if (!addCourseParse.success) {
    res.status(400).status({
      error: "Invalid format"
    });
    return;
  }

  try {
    await CourseModel.create(addCourseBody);
    res.status(200).json({
      msg: "Course Added"
    })
  } catch (err) {
    errorLogger(req, res, err);
  }
})

adminRouter.put('/course/:id', adminAuth, async (req, res) => {
  // update a course
  const { id } = req.params;
  if (!id) {
    res.status(400).json({
      error: "Course ID missing"
    })
    return;
  }
  const courseUpdateBody = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl
  }

  const courseUpdateSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(5),
    price: z.number(),
    imageUrl: z.url()
  });
  const courseUpdateParse = courseUpdateSchema.safeParse(courseUpdateBody);
  if (!courseUpdateParse.success) {
    res.status(400).json({
      error: "Invalid format"
    })
    return;
  }

  try {
    const foundCourse = await CourseModel.findById(id);
    if (!foundCourse) {
      res.status(404).json({
        error: "Course not found"
      });
      return;
    }
    const updatedCourse = await CourseModel.
      findByIdAndUpdate(id,
        { $set: courseUpdateBody },
        { new: true }
      );
    if (!updatedCourse) {
      res.status(404).json({
        error: "Course not found"
      });
      return;
    }
    res.status(200).json({
      msg: "Course updated successfully",
      course: updatedCourse
    })
  } catch (err) { errorLogger(req, res, err); }
})

adminRouter.put('/course/:id/content', adminAuth, async (req, res) => {
  // add content to a course
  const { id } = req.params;
  res.send(`Reached ${req.originalUrl}, Method ${req.method}, add content to course ${id}`);
})

adminRouter.delete('/course/:id', adminAuth, async (req, res) => {
  // remove a course
  const { id } = req.params;
  if (!id) {
    req.status(400).json({
      error: "Course Id not found"
    });
    return;
  }
  try {
    const deletedCourse = await CourseModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      res.status(404).json({
        error: "Course not found"
      });
      return;
    }
    res.status(200).json({
      msg: "Course Deleted"
    })
  } catch (err) { errorLogger(req, res, err); }
})

export default adminRouter;
