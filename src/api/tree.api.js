import express from "express";
import {
  sendSuccessResponse,
  sendServerErrorResponse
} from "../util/responseHandlers";
import Tree from "../models/tree";

let router = express.Router();

router.post("/", async (req, res) => {
  const { title, representation, userID } = req.body;
  try {
    let tree = await Tree.create({ title, representation, userID });
    sendSuccessResponse(res, tree);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

export default router;
