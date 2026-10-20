
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);

app.use(express.json({ limit: "10kb" }));

// Basic health-check route
app.get("/", (req, res) => {
  res.json({
    message: "Employee Dashboard API is running",
  });
});

// Employee API routes
app.use("/api/employees", employeeRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Central error handler
app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.name === "ValidationError" ||
      error.name === "StrictModeError") {
    return res.status(400).json({
      message: error.message,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid data format",
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: "A duplicate value already exists",
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
});

// Connect to MongoDB before starting the server
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from the .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
