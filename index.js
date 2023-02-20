// added "type":"module", in package.json to use the react type syntax of importing files
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// importing routes
import userRoutes from "./routes/users.js";
import academicInfo from "./routes/academicInfo.js";
import careerInfo from "./routes/careerInfo.js";
import journey from "./routes/journey.js";
import projects from "./routes/projects.js";
import skills from "./routes/skills.js";
import personalInfo from "./routes/personalInfo.js";
// PROJECT
// STARTS

//Using express middleware to connect my app to the post routes
const app = express();
// Getting dot.env to add keys
dotenv.config();
//set up express and added body parser to limit the image size
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//adding routes to express
app.use("/user", userRoutes);
app.use("/academic", userRoutes);
app.use("/career", userRoutes);
app.use("/journey", userRoutes);
app.use("/projects", userRoutes);
app.use("/skills", userRoutes);
app.use("/personal", userRoutes);

const PORT = process.env.PORT || 5000;

//=>> .then run the app =>> .catch print the error
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((error) => console.log("Failed to connect", error.message));

// just there to avoid warnings in console
// mongoose.set("useFindAndModify", false);
