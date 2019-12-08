import { Schema, model } from "mongoose";

const treeSchema = new Schema(
  {
    title: {
      required: true,
      type: String
    },
    representation: {
      required: true,
      type: Object
    },
    userID: {
      required: true,
      type: String
    }
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
