import { Schema, model } from "mongoose";

const treeSchema = new Schema(
  {
    title: String,
    tree: Object
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

const Tree = model("Tree", treeSchema);

export default Tree;
