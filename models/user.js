import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  dob: { type: String, require: true },
  country: { type: String, require: true },
  phone: { type: String, require: true },
  desiredRole: { type: String, require: true },
  preferredCategory: { type: String, require: true },
  intro: { type: String, require: true },
  isVerified: { type: Boolean },
  isActive: { type: Boolean },
  isNewUser: { type: Boolean },
  id: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
});

export default mongoose.model("user", userSchema);
