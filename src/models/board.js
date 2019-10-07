import { Schema, model } from "mongoose";

const boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  userId: {
    type: String,
    required: true
  }
});

const Board = model("Board", boardSchema);

export default Board;
