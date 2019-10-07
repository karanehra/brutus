import express from "express";
import authenticationMiddleware from "../configs/authMiddleware";
import Board from "../models/board";

let router = express.Router();
// router.use(authenticationMiddleware);

router.get("/:id", async (req, res) => {
  try {
    let board = await Board.find().where({ userId: req.params.id });
    res.status(200).send(board);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Board.deleteOne().where({
      _id: req.params.id
    });
    res.status(200).send("ok");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  const { title, userId } = req.body;
  try {
    let board = await Board.create({ title, userId });
    res.status(201).send(board);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
