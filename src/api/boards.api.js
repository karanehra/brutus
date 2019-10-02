import express from "express";
import { Board } from "../database/index";
import authenticationMiddleware from "../configs/authMiddleware";

let router = express.Router();
router.use(authenticationMiddleware);

router.get("/:id", async (req, res) => {
  try {
    let board = await Board.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.status(200).send(board);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Board.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).send("ok");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  const { name, userId } = req.body;
  try {
    let board = await Board.create({ name, userId });
    res.status(201).send(board);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
