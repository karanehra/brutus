import express from "express";
import { Note } from "../database/index";
import authenticationMiddleware from "../configs/authMiddleware";

let router = express.Router();
router.use(authenticationMiddleware);

router.get("/", async (req, res) => {
  try {
    let notes = await Note.findAll({});
    res.status(200).send(notes);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    let note = await Note.create({title,description});
    res.status(201).send(note);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
