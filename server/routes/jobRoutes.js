const express = require("express");
const router = express.Router();

const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

// GET: Fetch jobs belonging to the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const jobs = await Job.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a job for the logged-in user
router.post("/", authMiddleware, async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.user.userId,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Update a job belonging to the logged-in user
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { user, ...updates } = req.body;

    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found or access denied",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a job belonging to the logged-in user
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found or access denied",
      });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;