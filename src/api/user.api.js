import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../configs/index";
import User from "../models/user";

let router = express.Router();

router.post("/signup", async (req, res) => {
  let hasher = crypto.createHash("sha256");
  const { firstName, lastName, email, password, userType } = req.body;
  hasher.update(password);
  try {
    let a = await User.create({
      firstName,
      lastName,
      userType,
      email,
      passwordHash: hasher.digest("hex")
    });
    res.status(201).send({
      message: "Created New User",
      data: a
    });
  } catch (e) {
    res.status(500).send({
      message: "Error Occured",
      data: e
    });
  }
});

router.post("/login", async (req, res) => {
  let hasher = crypto.createHash("sha256");
  const { email, password } = req.body;
  try {
    let user = await User.findOne({email});
    hasher.update(password);
    if (user.passwordHash === hasher.digest("hex")) {
      let token = jwt.sign({ email: user.email }, config.JWT_SECRET, {
        expiresIn: "24h"
      });
      res.status(200).send({
        message: "",
        data: user,
        token
      });
    } else {
      res.status(401).send({
        message: "Inorrect Credentials"
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

export default router;
