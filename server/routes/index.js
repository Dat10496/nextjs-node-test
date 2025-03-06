var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

const leadRouter = require("./lead.api");
router.use("/leads", leadRouter);

module.exports = router;
