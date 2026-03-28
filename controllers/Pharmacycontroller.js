// ═══════════════════════════════════════
// Pharmacycontroller.js — FIXED
// ═══════════════════════════════════════
const db = require("../config/db");

// ═══ GET ALL ═══
exports.getPharmacy = (req, res) => {
  db.query("SELECT * FROM pharmacy ORDER BY stock ASC", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// ═══ ADD ═══
exports.addMedicine = (req, res) => {
  const { name, category, stock, min_stock, unit, price } = req.body;
  if (!name) return res.status(400).json({ message: "اسم الدواء مطلوب" });

  db.query(
    `INSERT INTO pharmacy (name, category, stock, min_stock, unit, price)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      name,
      category || null,
      stock || 0,
      min_stock || 100,
      unit || "قرص",
      price || 0,
    ],
    (err, r) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: "✅ تم إضافة الدواء", id: r.insertId });
    },
  );
};

// ═══ UPDATE — FIXED ═══
// بيجيب الداتا القديمة الأول وبيسيب أي حقل مجاش في الـ request زي ما هو
exports.updateStock = (req, res) => {
  const { name, category, stock, min_stock, unit, price } = req.body;
  const id = req.params.id;

  db.query("SELECT * FROM pharmacy WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!rows.length)
      return res.status(404).json({ message: "الدواء غير موجود" });

    const old = rows[0];

    const updatedName = name !== undefined ? name : old.name;
    const updatedCategory = category !== undefined ? category : old.category;
    const updatedStock = stock !== undefined ? stock : old.stock;
    const updatedMinStock = min_stock !== undefined ? min_stock : old.min_stock;
    const updatedUnit = unit !== undefined ? unit : old.unit;
    const updatedPrice = price !== undefined ? price : old.price;

    db.query(
      `UPDATE pharmacy
       SET name=?, category=?, stock=?, min_stock=?, unit=?, price=?
       WHERE id=?`,
      [
        updatedName,
        updatedCategory,
        updatedStock,
        updatedMinStock,
        updatedUnit,
        updatedPrice,
        id,
      ],
      (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({ message: "✅ تم تحديث الدواء" });
      },
    );
  });
};
