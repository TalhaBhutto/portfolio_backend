import mongoose from "mongoose";

const academicInfoSchema = mongoose.Schema({
  title: { type: String, require: true },
  shortDescription: { type: String, require: true },
  longDescription: { type: String, require: true },
  experience: { type: String, require: true },
  isDegree: { type: Boolean, require: true },
  isActive: { type: Boolean, require: true },
  shortTitle: { type: String, require: true },
  institution: { type: String, require: true },
  achievements: { type: [String] },
  tags: { type: [String] },
  startDate: { type: String },
  endDate: { type: String },
  location: { type: String },
});

export default mongoose.model("academicInfo", academicInfoSchema);
