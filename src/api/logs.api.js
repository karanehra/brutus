import express from "express";
import { Log } from "../database/index";
import authenticationMiddleware from "../configs/authMiddleware";
import {
  sendSuccessResponse,
  sendServerErrorResponse
} from "../util/responseHandlers";

let router = express.Router();
router.use(authenticationMiddleware);

router.get("/", async (req, res) => {
  try {
    let logs = await Log.findAll({});
    sendSuccessResponse(res, logs);
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

router.get("/clear", async (req, res) => {
  try {
    await Log.destroy({ where: {} });
    sendSuccessResponse(res, { data: "Logs Cleared !" });
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

export default router;
