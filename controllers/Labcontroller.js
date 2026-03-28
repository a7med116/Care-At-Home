// ═══════════════════════════════════════
// Labcontroller.js — FIXED
// ═══════════════════════════════════════
const db = require("../config/db");

// ═══ GET ALL ═══
exports.getLabResults = (req, res) => {
  db.query(
    "SELECT * FROM lab_results ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    },
  );
};

// ═══ ADD ═══
exports.addLabResult = (req, res) => {
  const { patient_name, test_name, result, status, priority, ready, date } =
    req.body;
  if (!patient_name)
    return res.status(400).json({ message: "اسم المريض مطلوب" });

  db.query(
    `INSERT INTO lab_results (patient_name, test_name, result, status, priority, ready, date)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      patient_name,
      test_name || null,
      result || "",
      status || "normal",
      priority || "normal",
      ready ? 1 : 0,
      date || new Date().toISOString().slice(0, 10),
    ],
    (err, r) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم إضافة التحليل", id: r.insertId });
    },
  );
};

// ═══ UPDATE — FIXED ═══
// بيجيب الداتا القديمة الأول وبيسيب أي حقل مجاش في الـ request زي ما هو
exports.updateLabResult = (req, res) => {
  const { result, status, ready } = req.body;
  const id = req.params.id;

  db.query("SELECT * FROM lab_results WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!rows.length)
      return res.status(404).json({ message: "التحليل غير موجود" });

    const old = rows[0];

    const updatedResult = result !== undefined ? result : old.result;
    const updatedStatus = status !== undefined ? status : old.status;
    const updatedReady = ready !== undefined ? (ready ? 1 : 0) : old.ready;

    db.query(
      "UPDATE lab_results SET result=?, status=?, ready=? WHERE id=?",
      [updatedResult, updatedStatus, updatedReady, id],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({ message: "✅ تم تحديث التحليل" });
      },
    );
  });
};
