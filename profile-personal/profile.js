/* ══ Sidebar ══════════════════════════════════════════ */
function showsidebar() {
  document.querySelector(".sidebar").classList.add("active");
}
function hidesidebar() {
  document.querySelector(".sidebar").classList.remove("active");
}

/* ══ Main Logic ════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  /* ── Transaction data + flags ──────────────────────── */
  const transactions = [
    {
      title: "egypt",
      by: "by hassan elsaid",
      percent: 70,
      flag: "./image/Flag_of_Egypt.svg.png",
    },
    {
      title: "usa",
      by: "by dr. john",
      percent: 50,
      flag: "https://flagcdn.com/w80/us.png",
    },
    {
      title: "france",
      by: "by dr. pierre",
      percent: 80,
      flag: "https://flagcdn.com/w80/fr.png",
    },
  ];

  let currentIndex = 0;

  const titleDiv = document.querySelector(".tit h3");
  const byDiv = document.querySelector(".tit p");
  const percentDiv = document.querySelector(".number p");
  const flagImg = document.getElementById("transFlag");
  const ringCircle = document.getElementById("ringCircle");

  /* circumference of r=30 → 2π×30 ≈ 188.5 */
  const CIRC = 2 * Math.PI * 30;

  function setRing(percent) {
    const offset = CIRC - (percent / 100) * CIRC;
    if (ringCircle) ringCircle.style.strokeDashoffset = offset;
  }

  function animateText(el, cls) {
    el.classList.remove("slide-in-left", "slide-in-right");
    /* force reflow so the class is re-applied */
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function updateTransaction(index, direction = "next") {
    const cls = direction === "next" ? "slide-in-right" : "slide-in-left";
    const t = transactions[index];

    animateText(titleDiv, cls);
    animateText(byDiv, cls);
    animateText(percentDiv, cls);

    titleDiv.textContent = t.title;
    byDiv.textContent = t.by;
    percentDiv.textContent = t.percent + "%";
    if (flagImg) flagImg.src = t.flag;
    setRing(t.percent);
  }

  /* init */
  updateTransaction(currentIndex);

  /* ── Arrows ─────────────────────────────────────────── */
  const leftArrow = document.querySelector(".circle .arrow");
  const rightArrow = document.querySelector(".circle a:nth-child(2)");

  leftArrow?.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentIndex > 0) {
      currentIndex--;
      updateTransaction(currentIndex, "prev");
    }
  });

  rightArrow?.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentIndex < transactions.length - 1) {
      currentIndex++;
      updateTransaction(currentIndex, "next");
    }
  });

  /* ── About-Me Tabs ──────────────────────────────────── */
  const tabLinks = document.querySelectorAll(".about .street a");

  tabLinks.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      /* remove active from all */
      tabLinks.forEach((t) => t.classList.remove("active-tab"));
      /* add to clicked */
      tab.classList.add("active-tab");
    });
  });

  /* ── Scroll on hover ────────────────────────────────── */
  const meme = document.querySelector(".meme");
  if (meme) {
    meme.style.overflowY = "hidden";
    meme.addEventListener("mouseenter", () => {
      meme.style.overflowY = "auto";
    });
    meme.addEventListener("mouseleave", () => {
      meme.style.overflowY = "hidden";
    });
  }
});

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

