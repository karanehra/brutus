import express from "express";
import {
  sendSuccessResponse,
  sendServerErrorResponse
} from "../util/responseHandlers";
import Tree from "../models/tree";

let router = express.Router();

router.post("/", async (req, res) => {
  const { title, representation, userID, ID } = req.body;
  try {
    let tree = await Tree.create({ title, representation, userID, ID });
    sendSuccessResponse(res, tree);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let tree = await Tree.findById(req.params.id);
    sendSuccessResponse(res, tree);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

router.get("/user/:userID", async (req, res) => {
  try {
    let trees = await Tree.find().where({ userID: req.params.userID });
    sendSuccessResponse(res, trees);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

export default router;
