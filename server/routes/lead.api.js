var express = require("express");
var router = express.Router();
const { getLead, createLead } = require("../controllers/lead.controller");
const { validate } = require("../middlewares/validators");
const { body } = require("express-validator");

/* GET ALL LEADS */
router.get("/", getLead);

/*  CREATE LEAD */
router.post(
  "/",
  validate([
    body("email", "Invalid email field")
      .exists()
      .isString()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("name", "Invalid name field").exists().isString(),
    body("status", "Invalid status field")
      .isString()
      .isIn(["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"]),
  ]),
  createLead
);

module.exports = router;
