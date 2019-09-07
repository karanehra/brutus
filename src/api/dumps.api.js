const router = require("express").Router();
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {
  let filenames = [];

  try {
    fs.readdirSync(path.join(__dirname + "../../../dumps")).forEach(file =>
      filenames.push(file)
    );
    res
      .send({
        data: filenames,
        message: "OK"
      })
      .status(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
