import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../configs/index";
import User from "../models/user";
import {
  sendCreatedResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
  sendUnauthorizedResponse
} from "../util/responseHandlers";

let router = express.Router();

router.post("/signup", async (req, res) => {
  let hasher = crypto.createHash("sha256");
  const { firstName, lastName, email, password, userType } = req.body;
  hasher.update(password);
  try {
    let data = await User.create({
      firstName,
      lastName,
      userType,
      email,
      passwordHash: hasher.digest("hex")
    });
    sendCreatedResponse(res, {
      message: "Created New User",
      data
    });
  } catch (e) {
    sendServerErrorResponse(res, {
      message: "Error Occured",
      data: e
    });
  }
});

router.post("/login", async (req, res) => {
  let hasher = crypto.createHash("sha256");
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    hasher.update(password);
    if (user.passwordHash === hasher.digest("hex")) {
      let token = jwt.sign({ email: user.email }, config.JWT_SECRET, {
        expiresIn: "24h"
      });
      sendSuccessResponse(res, {
        message: "",
        data: user,
        token
      });
    } else {
      sendUnauthorizedResponse(res, {
        message: "Inorrect Credentials"
      });
    }
  } catch (e) {
    sendServerErrorResponse(res, e);
  }
});

export default router;
