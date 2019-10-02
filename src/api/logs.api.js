import express from "express";
import { Log } from "../database/index";
import authenticationMiddleware from "../configs/authMiddleware";

let router = express.Router();
router.use(authenticationMiddleware);

router.get("/", async (req, res) => {
  try {
    let logs = await Log.findAll({});
    res.status(200).send(logs);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/clear", async (req, res) => {
  try {
    await Log.destroy({ where: {} });
    res.send("Logs Cleared !").status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

export default router;
