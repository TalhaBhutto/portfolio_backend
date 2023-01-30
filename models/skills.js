import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
  name: { type: String, require: true },
  shortDescription: { type: String, require: true },
  longDescription: { type: String },
  startDate: { type: String },
  experience: { type: String },
  level: { type: String },
  type: { type: String },
  review: { type: String },
  tags: { type: [String] },
  features: { type: [String] },
});

export default mongoose.model("skills", skillSchema);
