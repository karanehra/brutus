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
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  let hasher = crypto.createHash("sha256");
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
      res.send({ token, user }).status(200);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
