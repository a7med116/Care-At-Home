// ═══════════════════════════════════════
// Care At Home — Complete Dashboard Script (FIXED)
// ═══════════════════════════════════════
const API = "/api"; // ✅ Fixed for Railway deployment

// ═══ DEFAULT DATA (للعرض فقط لو السيرفر وقف) ═══
const defaultPatients = [];
const defaultDoctors = [];
const defaultAppointments = [];
const defaultSurgeries = [];
const defaultLab = [];
const defaultPharmacy = [];
const defaultBilling = [];

const depts = [
  { name: "الطوارئ", icon: "🚨", beds: 30, occ: 28 },
  { name: "القلب والأوعية", icon: "❤️", beds: 40, occ: 35 },
  { name: "العناية المركزة", icon: "🏥", beds: 20, occ: 18 },
  { name: "الجراحة", icon: "🔬", beds: 50, occ: 38 },
  { name: "الأطفال", icon: "👶", beds: 35, occ: 22 },
  { name: "الباطنة", icon: "💊", beds: 45, occ: 40 },
];

// ═══ STATE ═══
let currentFilter = "all",
  currentDoctorFilter = "all",
  currentApptFilter = "all";
let currentSurgeryFilter = "all",
  currentLabFilter = "all",
  currentPharmaFilter = "all";
let allPatientsData = [],
  allDoctorsData = [],
  allAppointmentsData = [];
let allSurgeriesData = [],
  allLabData = [],
  allPharmacyData = [],
  allBillingData = [];
let currentPatient = null,
  currentDoctor = null,
  currentAppointment = null;
let currentSurgery = null,
  currentLab = null,
  currentMedicine = null;
let editDoctorAvail = true,
  editLabReady = true;

// ═══ العدادات ═══
function updatePatientCount(n) {
  document.getElementById("k1").textContent = n.toLocaleString("ar");
  const b = document.getElementById("patients-badge");
  if (b) b.textContent = n;
  const s = document.getElementById("patients-sub");
  if (s) s.textContent = `${n} مريض مسجل`;
}
function updateDoctorCount(n) {
  document.getElementById("k3").textContent = n;
  const b = document.getElementById("doctors-badge");
  if (b) b.textContent = n;
  const s = document.getElementById("doctors-sub");
  if (s) s.textContent = `${n} طبيب مسجل`;
}
function updateApptCount(n) {
  const b = document.getElementById("appt-badge");
  if (b) b.textContent = n;
  const s = document.getElementById("appt-sub");
  if (s) s.textContent = `${n} موعد مسجل`;
}
function updateSurgeryCount(list) {
  const b = document.getElementById("surgery-badge");
  if (b) b.textContent = list.length;
  const s = document.getElementById("surgery-sub");
  if (s) s.textContent = `${list.length} عملية مسجلة`;
  const on = list.filter((x) => x.status === "ongoing").length;
  const sc = list.filter((x) => x.status === "scheduled").length;
  const cp = list.filter((x) => x.status === "completed").length;
  const e1 = document.getElementById("surg-ongoing");
  const e2 = document.getElementById("surg-scheduled");
  const e3 = document.getElementById("surg-completed");
  if (e1) e1.textContent = on;
  if (e2) e2.textContent = sc;
  if (e3) e3.textContent = cp;
}
function updateLabCount(list) {
  const b = document.getElementById("lab-badge");
  if (b) b.textContent = list.length;
  const s = document.getElementById("lab-sub");
  if (s) s.textContent = `${list.length} طلب تحليل`;
  const e1 = document.getElementById("lab-total");
  const e2 = document.getElementById("lab-ready");
  const e3 = document.getElementById("lab-processing");
  const e4 = document.getElementById("lab-urgent");
  if (e1) e1.textContent = list.length;
  if (e2) e2.textContent = list.filter((x) => x.ready).length;
  if (e3) e3.textContent = list.filter((x) => !x.ready).length;
  if (e4) e4.textContent = list.filter((x) => x.priority === "urgent").length;
}
function updatePharmaCount(list) {
  const b = document.getElementById("pharma-badge");
  if (b) b.textContent = list.length;
  const s = document.getElementById("pharma-sub");
  if (s) s.textContent = `${list.length} صنف دوائي`;
  const ok = list.filter((x) => x.stock >= x.min_stock).length;
  const low = list.filter((x) => x.stock < x.min_stock && x.stock > 0).length;
  const empty = list.filter((x) => x.stock <= 0).length;
  const e1 = document.getElementById("pharma-total");
  const e2 = document.getElementById("pharma-ok");
  const e3 = document.getElementById("pharma-low");
  const e4 = document.getElementById("pharma-empty");
  if (e1) e1.textContent = list.length;
  if (e2) e2.textContent = ok;
  if (e3) e3.textContent = low;
  if (e4) e4.textContent = empty;
}

// تحقق من تسجيل الدخول
const cahUser = localStorage.getItem("cah_user");
if (cahUser) {
  try {
    const u = JSON.parse(cahUser);
    const n = document.querySelector(".user-name");
    const r = document.querySelector(".user-role");
    if (n) n.textContent = u.name || "مدير النظام";
    if (r) r.textContent = u.email || "admin@careathome.com";
  } catch (e) {}
}

// ═══ FETCH HELPERS ═══
async function fetchAPI(ep) {
  try {
    const token = localStorage.getItem("cah_token");
    const res = await fetch(`${API}/${ep}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) return await res.json();
    console.warn(`fetchAPI ${ep} → HTTP ${res.status}`);
  } catch (e) {
    console.error(`fetchAPI ${ep} → ${e.message}`);
  }
  return null;
}
async function postAPI(ep, body) {
  try {
    const token = localStorage.getItem("cah_token");
    const res = await fetch(`${API}/${ep}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (e) {
    return { message: e.message };
  }
}
async function putAPI(ep, body) {
  try {
    const token = localStorage.getItem("cah_token");
    const res = await fetch(`${API}/${ep}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (e) {
    return { message: e.message };
  }
}
async function deleteAPI(ep) {
  try {
    const token = localStorage.getItem("cah_token");
    const res = await fetch(`${API}/${ep}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (e) {
    return { message: e.message };
  }
}

// ═══ LOAD DATA — كل function بتجيب من DB فقط ═══

async function loadDashboardStats() {
  const data = await fetchAPI("auth/stats");
  if (data) {
    if (data.emergencies) animateCount("k2", data.emergencies);
    if (data.available_beds) animateCount("k4", data.available_beds);
  }
}

// ═══ المرضى ═══
async function loadPatientsFromDB() {
  const data = await fetchAPI("patients");
  if (data && Array.isArray(data)) {
    const colors = [
      "av-teal",
      "av-blue",
      "av-amber",
      "av-red",
      "av-purple",
      "av-green",
    ];
    const mapped = data.map((p, i) => ({
      id: `P-${String(p.id).padStart(3, "0")}`,
      dbId: p.id,
      name: p.name,
      age: p.age || "--",
      room: p.room || "--",
      doctor: p.doctor || "--",
      status: p.status || "مستقر",
      diag: p.diagnosis || "--",
      blood: p.blood_type || "--",
      phone: p.phone || "",
      time: p.created_at
        ? new Date(p.created_at).toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--",
      color: colors[i % colors.length],
    }));
    allPatientsData = mapped;
    renderPatients(mapped);
    updatePatientCount(mapped.length);
  } else {
    allPatientsData = [];
    renderPatients([]);
    updatePatientCount(0);
    toast("تعذر الاتصال بالسيرفر", "تأكد إن XAMPP شغّال", "❌");
  }
}

// ═══ الأطباء ═══
async function loadDoctorsFromDB() {
  const data = await fetchAPI("doctors");
  if (data && Array.isArray(data) && data.length > 0) {
    allDoctorsData = data;
    renderDoctors(data);
    updateDoctorCount(data.length);
    updateDoctorSelects(data);
    renderTopDocs(data);
  } else {
    allDoctorsData = [];
    renderDoctors([]);
    updateDoctorCount(0);
  }
}

// ═══ المواعيد ═══
async function loadAppointmentsFromDB() {
  const data = await fetchAPI("appointments");
  if (data && Array.isArray(data)) {
    allAppointmentsData = data;
    updateApptCount(data.length);
    renderAppointments(data);
    renderCalendar(data);
  } else {
    allAppointmentsData = [];
    updateApptCount(0);
    renderAppointments([]);
  }
}

// ═══ العمليات ═══
async function loadSurgeriesFromDB() {
  const data = await fetchAPI("surgeries");
  if (data && Array.isArray(data)) {
    allSurgeriesData = data;
  } else {
    allSurgeriesData = [];
  }
  updateSurgeryCount(allSurgeriesData);
  renderSurgeries(allSurgeriesData);
}

// ═══ المختبر ═══
async function loadLabFromDB() {
  const data = await fetchAPI("lab");
  if (data && Array.isArray(data)) {
    allLabData = data;
  } else {
    allLabData = [];
  }
  updateLabCount(allLabData);
  renderLab(allLabData);
}

// ═══ الصيدلية ═══
async function loadPharmacyFromDB() {
  const data = await fetchAPI("pharmacy");
  if (data && Array.isArray(data)) {
    allPharmacyData = data;
  } else {
    allPharmacyData = [];
  }
  updatePharmaCount(allPharmacyData);
  renderPharmacy(allPharmacyData);
}

// ═══ الفواتير ═══
async function loadBillingFromDB() {
  const data = await fetchAPI("billing");
  if (data && Array.isArray(data)) {
    allBillingData = data;
  } else {
    allBillingData = [];
  }
  renderBilling(allBillingData);
}

// ═══ تحديث قوائم الأطباء في كل الـ selects ═══
function updateDoctorSelects(docs) {
  const ids = [
    "patient-doctor-select",
    "appt-doctor-select",
    "edit-doctor",
    "edit-appt-doctor",
    "surg-doctor",
    "edit-surg-doctor",
  ];
  ids.forEach((id) => {
    const sel = document.getElementById(id);
    if (!sel) return;
    sel.innerHTML = docs.map((d) => `<option>${d.name}</option>`).join("");
  });
}

// ═══════════════════════════════════════════════
// RENDER FUNCTIONS
// ═══════════════════════════════════════════════

// ═══ RENDER: المرضى ═══
const statusMap = {
  مستقر: "badge-green",
  متحسن: "badge-teal",
  حرج: "badge-red",
  طارئ: "badge-red",
};

function renderPatients(list) {
  document.getElementById("patient-tbody").innerHTML =
    list.length === 0
      ? `<tr><td colspan="10" style="text-align:center;color:var(--text3);padding:30px">
           لا توجد بيانات — تأكد إن السيرفر شغّال
         </td></tr>`
      : list
          .map(
            (p) =>
              `<tr onclick="rowClick(this)">
            <td><div style="display:flex;align-items:center;gap:10px">
              <div class="av ${p.color}">${p.name.charAt(0)}</div>
              <div style="font-weight:600;color:var(--text);font-size:13px">${p.name}</div>
            </div></td>
            <td><code>${p.id}</code></td>
            <td>${p.age} سنة</td>
            <td><strong style="color:var(--teal)">${p.room}</strong></td>
            <td>${p.doctor}</td>
            <td style="color:var(--text2)">${p.diag}</td>
            <td><span class="badge badge-red" style="background:rgba(255,77,109,.08)">${p.blood}</span></td>
            <td style="font-family:var(--mono);font-size:11px;color:var(--text3)">${p.time}</td>
            <td><span class="badge ${statusMap[p.status] || "badge-gray"}">
              <span class="status-dot"></span>${p.status}
            </span></td>
            <td><div style="display:flex;gap:6px">
              <button class="btn btn-ghost btn-xs"
                onclick="event.stopPropagation();viewPatient('${p.dbId || ""}','${p.id}')">👁 عرض</button>
              <button class="btn btn-ghost btn-xs"
                onclick="event.stopPropagation();editPatientById('${p.dbId || ""}','${p.id}')">✏️ تعديل</button>
            </div></td>
          </tr>`,
          )
          .join("");
}

function getPatientObj(dbId, localId) {
  return (
    allPatientsData.find(
      (x) => String(x.dbId) === String(dbId) || x.id === localId,
    ) || null
  );
}
function viewPatient(dbId, localId) {
  const p = getPatientObj(dbId, localId);
  if (p) _viewPatient(p);
}
function editPatientById(dbId, localId) {
  const p = getPatientObj(dbId, localId);
  if (p) editPatient(p);
}

function filterPatients() {
  const s = document.getElementById("patient-search").value;
  renderPatients(
    allPatientsData.filter(
      (p) =>
        (currentFilter === "all" || p.status === currentFilter) &&
        (p.name.includes(s) || p.id.includes(s) || p.diag.includes(s)),
    ),
  );
}
function setFilter(el, val) {
  document
    .querySelectorAll("#sec-patients .filter-chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  currentFilter = val;
  filterPatients();
}
function rowClick(row) {
  row.style.background = "var(--glass2)";
  setTimeout(() => (row.style.background = ""), 300);
}

// ═══ RENDER: الأطباء ═══
const docColors = [
  "av-teal",
  "av-blue",
  "av-purple",
  "av-amber",
  "av-teal",
  "av-blue",
];
const docGradients = [
  "#00d4c8",
  "#4f8ef7",
  "#a78bfa",
  "#f59e0b",
  "#39d98a",
  "#f472b6",
];

function renderDoctors(list) {
  if (!list.length) {
    document.getElementById("doctors-grid").innerHTML =
      `<div style="grid-column:1/-1;text-align:center;color:var(--text3);padding:40px">
         لا يوجد أطباء — تأكد إن السيرفر شغّال
       </div>`;
    return;
  }
  document.getElementById("doctors-grid").innerHTML = list
    .map(
      (d, i) =>
        `<div class="doc-card" style="position:relative;cursor:pointer"
      onclick="viewDoctor(${d.id})">
      <span class="doc-avail" style="position:absolute;top:14px;left:14px">
        <span class="badge ${d.available ? "badge-green" : "badge-gray"}">
          ${d.available ? "● متاح" : "○ غير متاح"}
        </span>
      </span>
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;margin-top:10px">
        <div class="av av-lg ${docColors[i % docColors.length]}"
          style="background:linear-gradient(135deg,${docGradients[i % docGradients.length]},#6366f1)">
          ${d.name.charAt(0)}
        </div>
        <div>
          <div style="font-weight:800;font-size:14px;color:var(--text)">${d.name}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:3px">${d.specialty || "--"}</div>
          <div style="margin-top:6px;font-size:13px;color:var(--amber)">⭐ ${d.rating || 5.0}</div>
        </div>
      </div>
      <div class="doc-stat-row">
        <div class="doc-stat-box"><div class="doc-stat-v">${d.experience || 0}</div><div class="doc-stat-l">سنة خبرة</div></div>
        <div class="doc-stat-box"><div class="doc-stat-v">${d.operations || 0}</div><div class="doc-stat-l">عملية</div></div>
        <div class="doc-stat-box"><div class="doc-stat-v">${d.available ? "✅" : "❌"}</div><div class="doc-stat-l">الحالة</div></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center"
          onclick="event.stopPropagation();viewDoctor(${d.id})">👁 عرض</button>
        <button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center"
          onclick="event.stopPropagation();editDoctorById(${d.id})">✏️ تعديل</button>
      </div>
    </div>`,
    )
    .join("");
}

function filterDoctors() {
  const s = document.getElementById("doctor-search").value;
  renderDoctors(
    allDoctorsData.filter(
      (d) =>
        (currentDoctorFilter === "all" ||
          (currentDoctorFilter === "متاح" && d.available) ||
          (currentDoctorFilter === "غير متاح" && !d.available) ||
          (d.specialty && d.specialty.includes(currentDoctorFilter))) &&
        (d.name.includes(s) || (d.specialty && d.specialty.includes(s))),
    ),
  );
}
function setDoctorFilter(el, val) {
  document
    .querySelectorAll("#sec-doctors .filter-chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  currentDoctorFilter = val;
  filterDoctors();
}

// ═══ RENDER: المواعيد ═══
function renderAppointments(list) {
  const filtered =
    currentApptFilter === "all"
      ? list
      : list.filter((a) => a.status === currentApptFilter);

  if (!filtered.length) {
    document.getElementById("appt-list").innerHTML =
      `<div style="text-align:center;color:var(--text3);padding:30px">لا توجد مواعيد</div>`;
    return;
  }
  const sb = {
    confirmed: "badge-green",
    pending: "badge-amber",
    cancelled: "badge-red",
  };
  const sl = { confirmed: "مؤكد", pending: "انتظار", cancelled: "ملغي" };
  const ac = [
    "av-teal",
    "av-blue",
    "av-amber",
    "av-purple",
    "av-green",
    "av-red",
  ];

  document.getElementById("appt-list").innerHTML = filtered
    .map((a, i) => {
      const gi = allAppointmentsData.indexOf(a);
      return `<div class="op-card" style="margin-bottom:10px;cursor:pointer;${a.status === "cancelled" ? "opacity:0.6" : ""}"
      onclick="viewAppointment(${gi})">
      <div class="op-time-block">
        <div class="op-time">${(a.time || "--").substring(0, 5)}</div>
        <div class="op-ampm">م</div>
      </div>
      <div style="width:1px;background:var(--border);align-self:stretch"></div>
      <div class="av av-sm ${ac[i % ac.length]}">${(a.patient_name || "م").charAt(0)}</div>
      <div style="flex:1">
        <div style="font-weight:700;font-size:13px;color:var(--text)">${a.patient_name || "مريض"}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">
          ${a.doctor_name || ""} • ${a.type || ""} • ${a.date || ""}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
        <span class="badge ${sb[a.status] || "badge-gray"}">${sl[a.status] || a.status}</span>
        <div style="display:flex;gap:4px" onclick="event.stopPropagation()">
          ${a.status !== "confirmed" && a.id ? `<button class="btn btn-ghost btn-xs" style="color:var(--green)" onclick="quickConfirm(${a.id},${gi})">✅</button>` : ""}
          ${a.status !== "cancelled" && a.id ? `<button class="btn btn-ghost btn-xs" style="color:var(--red)"   onclick="quickCancel(${a.id},${gi})">❌</button>` : ""}
        </div>
      </div>
    </div>`;
    })
    .join("");
}

function setApptFilter(el, val) {
  document
    .querySelectorAll("#sec-appointments .filter-chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  currentApptFilter = val;
  renderAppointments(allAppointmentsData);
}
function renderCalendar(appts) {
  const dates = new Set(
    appts
      .map((a) => (a.date ? new Date(a.date).getDate() : null))
      .filter(Boolean),
  );
  document.querySelectorAll(".cal-day:not(.empty)").forEach((d) => {
    const n = parseInt(d.textContent);
    if (dates.has(n) && !d.classList.contains("today"))
      d.classList.add("has-appt");
    else if (!dates.has(n) && !d.classList.contains("today"))
      d.classList.remove("has-appt");
  });
}

// ═══ RENDER: العمليات ═══
function renderSurgeries(list) {
  const filtered =
    currentSurgeryFilter === "all"
      ? list
      : list.filter((s) => s.status === currentSurgeryFilter);

  const smap = {
    ongoing: "badge-red",
    scheduled: "badge-amber",
    completed: "badge-green",
    cancelled: "badge-gray",
  };
  const slabel = {
    ongoing: "🔴 جارية",
    scheduled: "📅 مجدولة",
    completed: "✅ منتهية",
    cancelled: "❌ ملغية",
  };
  const el = document.getElementById("surgeries-list");
  if (!el) return;
  if (!filtered.length) {
    el.innerHTML = `<div style="text-align:center;color:var(--text3);padding:30px">لا توجد عمليات</div>`;
    return;
  }
  el.innerHTML = filtered
    .map(
      (s) =>
        `<div class="op-card" style="cursor:pointer;${s.status === "ongoing" ? "background:rgba(255,77,109,0.04);border-color:rgba(255,77,109,0.3)" : ""}"
      onclick="viewSurgery(${s.id})">
      <div style="text-align:center;min-width:56px">
        <div style="font-size:16px;font-weight:800;color:${s.status === "ongoing" ? "var(--red)" : s.status === "scheduled" ? "var(--amber)" : "var(--green)"}">
          ${s.room || "--"}
        </div>
        <div style="font-size:9px;color:var(--text3)">طابق 3</div>
      </div>
      <div style="flex:1">
        <div style="font-weight:700;font-size:13px;color:var(--text)">${s.type || "--"}</div>
        <div style="font-size:11px;color:var(--text3);margin-top:2px">${s.doctor_name || ""} • ${s.patient_name || ""}</div>
      </div>
      <div style="text-align:left;display:flex;flex-direction:column;align-items:flex-end;gap:6px">
        <span class="badge ${smap[s.status] || "badge-gray"}">${slabel[s.status] || s.status}</span>
        <div style="display:flex;gap:4px">
          <button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();viewSurgery(${s.id})">👁 عرض</button>
          <button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();editSurgeryById(${s.id})">✏️ تعديل</button>
        </div>
      </div>
    </div>`,
    )
    .join("");
}

function setSurgeryFilter(el, val) {
  document
    .querySelectorAll("#sec-surgery .filter-chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  currentSurgeryFilter = val;
  renderSurgeries(allSurgeriesData);
}

// ═══ RENDER: المختبر ═══
function renderLab(list) {
  const filtered =
    currentLabFilter === "all"
      ? list
      : currentLabFilter === "ready"
        ? list.filter((x) => x.ready)
        : currentLabFilter === "pending"
          ? list.filter((x) => !x.ready)
          : list.filter((x) => x.priority === "urgent");

  const el = document.getElementById("lab-tbody");
  if (!el) return;
  if (!filtered.length) {
    el.innerHTML = `<tr><td colspan="8" style="text-align:center;color:var(--text3);padding:30px">لا توجد نتائج</td></tr>`;
    return;
  }
  const sr = {
    normal: "badge-green",
    high: "badge-amber",
    low: "badge-amber",
    critical: "badge-red",
  };
  const pr = { normal: "badge-gray", urgent: "badge-red" };

  el.innerHTML = filtered
    .map(
      (l) =>
        `<tr style="cursor:pointer" onclick="viewLab(${l.id})">
      <td><code>L-${String(l.id).padStart(3, "0")}</code></td>
      <td><div style="display:flex;align-items:center;gap:8px">
        <div class="av av-sm av-teal">${(l.patient_name || "م").charAt(0)}</div>
        ${l.patient_name || "--"}
      </div></td>
      <td>${l.test_name || "--"}</td>
      <td>${l.date || "--"}</td>
      <td><span class="badge ${sr[l.status] || "badge-gray"}">${l.result || "—"}</span></td>
      <td><span class="badge ${pr[l.priority] || "badge-gray"}">${l.priority === "urgent" ? "⚡ عاجل" : "عادي"}</span></td>
      <td><span class="badge ${l.ready ? "badge-green" : "badge-amber"}">${l.ready ? "✓ جاهز" : "⏳ قيد المعالجة"}</span></td>
      <td><div style="display:flex;gap:6px">
        <button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();viewLab(${l.id})">👁 عرض</button>
        <button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();editLabById(${l.id})">✏️ تعديل</button>
      </div></td>
    </tr>`,
    )
    .join("");
}

function setLabFilter(el, val) {
  document
    .querySelectorAll("#sec-lab .filter-chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  currentLabFilter = val;
  renderLab(allLabData);
}

// ═══ RENDER: الصيدلية ═══
function renderPharmacy(list) {
  const filtered =
    currentPharmaFilter === "all"
      ? list
      : currentPharmaFilter === "empty"
        ? list.filter((m) => m.stock <= 0)
        : list.filter((m) => m.stock < m.min_stock);

  const el = document.getElementById("pharma-list");
  if (!el) return;
  if (!filtered.length) {
    el.innerHTML = `<div style="text-align:center;color:var(--text3);padding:20px">✅ لا توجد تنبيهات</div>`;
    return;
  }
  el.innerHTML = filtered
    .map((m) => {
      const empty = m.stock <= 0;
      const low = m.stock < m.min_stock && m.stock > 0;
      const color = empty
        ? "var(--red)"
        : low
          ? "var(--amber)"
          : "var(--green)";
      const pct = Math.min(
        100,
        Math.round((m.stock / (m.min_stock || 1)) * 100),
      );
      return `<div style="display:flex;flex-direction:column;gap:7px;padding:14px;background:var(--glass);border-radius:var(--r);border:1px solid ${empty ? "rgba(255,77,109,.3)" : "var(--border)"}">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="font-weight:700;font-size:13px;color:var(--text)">${m.name}</div>
        <span class="badge ${empty ? "badge-red" : low ? "badge-amber" : "badge-green"}">${empty ? "🔴 نفد" : low ? "⚠ منخفض" : "✅ كافٍ"}</span>
      </div>
      <div style="font-size:11px;color:var(--text3)">${m.category || ""} — ${m.stock} ${m.unit || ""} متبقي</div>
      <div class="stock-bar">
        <div class="stock-level"><div class="stock-fill" style="width:${pct}%;background:${color}"></div></div>
        <span class="stock-pct">${pct}%</span>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost btn-xs" onclick="viewMedicine(${m.id})">👁 عرض</button>
        <button class="btn btn-ghost btn-xs" onclick="editMedicineById(${m.id})">✏️ تعديل</button>
        <button class="btn btn-ghost btn-xs" style="margin-right:auto"
          onclick="toast('طلب توريد ${m.name}','جاري الإرسال','📦')">📦 طلب توريد</button>
      </div>
    </div>`;
    })
    .join("");
}

function setPharmaFilter(el, val) {
  document
    .querySelectorAll("#sec-pharmacy .filter-chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  currentPharmaFilter = val;
  renderPharmacy(allPharmacyData);
}

// ═══ RENDER: الفواتير ═══
function renderBilling(list) {
  const el = document.getElementById("billing-list");
  if (!el) return;
  const sb = {
    paid: "badge-green",
    partial: "badge-amber",
    pending: "badge-red",
    cancelled: "badge-gray",
  };
  const sl = {
    paid: "مدفوعة",
    partial: "جزئي",
    pending: "معلقة",
    cancelled: "ملغية",
  };
  let total = 0,
    paid = 0,
    pending = 0,
    paidC = 0,
    pendC = 0;
  list.forEach((b) => {
    const a = parseFloat(b.amount || 0);
    total += a;
    if (b.status === "paid") {
      paid += a;
      paidC++;
    }
    if (b.status === "pending") {
      pending += a;
      pendC++;
    }
  });
  el.innerHTML =
    list
      .map(
        (b) =>
          `<div class="bill-row">
        <div>
          <div style="font-weight:600;font-size:13px;color:var(--text)">${b.patient_name}</div>
          <div style="font-size:11px;color:var(--text3)">رقم: ${b.invoice_no}</div>
        </div>
        <div style="text-align:left">
          <div style="font-weight:800;color:var(--teal)">${parseFloat(b.amount || 0).toLocaleString()} ر.س</div>
          <span class="badge ${sb[b.status] || "badge-gray"}">${sl[b.status] || b.status}</span>
        </div>
      </div>`,
      )
      .join("") +
    `<div class="bill-total">
       <div style="font-weight:700;color:var(--text)">إجمالي الشهر</div>
       <div style="font-size:20px;font-weight:800;color:var(--teal)">${total.toLocaleString()} ر.س</div>
     </div>`;
  const e1 = document.getElementById("billing-paid-count");
  const e2 = document.getElementById("billing-pending-count");
  const e3 = document.getElementById("billing-pending");
  if (e1) e1.textContent = paidC;
  if (e2) e2.textContent = pendC;
  if (e3) e3.textContent = Math.round(pending).toLocaleString();
}

// ═══ RENDER: الأقسام ═══
function renderDeptStats() {
  const el = document.getElementById("dept-stats");
  if (!el) return;
  el.innerHTML = depts
    .map((d) => {
      const pct = Math.round((d.occ / d.beds) * 100);
      const color =
        pct > 90 ? "var(--red)" : pct > 70 ? "var(--amber)" : "var(--teal)";
      return `<div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span style="font-size:13px;font-weight:600;color:var(--text)">${d.icon} ${d.name}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:11px;color:var(--text3)">${d.occ}/${d.beds} سرير</span>
          <span style="font-size:11px;font-weight:800;color:${color}">${pct}%</span>
        </div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
    })
    .join("");
}

// ═══ RENDER: أفضل الأطباء ═══
function renderTopDocs(docs) {
  const el = document.getElementById("top-docs");
  if (!el) return;
  el.innerHTML = docs
    .slice(0, 5)
    .map(
      (d, i) =>
        `<div style="text-align:center;padding:16px;background:var(--glass);border-radius:var(--r);border:1px solid var(--border)">
      <div style="font-size:20px;margin-bottom:8px">${["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][i]}</div>
      <div class="av ${docColors[i % docColors.length]}" style="width:44px;height:44px;font-size:14px;margin:0 auto 10px">
        ${d.name.charAt(0)}
      </div>
      <div style="font-weight:700;font-size:12px;color:var(--text)">${d.name}</div>
      <div style="font-size:10px;color:var(--text3);margin:4px 0">${(d.specialty || "").split(" ")[0]}</div>
      <div style="color:var(--amber);font-size:13px;font-weight:800">⭐ ${d.rating || 5.0}</div>
    </div>`,
    )
    .join("");
}

// ═══════════════════════════════════════════════
// STATUS HELPER
// ═══════════════════════════════════════════════
function selectStatusIn(el, modalId) {
  el.closest(".status-options")
    .querySelectorAll(".status-option")
    .forEach((o) => o.classList.remove("selected"));
  el.classList.add("selected");
}

// ═══════════════════════════════════════════════
// VIEW / EDIT PATIENT
// ═══════════════════════════════════════════════
function _viewPatient(p) {
  currentPatient = p;
  const sc = {
    مستقر: "#39d98a",
    متحسن: "#4f8ef7",
    حرج: "#ff4d6d",
    طارئ: "#ff4d6d",
  };
  document.getElementById("view-avatar").textContent = p.name.charAt(0);
  document.getElementById("view-avatar").style.background =
    `linear-gradient(135deg,${sc[p.status] || "#00d4c8"},#6366f1)`;
  document.getElementById("view-name").textContent = p.name;
  document.getElementById("view-sub").textContent = `${p.id} • ${p.room}`;
  document.getElementById("view-age").textContent =
    p.age !== "--" ? `${p.age} سنة` : "--";
  document.getElementById("view-blood").textContent = p.blood;
  document.getElementById("view-room").textContent = p.room;
  document.getElementById("view-doctor").textContent = p.doctor;
  document.getElementById("view-diag").textContent = p.diag;
  document.getElementById("view-time").textContent = p.time;
  document.getElementById("view-status").innerHTML =
    `<span class="badge ${statusMap[p.status] || "badge-gray"}"><span class="status-dot"></span>${p.status}</span>`;
  openModal("modal-view-patient");
}

function switchToEdit() {
  closeModal("modal-view-patient");
  editPatient(currentPatient);
}

function editPatient(p) {
  currentPatient = p;
  document.getElementById("edit-avatar").textContent = p.name.charAt(0);
  document.getElementById("edit-name-display").textContent = p.name;
  document.getElementById("edit-sub-display").textContent = p.id;
  document.getElementById("edit-name").value = p.name;
  document.getElementById("edit-room").value = p.room !== "--" ? p.room : "";
  document.getElementById("edit-diag").value = p.diag !== "--" ? p.diag : "";
  Array.from(document.getElementById("edit-doctor").options).forEach(
    (o) => (o.selected = o.value === p.doctor),
  );
  document
    .querySelectorAll("#modal-edit-patient .status-option")
    .forEach((o) => o.classList.toggle("selected", o.dataset.val === p.status));
  openModal("modal-edit-patient");
}

async function saveEdit() {
  const name = document.getElementById("edit-name").value.trim();
  const room = document.getElementById("edit-room").value.trim();
  const doctor = document.getElementById("edit-doctor").value;
  const diag = document.getElementById("edit-diag").value.trim();
  const statusEl = document.querySelector(
    "#modal-edit-patient .status-option.selected",
  );
  const status = statusEl ? statusEl.dataset.val : currentPatient.status;

  if (!name) {
    toast("الاسم مطلوب", "", "⚠️");
    return;
  }

  if (currentPatient.dbId) {
    const res = await putAPI(`patients/${currentPatient.dbId}`, {
      name,
      room: room || "--",
      doctor,
      diagnosis: diag || "--",
      status,
    });
    if (res && !res.message?.includes("خطأ")) {
      closeModal("modal-edit-patient");
      toast(`تم تحديث بيانات ${name}`, `الحالة: ${status}`, "✅");
      loadPatientsFromDB();
      return;
    } else {
      toast(res?.message || "خطأ في الحفظ", "تأكد إن السيرفر شغّال", "❌");
      return;
    }
  }

  toast("لا يمكن تعديل مريض بدون ID", "", "⚠️");
}

// ═══════════════════════════════════════════════
// VIEW / EDIT DOCTOR
// ═══════════════════════════════════════════════
function viewDoctor(id) {
  const d = allDoctorsData.find((x) => x.id == id);
  if (!d) return;
  currentDoctor = d;
  const dc = ["#00d4c8", "#4f8ef7", "#a78bfa", "#f59e0b", "#39d98a", "#f472b6"];
  const idx = allDoctorsData.indexOf(d);
  document.getElementById("vd-avatar").textContent = d.name.charAt(0);
  document.getElementById("vd-avatar").style.background =
    `linear-gradient(135deg,${dc[idx % dc.length]},#6366f1)`;
  document.getElementById("vd-name").textContent = d.name;
  document.getElementById("vd-spec").textContent = d.specialty || "--";
  document.getElementById("vd-rating").textContent = `⭐ ${d.rating || 5.0}`;
  document.getElementById("vd-exp").textContent = `${d.experience || 0} سنة`;
  document.getElementById("vd-ops").textContent = `${d.operations || 0} عملية`;
  document.getElementById("vd-phone").textContent = d.phone || "غير محدد";
  document.getElementById("vd-email").textContent = d.email || "غير محدد";
  document.getElementById("vd-avail").innerHTML = d.available
    ? `<span class="badge badge-green">● متاح الآن</span>`
    : `<span class="badge badge-gray">○ غير متاح</span>`;
  openModal("modal-view-doctor");
}

function switchToEditDoctor() {
  closeModal("modal-view-doctor");
  editDoctor(currentDoctor);
}
function bookApptForDoctor() {
  closeModal("modal-view-doctor");
  const sel = document.getElementById("appt-doctor-select");
  if (sel)
    Array.from(sel.options).forEach(
      (o) => (o.selected = o.value === currentDoctor.name),
    );
  openModal("modal-appt");
}
function editDoctorById(id) {
  const d = allDoctorsData.find((x) => x.id == id);
  if (d) editDoctor(d);
}
function editDoctor(d) {
  currentDoctor = d;
  editDoctorAvail = d.available;
  document.getElementById("ed-avatar").textContent = d.name.charAt(0);
  document.getElementById("ed-name-display").textContent = d.name;
  document.getElementById("ed-spec-display").textContent = d.specialty || "--";
  document.getElementById("ed-name").value = d.name;
  document.getElementById("ed-exp").value = d.experience || 0;
  document.getElementById("ed-phone").value = d.phone || "";
  document.getElementById("ed-email").value = d.email || "";
  Array.from(document.getElementById("ed-specialty").options).forEach(
    (o) => (o.selected = o.value === d.specialty),
  );
  selectAvail(d.available);
  openModal("modal-edit-doctor");
}
function selectAvail(val) {
  editDoctorAvail = val;
  document.getElementById("avail-yes").className =
    "avail-option" + (val ? " selected-yes" : "");
  document.getElementById("avail-no").className =
    "avail-option" + (!val ? " selected-no" : "");
}
async function saveEditDoctor() {
  const name = document.getElementById("ed-name").value.trim();
  const specialty = document.getElementById("ed-specialty").value;
  const experience = document.getElementById("ed-exp").value;
  const phone = document.getElementById("ed-phone").value.trim();
  const email = document.getElementById("ed-email").value.trim();
  if (!name) {
    toast("اسم الطبيب مطلوب", "", "⚠️");
    return;
  }

  const res = await putAPI(`doctors/${currentDoctor.id}`, {
    name,
    specialty,
    experience,
    available: editDoctorAvail,
    phone,
    email,
  });
  if (res && !res.message?.includes("خطأ")) {
    closeModal("modal-edit-doctor");
    toast(
      `تم تحديث بيانات ${name}`,
      editDoctorAvail ? "الحالة: متاح" : "الحالة: غير متاح",
      "✅",
    );
    loadDoctorsFromDB();
  } else toast(res?.message || "خطأ في الحفظ", "تأكد إن السيرفر شغّال", "❌");
}
async function saveDoctor() {
  const name = document.getElementById("doc-name").value.trim();
  const specialty = document.getElementById("doc-specialty").value;
  const experience = document.getElementById("doc-exp").value;
  const phone = document.getElementById("doc-phone").value.trim();
  const email = document.getElementById("doc-email").value.trim();
  if (!name) {
    toast("اسم الطبيب مطلوب", "", "⚠️");
    return;
  }

  const res = await postAPI("doctors", {
    name,
    specialty,
    experience,
    phone,
    email,
  });
  if (res?.id || res?.message?.includes("✅")) {
    closeModal("modal-add-doctor");
    toast("تم إضافة الطبيب", name, "🩺");
    ["doc-name", "doc-exp", "doc-phone", "doc-email"].forEach(
      (id) => (document.getElementById(id).value = ""),
    );
    loadDoctorsFromDB();
  } else toast(res?.message || "تأكد إن السيرفر شغّال", "", "❌");
}

// ═══════════════════════════════════════════════
// APPOINTMENTS
// ═══════════════════════════════════════════════
function viewAppointment(idx) {
  const a = allAppointmentsData[idx];
  if (!a) return;
  currentAppointment = a;
  const sc = { confirmed: "#39d98a", pending: "#f59e0b", cancelled: "#ff4d6d" };
  const sl = { confirmed: "مؤكد", pending: "انتظار", cancelled: "ملغي" };
  const sb = {
    confirmed: "badge-green",
    pending: "badge-amber",
    cancelled: "badge-red",
  };
  document.getElementById("va-avatar").textContent = (
    a.patient_name || "م"
  ).charAt(0);
  document.getElementById("va-avatar").style.background =
    `linear-gradient(135deg,${sc[a.status] || "#00d4c8"},#6366f1)`;
  document.getElementById("va-name").textContent = a.patient_name || "مريض";
  document.getElementById("va-sub").textContent =
    `${a.doctor_name || ""} • ${a.type || ""}`;
  document.getElementById("va-date").textContent = a.date || "--";
  document.getElementById("va-time").textContent = (a.time || "--").substring(
    0,
    5,
  );
  document.getElementById("va-type").textContent = a.type || "--";
  document.getElementById("va-doctor").textContent = a.doctor_name || "--";
  document.getElementById("va-notes").textContent =
    a.notes || "لا توجد ملاحظات";
  document.getElementById("va-status").innerHTML =
    `<span class="badge ${sb[a.status] || "badge-gray"}">${sl[a.status] || a.status}</span>`;
  document.getElementById("va-confirm-btn").style.display =
    a.status !== "confirmed" && a.id ? "flex" : "none";
  document.getElementById("va-cancel-btn").style.display =
    a.status !== "cancelled" && a.id ? "flex" : "none";
  openModal("modal-view-appt");
}
async function quickConfirm(id, idx) {
  await updateApptStatus(id, "confirmed", allAppointmentsData[idx]);
}
async function quickCancel(id, idx) {
  await updateApptStatus(id, "cancelled", allAppointmentsData[idx]);
}
async function confirmAppt(id) {
  if (!id) {
    toast("لا يمكن تأكيد موعد بدون ID", "", "⚠️");
    return;
  }
  await updateApptStatus(id, "confirmed", currentAppointment);
  closeModal("modal-view-appt");
}
async function cancelAppt(id) {
  if (!id) {
    toast("لا يمكن إلغاء موعد بدون ID", "", "⚠️");
    return;
  }
  await updateApptStatus(id, "cancelled", currentAppointment);
  closeModal("modal-view-appt");
}
async function updateApptStatus(id, status, appt) {
  const res = await putAPI(`appointments/${id}`, {
    status,
    date: appt?.date,
    time: appt?.time,
    type: appt?.type,
    notes: appt?.notes || "",
  });
  if (res && !res.message?.includes("خطأ")) {
    toast(
      status === "confirmed" ? "تم تأكيد الموعد" : "تم إلغاء الموعد",
      "",
      status === "confirmed" ? "✅" : "❌",
    );
    loadAppointmentsFromDB();
  } else toast(res?.message || "خطأ", "", "❌");
}
function editAppointment() {
  const a = currentAppointment;
  closeModal("modal-view-appt");
  document.getElementById("ea-avatar").textContent = (
    a.patient_name || "م"
  ).charAt(0);
  document.getElementById("ea-name-display").textContent =
    a.patient_name || "مريض";
  document.getElementById("ea-sub-display").textContent = a.doctor_name || "--";
  document.getElementById("edit-appt-id").value = a.id || "";
  document.getElementById("edit-appt-patient").value = a.patient_name || "";
  document.getElementById("edit-appt-date").value = a.date || "";
  document.getElementById("edit-appt-time").value = (a.time || "").substring(
    0,
    5,
  );
  document.getElementById("edit-appt-notes").value = a.notes || "";
  Array.from(document.getElementById("edit-appt-type").options).forEach(
    (o) => (o.selected = o.value === a.type),
  );
  Array.from(document.getElementById("edit-appt-doctor").options).forEach(
    (o) => (o.selected = o.value === a.doctor_name),
  );
  document
    .querySelectorAll("#modal-edit-appt .status-option")
    .forEach((o) => o.classList.toggle("selected", o.dataset.val === a.status));
  openModal("modal-edit-appt");
}
async function saveEditAppt() {
  const id = document.getElementById("edit-appt-id").value;
  const patient_name = document
    .getElementById("edit-appt-patient")
    .value.trim();
  const date = document.getElementById("edit-appt-date").value;
  const time = document.getElementById("edit-appt-time").value;
  const type = document.getElementById("edit-appt-type").value;
  const notes = document.getElementById("edit-appt-notes").value;
  const doctor_name = document.getElementById("edit-appt-doctor").value;
  const statusEl = document.querySelector(
    "#modal-edit-appt .status-option.selected",
  );
  const status = statusEl ? statusEl.dataset.val : "pending";
  if (!patient_name || !date || !time) {
    toast("يرجى ملء الحقول المطلوبة", "", "⚠️");
    return;
  }
  if (!id) {
    toast("لا يمكن تعديل موعد بدون ID", "", "⚠️");
    return;
  }

  const res = await putAPI(`appointments/${id}`, {
    status,
    date,
    time,
    type,
    notes,
    doctor_name,
    patient_name,
  });
  if (res && !res.message?.includes("خطأ")) {
    closeModal("modal-edit-appt");
    toast("تم تحديث الموعد", "", "✅");
    loadAppointmentsFromDB();
  } else toast(res?.message || "خطأ", "", "❌");
}
async function saveAppt() {
  const patient_name = document
    .getElementById("appt-patient-name")
    ?.value.trim();
  const doctor_name = document.getElementById("appt-doctor-select")?.value;
  const date = document.getElementById("appt-date")?.value;
  const time = document.getElementById("appt-time")?.value;
  const type = document.getElementById("appt-type")?.value;
  const notes = document.getElementById("appt-notes")?.value;
  if (!patient_name) {
    toast("اسم المريض مطلوب", "", "⚠️");
    return;
  }
  if (!date || !time) {
    toast("التاريخ والوقت مطلوبان", "", "⚠️");
    return;
  }

  const res = await postAPI("appointments", {
    patient_name,
    doctor_name,
    date,
    time,
    type,
    notes,
  });
  if (res?.id || res?.message?.includes("✅")) {
    ["appt-patient-name", "appt-date", "appt-time", "appt-notes"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      },
    );
    closeModal("modal-appt");
    toast("تم تأكيد الموعد", "تم الحفظ في قاعدة البيانات", "📅");
    loadAppointmentsFromDB();
  } else toast(res?.message || "تأكد إن السيرفر شغّال", "", "❌");
}

// ═══════════════════════════════════════════════
// SAVE PATIENT
// ═══════════════════════════════════════════════
async function savePatient() {
  const inputs = document.querySelectorAll("#modal-patient input");
  const selects = document.querySelectorAll("#modal-patient select");
  const name = inputs[0]?.value.trim();
  const age = inputs[1]?.value;
  const blood = selects[0]?.value;
  const dept = selects[1]?.value;
  const diagnosis = inputs[2]?.value.trim();
  const phone = inputs[3]?.value.trim();
  const doctor = document.getElementById("patient-doctor-select")?.value;
  if (!name) {
    toast("اسم المريض مطلوب", "", "⚠️");
    return;
  }

  const res = await postAPI("patients", {
    name,
    age,
    room: dept,
    doctor,
    status: "مستقر",
    diagnosis,
    blood_type: blood,
    phone,
  });
  if (res?.id || res?.message?.includes("✅")) {
    closeModal("modal-patient");
    toast("تم قبول المريض", "تم الحفظ في قاعدة البيانات", "🏥");
    inputs.forEach((i) => {
      if (i.type !== "number") i.value = "";
      else i.value = "";
    });
    loadPatientsFromDB();
  } else toast(res?.message || "تأكد إن السيرفر شغّال", "", "❌");
}

// ═══════════════════════════════════════════════
// SURGERIES
// ═══════════════════════════════════════════════
function viewSurgery(id) {
  const s = allSurgeriesData.find((x) => x.id == id);
  if (!s) return;
  currentSurgery = s;
  const smap = {
    ongoing: "badge-red",
    scheduled: "badge-amber",
    completed: "badge-green",
    cancelled: "badge-gray",
  };
  const slabel = {
    ongoing: "🔴 جارية",
    scheduled: "📅 مجدولة",
    completed: "✅ منتهية",
    cancelled: "❌ ملغية",
  };
  document.getElementById("vs-avatar").textContent = s.room || "OR";
  document.getElementById("vs-avatar").style.background =
    `linear-gradient(135deg,${s.status === "ongoing" ? "#ff4d6d" : s.status === "completed" ? "#39d98a" : "#f59e0b"},#6366f1)`;
  document.getElementById("vs-type").textContent = s.type || "--";
  document.getElementById("vs-sub").textContent =
    `${s.patient_name || ""} • ${s.doctor_name || ""}`;
  document.getElementById("vs-room").textContent = s.room || "--";
  document.getElementById("vs-duration").textContent =
    `${s.duration_hours || 0} ساعة`;
  document.getElementById("vs-doctor").textContent = s.doctor_name || "--";
  document.getElementById("vs-patient").textContent = s.patient_name || "--";
  document.getElementById("vs-status").innerHTML =
    `<span class="badge ${smap[s.status] || "badge-gray"}">${slabel[s.status] || s.status}</span>`;
  openModal("modal-view-surgery");
}
function editSurgery() {
  closeModal("modal-view-surgery");
  editSurgeryDirect(currentSurgery);
}
function editSurgeryById(id) {
  const s = allSurgeriesData.find((x) => x.id == id);
  if (s) editSurgeryDirect(s);
}
function editSurgeryDirect(s) {
  if (!s) return;
  currentSurgery = s;
  document.getElementById("es-avatar").textContent = s.room || "OR";
  document.getElementById("es-name-display").textContent = s.type || "--";
  document.getElementById("es-sub-display").textContent =
    s.patient_name || "--";
  document.getElementById("edit-surg-id").value = s.id || "";
  document.getElementById("edit-surg-patient").value = s.patient_name || "";
  document.getElementById("edit-surg-type").value = s.type || "";
  document.getElementById("edit-surg-duration").value = s.duration_hours || "";
  Array.from(document.getElementById("edit-surg-room").options).forEach(
    (o) => (o.selected = o.value === s.room),
  );
  Array.from(document.getElementById("edit-surg-doctor").options).forEach(
    (o) => (o.selected = o.value === s.doctor_name),
  );
  const statusVal = s.status === "cancelled" ? "cancelled_s" : s.status;
  document
    .querySelectorAll("#modal-edit-surgery .status-option")
    .forEach((o) =>
      o.classList.toggle("selected", o.dataset.val === statusVal),
    );
  openModal("modal-edit-surgery");
}
async function saveEditSurgery() {
  const id = document.getElementById("edit-surg-id").value;
  const patient_name = document
    .getElementById("edit-surg-patient")
    .value.trim();
  const doctor_name = document.getElementById("edit-surg-doctor").value;
  const room = document.getElementById("edit-surg-room").value;
  const type = document.getElementById("edit-surg-type").value.trim();
  const duration_hours = document.getElementById("edit-surg-duration").value;
  const statusEl = document.querySelector(
    "#modal-edit-surgery .status-option.selected",
  );
  let status = statusEl ? statusEl.dataset.val : "scheduled";
  if (status === "cancelled_s") status = "cancelled";
  if (!id) {
    toast("لا يمكن تعديل عملية بدون ID", "", "⚠️");
    return;
  }

  const res = await putAPI(`surgeries/${id}`, {
    status,
    patient_name,
    doctor_name,
    room,
    type,
    duration_hours,
  });
  if (res && !res.message?.includes("خطأ")) {
    closeModal("modal-edit-surgery");
    toast("تم تحديث العملية", "", "✅");
    loadSurgeriesFromDB();
  } else toast(res?.message || "خطأ", "", "❌");
}
async function saveSurgery() {
  const patient_name = document.getElementById("surg-patient").value.trim();
  const doctor_name = document.getElementById("surg-doctor").value;
  const room = document.getElementById("surg-room").value;
  const type = document.getElementById("surg-type").value.trim();
  const duration_hours = document.getElementById("surg-duration").value;
  const date = document.getElementById("surg-date").value;
  const time = document.getElementById("surg-time").value;
  if (!patient_name || !type) {
    toast("يرجى ملء الحقول المطلوبة", "", "⚠️");
    return;
  }

  const start_time =
    date && time
      ? `${date} ${time}`
      : new Date().toISOString().slice(0, 19).replace("T", " ");
  const res = await postAPI("surgeries", {
    patient_name,
    doctor_name,
    room,
    type,
    status: "scheduled",
    start_time,
    duration_hours,
  });
  if (res?.id || res?.message?.includes("✅")) {
    closeModal("modal-add-surgery");
    toast("تم جدولة العملية", "", "🔬");
    [
      "surg-patient",
      "surg-type",
      "surg-duration",
      "surg-date",
      "surg-time",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    loadSurgeriesFromDB();
  } else toast(res?.message || "تأكد إن السيرفر شغّال", "", "❌");
}

// ═══════════════════════════════════════════════
// LAB
// ═══════════════════════════════════════════════
function viewLab(id) {
  const l = allLabData.find((x) => x.id == id);
  if (!l) return;
  currentLab = l;
  const pr = { normal: "عادي", urgent: "⚡ عاجل" };
  document.getElementById("vl-avatar").textContent = "🧪";
  document.getElementById("vl-test").textContent = l.test_name || "--";
  document.getElementById("vl-patient").textContent = l.patient_name || "--";
  document.getElementById("vl-date").textContent = l.date || "--";
  document.getElementById("vl-priority").innerHTML =
    `<span class="badge ${l.priority === "urgent" ? "badge-red" : "badge-gray"}">${pr[l.priority] || "عادي"}</span>`;
  document.getElementById("vl-result").textContent = l.result || "—";
  document.getElementById("vl-ready").innerHTML =
    `<span class="badge ${l.ready ? "badge-green" : "badge-amber"}">${l.ready ? "✓ جاهز" : "⏳ قيد المعالجة"}</span>`;
  openModal("modal-view-lab");
}
function editLabResult() {
  closeModal("modal-view-lab");
  editLabDirect(currentLab);
}
function editLabById(id) {
  const l = allLabData.find((x) => x.id == id);
  if (l) editLabDirect(l);
}
function editLabDirect(l) {
  if (!l) return;
  currentLab = l;
  document.getElementById("el-avatar").textContent = "🧪";
  document.getElementById("el-test-display").textContent = l.test_name || "--";
  document.getElementById("el-patient-display").textContent =
    l.patient_name || "--";
  document.getElementById("edit-lab-id").value = l.id || "";
  document.getElementById("edit-lab-result").value = l.result || "";
  editLabReady = !!l.ready;
  document
    .querySelectorAll("#modal-edit-lab .status-option")
    .forEach((o) => o.classList.toggle("selected", o.dataset.val === l.status));
  selectLabReady(!!l.ready);
  openModal("modal-edit-lab");
}
function selectLabReady(val) {
  editLabReady = val;
  document.getElementById("lab-ready-yes").className =
    "avail-option" + (val ? " selected-yes" : "");
  document.getElementById("lab-ready-no").className =
    "avail-option" + (!val ? " selected-no" : "");
}
async function saveEditLab() {
  const id = document.getElementById("edit-lab-id").value;
  const result = document.getElementById("edit-lab-result").value.trim();
  const statusEl = document.querySelector(
    "#modal-edit-lab .status-option.selected",
  );
  const status = statusEl ? statusEl.dataset.val : "normal";
  if (!id) {
    toast("لا يمكن تعديل تحليل بدون ID", "", "⚠️");
    return;
  }

  const res = await putAPI(`lab/${id}`, {
    result,
    status,
    ready: editLabReady,
  });
  if (res && !res.message?.includes("خطأ")) {
    closeModal("modal-edit-lab");
    toast("تم تحديث نتيجة التحليل", "", "🧪");
    loadLabFromDB();
  } else toast(res?.message || "خطأ", "", "❌");
}
async function saveLabResult() {
  const patient_name = document.getElementById("lab-patient").value.trim();
  const test_name = document.getElementById("lab-test").value;
  const priority = document.getElementById("lab-priority").value;
  const result = document.getElementById("lab-result").value.trim();
  const date = document.getElementById("lab-date").value;
  if (!patient_name) {
    toast("اسم المريض مطلوب", "", "⚠️");
    return;
  }

  const res = await postAPI("lab", {
    patient_name,
    test_name,
    priority,
    result,
    ready: false,
    date: date || new Date().toISOString().slice(0, 10),
  });
  if (res?.id || res?.message?.includes("✅")) {
    closeModal("modal-add-lab");
    toast("تم إرسال طلب التحليل", "", "🧪");
    ["lab-patient", "lab-result", "lab-date"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    loadLabFromDB();
  } else toast(res?.message || "تأكد إن السيرفر شغّال", "", "❌");
}

// ═══════════════════════════════════════════════
// PHARMACY
// ═══════════════════════════════════════════════
function viewMedicine(id) {
  const m = allPharmacyData.find((x) => x.id == id);
  if (!m) return;
  currentMedicine = m;
  const empty = m.stock <= 0;
  const low = m.stock < m.min_stock && m.stock > 0;
  document.getElementById("vm-avatar").textContent = "💊";
  document.getElementById("vm-avatar").style.background =
    `linear-gradient(135deg,${empty ? "#ff4d6d" : low ? "#f59e0b" : "#39d98a"},#6366f1)`;
  document.getElementById("vm-name").textContent = m.name || "--";
  document.getElementById("vm-category").textContent = m.category || "--";
  document.getElementById("vm-stock").textContent =
    `${m.stock || 0} ${m.unit || ""}`;
  document.getElementById("vm-min").textContent =
    `${m.min_stock || 0} ${m.unit || ""}`;
  document.getElementById("vm-unit").textContent = m.unit || "--";
  document.getElementById("vm-price").textContent = `${m.price || 0} ر.س`;
  document.getElementById("vm-status").innerHTML =
    `<span class="badge ${empty ? "badge-red" : low ? "badge-amber" : "badge-green"}">${empty ? "🔴 نفد تماماً" : low ? "⚠ مخزون منخفض" : "✅ مخزون كافٍ"}</span>`;
  openModal("modal-view-medicine");
}
function editMedicine() {
  closeModal("modal-view-medicine");
  editMedicineDirect(currentMedicine);
}
function editMedicineById(id) {
  const m = allPharmacyData.find((x) => x.id == id);
  if (m) editMedicineDirect(m);
}
function editMedicineDirect(m) {
  if (!m) return;
  currentMedicine = m;
  document.getElementById("em-avatar").textContent = "💊";
  document.getElementById("em-name-display").textContent = m.name || "--";
  document.getElementById("em-cat-display").textContent = m.category || "--";
  document.getElementById("edit-med-id").value = m.id || "";
  document.getElementById("edit-med-name").value = m.name || "";
  document.getElementById("edit-med-stock").value = m.stock || 0;
  document.getElementById("edit-med-min").value = m.min_stock || 0;
  document.getElementById("edit-med-price").value = m.price || 0;
  Array.from(document.getElementById("edit-med-category").options).forEach(
    (o) => (o.selected = o.value === m.category),
  );
  Array.from(document.getElementById("edit-med-unit").options).forEach(
    (o) => (o.selected = o.value === m.unit),
  );
  openModal("modal-edit-medicine");
}
async function saveEditMedicine() {
  const id = document.getElementById("edit-med-id").value;
  const name = document.getElementById("edit-med-name").value.trim();
  const category = document.getElementById("edit-med-category").value;
  const stock = parseInt(document.getElementById("edit-med-stock").value) || 0;
  const min_stock =
    parseInt(document.getElementById("edit-med-min").value) || 0;
  const unit = document.getElementById("edit-med-unit").value;
  const price =
    parseFloat(document.getElementById("edit-med-price").value) || 0;
  if (!name) {
    toast("اسم الدواء مطلوب", "", "⚠️");
    return;
  }
  if (!id) {
    toast("لا يمكن تعديل دواء بدون ID", "", "⚠️");
    return;
  }

  const res = await putAPI(`pharmacy/${id}`, {
    name,
    category,
    stock,
    min_stock,
    unit,
    price,
  });
  if (res && !res.message?.includes("خطأ")) {
    closeModal("modal-edit-medicine");
    toast(`تم تحديث بيانات ${name}`, "", "💊");
    loadPharmacyFromDB();
  } else toast(res?.message || "خطأ", "", "❌");
}
async function saveMedicine() {
  const name = document.getElementById("med-name").value.trim();
  const category = document.getElementById("med-category").value;
  const stock = parseInt(document.getElementById("med-stock").value) || 0;
  const min_stock = parseInt(document.getElementById("med-min").value) || 0;
  const unit = document.getElementById("med-unit").value;
  const price = parseFloat(document.getElementById("med-price").value) || 0;
  if (!name) {
    toast("اسم الدواء مطلوب", "", "⚠️");
    return;
  }

  const res = await postAPI("pharmacy", {
    name,
    category,
    stock,
    min_stock,
    unit,
    price,
  });
  if (res?.id || res?.message?.includes("✅")) {
    closeModal("modal-add-medicine");
    toast("تم إضافة الدواء", name, "💊");
    ["med-name", "med-stock", "med-min", "med-price"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    loadPharmacyFromDB();
  } else toast(res?.message || "تأكد إن السيرفر شغّال", "", "❌");
}

// ═══════════════════════════════════════════════
// THEME & UI
// ═══════════════════════════════════════════════
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;
html.setAttribute("data-theme", localStorage.getItem("theme") || "dark");
themeToggle.addEventListener("click", () => {
  const t = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
  toast(
    t === "light" ? "تم تفعيل الوضع الفاتح" : "تم تفعيل الوضع الداكن",
    "",
    "🎨",
  );
});
document
  .querySelector(".toolbar-search-input")
  .addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const q = e.target.value.trim();
      if (q) toast(`جاري البحث عن: ${q}`, "", "🔍");
    }
  });

// ═══ NOTIFICATIONS ═══
const notifBtn = document.getElementById("notification-btn");
const notifDropdown = document.getElementById("notification-dropdown");
const notifCountEl = document.getElementById("notif-count");
const notifCountBadge = document.querySelector(".notif-count-badge");
notifBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (notifDropdown.classList.toggle("active")) updateNotifCount(0);
});
document.addEventListener("click", (e) => {
  if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target))
    notifDropdown.classList.remove("active");
});
document.querySelector(".notif-mark-read").addEventListener("click", () => {
  document.querySelectorAll(".notif-item.unread").forEach((i) => {
    i.classList.remove("unread");
    const d = i.querySelector(".notif-dot");
    if (d) d.remove();
  });
  updateNotifCount(0);
  toast("تم تعيين جميع الإشعارات كمقروءة", "", "✅");
});
document.querySelector(".notif-view-all").addEventListener("click", () => {
  toast("جاري عرض الإشعارات...", "", "📋");
  notifDropdown.classList.remove("active");
});
document.querySelectorAll(".notif-item").forEach((item) => {
  item.addEventListener("click", () => {
    toast(item.querySelector(".notif-text").textContent, "", "🔔");
    item.classList.remove("unread");
    const d = item.querySelector(".notif-dot");
    if (d) d.remove();
    notifDropdown.classList.remove("active");
  });
});
function updateNotifCount(count) {
  const n =
    count !== undefined
      ? count
      : Math.max(0, (parseInt(notifCountEl.textContent) || 0) - 1);
  notifCountEl.textContent = n;
  notifCountEl.style.display = n > 0 ? "flex" : "none";
  if (notifCountBadge) {
    notifCountBadge.textContent = `${n} جديد`;
    notifCountBadge.style.display = n > 0 ? "inline-block" : "none";
  }
}
document
  .getElementById("settings-btn")
  .addEventListener("click", () => toast("الإعدادات", "", "⚙️"));

// ═══ NAV ═══
function nav(id, el) {
  document
    .querySelectorAll(".nav-item")
    .forEach((i) => i.classList.remove("active"));
  el.classList.add("active");
  document
    .querySelectorAll(".page-section")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById("sec-" + id).classList.add("active");
  if (id === "appointments") loadAppointmentsFromDB();
  if (id === "patients") loadPatientsFromDB();
  if (id === "doctors") loadDoctorsFromDB();
  if (id === "pharmacy") loadPharmacyFromDB();
  if (id === "surgery") loadSurgeriesFromDB();
  if (id === "lab") loadLabFromDB();
  if (id === "billing") loadBillingFromDB();
  if (id === "reports") {
    renderDeptStats();
    loadBillingFromDB();
  }
}

// ═══ MODAL ═══
function openModal(id) {
  document.getElementById(id).classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}
document.querySelectorAll(".modal-overlay").forEach((m) =>
  m.addEventListener("click", (e) => {
    if (e.target === m) m.classList.remove("open");
  }),
);

// ═══ TOAST ═══
function toast(text, sub, icon = "✅") {
  const t = document.getElementById("toast");
  document.getElementById("toast-text").textContent = text;
  document.getElementById("toast-sub").textContent = sub || "";
  document.getElementById("toast-icon").textContent = icon;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3500);
}

// ═══ CLOCK ═══
function updateTime() {
  const now = new Date();
  document.getElementById("live-time").textContent =
    "مستشفى care at home العالمي — " +
    now.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }) +
    " — " +
    now.toLocaleTimeString("ar-EG");
}
setInterval(updateTime, 1000);
updateTime();

// ═══ COUNTER ═══
function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let cur = 0;
  const step = target / 40;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.round(cur).toLocaleString("ar");
    if (cur >= target) clearInterval(t);
  }, 30);
}

// ═══ INIT ═══
setTimeout(() => {
  animateCount("k2", 28);
  animateCount("k4", 87);
  loadDashboardStats();
  loadPatientsFromDB();
  loadDoctorsFromDB();
  loadAppointmentsFromDB();
  renderDeptStats();
}, 300);

// ═══════════════════════════════════════════════
// CHARTS
// ═══════════════════════════════════════════════
Chart.defaults.color = "#4d6b88";
Chart.defaults.borderColor = "rgba(255,255,255,0.07)";
Chart.defaults.font.family = "'Sora', sans-serif";

const ctxP = document.getElementById("chart-patients").getContext("2d");
const grad = ctxP.createLinearGradient(0, 0, 0, 250);
grad.addColorStop(0, "rgba(0,212,200,0.25)");
grad.addColorStop(1, "rgba(0,212,200,0)");
new Chart(ctxP, {
  type: "line",
  data: {
    labels: [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    datasets: [
      {
        label: "مرضى جدد",
        data: [28, 42, 35, 51, 38, 44, 47],
        borderColor: "#00d4c8",
        backgroundColor: grad,
        tension: 0.45,
        pointRadius: 5,
        pointBackgroundColor: "#00d4c8",
        fill: true,
        borderWidth: 2.5,
      },
      {
        label: "طوارئ",
        data: [8, 12, 9, 18, 11, 14, 16],
        borderColor: "#ff4d6d",
        backgroundColor: "transparent",
        tension: 0.45,
        pointRadius: 4,
        pointBackgroundColor: "#ff4d6d",
        borderWidth: 2,
        borderDash: [5, 4],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { boxWidth: 10, padding: 14, font: { size: 11 } },
      },
    },
    scales: {
      x: { grid: { color: "rgba(255,255,255,0.04)" } },
      y: { grid: { color: "rgba(255,255,255,0.04)" }, beginAtZero: true },
    },
  },
});
new Chart(document.getElementById("chart-depts").getContext("2d"), {
  type: "doughnut",
  data: {
    labels: ["الطوارئ", "القلب", "ICU", "الجراحة", "الأطفال", "الباطنة"],
    datasets: [
      {
        data: [28, 35, 18, 38, 22, 40],
        backgroundColor: [
          "#ff4d6d",
          "#00d4c8",
          "#a78bfa",
          "#4f8ef7",
          "#f472b6",
          "#39d98a",
        ],
        borderColor: "#050d1a",
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 10, padding: 12, font: { size: 10 } },
      },
    },
  },
});
new Chart(document.getElementById("chart-surgery").getContext("2d"), {
  type: "bar",
  data: {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "ناجحة",
        data: [98, 112, 127, 104, 135, 121],
        backgroundColor: "rgba(0,212,200,0.75)",
        borderRadius: 6,
      },
      {
        label: "طارئة",
        data: [12, 9, 14, 8, 11, 10],
        backgroundColor: "rgba(255,77,109,0.75)",
        borderRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: "rgba(255,255,255,0.04)" } },
      y: { grid: { color: "rgba(255,255,255,0.04)" }, beginAtZero: true },
    },
    plugins: {
      legend: { position: "top", labels: { boxWidth: 10, font: { size: 11 } } },
    },
  },
});
const ctxR = document.getElementById("chart-revenue").getContext("2d");
const gradR = ctxR.createLinearGradient(0, 0, 0, 250);
gradR.addColorStop(0, "rgba(79,142,247,0.3)");
gradR.addColorStop(1, "rgba(79,142,247,0)");
new Chart(ctxR, {
  type: "line",
  data: {
    labels: ["أكتوبر", "نوفمبر", "ديسمبر", "يناير", "فبراير", "مارس"],
    datasets: [
      {
        label: "الإيرادات",
        data: [210, 245, 258, 231, 271, 287],
        borderColor: "#4f8ef7",
        backgroundColor: gradR,
        tension: 0.45,
        fill: true,
        pointRadius: 5,
        borderWidth: 2.5,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { boxWidth: 10, font: { size: 11 } } } },
    scales: {
      x: { grid: { color: "rgba(255,255,255,0.04)" } },
      y: { grid: { color: "rgba(255,255,255,0.04)" }, beginAtZero: false },
    },
  },
});
new Chart(document.getElementById("chart-pharma").getContext("2d"), {
  type: "pie",
  data: {
    labels: ["مضادات حيوية", "مسكنات", "أدوية قلب", "سكري", "أعصاب", "أخرى"],
    datasets: [
      {
        data: [18, 22, 15, 14, 12, 19],
        backgroundColor: [
          "#00d4c8",
          "#4f8ef7",
          "#ff4d6d",
          "#39d98a",
          "#a78bfa",
          "#ffb347",
        ],
        borderColor: "#050d1a",
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 10, font: { size: 10 } },
      },
    },
  },
});
new Chart(document.getElementById("chart-perf").getContext("2d"), {
  type: "radar",
  data: {
    labels: [
      "وقت الاستجابة",
      "رضا المرضى",
      "معدل الشفاء",
      "التوثيق",
      "الإلتزام",
      "الكفاءة",
    ],
    datasets: [
      {
        label: "د. سارة أحمد",
        data: [88, 92, 85, 90, 95, 87],
        borderColor: "#00d4c8",
        backgroundColor: "rgba(0,212,200,0.1)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "د. خالد ناصر",
        data: [82, 88, 91, 85, 79, 88],
        borderColor: "#4f8ef7",
        backgroundColor: "rgba(79,142,247,0.1)",
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: "د. ليلى محمد",
        data: [90, 85, 88, 92, 84, 90],
        borderColor: "#a78bfa",
        backgroundColor: "rgba(167,139,250,0.1)",
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: { color: "rgba(255,255,255,0.07)" },
        pointLabels: { font: { size: 10 }, color: "#8ba8c4" },
        ticks: { color: "#4d6b88", font: { size: 9 } },
      },
    },
    plugins: {
      legend: { position: "top", labels: { boxWidth: 10, font: { size: 10 } } },
    },
  },
});
new Chart(document.getElementById("chart-hr-history").getContext("2d"), {
  type: "line",
  data: {
    labels: Array.from({ length: 20 }, (_, i) => i + ":00"),
    datasets: [
      {
        label: "معدل القلب",
        data: [
          78, 80, 75, 82, 79, 85, 88, 76, 80, 77, 82, 79, 75, 80, 83, 78, 81,
          76, 79, 80,
        ],
        borderColor: "#ff4d6d",
        backgroundColor: "rgba(255,77,109,0.08)",
        tension: 0.4,
        fill: true,
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { font: { size: 10 } } } },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: { font: { size: 9 } },
      },
      y: { grid: { color: "rgba(255,255,255,0.04)" }, min: 60, max: 110 },
    },
  },
});

// ═══ ECG ═══
const ecgCanvas = document.getElementById("ecg-canvas");
const ecgCtx = ecgCanvas.getContext("2d");
let ecgOffset = 0;
function resizeECG() {
  ecgCanvas.width = ecgCanvas.offsetWidth;
  ecgCanvas.height = 80;
}
resizeECG();
window.addEventListener("resize", resizeECG);
function ecgVal(x) {
  const c = x % 120;
  if (c < 5) return 0.5 + c * 0.05;
  if (c < 8) return 0.75 - (c - 5) * 0.25;
  if (c < 12) return -0.5 + (c - 8) * 0.25;
  if (c < 15) return 0.5;
  if (c < 16) return 0.6;
  if (c < 17) return 3.0;
  if (c < 18) return -1.2;
  if (c < 20) return 0.5;
  if (c < 25) return 0.5 + (c - 20) * 0.06;
  if (c < 30) return 0.8 - (c - 25) * 0.06;
  return 0.5 + Math.sin(c * 0.1) * 0.05;
}
function drawECG() {
  const W = ecgCanvas.width,
    H = ecgCanvas.height;
  ecgCtx.clearRect(0, 0, W, H);
  ecgCtx.fillStyle = "#0d1e35";
  ecgCtx.fillRect(0, 0, W, H);
  ecgCtx.strokeStyle = "rgba(0,212,200,0.07)";
  ecgCtx.lineWidth = 1;
  for (let x = 0; x < W; x += 20) {
    ecgCtx.beginPath();
    ecgCtx.moveTo(x, 0);
    ecgCtx.lineTo(x, H);
    ecgCtx.stroke();
  }
  for (let y = 0; y < H; y += 20) {
    ecgCtx.beginPath();
    ecgCtx.moveTo(0, y);
    ecgCtx.lineTo(W, y);
    ecgCtx.stroke();
  }
  ecgCtx.strokeStyle = "#00f0e2";
  ecgCtx.lineWidth = 2;
  ecgCtx.shadowColor = "#00d4c8";
  ecgCtx.shadowBlur = 4;
  ecgCtx.beginPath();
  for (let px = 0; px < W; px++) {
    const v = ecgVal(px + ecgOffset),
      py = H / 2 - v * (H / 6);
    px === 0 ? ecgCtx.moveTo(px, py) : ecgCtx.lineTo(px, py);
  }
  ecgCtx.stroke();
  ecgCtx.shadowBlur = 0;
  ecgOffset = (ecgOffset + 3) % 120;
  requestAnimationFrame(drawECG);
}
drawECG();

// ═══ VITALS ═══
let vitals = { hr: 78, sys: 120, dia: 80, o2: 98, temp: 37.1, resp: 16 };
function updateVitals() {
  vitals.hr = Math.max(
    60,
    Math.min(105, vitals.hr + (Math.random() - 0.5) * 5),
  );
  vitals.sys = Math.max(
    100,
    Math.min(150, vitals.sys + (Math.random() - 0.5) * 4),
  );
  vitals.o2 = Math.max(
    91,
    Math.min(100, vitals.o2 + (Math.random() - 0.5) * 1.5),
  );
  vitals.temp = Math.max(
    36,
    Math.min(39.5, vitals.temp + (Math.random() - 0.5) * 0.15),
  );
  vitals.resp = Math.max(
    10,
    Math.min(28, vitals.resp + (Math.random() - 0.5) * 2),
  );
  const hrEl = document.getElementById("v-hr");
  hrEl.textContent = Math.round(vitals.hr);
  const hrOk = vitals.hr >= 60 && vitals.hr <= 100;
  document.getElementById("vs-hr").textContent = hrOk
    ? "● طبيعي"
    : "⚠ غير طبيعي";
  document.getElementById("vs-hr").style.color = hrOk
    ? "var(--green)"
    : "var(--red)";
  document.getElementById("vc-hr").className =
    "vital-card" + (hrOk ? "" : " danger");
  document.getElementById("v-bp").textContent =
    Math.round(vitals.sys) + "/" + vitals.dia;
  const o2El = document.getElementById("v-o2");
  o2El.textContent = Math.round(vitals.o2) + "%";
  const o2Ok = vitals.o2 >= 95;
  o2El.style.color = o2Ok ? "var(--teal)" : "var(--red)";
  document.getElementById("vs-o2").textContent = o2Ok ? "● ممتاز" : "⚠ منخفض";
  document.getElementById("vs-o2").style.color = o2Ok
    ? "var(--green)"
    : "var(--red)";
  document.getElementById("vc-o2").className =
    "vital-card" + (o2Ok ? "" : " danger");
  document.getElementById("v-temp").textContent = vitals.temp.toFixed(1) + "°";
  document.getElementById("v-resp").textContent = Math.round(vitals.resp);
}
setInterval(updateVitals, 1500);

// ═══ ICU ═══
const icuProfiles = {
  icu1: {
    name: "فاطمة حسن",
    room: "ICU-3",
    diag: "نوبة قلبية حادة",
    hr: 78,
    o2: 94,
  },
  icu2: {
    name: "أحمد الريحاني",
    room: "ICU-5",
    diag: "فشل كلوي حاد",
    hr: 92,
    o2: 97,
  },
  icu3: {
    name: "نادية عمر",
    room: "ICU-7",
    diag: "صدمة إنتانية",
    hr: 115,
    o2: 88,
  },
};
function selectICU(el, id) {
  document
    .querySelectorAll("#sec-icu .filter-chip")
    .forEach((c) => c.classList.remove("active"));
  el.classList.add("active");
  const p = icuProfiles[id];
  vitals.hr = p.hr;
  vitals.o2 = p.o2;
  toast("تم تحديد " + p.name, p.room + " — " + p.diag, "❤️");
}

// ═══ ALERTS ═══
const alerts = [
  ["تنبيه طبي!", "مستوى تشبع الأكسجين لفاطمة حسن 92%", "⚠️"],
  ["موعد قريب", "د. سارة أحمد لديها موعد خلال 15 دقيقة", "📅"],
  ["مخزون منخفض", "ليفوثيروكسين — 15 قرص متبقي فقط", "💊"],
];
let alertIdx = 0;
setInterval(() => {
  const a = alerts[alertIdx % alerts.length];
  toast(a[0], a[1], a[2]);
  alertIdx++;
}, 18000);
