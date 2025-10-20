import express from "express";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import adminRouter from "./routes/admin.js";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => { console.log(`Server started at port ${PORT}`); })