const router = require("express").Router();
const feedApiSet = require("./feed.api");
const logsApiSet = require("./logs.api");
const datasetsApiSet = require("./datasets.api");
const articlesApiSet = require("./articles.api");
const dumpsApiSet = require("./dumps.api");


router.use("/feeds", feedApiSet);
router.use("/logs", logsApiSet);
router.use("/articles", articlesApiSet);
router.use("/datasets", datasetsApiSet);
router.use("/dumps", dumpsApiSet);

module.exports = router;
