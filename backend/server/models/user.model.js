import mongoose from "mongoose";
import bcrypt from "bcrypt"; // For secure password hashing

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["client", "manager", "developer", "superadmin"],
    required: true,
  },
  permissions: [ { type: String } ] // Array of permission names
});


// Hash password before saving a new user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is changed

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model("User", userSchema);

export default User;
