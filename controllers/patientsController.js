// ═══════════════════════════════════════
// patientsController.js — FIXED
// ═══════════════════════════════════════
const db = require("../config/db");

// ═══ GET ALL ═══
exports.getPatients = (req, res) => {
  db.query("SELECT * FROM patients ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// ═══ GET ONE ═══
exports.getPatient = (req, res) => {
  db.query("SELECT * FROM patients WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!results.length) return res.status(404).json({ message: "المريض غير موجود" });
    res.json(results[0]);
  });
};

// ═══ ADD ═══
exports.addPatient = (req, res) => {
  const { name, age, room, doctor, status, diagnosis, blood_type, phone } = req.body;
  if (!name) return res.status(400).json({ message: "اسم المريض مطلوب" });

  db.query(
    `INSERT INTO patients (name, age, room, doctor, status, diagnosis, blood_type, phone)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, age || null, room || null, doctor || null,
     status || "مستقر", diagnosis || null, blood_type || null, phone || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم إضافة المريض", id: result.insertId });
    }
  );
};

// ═══ UPDATE — FIXED ═══
// بيستخدم COALESCE عشان الحقول اللي مجاتش في الـ request تفضل زي ما هي
exports.updatePatient = (req, res) => {
  const { name, age, room, doctor, status, diagnosis, blood_type, phone } = req.body;
  const id = req.params.id;

  // أول حاجة: جيب الداتا الموجودة
  db.query("SELECT * FROM patients WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!rows.length) return res.status(404).json({ message: "المريض غير موجود" });

    const old = rows[0];

    // لو الحقل جه في الـ request استخدمه، لو لأ سيب القديم
    const updatedName       = name       !== undefined ? name       : old.name;
    const updatedAge        = age        !== undefined ? age        : old.age;
    const updatedRoom       = room       !== undefined ? room       : old.room;
    const updatedDoctor     = doctor     !== undefined ? doctor     : old.doctor;
    const updatedStatus     = status     !== undefined ? status     : old.status;
    const updatedDiagnosis  = diagnosis  !== undefined ? diagnosis  : old.diagnosis;
    const updatedBloodType  = blood_type !== undefined ? blood_type : old.blood_type;
    const updatedPhone      = phone      !== undefined ? phone      : old.phone;

    db.query(
      `UPDATE patients
       SET name=?, age=?, room=?, doctor=?, status=?, diagnosis=?, blood_type=?, phone=?
       WHERE id=?`,
      [updatedName, updatedAge, updatedRoom, updatedDoctor,
       updatedStatus, updatedDiagnosis, updatedBloodType, updatedPhone, id],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({ message: "✅ تم تحديث بيانات المريض" });
      }
    );
  });
};

// ═══ DELETE ═══
exports.deletePatient = (req, res) => {
  db.query("DELETE FROM patients WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "✅ تم حذف المريض" });
  });
};
