import dotenv from "dotenv";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/api.js";
import { connect } from "mongoose";
import { fileURLToPath } from "url";
import multer from "multer";
import logger from "#utils/logger.js";
const upload = multer();

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
const DB_URI = process.env.MONGO_URI;
connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const app = express();

// View engine setup

app.use(logger);
app.use(upload.none());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // ✅ Fixed middleware issue

app.use("/", apiRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("Error handler here 4047");
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  console.log("Error handler here");
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({
    success: false,
    message: "URI not found",
  });
});

export default app;
