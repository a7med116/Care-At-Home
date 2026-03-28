// ===== TOAST NOTIFICATION SYSTEM =====
function showToast(type, title, message) {
  // إزالة أي toast قديم
  const oldToast = document.getElementById("toast-notification");
  if (oldToast) oldToast.remove();

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };

  const toast = document.createElement("div");
  toast.id = "toast-notification";
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: white;
    border-radius: 16px;
    padding: 20px 28px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 320px;
    z-index: 10000;
    border-right: 5px solid ${colors[type]};
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    font-family: 'Segoe UI', Tahoma, sans-serif;
  `;

  toast.innerHTML = `
    <div style="
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: ${colors[type]}15;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      flex-shrink: 0;
    ">${icons[type]}</div>
    <div style="flex: 1;">
      <h4 style="
        margin: 0 0 6px 0;
        color: #1f2937;
        font-size: 17px;
        font-weight: 700;
      ">${title}</h4>
      <p style="
        margin: 0;
        color: #6b7280;
        font-size: 14px;
        line-height: 1.5;
      ">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" style="
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      font-size: 20px;
      padding: 4px;
      line-height: 1;
      transition: color 0.2s;
    " onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#9ca3af'">×</button>
  `;

  document.body.appendChild(toast);

  // Animation in
  requestAnimationFrame(() => {
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.style.transform = "translateX(-50%) translateY(-100px)";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// ===== GOOGLE TRANSLATE =====
// ... باقي الكود زي ما هو
// ===== TOAST NOTIFICATION SYSTEM =====
function showToast(type, title, message) {
  const oldToast = document.getElementById("toast-notification");
  if (oldToast) oldToast.remove();

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };

  const toast = document.createElement("div");
  toast.id = "toast-notification";
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: white;
    border-radius: 16px;
    padding: 20px 28px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 320px;
    z-index: 10000;
    border-right: 5px solid ${colors[type]};
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    font-family: 'Segoe UI', Tahoma, sans-serif;
  `;

  toast.innerHTML = `
    <div style="
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: ${colors[type]}15;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      flex-shrink: 0;
    ">${icons[type]}</div>
    <div style="flex: 1;">
      <h4 style="margin: 0 0 6px 0; color: #1f2937; font-size: 17px; font-weight: 700;">${title}</h4>
      <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" style="background: none; border: none; color: #9ca3af; cursor: pointer; font-size: 20px; padding: 4px;">×</button>
  `;

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toast.style.transform = "translateX(-50%) translateY(-100px)";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// ===== GOOGLE TRANSLATE =====
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


// ===== PASSWORD TOGGLE =====
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

// ===== INFO ITEMS SELECTION =====
document.querySelectorAll(".info-item").forEach((item) => {
  item.addEventListener("click", function () {
    document
      .querySelectorAll(".info-item")
      .forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
});

// ===== INPUT ANIMATIONS =====
document.querySelectorAll(".form-input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });
  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});

// ===== FORM SUBMISSION =====
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value;
    const btn = document.querySelector(".login-btn");

    if (!name || !password) {
      showToast("warning", "حقول ناقصة", "يرجى إدخال الاسم وكلمة المرور");
      return;
    }

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الدخول...';
    btn.disabled = true;

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: name, password }), // 👈 الحل هنا
      });

      const data = await response.json();

      if (!response.ok) {
        showToast("error", "فشل الدخول", data.message || "البيانات غلط");
        btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> تسجيل الدخول';
        btn.disabled = false;
        return;
      }

      localStorage.setItem("cah_token", data.token);
      localStorage.setItem("cah_user", JSON.stringify(data.user));

      showToast("success", "تم بنجاح!", `أهلاً ${data.user.name} ❤️`);

      btn.innerHTML = '<i class="fas fa-check"></i> مرحباً بك';
      btn.style.background =
        "linear-gradient(135deg, #10b981 0%, #34d399 100%)";

      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1500);
    } catch (err) {
      showToast(
        "error",
        "خطأ في السيرفر",
        "تأكد إن السيرفر شغال على port 3000",
      );
      btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> تسجيل الدخول';
      btn.disabled = false;
    }
  });
