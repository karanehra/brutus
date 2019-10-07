import express from "express";

let router = express.Router();

router.post("/", async (req, res) => {
  console.log(req)
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
