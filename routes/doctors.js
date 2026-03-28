const express = require("express");
const router = express.Router();
const { getDoctors, addDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctorsController");

router.get("/", getDoctors);
router.post("/", addDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;
