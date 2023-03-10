import mongoose from "mongoose";

const journeySchema = mongoose.Schema({
  year: { type: String, require: true },
  shortDescription: { type: String, require: true },
  longDescription: { type: String },
  highlights: { type: [String] },
  tags: { type: [String] },
  achievements: { type: [String] },
  userId: { type: String, require: true },
});

export default mongoose.model("journey", journeySchema);
