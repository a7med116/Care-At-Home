/* ════════════════════════════════════════════════
   CARE AT HOME — FAQ JS
   Sidebar · Translate · Accordion · Search · Filter · Reveal
   ════════════════════════════════════════════════ */

/* ── Sidebar ─────────────────────────────────── */
function showsidebar() {
  document.querySelector(".sidebar").classList.add("active");
}
function hidesidebar() {
  document.querySelector(".sidebar").classList.remove("active");
}

/* ── Google Translate ───────────────────────── */
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


/* ── Accordion ──────────────────────────────── */
function toggleFaq(btn) {
  var card = btn.closest(".faq-card");
  var isOpen = card.classList.contains("open");
  // close siblings in same group
  var group = card.closest(".faq-list");
  group
    .querySelectorAll(".faq-card.open")
    .forEach((c) => c.classList.remove("open"));
  if (!isOpen) card.classList.add("open");
}

/* ── Category Filter ────────────────────────── */
var currentCat = "all";

function filterCat(cat, btn) {
  currentCat = cat;
  // update active tab
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  // clear search when switching category
  var searchInput = document.getElementById("faqSearch");
  if (searchInput) {
    searchInput.value = "";
  }
  document.getElementById("searchClear").classList.remove("visible");

  applyFilter(cat, "");
}

function applyFilter(cat, query) {
  var groups = document.querySelectorAll(".faq-group");
  var totalVisible = 0;

  groups.forEach(function (group) {
    var groupCat = group.getAttribute("data-cat");
    var catMatch = cat === "all" || groupCat === cat;
    var cards = group.querySelectorAll(".faq-card");
    var groupVisible = 0;

    cards.forEach(function (card) {
      var text = (card.getAttribute("data-q") || "").toLowerCase();
      var bodyText = card
        .querySelector(".faq-a-inner")
        .textContent.toLowerCase();
      var qSpan = card.querySelector(".faq-q span");

      var queryMatch =
        !query || text.includes(query) || bodyText.includes(query);
      var visible = catMatch && queryMatch;

      card.style.display = visible ? "" : "none";
      if (visible) {
        groupVisible++;
        // highlight search term
        if (query && qSpan) {
          var orig = card.getAttribute("data-q");
          var re = new RegExp("(" + escapeRe(query) + ")", "gi");
          qSpan.innerHTML = orig.replace(re, "<mark>$1</mark>");
        } else if (qSpan) {
          qSpan.textContent = card.getAttribute("data-q");
        }
      }
    });

    group.style.display = groupVisible === 0 ? "none" : "";
    totalVisible += groupVisible;
  });

  document.getElementById("faqNoResults").style.display =
    totalVisible === 0 ? "block" : "none";
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ── Search ─────────────────────────────────── */
var _searchTimeout;

function searchFaqs(val) {
  var query = val.trim().toLowerCase();
  var clearBtn = document.getElementById("searchClear");
  clearBtn.classList.toggle("visible", query.length > 0);

  clearTimeout(_searchTimeout);
  _searchTimeout = setTimeout(function () {
    // when searching, show all categories
    applyFilter("all", query);
    // deactivate tabs visually
    if (query) {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));
    } else {
      // restore active cat
      document.querySelectorAll(".tab-btn").forEach((b) => {
        if (b.getAttribute("data-cat") === currentCat)
          b.classList.add("active");
      });
      applyFilter(currentCat, "");
    }
  }, 220);
}

function clearSearch() {
  var input = document.getElementById("faqSearch");
  input.value = "";
  document.getElementById("searchClear").classList.remove("visible");
  applyFilter(currentCat, "");
  document.querySelectorAll(".tab-btn").forEach((b) => {
    if (b.getAttribute("data-cat") === currentCat) b.classList.add("active");
  });
  input.focus();
}

/* ── Popular topic quick-search ─────────────── */
function triggerSearch(term) {
  var input = document.getElementById("faqSearch");
  input.value = term;
  input.scrollIntoView({ behavior: "smooth", block: "center" });
  searchFaqs(term);
  // deactivate category tabs
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
}

/* ── Scroll Reveal ──────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.06 },
  );

  document
    .querySelectorAll(".faq-card, .still-help-card, .pt-inner")
    .forEach(function (el, i) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity .45s ease ${i * 0.04}s, transform .45s ease ${i * 0.04}s`;
      io.observe(el);
    });

  /* open first card of each group on load */
  document.querySelectorAll(".faq-group").forEach(function (g) {
    var first = g.querySelector(".faq-card");
    if (first) first.classList.add("open");
  });
});

/* ── ESC to close all ───────────────────────── */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".faq-card.open")
      .forEach((c) => c.classList.remove("open"));
    clearSearch();
  }
});
