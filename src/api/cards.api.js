import express from "express";
import authenticationMiddleware from "../configs/authMiddleware";
import Card from "../models/card";

let router = express.Router();
router.use(authenticationMiddleware);

router.get("/:boardId", async (req, res) => {
  try {
    let notes = await Card.find().where({
      boardId: req.params.boardId
    });
    res.status(200).send(notes);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  const { title, description, boardId } = req.body;
  try {
    let note = await Card.create({ title, description, boardId });
    res.status(201).send(note);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
