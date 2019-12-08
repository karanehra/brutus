import express from "express";
import feedApiSet from "./feed.api";
import logsApiSet from "./logs.api";
import datasetsApiSet from "./datasets.api";
import articlesApiSet from "./articles.api";
import dumpsApiSet from "./dumps.api";
import usersApiSet from "./user.api";
import cardssApiSet from "./cards.api";
import boardsApiSet from "./boards.api";
import testApiSet from "./test.api";
import treeApiSet from "./tree.api";

let router = express.Router();

router.use("/feeds", feedApiSet);
router.use("/logs", logsApiSet);
router.use("/articles", articlesApiSet);
router.use("/datasets", datasetsApiSet);
router.use("/dumps", dumpsApiSet);
router.use("/users", usersApiSet);
router.use("/cards", cardssApiSet);
router.use("/boards", boardsApiSet);
router.use("/test", testApiSet);
router.use("/tree", treeApiSet);

export default router;
