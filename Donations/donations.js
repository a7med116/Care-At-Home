/* ══ Google Translate ══════════════════════════════════ */
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

/* ══ Animate rings on scroll ══════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  document
    .querySelectorAll(".don-card")
    .forEach((card) => observer.observe(card));

  /* Form donate button */
  const donateLink = document.querySelector(".inter a");
  if (donateLink) {
    donateLink.addEventListener("click", (e) => {
      const phone = document.getElementById("phone")?.value.trim();
      const amount = document.getElementById("number")?.value.trim();
      if (!phone || !amount) {
        e.preventDefault();
        alert("Please fill in your phone number and donation amount.");
        return;
      }
      /* allow navigation to payment page */
    });
  }
});
