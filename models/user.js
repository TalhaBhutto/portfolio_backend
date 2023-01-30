import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  dob: { type: String, require: true },
  id: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "personalInfo" },
  projects: { type: mongoose.Schema.Types.ObjectId, ref: "projects" },
});

export default mongoose.model("user", userSchema);
