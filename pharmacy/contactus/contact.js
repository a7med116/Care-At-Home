/* ════════════════════════════════════════════════
   CARE AT HOME — CONTACT JS
   Sidebar · Translate · Form · FAQ · Toast · Reveal
   ════════════════════════════════════════════════ */

/* ── Sidebar ──────────────────────────────────── */
function showsidebar() {
  document.querySelector(".sidebar").classList.add("active");
}
function hidesidebar() {
  document.querySelector(".sidebar").classList.remove("active");
}

/* ── Google Translate ─────────────────────────── */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en", includedLanguages: "en,ar" },
    "google_translate_element",
  );
}
function changeLanguage(lang) {
  var s = document.querySelector(".goog-te-combo");
  if (s) {
    s.value = lang;
    s.dispatchEvent(new Event("change"));
  }
}
var gtScript = document.createElement("script");
gtScript.src =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(gtScript);

var currentLang = "en";
var toggleBtn = document.getElementById("lang-toggle");
if (toggleBtn) {
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
}

/* ── Toast ────────────────────────────────────── */
var _toastTimer;
function showToast(msg, icon) {
  var t = document.getElementById("toast");
  if (!t) return;
  t.innerHTML = (icon || "✅") + " " + msg;
  t.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove("show"), 3500);
}

/* ── Form Validation & Send ───────────────────── */
function sendMessage() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var message = document.getElementById("message").value.trim();
  var check = document.getElementById("check").checked;

  if (!name) {
    highlight("name");
    showToast("Please enter your full name", "⚠️");
    return;
  }
  if (!message) {
    highlight("message");
    showToast("Please write your message", "⚠️");
    return;
  }
  if (email && !isEmail(email)) {
    highlight("email");
    showToast("Please enter a valid email address", "⚠️");
    return;
  }
  if (!check) {
    highlightCheck();
    showToast("Please agree to the privacy policy", "⚠️");
    return;
  }

  // Simulate send
  var btn = document.querySelector(".btn-send");
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.style.opacity = ".8";
  btn.disabled = true;

  setTimeout(function () {
    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
    btn.style.background = "linear-gradient(135deg,#22c55e,#16a34a)";
    showToast("Message sent! We'll respond within 24 hours 😊");

    // reset after 3 seconds
    setTimeout(function () {
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";
      document.getElementById("topic").value = "";
      document.getElementById("message").value = "";
      document.getElementById("check").checked = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      btn.style.background = "";
      btn.style.opacity = "1";
      btn.disabled = false;
    }, 3000);
  }, 1500);
}

function highlight(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = "#ef4444";
  el.style.boxShadow = "0 0 0 4px rgba(239,68,68,.1)";
  el.focus();
  el.addEventListener(
    "input",
    function clearErr() {
      el.style.borderColor = "";
      el.style.boxShadow = "";
      el.removeEventListener("input", clearErr);
    },
    { once: true },
  );
}

function highlightCheck() {
  var cg = document.querySelector(".check-group");
  if (!cg) return;
  cg.style.borderColor = "#ef4444";
  cg.style.background = "rgba(239,68,68,.04)";
  setTimeout(() => {
    cg.style.borderColor = "";
    cg.style.background = "";
  }, 2000);
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/* ── FAQ Accordion ────────────────────────────── */
function toggleFaq(el) {
  var item = el.closest(".faq-item");
  var isOpen = item.classList.contains("open");
  // close all
  document
    .querySelectorAll(".faq-item.open")
    .forEach((i) => i.classList.remove("open"));
  // open if wasn't open
  if (!isOpen) item.classList.add("open");
}

/* ── Scroll Reveal ────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  document
    .querySelectorAll(
      ".contact-info-card, .contact-form-card, .faq-item, .info-item",
    )
    .forEach(function (el, i) {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition =
        "opacity .5s ease " +
        i * 0.07 +
        "s, transform .5s ease " +
        i * 0.07 +
        "s";
      observer.observe(el);
    });
});

/* ── Leaflet Map ──────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("map")) return;

  // Tanta coordinates
  var lat = 30.7865,
    lng = 31.0004;

  var map = L.map("map", { scrollWheelZoom: false }).setView([lat, lng], 15);

  // OpenStreetMap tiles (free, no API key)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Custom purple marker icon
  var icon = L.divIcon({
    className: "",
    html: `<div style="
      width:40px;height:40px;
      background:linear-gradient(135deg,#0000ff,#6a51ff);
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid #fff;
      box-shadow:0 4px 14px rgba(106,81,255,.5);
    "></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -44],
  });

  L.marker([lat, lng], { icon: icon })
    .addTo(map)
    .bindPopup(
      `<div style="font-family:Poppins,sans-serif;padding:4px 6px;">
        <strong style="color:#6a51ff;font-size:.9rem;">Care At Home</strong><br/>
        <span style="font-size:.78rem;color:#66686c;">Tanta — El-Bar Street, Gharbia</span><br/>
        <span style="font-size:.76rem;color:#22c55e;">● Open Now</span>
      </div>`,
      { maxWidth: 220 },
    )
    .openPopup();
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
