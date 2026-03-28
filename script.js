/* ════════════════════════════════════════════════════════════
   CARE AT HOME — MAIN SCRIPT
   Sidebar · Translate · Delivery · Scroll Progress ·
   Scroll Reveal · Counter · Nav Shrink · Subscribe Modal ·
   Chatbase
   ════════════════════════════════════════════════════════════ */

/* ── Sidebar ─────────────────────────────────────────────── */
function showsidebar() {
  document.querySelector(".sidebar").classList.add("active");
  document.body.style.overflow = "hidden";
}
function hidesidebar() {
  document.querySelector(".sidebar").classList.remove("active");
  document.body.style.overflow = "";
}
// Close sidebar on outside click
document.addEventListener("click", function (e) {
  var sidebar = document.querySelector(".sidebar");
  if (
    sidebar &&
    sidebar.classList.contains("active") &&
    !sidebar.contains(e.target)
  ) {
    hidesidebar();
  }
});

/* ── Delivery Check ──────────────────────────────────────── */
function checkDelivery(event) {
  if (event) event.preventDefault();
  var zipInput = document.getElementById("zipInput");
  var zipError = document.getElementById("zipError");
  if (zipError) zipError.textContent = "";

  var zip = (zipInput ? zipInput.value.trim() : "").replace(/[^\d]/g, "");
  var city = "Tanta";
  var query = encodeURIComponent(
    "pharmacies and hospitals near " + zip + ", " + city + ", Egypt",
  );
  window.open(
    "https://www.google.com/maps/search/" + query + "?t=" + Date.now(),
    "_blank",
  );
}

var checkBtn = document.getElementById("checkBtn");
if (checkBtn) checkBtn.addEventListener("click", checkDelivery);

/* ── Google Translate ────────────────────────────────────── */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en", includedLanguages: "en,ar", autoDisplay: false },
    "google_translate_element",
  );
}
(function () {
  var sc = document.createElement("script");
  sc.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(sc);
})();

var currentLang = "en";
var toggleBtn = document.getElementById("lang-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    var newLang = currentLang === "en" ? "ar" : "en";
    function tryToggle() {
      var select = document.querySelector(".goog-te-combo");
      if (!select) {
        setTimeout(tryToggle, 500);
        return;
      }
      select.value = newLang;
      select.dispatchEvent(new Event("change"));
      currentLang = newLang;
      toggleBtn.textContent = newLang === "en" ? "ar" : "en";
    }
    tryToggle();
  });
}

/* ── Subscribe Modal ─────────────────────────────────────── */
setTimeout(function () {
  var modal = document.getElementById("subscribeModal");
  if (modal) modal.classList.add("active");
}, 10000);

function closeSubscribeModal() {
  var modal = document.getElementById("subscribeModal");
  if (modal) modal.classList.remove("active");
}

var subscribeModal = document.getElementById("subscribeModal");
if (subscribeModal) {
  subscribeModal.addEventListener("click", function (e) {
    if (e.target === this) closeSubscribeModal();
  });
}

/* ── Scroll Progress Bar ─────────────────────────────────── */
(function () {
  var bar = document.createElement("div");
  bar.className = "scroll-progress-bar";
  document.body.prepend(bar);

  window.addEventListener(
    "scroll",
    function () {
      var scrolled = window.scrollY;
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = pct.toFixed(1) + "%";
    },
    { passive: true },
  );
})();

/* ── Nav Shrink on Scroll ────────────────────────────────── */
(function () {
  var nav = document.querySelector("header .nav-bar nav");
  if (!nav) return;
  window.addEventListener(
    "scroll",
    function () {
      nav.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );
})();

/* ── Scroll Reveal ───────────────────────────────────────── */
(function () {
  var revealEls = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale, [data-reveal], " +
      ".dlivery .box, .cards1, .disease, .div, .boxing, " +
      ".diagnosis .diagn, .pharmacies .pharmacy, " +
      ".got, .treatment, .see, .providers",
  );

  if (!revealEls.length) return;

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );

  revealEls.forEach(function (el) {
    // Only add reveal class if it doesn't already have one
    var hasReveal =
      el.classList.contains("reveal") ||
      el.classList.contains("reveal-left") ||
      el.classList.contains("reveal-right") ||
      el.classList.contains("reveal-scale") ||
      el.hasAttribute("data-reveal");
    if (!hasReveal) {
      el.classList.add("reveal");
    }
    io.observe(el);
  });
})();

/* ── Stagger children inside containers ─────────────────── */
(function () {
  var staggerGroups = [
    { parent: ".dev", child: ".div" },
    { parent: ".pepere", child: ".cards1" },
    { parent: ".diseases", child: ".disease" },
    { parent: ".container", child: ".content" },
  ];

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var children = entry.target._staggerChildren;
        if (!children) return;
        children.forEach(function (child, i) {
          setTimeout(function () {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          }, i * 80);
        });
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.06 },
  );

  staggerGroups.forEach(function (group) {
    var parent = document.querySelector(group.parent);
    if (!parent) return;
    var children = parent.querySelectorAll(group.child);
    if (!children.length) return;

    children.forEach(function (child) {
      child.style.opacity = "0";
      child.style.transform = "translateY(28px)";
      child.style.transition =
        "opacity .55s cubic-bezier(.22,.61,.36,1), transform .55s cubic-bezier(.22,.61,.36,1)";
    });

    parent._staggerChildren = Array.from(children);
    io.observe(parent);
  });
})();

/* ── Counter Animation (for any element with data-count) ── */
function animateCounter(el, target, duration) {
  var start = 0;
  var step = (target / duration) * 16;
  var current = 0;
  var suffix = el.getAttribute("data-suffix") || "";
  var timer = setInterval(function () {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current) + suffix;
  }, 16);
}

(function () {
  var counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var target = parseFloat(entry.target.getAttribute("data-count"));
        animateCounter(entry.target, target, 1200);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach(function (el) {
    io.observe(el);
  });
})();

/* ── Image Hover Tilt ────────────────────────────────────── */
(function () {
  var cards = document.querySelectorAll(".cards1, .div, .boxing");
  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      var y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      card.style.transform =
        "translateY(-6px) rotateX(" + y + "deg) rotateY(" + x + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
})();

/* ── Smooth horizontal scroll for disease / pepere ──────── */
(function () {
  var hScrollers = document.querySelectorAll(".diseases, .pepere, .dev");
  hScrollers.forEach(function (el) {
    var isDown = false,
      startX,
      scrollL;
    el.addEventListener("mousedown", function (e) {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollL = el.scrollLeft;
      el.style.cursor = "grabbing";
    });
    el.addEventListener("mouseleave", function () {
      isDown = false;
      el.style.cursor = "";
    });
    el.addEventListener("mouseup", function () {
      isDown = false;
      el.style.cursor = "";
    });
    el.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - el.offsetLeft;
      el.scrollLeft = scrollL - (x - startX) * 1.4;
    });
  });
})();

/* ── Chatbase Embed ──────────────────────────────────────── */
(function () {
  if (
    !window.chatbase ||
    (typeof window.chatbase === "function" &&
      window.chatbase("getState") !== "initialized")
  ) {
    window.chatbase = (...args) => {
      if (!window.chatbase.q) window.chatbase.q = [];
      window.chatbase.q.push(args);
    };
    window.chatbase = new Proxy(window.chatbase, {
      get(t, p) {
        if (p === "q") return t.q;
        return (...a) => t(p, ...a);
      },
    });
  }
  var onLoad = function () {
    var sc = document.createElement("script");
    sc.src = "https://www.chatbase.co/embed.min.js";
    sc.id = "ekZM4RmgBAVxeETvwY49B";
    document.body.appendChild(sc);
  };
  if (document.readyState === "complete") onLoad();
  else window.addEventListener("load", onLoad);
})();

function toggleSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  const overlay = document.getElementById("overlay");
  sidebar?.classList.toggle("open");
  overlay?.classList.toggle("show");
}

function toggleDesktopDropdown(e) {
  e.stopPropagation();
  document.getElementById("desktopDropdown")?.classList.toggle("active");
}

function toggleMobileDropdown(e) {
  e.stopPropagation();
  document.getElementById("mobileDropdown")?.classList.toggle("active");
}

// Close on outside click
document.addEventListener("click", (e) => {
  document.querySelectorAll(".dropdown").forEach((d) => {
    if (!d.contains(e.target)) d.classList.remove("active");
  });
});
