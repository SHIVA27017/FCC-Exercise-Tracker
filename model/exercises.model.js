import mongoose, { model } from "mongoose";

const exercisesSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // link to User
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date, // ✅ real Date object
      required: true,
      default: Date.now, // saves as ISODate in Mongo
    },
  },
  { versionKey: false }
);
const ExercisesModel = new model("Exercise", exercisesSchema);
export default ExercisesModel;
