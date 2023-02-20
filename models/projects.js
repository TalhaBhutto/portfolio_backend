import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  name: { type: String, require: true },
  shortDescription: { type: String, require: true },
  github: { type: String },
  domain: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  longDescription: { type: String },
  images: { type: [String] },
  tech: { type: [String] },
  features: { type: [String] },
  userId: { type: String, require: true },
});

export default mongoose.model("projects", projectSchema);
