import express from "express";
import BrutusParser from "../util/brutusParser";

let router = express.Router();

router.post("/", async (req, res) => {
  let parser = new BrutusParser(req.body.urls, "update");
  await parser.startPipeline()
  // try {
  //   let board = await Board.findAll({
  //     where: {
  //       userId: req.params.id
  //     }
  //   });
  //   res.status(200).send(board);
  // } catch (e) {
  //   res.status(500).send(e);
  // }
});

export default router;
