import express from "express";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import adminRouter from "./routes/admin.js";
import "dotenv/config";
import mongoose from "mongoose";
import chalk from "chalk";

const app = express();

const portEnv = process.env.PORT;
const mongoUrlEnv = process.env.MONGO_URL;

if (!portEnv) {
    throw new Error("PORT env var is required");
}
if (!mongoUrlEnv) {
    throw new Error("MONGO_URL env var is required");
}

const PORT = Number(portEnv);
if (Number.isNaN(PORT)) {
    throw new Error("PORT must be a number");
}
const MONGO_URL = mongoUrlEnv;

if (!PORT || !MONGO_URL) {
    throw new Error("ENV Variables are not properly defined");
}

app.use(express.json());
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB");
        app.listen(PORT, () => {
            console.log(chalk.blue(`Server started at port ${PORT}`));
        });
    } catch (err) {
        console.error(chalk.red(`ERROR: ${err}`));
        return;
    }
}

main();
