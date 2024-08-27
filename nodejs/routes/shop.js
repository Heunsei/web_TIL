const router = require("express").Router();

router.get("/test1", (req, res) => {
  res.send("gd");
});

router.get("/test2", (req, res) => {
  res.send("qd");
});

module.exports = router;
