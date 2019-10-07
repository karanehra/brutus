import { Schema, model } from "mongoose";

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    boardId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

const Card = model("Card", cardSchema);

export default Card;
