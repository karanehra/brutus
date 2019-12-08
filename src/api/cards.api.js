import express from "express";
import authenticationMiddleware from "../configs/authMiddleware";
import Card from "../models/card";
import {
  sendSuccessResponse,
  sendServerErrorResponse,
  sendCreatedResponse
} from "../util/responseHandlers";

let router = express.Router();
router.use(authenticationMiddleware);

router.get("/:boardId", async (req, res) => {
  try {
    let notes = await Card.find().where({
      boardId: req.params.boardId
    });
    sendSuccessResponse(res, notes);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

router.post("/", async (req, res) => {
  const { title, boardId } = req.body;
  try {
    let note = await Card.create({ title, boardId });
    sendCreatedResponse(res, note);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

router.put("/:id", async (req, res) => {
  const { boardId } = req.body;
  try {
    let note = await Card.findByIdAndUpdate(req.params.id, { boardId });
    sendSuccessResponse(res, note);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

export default router;
