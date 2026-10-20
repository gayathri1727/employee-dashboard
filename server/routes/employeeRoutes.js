
import express from "express";
import mongoose from "mongoose";
import Employee from "../models/Employee.js";

const router = express.Router();

// GET: Retrieve all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

// GET: Retrieve one employee by MongoDB ID
router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// POST: Create an employee
router.post("/", async (req, res, next) => {
  try {
    const { name, designation, location, salary } = req.body;

    const employee = await Employee.create({
      name,
      designation,
      location,
      salary,
    });

    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
});

// PUT: Update an employee
router.put("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const { name, designation, location, salary } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, designation, location, salary },
      {
        new: true,
        runValidators: true,
        overwrite: true,
      }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// DELETE: Remove an employee
router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
