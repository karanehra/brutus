import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  boardId: {
    type: String,
    required: true
  }
});

const Note = model("Note", noteSchema);

export default Note;
