import mongoose from "mongoose";

const personalInfoSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  dob: { type: String, require: true },
  address: { type: String, require: true },
  phone: { type: String, require: true },
  designation: { type: String, require: true },
  intro: { type: String, require: true },
  image: { type: String, require: true },
  linkedIn: { type: String, require: true },
  facebook: { type: String, require: true },
  instagram: { type: String, require: true },
  twitter: { type: String, require: true },
  github: { type: String, require: true },
  resume: { type: String, require: true },
  hobbies: { type: [String] },
  skills: { type: [String] },
  tags: { type: [String] },
  id: { type: String },
});

export default mongoose.model("personalInfo", personalInfoSchema);
