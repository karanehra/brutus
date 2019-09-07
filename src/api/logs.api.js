const router = require("express").Router();
const { Log } = require("../database/index");

router.get("/", async (req, res) => {
  try {
    let logs = await Log.findAll({});
    res.send(logs).status(200);
  } catch (e) {
    res.send("error").status(500);
  }
});

module.exports = router;
