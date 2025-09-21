import express from "express";
import UserModel from "../model/users.model.js";

const userRouter = express.Router();

userRouter.get("/", async (_, response) => {
  try {
    const allUsers = (await UserModel.find({})) || [];
    return response.status(200).json(allUsers);
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Internal server error!" });
  }
});

userRouter.post("/", async (request, response) => {
  try {
    const { username } = request.body;
    // console.log(username);
    const newUser = new UserModel({ username });
    const savedUser = await newUser.save();
    response
      .status(201)
      .json({ username: savedUser.username, _id: savedUser._id });
  } catch (error) {
    // console.log(error.message);
    return response.status(500).json({ message: "Internal server error!" });
  }
});

export default userRouter;
