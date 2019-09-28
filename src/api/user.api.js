import express from "express";
import { User } from "../database/index";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../configs/index";

let router = express.Router();
let hasher = crypto.createHash("sha256");

router.post("/signup", async (req, res) => {
  hasher.update(req.body.password);
  try {
    let user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      passwordHash: hasher.digest("hex"),
      userType: req.body.userType
    });
    res.send(user).status(200);
  } catch (e) {
    res.send(e).status(500);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    hasher.update(req.body.password);
    if (user.passwordHash === hasher.digest("hex")) {
      let token = jwt.sign({ email: user.email }, config.JWT_SECRET, {
        expiresIn: "24h"
      });
      res.send({token}).status(200);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.send(e).status(500);
  }
});

export default router;
