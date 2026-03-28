const DB_KEY = "cah_user";
const get = () => JSON.parse(localStorage.getItem(DB_KEY) || "{}");
const save = (d) => localStorage.setItem(DB_KEY, JSON.stringify(d));

/* ── LOAD ── */
function loadProfile() {
  const d = get();
  v("firstName", d.firstName);
  v("lastName", d.lastName);
  v("age", d.age);
  v("email", d.email);
  v("address", d.address);
  v("location", d.location);
  v("notes", d.notes);
  if (d.role) document.getElementById("role").value = d.role;
  const rMap = { sick: "Patient", doctors: "Doctor", nursing: "Nurse" };
  const fn = d.firstName || "",
    ln = d.lastName || "";
  document.getElementById("displayName").textContent =
    (fn + " " + ln).trim() || "Your Name";
  document.getElementById("displayRole").textContent = rMap[d.role] || "Member";
  if (d.avatar) setAvatar(d.avatar);
}
function v(id, val) {
  const el = document.getElementById(id);
  if (el && val != null) el.value = val;
}
function setAvatar(src) {
  document.getElementById("avatarInner").innerHTML =
    `<img src="${src}" alt="avatar"/>`;
}

/* ── EDIT / SAVE / CANCEL ── */
let snap = {};
const FIELDS = [
  "firstName",
  "lastName",
  "age",
  "email",
  "address",
  "location",
  "notes",
  "role",
  "currentPassword",
  "newPassword",
  "confirmPassword",
];
function setEditable(on) {
  FIELDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      on ? el.removeAttribute("disabled") : el.setAttribute("disabled", "");
    }
  });
}

document.getElementById("editBtn").addEventListener("click", () => {
  snap = get();
  setEditable(true);
  toggle("editBtn", "none");
  toggle("saveBtn", "flex");
  toggle("cancelBtn", "flex");
});
document.getElementById("cancelBtn").addEventListener("click", () => {
  save(snap);
  loadProfile();
  setEditable(false);
  toggle("saveBtn", "none");
  toggle("cancelBtn", "none");
  toggle("editBtn", "flex");
  toast("Changes discarded", false);
});
document.getElementById("saveBtn").addEventListener("click", () => {
  const np = document.getElementById("newPassword").value;
  const cp = document.getElementById("confirmPassword").value;
  if (np && np !== cp) {
    toast("Passwords do not match!", true);
    return;
  }
  const d = get();
  const u = {
    ...d,
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    age: document.getElementById("age").value.trim(),
    email: document.getElementById("email").value.trim(),
    address: document.getElementById("address").value.trim(),
    location: document.getElementById("location").value.trim(),
    notes: document.getElementById("notes").value.trim(),
    role: document.getElementById("role").value,
  };
  if (np) u.password = np;
  save(u);
  loadProfile();
  setEditable(false);
  toggle("saveBtn", "none");
  toggle("cancelBtn", "none");
  toggle("editBtn", "flex");
  ["currentPassword", "newPassword", "confirmPassword"].forEach((id) => {
    document.getElementById(id).value = "";
  });
  document.getElementById("sLabel").textContent = "";
  resetBars();
  toast("Profile saved successfully!", false);
});
function toggle(id, disp) {
  document.getElementById(id).style.display = disp;
}

/* ── AVATAR ── */
document.getElementById("profileImageInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (r) => {
    const src = r.target.result;
    setAvatar(src);
    const d = get();
    d.avatar = src;
    save(d);
    toast("Profile photo updated!", false);
  };
  reader.readAsDataURL(file);
});

/* ── PASSWORD EYE ── */
document.querySelectorAll(".eye-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const el = document.getElementById(btn.dataset.target);
    const ico = btn.querySelector("i");
    if (el.type === "password") {
      el.type = "text";
      ico.className = "fa-solid fa-eye-slash";
    } else {
      el.type = "password";
      ico.className = "fa-solid fa-eye";
    }
  });
});

/* ── STRENGTH ── */
document.getElementById("newPassword").addEventListener("input", (e) => {
  const val = e.target.value;
  let sc = 0;
  if (val.length >= 8) sc++;
  if (/[A-Z]/.test(val)) sc++;
  if (/[0-9]/.test(val)) sc++;
  if (/[^A-Za-z0-9]/.test(val)) sc++;
  resetBars();
  const cls = ["", "s-weak", "s-medium", "s-medium", "s-strong"];
  const lbl = ["", "Weak", "Medium", "Good", "Strong"];
  for (let i = 1; i <= sc; i++)
    document.getElementById("b" + i).classList.add(cls[sc]);
  document.getElementById("sLabel").textContent = val ? lbl[sc] : "";
});
function resetBars() {
  for (let i = 1; i <= 4; i++) {
    const b = document.getElementById("b" + i);
    b.className = "s-bar";
  }
}

/* ── TOAST ── */
let tt;
function toast(msg, isErr) {
  const t = document.getElementById("toast");
  const ico = t.querySelector("i");
  document.getElementById("toastMsg").textContent = msg;
  ico.className = isErr
    ? "fa-solid fa-circle-exclamation"
    : "fa-solid fa-circle-check";
  t.className = isErr ? "err show" : "ok show";
  clearTimeout(tt);
  tt = setTimeout(() => t.classList.remove("show"), 3200);
}

/* ── REVEAL ── */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 90);
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ── INIT ── */
loadProfile();
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ar",
    },
    "google_translate_element",
  );
}

function changeLanguage(lang) {
  var select = document.querySelector(".goog-te-combo");
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  }
}

// تحميل سكريبت جوجل تلقائياً
var script = document.createElement("script");
script.src =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(script);

// منطق تبديل اللغة بزر واحد
var currentLang = "en";
var toggleBtn = document.getElementById("lang-toggle");

toggleBtn.addEventListener("click", function () {
  if (currentLang === "en") {
    changeLanguage("ar");
    currentLang = "ar";
    toggleBtn.textContent = "en";
  } else {
    changeLanguage("en");
    currentLang = "en";
    toggleBtn.textContent = "ar";
  }
});
