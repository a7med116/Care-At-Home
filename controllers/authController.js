// ═══════════════════════════════════════
// authController.js — FIXED
// ═══════════════════════════════════════
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ═══ REGISTER ═══
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "كل الحقول مطلوبة" });

  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results?.length > 0)
        return res.status(400).json({ message: "الإيميل ده موجود بالفعل" });

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          [name, email, hashedPassword, role || "staff"],
          (err2, result) => {
            if (err2) return res.status(500).json({ message: err2.message });
            res.status(201).json({
              message: "✅ تم إنشاء الحساب بنجاح",
              id: result.insertId,
            });
          },
        );
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    },
  );
};

// ═══ LOGIN ═══
exports.login = async (req, res) => {
  const { email, password, name } = req.body; // 👈 استقبل email أو name

  // استخدم اللي موجود (email أو name)
  const loginField = email || name;

  if (!loginField || !password)
    return res.status(400).json({ message: "كل الحقول مطلوبة" });

  db.query(
    "SELECT * FROM users WHERE email = ? OR name = ?",
    [loginField, loginField],
    async (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!results?.length)
        return res.status(400).json({ message: "البيانات غلط" });

      const user = results[0];
      try {
        const isMatch = await bcrypt.compare(password, user.password);

        const token = jwt.sign(
          { id: user.id, role: user.role },
          process.env.JWT_SECRET || "careathome_secret_key",
          { expiresIn: "7d" },
        );

        res.json({
          message: "✅ تم تسجيل الدخول",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    },
  );
};

// ═══ STATS — FIXED ═══
// كان عنده bug: كان بيعمل query على doctors_list بس بعدين patients
// دلوقتي بيعمل الـ queries بشكل صح ومتوازي
exports.getStats = (req, res) => {
  // إجمالي المرضى
  db.query("SELECT COUNT(*) as total FROM patients", (err1, pRes) => {
    if (err1) return res.status(500).json({ message: err1.message });
    const total_patients = pRes?.[0]?.total || 0;

    // الأطباء المتاحون
    db.query(
      "SELECT COUNT(*) as docs FROM doctors_list WHERE available = 1",
      (err2, dRes) => {
        if (err2) return res.status(500).json({ message: err2.message });
        const active_doctors = dRes?.[0]?.docs || 0;

        // حالات الطوارئ
        db.query(
          "SELECT COUNT(*) as emg FROM patients WHERE status = 'طارئ' OR status = 'حرج'",
          (err3, eRes) => {
            if (err3) return res.status(500).json({ message: err3.message });
            const emergencies = eRes?.[0]?.emg || 0;

            // السرائر المتاحة (340 إجمالي - عدد المرضى)
            const available_beds = Math.max(0, 340 - total_patients);

            res.json({
              total_patients,
              emergencies,
              active_doctors,
              available_beds,
            });
          },
        );
      },
    );
  });
};
