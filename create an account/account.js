/* ── SIDEBAR ── */
function showSidebar() {
  document.getElementById("sidebar").classList.add("active");
}
function hideSidebar() {
  document.getElementById("sidebar").classList.remove("active");
}

/* ── AVATAR UPLOAD ── */
document.getElementById("avatarInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (r) => {
    const prev = document.getElementById("avatarPreview");
    const ph = document.getElementById("avatarPlaceholder");
    prev.src = r.target.result;
    prev.style.display = "block";
    if (ph) ph.style.display = "none";
  };
  reader.readAsDataURL(file);
});

/* ── EYE TOGGLE ── */
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

/* ── PASSWORD STRENGTH ── */
document.getElementById("password").addEventListener("input", (e) => {
  const val = e.target.value;
  let sc = 0;
  if (val.length >= 8) sc++;
  if (/[A-Z]/.test(val)) sc++;
  if (/[0-9]/.test(val)) sc++;
  if (/[^A-Za-z0-9]/.test(val)) sc++;
  for (let i = 1; i <= 4; i++)
    document.getElementById("b" + i).className = "s-bar";
  const cls = ["", "s-weak", "s-medium", "s-medium", "s-strong"];
  const lbl = ["", "Weak", "Medium", "Good", "Strong"];
  for (let i = 1; i <= sc; i++)
    document.getElementById("b" + i).classList.add(cls[sc]);
  document.getElementById("sLabel").textContent = val ? lbl[sc] : "";
});

/* ── SUBMIT ── */
document.getElementById("submitBtn").addEventListener("click", async () => {
  const fn = document.getElementById("firstName").value.trim();
  const ln = document.getElementById("lastName").value.trim();
  const em = document.getElementById("email").value.trim();
  const pw = document.getElementById("password").value;
  const cp = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;
  const terms = document.getElementById("terms").checked;

  if (!fn || !ln) {
    showToast("Please enter your full name.", true);
    return;
  }
  if (!em || !/\S+@\S+\.\S+/.test(em)) {
    showToast("Please enter a valid email.", true);
    return;
  }
  if (!role) {
    showToast("Please select an account type.", true);
    return;
  }
  if (!pw || pw.length < 6) {
    showToast("Password must be at least 6 characters.", true);
    return;
  }
  if (pw !== cp) {
    showToast("Passwords do not match!", true);
    return;
  }
  if (!terms) {
    showToast("Please accept the Terms of Use.", true);
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fn + " " + ln,
        email: em,
        password: pw,
        role: role,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      showToast(data.message, true);
      return;
    }

    localStorage.setItem(
      "cah_user",
      JSON.stringify({
        name: fn + " " + ln,
        email: em,
        role: role,
      }),
    );

    showToast("Account created! Redirecting...", false);
    setTimeout(() => {
      window.location.href = "../Get-Started/get-started.html";
    }, 1800);
  } catch (err) {
    showToast("Server error. Make sure the server is running!", true);
  }
});

/* ── TOAST ── */
let tt;
function showToast(msg, isErr) {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.querySelector("i").className = isErr
    ? "fa-solid fa-circle-exclamation"
    : "fa-solid fa-circle-check";
  t.className = isErr ? "err show" : "ok show";
  clearTimeout(tt);
  tt = setTimeout(() => t.classList.remove("show"), 3500);
}

/* ── LANG TOGGLE ── */
var currentLang = "en";
document.getElementById("lang-toggle").addEventListener("click", function () {
  if (currentLang === "en") {
    currentLang = "ar";
    this.textContent = "en";
    document.documentElement.lang = "ar";
  } else {
    currentLang = "en";
    this.textContent = "ar";
    document.documentElement.lang = "en";
  }
});

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
