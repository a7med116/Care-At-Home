// ═══════════════════════════════════════
// appointmentsController.js — FIXED
// ═══════════════════════════════════════
const db = require("../config/db");

// ═══ GET ALL ═══
exports.getAppointments = (req, res) => {
  db.query("SELECT * FROM appointments ORDER BY date DESC, time DESC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// ═══ ADD ═══
exports.addAppointment = (req, res) => {
  const { patient_name, doctor_name, date, time, type, notes } = req.body;
  if (!patient_name) return res.status(400).json({ message: "اسم المريض مطلوب" });
  if (!date || !time) return res.status(400).json({ message: "التاريخ والوقت مطلوبان" });

  db.query(
    `INSERT INTO appointments (patient_name, doctor_name, date, time, type, status, notes)
     VALUES (?, ?, ?, ?, ?, 'pending', ?)`,
    [patient_name, doctor_name || null, date, time, type || "فحص دوري", notes || ""],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم حجز الموعد", id: result.insertId });
    }
  );
};

// ═══ UPDATE — FIXED ═══
// بيجيب الداتا القديمة الأول وبيسيب أي حقل مجاش في الـ request زي ما هو
exports.updateAppointment = (req, res) => {
  const { status, date, time, type, notes, doctor_name, patient_name } = req.body;
  const id = req.params.id;

  db.query("SELECT * FROM appointments WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!rows.length) return res.status(404).json({ message: "الموعد غير موجود" });

    const old = rows[0];

    const updatedStatus      = status       !== undefined ? status       : old.status;
    const updatedDate        = date         !== undefined ? date         : old.date;
    const updatedTime        = time         !== undefined ? time         : old.time;
    const updatedType        = type         !== undefined ? type         : old.type;
    const updatedNotes       = notes        !== undefined ? notes        : old.notes;
    const updatedDoctorName  = doctor_name  !== undefined ? doctor_name  : old.doctor_name;
    const updatedPatientName = patient_name !== undefined ? patient_name : old.patient_name;

    db.query(
      `UPDATE appointments
       SET status=?, date=?, time=?, type=?, notes=?, doctor_name=?, patient_name=?
       WHERE id=?`,
      [updatedStatus, updatedDate, updatedTime, updatedType,
       updatedNotes, updatedDoctorName, updatedPatientName, id],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({ message: "✅ تم تحديث الموعد" });
      }
    );
  });
};

// ═══ DELETE ═══
exports.deleteAppointment = (req, res) => {
  db.query("DELETE FROM appointments WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "✅ تم حذف الموعد" });
  });
};
