import { Schema, model } from "mongoose";

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  content: String,
  snippet: String
});

const Article = model("Article", articleSchema);

export default Article;