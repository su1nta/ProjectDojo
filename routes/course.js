import { Router } from "express";
import mongoose from "mongoose";
import { CourseModel, PurchaseModel } from "../db.js";
import { errorLogger } from "../config.js";
import userAuth from "../middleware/user.auth.js";

const courseRouter = Router();
courseRouter.get('/explore', async (req, res) => {
  // show all courses
  try {
    const response = await CourseModel.find({});
    if (!response) {
      res.status(404).json({
        error: "No courses"
      });
      return;
    }
    res.status(200).json(response);
  } catch (err) { errorLogger(req, res, err); }
})

courseRouter.get('/', userAuth, async (req, res) => {
  // show user's bought courses

});

courseRouter.post('/:id/purchase', userAuth, async (req, res) => {
  // purchase a course
  const { id } = req.params;
  if (req.user.role != "user") {
    res.status(403).json({
      error: "Please sign in as an user"
    });
    return;
  }
  const userId = req.user.id;

  try {
    const foundCourse = await CourseModel.findById(id);
    if (!foundCourse) {
      res.status(404).json({
        error: "Course not found"
      });
      return;
    }
    console.log(foundCourse);
    const status = await PurchaseModel.create({
      userId: userId,
      courseId: foundCourse.id
    });
    console.log(status);
    if (!status) {
      res.status(400).json({
        error: "cannot add purchase"
      });
      return;
    }

    res.status(200).json({
      msg: "Course Purchased",
      course: foundCourse
    })
  } catch (err) { }
})

courseRouter.post('/:id/content', async (req, res) => {
  // access a course content, query param contains course id
  const { id } = req.params;
  res.send(`Reached ${req.originalUrl}, Method ${req.method}, course ${id} contents`);
})

export default courseRouter;
