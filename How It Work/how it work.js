function openSidebar() {
  document.getElementById("navSidebar").classList.add("active");
}
function closeSidebar() {
  document.getElementById("navSidebar").classList.remove("active");
}

function toggleFaq(element) {
  const item = element.parentElement;
  const isActive = item.classList.contains("active");

  // Close all
  document.querySelectorAll(".faq-item").forEach((faq) => {
    faq.classList.remove("active");
  });

  // Open clicked if wasn't active
  if (!isActive) {
    item.classList.add("active");
  }
}

// Close sidebar on outside click
document.addEventListener("click", function (e) {
  var sb = document.getElementById("navSidebar");
  var tog = document.querySelector(".menu-icon");
  if (
    sb &&
    sb.classList.contains("active") &&
    !sb.contains(e.target) &&
    tog &&
    !tog.contains(e.target)
  ) {
    closeSidebar();
  }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
/* ── Google Translate ────────────────────────────────────── */
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

