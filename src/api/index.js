import express from "express";
import feedApiSet from "./feed.api";
import logsApiSet from "./logs.api";
import datasetsApiSet from "./datasets.api";
import articlesApiSet from "./articles.api";
import dumpsApiSet from "./dumps.api";
import usersApiSet from "./user.api";
import notesApiSet from "./notes.api";
import boardsApiSet from "./boards.api";

let router = express.Router();

router.use("/feeds", feedApiSet);
router.use("/logs", logsApiSet);
router.use("/articles", articlesApiSet);
router.use("/datasets", datasetsApiSet);
router.use("/dumps", dumpsApiSet);
router.use("/users", usersApiSet);
router.use("/notes", notesApiSet);
router.use("/boards", boardsApiSet);

export default router;
