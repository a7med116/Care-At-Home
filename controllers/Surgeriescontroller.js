// ═══════════════════════════════════════
// Surgeriescontroller.js — FIXED
// ═══════════════════════════════════════
const db = require("../config/db");

// ═══ GET ALL ═══
exports.getSurgeries = (req, res) => {
  db.query(
    "SELECT * FROM surgeries ORDER BY start_time DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    },
  );
};

// ═══ ADD ═══
exports.addSurgery = (req, res) => {
  const {
    patient_name,
    doctor_name,
    room,
    type,
    status,
    start_time,
    duration_hours,
  } = req.body;
  if (!patient_name)
    return res.status(400).json({ message: "اسم المريض مطلوب" });
  if (!type) return res.status(400).json({ message: "نوع العملية مطلوب" });

  db.query(
    `INSERT INTO surgeries (patient_name, doctor_name, room, type, status, start_time, duration_hours)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      patient_name,
      doctor_name || null,
      room || null,
      type,
      status || "scheduled",
      start_time || new Date().toISOString().slice(0, 19).replace("T", " "),
      duration_hours || 1,
    ],
    (err, r) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم جدولة العملية", id: r.insertId });
    },
  );
};

// ═══ UPDATE — FIXED ═══
// بيجيب الداتا القديمة الأول وبيسيب أي حقل مجاش في الـ request زي ما هو
exports.updateSurgery = (req, res) => {
  const { status, patient_name, doctor_name, room, type, duration_hours } =
    req.body;
  const id = req.params.id;

  db.query("SELECT * FROM surgeries WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!rows.length)
      return res.status(404).json({ message: "العملية غير موجودة" });

    const old = rows[0];

    const updatedStatus = status !== undefined ? status : old.status;
    const updatedPatientName =
      patient_name !== undefined ? patient_name : old.patient_name;
    const updatedDoctorName =
      doctor_name !== undefined ? doctor_name : old.doctor_name;
    const updatedRoom = room !== undefined ? room : old.room;
    const updatedType = type !== undefined ? type : old.type;
    const updatedDurationHours =
      duration_hours !== undefined ? duration_hours : old.duration_hours;

    db.query(
      `UPDATE surgeries
       SET status=?, patient_name=?, doctor_name=?, room=?, type=?, duration_hours=?
       WHERE id=?`,
      [
        updatedStatus,
        updatedPatientName,
        updatedDoctorName,
        updatedRoom,
        updatedType,
        updatedDurationHours,
        id,
      ],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({ message: "✅ تم تحديث العملية" });
      },
    );
  });
};
