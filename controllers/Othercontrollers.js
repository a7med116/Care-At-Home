// ═══════════════════════════════════════
// labController.js
// ═══════════════════════════════════════
const db = require("../config/db");

exports.getLabResults = (req, res) => {
  db.query("SELECT * FROM lab_results ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

exports.addLabResult = (req, res) => {
  const { patient_name, test_name, result, status, priority, ready, date } = req.body;
  db.query(
    "INSERT INTO lab_results (patient_name, test_name, result, status, priority, ready, date) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [patient_name, test_name, result || '', status || 'normal', priority || 'normal', ready || false, date || new Date()],
    (err, r) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم إضافة التحليل", id: r.insertId });
    }
  );
};

exports.updateLabResult = (req, res) => {
  const { result, status, ready } = req.body;
  db.query("UPDATE lab_results SET result=?, status=?, ready=? WHERE id=?",
    [result, status, ready, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "✅ تم تحديث التحليل" });
    }
  );
};

// ═══════════════════════════════════════
// pharmacyController.js
// ═══════════════════════════════════════
exports.getPharmacy = (req, res) => {
  db.query("SELECT * FROM pharmacy ORDER BY stock ASC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

exports.addMedicine = (req, res) => {
  const { name, category, stock, min_stock, unit, price } = req.body;
  if (!name) return res.status(400).json({ message: "اسم الدواء مطلوب" });
  db.query(
    "INSERT INTO pharmacy (name, category, stock, min_stock, unit, price) VALUES (?, ?, ?, ?, ?, ?)",
    [name, category, stock || 0, min_stock || 100, unit || 'قرص', price || 0],
    (err, r) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم إضافة الدواء", id: r.insertId });
    }
  );
};

exports.updateStock = (req, res) => {
  const { stock } = req.body;
  db.query("UPDATE pharmacy SET stock=? WHERE id=?", [stock, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "✅ تم تحديث المخزون" });
  });
};

// ═══════════════════════════════════════
// surgeriesController.js
// ═══════════════════════════════════════
exports.getSurgeries = (req, res) => {
  db.query("SELECT * FROM surgeries ORDER BY start_time DESC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

exports.addSurgery = (req, res) => {
  const { patient_name, doctor_name, room, type, status, start_time, duration_hours } = req.body;
  db.query(
    "INSERT INTO surgeries (patient_name, doctor_name, room, type, status, start_time, duration_hours) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [patient_name, doctor_name, room, type, status || 'scheduled', start_time, duration_hours],
    (err, r) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم جدولة العملية", id: r.insertId });
    }
  );
};

exports.updateSurgery = (req, res) => {
  const { status } = req.body;
  db.query("UPDATE surgeries SET status=? WHERE id=?", [status, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "✅ تم تحديث حالة العملية" });
  });
};

// ═══════════════════════════════════════
// billingController.js
// ═══════════════════════════════════════
exports.getBilling = (req, res) => {
  db.query("SELECT * FROM billing ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

exports.addInvoice = (req, res) => {
  const { patient_name, invoice_no, amount, status, date } = req.body;
  db.query(
    "INSERT INTO billing (patient_name, invoice_no, amount, status, date) VALUES (?, ?, ?, ?, ?)",
    [patient_name, invoice_no, amount, status || 'pending', date || new Date()],
    (err, r) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم إضافة الفاتورة", id: r.insertId });
    }
  );
};

exports.updateInvoice = (req, res) => {
  const { status } = req.body;
  db.query("UPDATE billing SET status=? WHERE id=?", [status, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "✅ تم تحديث الفاتورة" });
  });
};

exports.getBillingStats = (req, res) => {
  db.query(`
    SELECT
      SUM(amount) as total,
      SUM(CASE WHEN status='paid' THEN amount ELSE 0 END) as paid,
      SUM(CASE WHEN status='pending' THEN amount ELSE 0 END) as pending,
      COUNT(*) as total_invoices,
      COUNT(CASE WHEN status='paid' THEN 1 END) as paid_count,
      COUNT(CASE WHEN status='pending' THEN 1 END) as pending_count
    FROM billing
  `, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results[0]);
  });
};
