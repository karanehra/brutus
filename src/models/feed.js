import { Schema, model } from "mongoose";

const feedSchema = new Schema({
  title: String,
  url: {
    type: String,
    unique: true
  },
  description: String,
  imageUrl: String
});

const Feed = model("Feed", feedSchema);

export default Feed;