import express from "express";
import authenticationMiddleware from "../configs/authMiddleware";
import Board from "../models/board";
import Card from "../models/card";
import {
  sendSuccessResponse,
  sendServerErrorResponse,
  sendCreatedResponse
} from "../util/responseHandlers";

let router = express.Router();
router.use(authenticationMiddleware);

router.get("/:id", async (req, res) => {
  try {
    let responseData = [];
    let boards = await Board.find().where({ userId: req.params.id });
    for (let board of boards) {
      let cards = await Card.find().where({ boardId: board._id });
      responseData.push({
        ...board._doc,
        cards
      });
    }
    sendSuccessResponse(res, responseData);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Board.deleteOne().where({
      _id: req.params.id
    });
    await Card.deleteMany().where({
      boardId: req.params.id
    });
    sendSuccessResponse(res, { message: "Ok" });
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

router.post("/", async (req, res) => {
  const { title, userId } = req.body;
  try {
    let board = await Board.create({ title, userId });
    sendCreatedResponse(res, board);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

export default router;
