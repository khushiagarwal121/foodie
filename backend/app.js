import express from "express";

import authRouter from "./features/auth/authApi.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

export default app;
