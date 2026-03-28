const express = require("express");
const router = express.Router();
const { getLabResults, addLabResult, updateLabResult } = require("../controllers/Labcontroller");

router.get("/", getLabResults);
router.post("/", addLabResult);
router.put("/:id", updateLabResult);

module.exports = router;
