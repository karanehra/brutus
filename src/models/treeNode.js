import { Schema, model } from "mongoose";

const treeNodeSchema = new Schema(
  {
    title: {
      required: true,
      type: String
    },
    parent: {
      required: true,
      type: String
    },
    children: {
      required: true,
      type: Array
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

const Node = model("Node", treeNodeSchema);

export default Node;
