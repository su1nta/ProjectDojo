import express from "express";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import adminRouter from "./routes/admin.js";
import 'dotenv/config';
import mongoose from "mongoose";
import chalk from "chalk";

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
app.use(express.json())
app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
    app.listen(PORT, () => { console.log(chalk.blue(`Server started at port ${PORT}`)); })
  } catch (err) {
    console.error(chalk.red(`ERROR: ${err}`));
    return;
  }
}

main();

