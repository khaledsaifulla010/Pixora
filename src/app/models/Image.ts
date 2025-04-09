import mongoose, { Schema, model, models } from "mongoose";

const imageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

const Image = models.Image || model("Image", imageSchema);
export default Image;
