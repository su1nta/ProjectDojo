import chalk from "chalk";
import { Request, Response } from "express";

export function errorLogger(req: Request, res: Response, err: string) {
    console.log(`Endpoint: ${req.originalUrl}, Method: ${req.method}`);
    console.error(chalk.red(`Error: ${err}`));
    res.status(503).json({ error: "Service temporarily unavailable" });
}
