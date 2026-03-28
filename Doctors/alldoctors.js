// ===== DOCTORS DATA =====
const doctors = [
  {
    id: 1,
    name: "Dr. James Harrison",
    spec: "Cardiology",
    title: "Cardiovascular Medicine & Heart Surgery",
    emoji: "👨‍⚕️",
    gender: "male",
    exp: 18,
    rating: 4.9,
    reviews: 342,
    price: 180,
    avail: "today",
    tags: ["Heart Failure", "Arrhythmia", "Preventive Care"],
    insurance: true,
  },
  {
    id: 2,
    name: "Dr. Sarah Mitchell",
    spec: "Neurology",
    title: "Brain & Spinal Cord Disorders",
    emoji: "👩‍⚕️",
    gender: "female",
    exp: 14,
    rating: 4.8,
    reviews: 289,
    price: 200,
    avail: "today",
    tags: ["Migraine", "Epilepsy", "Stroke"],
    insurance: true,
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    spec: "Orthopedics",
    title: "Bone, Joint & Muscle Surgery",
    emoji: "👨‍⚕️",
    gender: "male",
    exp: 22,
    rating: 4.9,
    reviews: 418,
    price: 220,
    avail: "tomorrow",
    tags: ["Joint Replacement", "Sports Injury", "Spine"],
    insurance: false,
  },
  {
    id: 4,
    name: "Dr. Emily Clarke",
    spec: "Dermatology",
    title: "Skin, Hair & Nail Conditions",
    emoji: "👩‍⚕️",
    gender: "female",
    exp: 10,
    rating: 4.7,
    reviews: 196,
    price: 150,
    avail: "today",
    tags: ["Acne", "Eczema", "Cosmetic"],
    insurance: true,
  },
  {
    id: 5,
    name: "Dr. Robert Kim",
    spec: "Internal Medicine",
    title: "General Internal Medicine & Diagnostics",
    emoji: "👨‍⚕️",
    gender: "male",
    exp: 16,
    rating: 4.8,
    reviews: 267,
    price: 130,
    avail: "today",
    tags: ["Diabetes", "Hypertension", "Thyroid"],
    insurance: true,
  },
  {
    id: 6,
    name: "Dr. Nora Thompson",
    spec: "Pediatrics",
    title: "Child & Adolescent Medicine",
    emoji: "👩‍⚕️",
    gender: "female",
    exp: 12,
    rating: 4.9,
    reviews: 314,
    price: 140,
    avail: "today",
    tags: ["Child Growth", "Vaccines", "Infections"],
    insurance: true,
  },
  {
    id: 7,
    name: "Dr. William Foster",
    spec: "Ophthalmology",
    title: "Eye Surgery & Vision Care",
    emoji: "👨‍⚕️",
    gender: "male",
    exp: 20,
    rating: 4.7,
    reviews: 231,
    price: 170,
    avail: "later",
    tags: ["Cataracts", "Glaucoma", "LASIK"],
    insurance: false,
  },
  {
    id: 8,
    name: "Dr. Layla Hassan",
    spec: "Psychiatry",
    title: "Mental Health & Behavioral Medicine",
    emoji: "👩‍⚕️",
    gender: "female",
    exp: 11,
    rating: 4.8,
    reviews: 178,
    price: 160,
    avail: "tomorrow",
    tags: ["Anxiety", "Depression", "ADHD"],
    insurance: true,
  },
  {
    id: 9,
    name: "Dr. Carlos Rivera",
    spec: "Cardiology",
    title: "Interventional Cardiology",
    emoji: "👨‍⚕️",
    gender: "male",
    exp: 25,
    rating: 5.0,
    reviews: 502,
    price: 250,
    avail: "later",
    tags: ["Angioplasty", "Stents", "Cardiac Rehab"],
    insurance: true,
  },
  {
    id: 10,
    name: "Dr. Priya Sharma",
    spec: "Neurology",
    title: "Cognitive Neurology & Memory",
    emoji: "👩‍⚕️",
    gender: "female",
    exp: 9,
    rating: 4.6,
    reviews: 145,
    price: 190,
    avail: "today",
    tags: ["Alzheimer's", "Memory Loss", "Dementia"],
    insurance: false,
  },
  {
    id: 11,
    name: "Dr. Daniel Brooks",
    spec: "Orthopedics",
    title: "Sports Medicine & Rehabilitation",
    emoji: "👨‍⚕️",
    gender: "male",
    exp: 15,
    rating: 4.8,
    reviews: 298,
    price: 195,
    avail: "today",
    tags: ["ACL", "Physical Therapy", "Fractures"],
    insurance: true,
  },
  {
    id: 12,
    name: "Dr. Amira Johnson",
    spec: "Dermatology",
    title: "Clinical & Cosmetic Dermatology",
    emoji: "👩‍⚕️",
    gender: "female",
    exp: 8,
    rating: 4.7,
    reviews: 162,
    price: 145,
    avail: "tomorrow",
    tags: ["Psoriasis", "Skin Cancer", "Botox"],
    insurance: true,
  },
];

// ===== STATE =====
let activeFilter = "all";
let currentDoctor = null;

// ===== RENDER =====
function renderDoctors(list) {
  const grid = document.getElementById("doctors-grid");
  const noRes = document.getElementById("no-results");
  document.getElementById("result-count").textContent = list.length;

  if (list.length === 0) {
    grid.innerHTML = "";
    noRes.classList.add("show");
    return;
  }

  noRes.classList.remove("show");

  grid.innerHTML = list
    .map((d) => {
      const stars =
        "★".repeat(Math.floor(d.rating)) + (d.rating % 1 >= 0.5 ? "½" : "");
      const availClass =
        d.avail === "today"
          ? "avail-today"
          : d.avail === "tomorrow"
            ? "avail-tomorrow"
            : "avail-later";
      const availText =
        d.avail === "today"
          ? "✓ Available Today"
          : d.avail === "tomorrow"
            ? "Available Tomorrow"
            : "Book Ahead";
      const avatarClass = d.gender === "female" ? "female-avatar" : "";

      return `
            <div class="doctor-card">
              <span class="avail-badge ${availClass}">${availText}</span>
              <div class="doc-avatar ${avatarClass}">${d.emoji}</div>
              <div class="doc-info">
                <div class="doc-name">${d.name}</div>
                <div class="doc-spec">${d.spec}</div>
                <div class="doc-rating">
                  <span class="stars">${stars}</span>
                  <span class="rating-num">${d.rating}</span>
                  <span class="reviews-count">(${d.reviews} reviews)</span>
                </div>
                <div class="doc-tags">
                  ${d.tags.map((t) => `<span class="doc-tag">${t}</span>`).join("")}
                </div>
              </div>
              <div class="doc-meta">
                <div class="meta-item">
                  <span class="meta-val">${d.exp}+</span>
                  <span class="meta-label">Years Exp.</span>
                </div>
                <div class="meta-item">
                  <span class="meta-val">${d.reviews}</span>
                  <span class="meta-label">Reviews</span>
                </div>
                <div class="meta-item">
                  <span class="meta-val" style="color:${d.insurance ? "#3a7d00" : "var(--second)"};font-size:0.85rem">${d.insurance ? "✓ Insur." : "Self-pay"}</span>
                  <span class="meta-label">Insurance</span>
                </div>
              </div>
              <div class="doc-price">
                <div class="price-label">Consultation fee</div>
                <span class="price-val">$${d.price}</span>
                <span class="price-per"> / visit</span>
              </div>
              <button class="book-btn" onclick="openBooking(${d.id})">
                <i class="fa-solid fa-calendar-check"></i> Book Appointment
              </button>
            </div>
          `;
    })
    .join("");
}

function filterDoctors() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const sortBy = document.getElementById("sort-select").value;

  let list = doctors.filter((d) => {
    const matchSpec = activeFilter === "all" || d.spec === activeFilter;
    const matchQuery =
      !query ||
      d.name.toLowerCase().includes(query) ||
      d.spec.toLowerCase().includes(query) ||
      d.tags.some((t) => t.toLowerCase().includes(query)) ||
      d.title.toLowerCase().includes(query);
    return matchSpec && matchQuery;
  });

  // Sort
  if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sortBy === "exp") list.sort((a, b) => b.exp - a.exp);

  renderDoctors(list);
}

function setFilter(el, spec) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  activeFilter = spec;
  filterDoctors();
}

// ===== BOOKING =====
function openBooking(id) {
  currentDoctor = doctors.find((d) => d.id === id);
  if (!currentDoctor) return;

  document.getElementById("modal-avatar").textContent = currentDoctor.emoji;
  document.getElementById("modal-avatar").className =
    "modal-avatar" +
    (currentDoctor.gender === "female" ? " female-avatar" : "");
  document.getElementById("modal-doc-name").textContent = currentDoctor.name;
  document.getElementById("modal-doc-spec").textContent =
    currentDoctor.spec + " — " + currentDoctor.title;
  document.getElementById("modal-doc-price").textContent =
    `$${currentDoctor.price} / visit${currentDoctor.insurance ? " · Insurance accepted" : ""}`;

  // Set min date to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("f-date").min = today;
  document.getElementById("f-date").value = today;

  // Reset form
  document.getElementById("booking-form").style.display = "block";
  document.getElementById("success-screen").classList.remove("show");
  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function submitBooking() {
  const name = document.getElementById("f-name").value.trim();
  const phone = document.getElementById("f-phone").value.trim();
  const date = document.getElementById("f-date").value;

  if (!name || !phone || !date) {
    showToast("⚠️ Please fill in all required fields.");
    return;
  }

  // Simulate processing
  document.getElementById("booking-form").style.display = "none";
  document.getElementById("success-screen").classList.add("show");
  showToast(`✓ Appointment booked with ${currentDoctor.name}!`);
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// Close modal on outside click
document
  .getElementById("modal-overlay")
  .addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

// ===== INIT =====
filterDoctors();
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
