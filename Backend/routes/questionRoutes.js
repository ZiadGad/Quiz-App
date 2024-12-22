const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

router.route("/").get(questionController.getAll);
router.route("/:id").get(questionController.getOne);

module.exports = router;
