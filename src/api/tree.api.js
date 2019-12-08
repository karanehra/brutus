import express from "express";
import { sendSuccessResponse } from "../util/responseHandlers";

let router = express.Router();

router.post("/", async (req, res) => {
  sendSuccessResponse(res, {});
});

export default router;
