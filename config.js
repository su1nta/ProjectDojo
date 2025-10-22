import chalk from "chalk";

export const roles = {
  "admin": ['create', 'read', 'update', 'delete'],
  "user": ["read"]
}
export function errorLogger(req, res, err) {
  console.log(`Endpoint: ${req.originalUrl}, Method: ${req.method}`);
  console.error(chalk.red(`Error: ${err}`));
  res.status(503).json({ error: "Service temporarily unavailable" })
}
