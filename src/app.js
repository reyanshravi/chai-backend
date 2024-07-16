import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

// Import routes

import userRouter from "./routes/user.routes.js";

//Routes declaration
app.use("/api/v1/users", userRouter);

export default app;
