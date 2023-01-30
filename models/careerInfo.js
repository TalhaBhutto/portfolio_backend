import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema({
  designation: { type: String, require: true },
  shortDescription: { type: String, require: true },
  longDescription: { type: String, require: true },
  reasonOfQuitting: { type: String, require: true },
  company: { type: String, require: true },
  responsibilities: { type: [String] },
  isActive: { type: Boolean, require: true },
  achievements: { type: [String] },
  tags: { type: [String] },
  startDate: { type: String },
  endDate: { type: String },
  location: { type: String },
  mode: { type: String },
  shift: { type: String },
});

export default mongoose.model("userInfo", userInfoSchema);
