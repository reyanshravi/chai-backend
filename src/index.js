import dotenv from "dotenv/config";

// dotenv.config({
//   path: "./.env",
// });

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import connectDB from "./db/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (e) => {
      console.error(`Error starting server: ${e.message}`);
      throw e;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      console.log(`Database connected to ${DB_NAME}`);
    });
  })
  .catch((e) => {
    console.log("MongoDB connection failed!", e);
  });
