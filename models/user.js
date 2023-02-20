import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  dob: { type: String, require: true },
  id: { type: String },
  personalInfo: { type: mongoose.Schema.Types.ObjectId, ref: "personalInfo" },
  projects: { type: mongoose.Schema.Types.ObjectId, ref: "projects" },
  skills: { type: mongoose.Schema.Types.ObjectId, ref: "skills" },
  journey: { type: mongoose.Schema.Types.ObjectId, ref: "journey" },
  careerInfo: { type: mongoose.Schema.Types.ObjectId, ref: "careerInfo" },
  academicInfo: { type: mongoose.Schema.Types.ObjectId, ref: "academicInfo" },
});

export default mongoose.model("user", userSchema);
