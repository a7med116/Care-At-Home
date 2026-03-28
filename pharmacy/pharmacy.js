/* ════════════════════════════════════════════════════
   CARE AT HOME — PHARMACY JS
   Cart · Checkout · Quick View · Filter · Search · Timer
   ════════════════════════════════════════════════════ */

/* ══ SIDEBAR ══════════════════════════════════════════ */
function showsidebar() {
  document.querySelector(".sidebar").classList.add("active");
}
function hidesidebar() {
  document.querySelector(".sidebar").classList.remove("active");
}

/* ══ GOOGLE TRANSLATE ══════════════════════════════════ */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: "en", includedLanguages: "en,ar" },
    "google_translate_element"
  );
}
function changeLanguage(lang) {
  var select = document.querySelector(".goog-te-combo");
  if (select) { select.value = lang; select.dispatchEvent(new Event("change")); }
}
var gtScript = document.createElement("script");
gtScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(gtScript);

var currentLang = "en";
var toggleBtn = document.getElementById("lang-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    if (currentLang === "en") {
      changeLanguage("ar"); currentLang = "ar"; toggleBtn.textContent = "en";
    } else {
      changeLanguage("en"); currentLang = "en"; toggleBtn.textContent = "ar";
    }
  });
}

/* ══ FLASH SALE TIMER ══════════════════════════════════ */
(function () {
  var end = new Date();
  end.setHours(end.getHours() + 8, end.getMinutes() + 34, end.getSeconds() + 12);

  function updateTimer() {
    var now = new Date(), diff = end - now;
    if (diff <= 0) { clearInterval(timerInterval); return; }
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    var hEl = document.getElementById("flashH");
    var mEl = document.getElementById("flashM");
    var sEl = document.getElementById("flashS");
    if (hEl) hEl.textContent = String(h).padStart(2, "0");
    if (mEl) mEl.textContent = String(m).padStart(2, "0");
    if (sEl) sEl.textContent = String(s).padStart(2, "0");
  }
  updateTimer();
  var timerInterval = setInterval(updateTimer, 1000);
})();

/* ══ TOAST ════════════════════════════════════════════ */
var toastTimeout;
function showToast(msg, icon) {
  var t = document.getElementById("toast");
  if (!t) return;
  t.innerHTML = (icon || "✅") + " " + msg;
  t.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove("show"), 3000);
}

/* ══ CART STATE ══════════════════════════════════════ */
var cart = [];  // [{id, name, price, img, qty}]

function cartKey(name, price) { return name + "_" + price; }

/* ══ ADD TO CART ════════════════════════════════════ */
function addToCart(e, name, priceStr, img, cat, qty) {
  if (e) e.preventDefault();
  var price = parseFloat(priceStr);
  var quantity = qty || 1;
  var key = cartKey(name, priceStr);
  var existing = cart.find(i => i.id === key);
  if (existing) {
    existing.qty += quantity;
    showToast(name + " quantity updated 🛒");
  } else {
    cart.push({ id: key, name: name, price: price, img: img, qty: quantity, cat: cat || "" });
    showToast(name + " added to cart 🛒");
  }
  updateCartUI();
  // bounce badge
  var badge = document.getElementById("cartBadge");
  if (badge) {
    badge.style.transform = "scale(1.5)";
    setTimeout(() => badge.style.transform = "scale(1)", 300);
  }
}

/* ══ REMOVE FROM CART ════════════════════════════════ */
function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
  showToast("Item removed from cart", "🗑️");
}

/* ══ CHANGE QTY ═════════════════════════════════════ */
function changeQty(id, delta) {
  var item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  updateCartUI();
}

/* ══ CLEAR CART ═════════════════════════════════════ */
function clearCart() {
  cart = [];
  updateCartUI();
  showToast("Cart cleared", "🗑️");
}

/* ══ UPDATE CART UI ══════════════════════════════════ */
function updateCartUI() {
  var totalItems = cart.reduce((s, i) => s + i.qty, 0);
  var totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  // badge
  var badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = totalItems;

  // count label
  var label = document.getElementById("cartCountLabel");
  if (label) label.textContent = totalItems + " item" + (totalItems !== 1 ? "s" : "");

  // empty state
  var emptyEl = document.getElementById("cartEmpty");
  var footerEl = document.getElementById("cartFooter");
  var itemsEl = document.getElementById("cartItems");

  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = "flex";
    if (footerEl) footerEl.style.display = "none";
    if (itemsEl) itemsEl.innerHTML = '<div class="cart-empty" id="cartEmpty"><i class="fa-solid fa-cart-shopping"></i><p>Your cart is empty</p><span>Add some products to get started!</span></div>';
    return;
  }

  // render items
  if (itemsEl) {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="ci-img" src="${item.img}" alt="${item.name}" onerror="this.src='./image/pharmacy.jpg'"/>
        <div class="ci-info">
          <div class="ci-name">${item.name}</div>
          <div class="ci-price">$${(item.price * item.qty).toFixed(2)}</div>
          <div class="ci-controls">
            <button class="ci-btn" onclick="changeQty('${item.id}', -1)">−</button>
            <span class="ci-qty">${item.qty}</span>
            <button class="ci-btn" onclick="changeQty('${item.id}', 1)">+</button>
            <button class="ci-remove" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
    `).join("");
  }

  // totals
  var sub = document.getElementById("cartSubtotal");
  var tot = document.getElementById("cartTotal");
  if (sub) sub.textContent = "$" + totalPrice.toFixed(2);
  if (tot) tot.textContent = "$" + totalPrice.toFixed(2);
  if (footerEl) footerEl.style.display = "block";
}

/* ══ OPEN / CLOSE CART ══════════════════════════════ */
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

/* ══ CHECKOUT ════════════════════════════════════════ */
function checkout() {
  if (cart.length === 0) { showToast("Your cart is empty!", "⚠️"); return; }
  closeCart();

  // build summary
  var summary = document.getElementById("modalSummary");
  if (summary) {
    var total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    summary.innerHTML =
      cart.map(i => `<div class="mos-item"><span>${i.name} × ${i.qty}</span><em>$${(i.price * i.qty).toFixed(2)}</em></div>`).join("") +
      `<div class="mos-total"><span>Total</span><strong>$${total.toFixed(2)}</strong></div>`;
  }
  document.getElementById("checkoutModal").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("active");
  document.body.style.overflow = "";
}

/* ══ CONFIRM ORDER ═══════════════════════════════════ */
function confirmOrder() {
  var name    = document.getElementById("orderName").value.trim();
  var phone   = document.getElementById("orderPhone").value.trim();
  var address = document.getElementById("orderAddress").value.trim();
  var payment = document.getElementById("orderPayment").value;

  if (!name)    { shakeField("orderName");    showToast("Please enter your full name", "⚠️"); return; }
  if (!phone)   { shakeField("orderPhone");   showToast("Please enter your phone number", "⚠️"); return; }
  if (!address) { shakeField("orderAddress"); showToast("Please enter your delivery address", "⚠️"); return; }
  if (!payment) { shakeField("orderPayment"); showToast("Please select a payment method", "⚠️"); return; }

  // success
  var total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById("successMsg").textContent =
    "Order confirmed for " + name + "! Total: $" + total.toFixed(2) + ". Our pharmacist will call " + phone + " shortly.";

  closeCheckout();
  document.getElementById("successModal").classList.add("active");

  // clear cart
  cart = [];
  updateCartUI();

  // reset form
  ["orderName","orderPhone","orderAddress"].forEach(id => { var el = document.getElementById(id); if(el) el.value = ""; });
  var pay = document.getElementById("orderPayment"); if(pay) pay.value = "";
}

function shakeField(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = "#ef4444";
  el.style.animation = "shake .3s ease";
  setTimeout(() => { el.style.borderColor = ""; el.style.animation = ""; }, 700);
}

function closeSuccess() {
  document.getElementById("successModal").classList.remove("active");
  document.body.style.overflow = "";
}

/* ══ QUICK VIEW ══════════════════════════════════════ */
var qvCurrentProduct = {};
function quickView(e, name, desc, price, img, badge) {
  if (e) e.preventDefault();
  qvCurrentProduct = { name, desc, price, img, badge };

  document.getElementById("qvName").textContent   = name;
  document.getElementById("qvDesc").textContent   = desc;
  document.getElementById("qvImg").src            = img;
  document.getElementById("qvPrice").textContent  = "$" + parseFloat(price).toFixed(2);
  document.getElementById("qvBadge").textContent  = badge ? "SAVE " + badge : "";
  document.getElementById("qvQtyVal").textContent = 1;

  var btn = document.getElementById("qvCartBtn");
  if (btn) btn.onclick = function () {
    var qty = parseInt(document.getElementById("qvQtyVal").textContent) || 1;
    addToCart(null, name, price, img, "", qty);
    closeQV();
    openCart();
  };

  document.getElementById("quickViewModal").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeQV() {
  document.getElementById("quickViewModal").classList.remove("active");
  document.body.style.overflow = "";
}
function qvQty(delta) {
  var el = document.getElementById("qvQtyVal");
  var val = parseInt(el.textContent) + delta;
  if (val < 1) val = 1;
  if (val > 99) val = 99;
  el.textContent = val;
}

/* ══ FILTER PRODUCTS ═════════════════════════════════ */
function filterProducts(cat, btn) {
  // update active filter btn
  if (btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  } else {
    document.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.filter === cat);
    });
  }

  var cards = document.querySelectorAll(".offers .off");
  var visible = 0;
  cards.forEach(card => {
    var match = cat === "all" || card.dataset.cat === cat;
    card.style.display = match ? "" : "none";
    if (match) visible++;
  });

  var noRes = document.getElementById("noResults");
  if (noRes) noRes.style.display = visible === 0 ? "block" : "none";

  // scroll to products
  var grid = document.getElementById("productsGrid");
  if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ══ SEARCH PRODUCTS ═════════════════════════════════ */
function filterBySearch() {
  var q = document.getElementById("productSearch").value.toLowerCase().trim();
  var cards = document.querySelectorAll(".offers .off");
  var visible = 0;

  // reset filter btns to "all"
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  var allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.classList.add("active");

  cards.forEach(card => {
    var name = (card.dataset.name || "").toLowerCase();
    var h3   = (card.querySelector("h3") || {}).textContent?.toLowerCase() || "";
    var p    = (card.querySelector("p")  || {}).textContent?.toLowerCase() || "";
    var match = !q || name.includes(q) || h3.includes(q) || p.includes(q);
    card.style.display = match ? "" : "none";
    if (match) visible++;
  });

  var noRes = document.getElementById("noResults");
  if (noRes) noRes.style.display = visible === 0 ? "block" : "none";
}

/* ══ PRESCRIPTION TOAST ══════════════════════════════ */
function showRxToast() {
  showToast("Upload feature coming soon! Call us: +20 1234 567890", "📋");
}

/* ══ NEWSLETTER ══════════════════════════════════════ */
function subscribeNl() {
  var input = document.getElementById("nlEmail");
  var email = input ? input.value.trim() : "";
  if (!email || !email.includes("@")) {
    showToast("Please enter a valid email address", "⚠️"); return;
  }
  input.value = "";
  showToast("Subscribed! Welcome to Care At Home 💊");
}

/* ══ SCROLL REVEAL ════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(
    ".off, .images, .div, .locals, .pharmacy, .cat-card, .promo-card, .rx-step"
  ).forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity .45s ease ${(i % 8) * 0.06}s, transform .45s ease ${(i % 8) * 0.06}s`;
    observer.observe(el);
  });

  // init cart UI
  updateCartUI();
});

/* ══ KEYBOARD ESC TO CLOSE MODALS ════════════════════ */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeCart(); closeCheckout(); closeSuccess(); closeQV();
  }
});

/* ══ CSS SHAKE KEYFRAME (injected) ══════════════════ */
var style = document.createElement("style");
style.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`;
document.head.appendChild(style);
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
