const express = require("express");
const router = express.Router();
const { getSurgeries, addSurgery, updateSurgery } = require("../controllers/Surgeriescontroller");

router.get("/", getSurgeries);
router.post("/", addSurgery);
router.put("/:id", updateSurgery);

module.exports = router;
