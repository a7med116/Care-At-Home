const express = require("express");
const router = express.Router();
const { getBilling, addInvoice, updateInvoice, getBillingStats } = require("../controllers/Billingcontroller");

router.get("/", getBilling);
router.get("/stats", getBillingStats);
router.post("/", addInvoice);
router.put("/:id", updateInvoice);

module.exports = router;
