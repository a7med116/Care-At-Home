// ═══════════════════════════════════════
// doctorsController.js — FIXED
// ═══════════════════════════════════════
const db = require("../config/db");

// ═══ GET ALL ═══
exports.getDoctors = (req, res) => {
  db.query(
    "SELECT * FROM doctors_list ORDER BY rating DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    },
  );
};

// ═══ ADD ═══
exports.addDoctor = (req, res) => {
  const { name, specialty, experience, phone, email } = req.body;
  if (!name) return res.status(400).json({ message: "اسم الطبيب مطلوب" });

  db.query(
    `INSERT INTO doctors_list (name, specialty, experience, phone, email, available, rating, operations)
     VALUES (?, ?, ?, ?, ?, 1, 5.0, 0)`,
    [name, specialty || null, experience || 0, phone || null, email || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res
        .status(201)
        .json({ message: "✅ تم إضافة الطبيب", id: result.insertId });
    },
  );
};

// ═══ UPDATE — FIXED ═══
exports.updateDoctor = (req, res) => {
  const { name, specialty, experience, available, phone, email } = req.body;
  const id = req.params.id;

  db.query("SELECT * FROM doctors_list WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!rows.length)
      return res.status(404).json({ message: "الطبيب غير موجود" });

    const old = rows[0];

    const updatedName = name !== undefined ? name : old.name;
    const updatedSpecialty =
      specialty !== undefined ? specialty : old.specialty;
    const updatedExperience =
      experience !== undefined ? experience : old.experience;
    const updatedAvailable =
      available !== undefined ? available : old.available;
    const updatedPhone = phone !== undefined ? phone : old.phone;
    const updatedEmail = email !== undefined ? email : old.email;

    db.query(
      `UPDATE doctors_list
       SET name=?, specialty=?, experience=?, available=?, phone=?, email=?
       WHERE id=?`,
      [
        updatedName,
        updatedSpecialty,
        updatedExperience,
        updatedAvailable,
        updatedPhone,
        updatedEmail,
        id,
      ],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({ message: "✅ تم تحديث بيانات الطبيب" });
      },
    );
  });
};

// ═══ DELETE ═══
exports.deleteDoctor = (req, res) => {
  db.query("DELETE FROM doctors_list WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "✅ تم حذف الطبيب" });
  });
};
