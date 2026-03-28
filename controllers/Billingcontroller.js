// ═══════════════════════════════════════
// Billingcontroller.js — FIXED
// ═══════════════════════════════════════
const db = require("../config/db");

// ═══ GET ALL ═══
exports.getBilling = (req, res) => {
  db.query("SELECT * FROM billing ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// ═══ ADD ═══
exports.addInvoice = (req, res) => {
  const { patient_name, invoice_no, amount, status, date } = req.body;
  if (!patient_name)
    return res.status(400).json({ message: "اسم المريض مطلوب" });

  db.query(
    `INSERT INTO billing (patient_name, invoice_no, amount, status, date)
     VALUES (?, ?, ?, ?, ?)`,
    [
      patient_name,
      invoice_no || `INV-${Date.now()}`,
      amount || 0,
      status || "pending",
      date || new Date().toISOString().slice(0, 10),
    ],
    (err, r) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم إضافة الفاتورة", id: r.insertId });
    },
  );
};

// ═══ UPDATE — FIXED ═══
exports.updateInvoice = (req, res) => {
  const { status, amount, patient_name } = req.body;
  const id = req.params.id;

  db.query("SELECT * FROM billing WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!rows.length)
      return res.status(404).json({ message: "الفاتورة غير موجودة" });

    const old = rows[0];

    const updatedStatus = status !== undefined ? status : old.status;
    const updatedAmount = amount !== undefined ? amount : old.amount;
    const updatedPatientName =
      patient_name !== undefined ? patient_name : old.patient_name;

    db.query(
      "UPDATE billing SET status=?, amount=?, patient_name=? WHERE id=?",
      [updatedStatus, updatedAmount, updatedPatientName, id],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({ message: "✅ تم تحديث الفاتورة" });
      },
    );
  });
};

// ═══ STATS ═══
exports.getBillingStats = (req, res) => {
  db.query(
    `SELECT
       SUM(amount) as total,
       SUM(CASE WHEN status='paid'    THEN amount ELSE 0 END) as paid,
       SUM(CASE WHEN status='pending' THEN amount ELSE 0 END) as pending,
       COUNT(*) as total_invoices,
       COUNT(CASE WHEN status='paid'    THEN 1 END) as paid_count,
       COUNT(CASE WHEN status='pending' THEN 1 END) as pending_count
     FROM billing`,
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results[0]);
    },
  );
};
