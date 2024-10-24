import express from "express";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import authRouter from "./features/auth/authApi.js";

const app = express();

app.use(express.json());

app.use("/api/v1/", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

export default app;
