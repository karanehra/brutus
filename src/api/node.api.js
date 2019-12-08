import express from "express";
import {
  sendSuccessResponse,
  sendServerErrorResponse
} from "../util/responseHandlers";
import Node from "../models/treeNode";

let router = express.Router();

router.post("/", async (req, res) => {
  const { title, parent, children } = req.body;
  try {
    let node = await Node.create({ title, parent, children });
    sendSuccessResponse(res, node);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

export default router;
