import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

const UserModel = new model("User", UserSchema);

export default UserModel;
