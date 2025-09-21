import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import ConnectToDB from "./config/database.config.js";
import exerciseRouter from "./routes/exercise.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
// serve static file
app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(process.cwd() + "/views/index.html");
});

// routes:

app.use("/api/users", userRoutes);
app.use("/api/users", exerciseRouter);

// connect to db then start server
ConnectToDB(() => {
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});
