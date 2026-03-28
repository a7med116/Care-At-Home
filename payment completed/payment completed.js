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
// Select payment method
        function selectMethod(element) {
            // Remove active class from all items
            document.querySelectorAll('.method-item').forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to clicked item
            element.classList.add('active');
        }

        // Form submission
        document.getElementById('donationForm').addEventListener('submit', function(e) {
            e.preventDefault();

            // Create success message
            const btn = document.querySelector('.donate-btn');
            const originalContent = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-check"></i> Thank You!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                this.reset();
            }, 2000);
        });

        // Input animations
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
