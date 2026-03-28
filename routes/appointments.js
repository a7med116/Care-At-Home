const express = require("express");
const router = express.Router();
const { getAppointments, addAppointment, updateAppointment, deleteAppointment } = require("../controllers/appointmentsController");

router.get("/", getAppointments);
router.post("/", addAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;
