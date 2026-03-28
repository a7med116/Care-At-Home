const express = require("express");
const router = express.Router();
const { getPharmacy, addMedicine, updateStock } = require("../controllers/Pharmacycontroller");

router.get("/", getPharmacy);
router.post("/", addMedicine);
router.put("/:id", updateStock);

module.exports = router;
