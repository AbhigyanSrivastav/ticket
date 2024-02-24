import mongoose from "mongoose";

const { Schema, model } = mongoose;

const issueSchema = new Schema({
  product: { type: String, required: true },
  page: String,
  description: { type: String, required: true },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"], // Limit priority to set values
    default: "Medium",
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Resolved"],
    default: "New",
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // Link to the user who created the issue
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" }, // Link to assigned developer
  comments: [
    {
      // Store comments related to the issue
      user: { type: Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Issue = model("Issue", issueSchema);

export default Issue;
