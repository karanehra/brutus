import { Router as router } from "express";
import feedApiSet from "./feed.api ";
import logsApiSet from "./logs.api ";
import datasetsApiSet from "./datasets.api ";
import articlesApiSet from "./articles.api ";
import dumpsApiSet from "./dumps.api ";

router.use("/feeds", feedApiSet);
router.use("/logs", logsApiSet);
router.use("/articles", articlesApiSet);
router.use("/datasets", datasetsApiSet);
router.use("/dumps", dumpsApiSet);

export default router;
