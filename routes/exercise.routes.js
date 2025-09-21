import express from "express";
import UserModel from "../model/users.model.js";
import ExercisesModel from "../model/exercises.model.js";

const exercisesRouter = express.Router();

exercisesRouter.post("/:_id/exercises", async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  try {
    const user = await UserModel.findById(_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exercise = new ExercisesModel({
      user_id: _id,
      description,
      duration,
      date: date ? new Date(date) : new Date(),
    });

    const saved = await exercise.save();

    res.json({
      _id: user._id,
      username: user.username,
      description: saved.description,
      duration: saved.duration,
      date: saved.date.toDateString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

exercisesRouter.get("/:_id/logs", async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  try {
    const user = await UserModel.findById(_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const filter = { user_id: _id };
    if (from || to) {
      const dateRange = {};
      if (from) dateRange.$gte = new Date(from);
      if (to) dateRange.$lte = new Date(to);
      filter.date = dateRange;
    }

    const max = limit !== undefined ? parseInt(limit) : 500;

    const exercises = await ExercisesModel.find(filter)
      .sort({ date: -1 }) // newest first
      .limit(max);

    const log = exercises.map((e) => ({
      description: e.description,
      duration: e.duration,
      date: e.date.toDateString(),
    }));

    res.json({
      _id: user._id,
      username: user.username,
      count: log.length,
      log,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default exercisesRouter;
