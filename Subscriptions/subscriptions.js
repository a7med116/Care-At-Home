/* ════════════════════════════════════════════════════════════
   CARE AT HOME — SUBSCRIPTIONS PAGE
   subscriptions.js  (استبدل الملف القديم بالكامل بالملف ده)
   ════════════════════════════════════════════════════════════ */

import { initializeApp }                                from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc,
         serverTimestamp, collection, addDoc }          from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged }                  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/* ── Firebase Config ───────────────────────────────────── */
const firebaseConfig = {
  apiKey:            "PASTE_YOUR_API_KEY_HERE",
  authDomain:        "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId:         "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket:     "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId:             "PASTE_YOUR_APP_ID_HERE"
};

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

/* ═══════════════════════════
   PLANS CONFIG
   ═══════════════════════════ */
const PLANS = {
  free: { name:"Free",  monthlyPrice:0,   yearlyPrice:0,  redirect:"../Get-Started/get-started.html" },
  pro:  { name:"Pro",   monthlyPrice:20,  yearlyPrice:17, redirect:"../Payment/payment.html" },
  max:  { name:"Max",   monthlyPrice:100, yearlyPrice:85, redirect:"../payment/max.html" }
};

let currentUser   = null;
let billingPeriod = "yearly";

/* ═══════════════════════════
   AUTH
   ═══════════════════════════ */
onAuthStateChanged(auth, async function(user) {
  currentUser = user;
  if (user) await loadUserPlan(user.uid);
});

async function loadUserPlan(uid) {
  try {
    const snap = await getDoc(doc(db, "subscriptions", uid));
    if (!snap.exists()) return;
    const data = snap.data();
    highlightCurrentPlan(data.plan, data.billingPeriod);
  } catch(e) { console.warn(e); }
}

function highlightCurrentPlan(plan, period) {
  const planKeys = ["free","pro","max"];
  document.querySelectorAll(".card").forEach(function(card, i) {
    card.querySelector(".current-badge") && card.querySelector(".current-badge").remove();
    if (planKeys[i] === plan) {
      var badge = document.createElement("div");
      badge.className = "current-badge";
      badge.textContent = "Your Current Plan";
      badge.style.cssText = "display:inline-block;background:#2a7c5c;color:#5eead4;padding:4px 14px;border-radius:4px;font-size:12px;font-weight:600;margin-bottom:12px;";
      card.querySelector(".card-header").prepend(badge);
      var btn = card.querySelector(".cta-button");
      if (btn) btn.textContent = "Current Plan";
    }
  });
  if (plan === "pro") { billingPeriod = period || "yearly"; updateToggleUI(); }
}

/* ═══════════════════════════
   DOM READY
   ═══════════════════════════ */
document.addEventListener("DOMContentLoaded", function() {

  /* -- Billing Toggle -- */
  document.querySelectorAll(".toggle-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      billingPeriod = this.textContent.trim().toLowerCase();
      document.querySelectorAll(".toggle-btn").forEach(function(b){ b.classList.remove("active"); });
      this.classList.add("active");
      updateProPrice();
    });
  });

  /* -- CTA Buttons -- */
  bindCTAButtons();

  /* -- Google Translate -- */
  initTranslate();
});

function updateToggleUI() {
  document.querySelectorAll(".toggle-btn").forEach(function(btn){
    btn.classList.toggle("active", btn.textContent.trim().toLowerCase() === billingPeriod);
  });
  updateProPrice();
}

function updateProPrice() {
  var proCard = document.querySelectorAll(".card")[1];
  if (!proCard) return;
  var priceEl  = proCard.querySelector(".price");
  var labelEl  = proCard.querySelector(".price-label");
  var saveBadge = proCard.querySelector(".save-badge");
  if (billingPeriod === "monthly") {
    if (priceEl)   priceEl.textContent = "$20";
    if (labelEl)   labelEl.innerHTML   = "USD /month<br>billed monthly";
    if (saveBadge) saveBadge.style.display = "none";
  } else {
    if (priceEl)   priceEl.textContent = "$17";
    if (labelEl)   labelEl.innerHTML   = "USD /month<br>billed annually";
    if (saveBadge) saveBadge.style.display = "inline-block";
  }
}

/* ═══════════════════════════
   CTA BUTTONS
   ═══════════════════════════ */
function bindCTAButtons() {
  var planKeys = ["free","pro","max"];
  document.querySelectorAll(".card").forEach(function(card, i) {
    var btn = card.querySelector(".cta-button");
    if (!btn) return;
    var fresh = btn.cloneNode(true);
    btn.replaceWith(fresh);
    fresh.addEventListener("click", async function(e) {
      e.preventDefault();
      var planKey = planKeys[i];
      var plan    = PLANS[planKey];
      var me      = this;
      var orig    = me.textContent;
      me.textContent = "Loading...";
      me.disabled    = true;
      try {
        if (!currentUser && planKey !== "free") {
          sessionStorage.setItem("selectedPlan",  planKey);
          sessionStorage.setItem("billingPeriod", billingPeriod);
          window.location.href = "../Get-Started/get-started.html?redirect=subscription&plan=" + planKey;
          return;
        }
        await saveSubscription(planKey, plan);
        window.location.href = plan.redirect;
      } catch(err) {
        console.error(err);
        showToast("Something went wrong. Please try again.", "error");
        me.textContent = orig;
        me.disabled    = false;
      }
    });
  });
}

async function saveSubscription(planKey, plan) {
  var price = billingPeriod === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
  var docId  = currentUser ? currentUser.uid : "anon_" + Date.now();

  await setDoc(doc(db, "subscriptions", docId), {
    plan:          planKey,
    planName:      plan.name,
    billingPeriod: billingPeriod,
    price:         price,
    currency:      "USD",
    status:        planKey === "free" ? "active" : "pending_payment",
    userId:        currentUser ? currentUser.uid  : null,
    userEmail:     currentUser ? currentUser.email : null,
    selectedAt:    serverTimestamp()
  }, { merge: true });

  await addDoc(collection(db, "subscription_events"), {
    planKey, billingPeriod, price,
    userId:    currentUser ? currentUser.uid : null,
    timestamp: serverTimestamp()
  });
}

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


/* ═══════════════════════════
   TOAST
   ═══════════════════════════ */
function showToast(msg, type) {
  var t = document.getElementById("sub-toast");
  if (t) t.remove();
  t = document.createElement("div");
  t.id = "sub-toast";
  t.textContent = msg;
  t.style.cssText = "position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:" +
    (type==="error"?"#e24b4a":"#2a7c5c") +
    ";color:#fff;padding:14px 28px;border-radius:8px;font-size:14px;font-weight:600;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.3);";
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 3500);
}
