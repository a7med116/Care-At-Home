// ===== DATA =====
const symptomsMap = {
  head: [
    "Headache",
    "Severe migraine",
    "Dizziness",
    "Memory fog",
    "Neck pain",
    "Fever & chills",
    "Visual disturbances",
    "Ear ringing (tinnitus)",
    "Eye pain",
    "Fainting spells",
    "Confusion",
    "Facial numbness",
  ],
  neck: [
    "Sore throat",
    "Difficulty swallowing",
    "Swollen lymph nodes",
    "Hoarse voice",
    "Neck stiffness",
    "Pain on turning",
    "Lumps in neck",
    "Throat tightness",
    "Voice changes",
  ],
  chest: [
    "Chest pain",
    "Shortness of breath",
    "Heart palpitations",
    "Persistent cough",
    "Pain when breathing",
    "Night sweats",
    "Arm or jaw pain",
    "Wheezing",
    "Chest tightness",
    "Coughing blood",
  ],
  abdomen: [
    "Nausea & vomiting",
    "Stomach pain",
    "Heartburn / acid reflux",
    "Diarrhea",
    "Constipation",
    "Bloating",
    "Navel area pain",
    "Loss of appetite",
    "Blood in stool",
    "Unexplained weight loss",
  ],
  arm: [
    "Shoulder pain",
    "Finger numbness",
    "Swollen joints",
    "Muscle weakness",
    "Limited range of motion",
    "Elbow pain",
    "Wrist pain",
    "Tingling in arm",
    "Joint stiffness",
  ],
  pelvis: [
    "Lower back pain",
    "Painful urination",
    "Pelvic pain",
    "Groin pain",
    "Hip pain",
    "Urinary frequency",
    "Bladder issues",
    "Sciatica pain",
  ],
  leg: [
    "Knee pain",
    "Ankle swelling",
    "Leg cramps",
    "Difficulty walking",
    "Varicose veins",
    "Heel / foot pain",
    "Leg numbness",
    "Shin pain",
    "Calf tightness",
  ],
};

const diagnosisMap = {
  head: [
    {
      name: "Tension Headache",
      pct: 74,
      level: "moderate",
      desc: "The most common headache type, typically caused by stress, muscle tension, or fatigue.",
      tags: ["Common", "Treatable", "Self-care"],
    },
    {
      name: "Migraine",
      pct: 58,
      level: "moderate",
      desc: "A neurological condition causing intense, recurring headaches often with nausea and light sensitivity.",
      tags: ["Neurological", "Recurring", "Specialist needed"],
    },
    {
      name: "Hypertensive Headache",
      pct: 35,
      level: "high",
      desc: "Headache caused by elevated blood pressure, typically felt in the back of the head.",
      tags: ["Urgent", "Monitor BP", "Doctor required"],
    },
  ],
  neck: [
    {
      name: "Tonsillitis",
      pct: 78,
      level: "moderate",
      desc: "Inflammation of the tonsils usually caused by viral or bacterial infection.",
      tags: ["Infection", "Common", "Treatable"],
    },
    {
      name: "Laryngitis",
      pct: 55,
      level: "low",
      desc: "Inflammation of the larynx causing hoarseness and voice changes.",
      tags: ["Viral", "Self-limiting", "Rest"],
    },
    {
      name: "Cervical Disc Herniation",
      pct: 32,
      level: "high",
      desc: "Displaced disc in the cervical spine causing neck pain and radiating symptoms.",
      tags: ["Imaging required", "Specialist", "Chronic"],
    },
  ],
  chest: [
    {
      name: "Musculoskeletal Pain",
      pct: 65,
      level: "low",
      desc: "Chest pain originating from muscles, ribs or cartilage, often after physical exertion.",
      tags: ["Common", "Self-limiting", "Monitor"],
    },
    {
      name: "GERD / Acid Reflux",
      pct: 52,
      level: "low",
      desc: "Stomach acid flowing back into the esophagus causing burning chest discomfort.",
      tags: ["Digestive", "Lifestyle", "Manageable"],
    },
    {
      name: "Angina Pectoris",
      pct: 28,
      level: "high",
      desc: "Chest pain due to reduced blood flow to the heart. Requires urgent cardiac evaluation.",
      tags: ["Urgent", "Cardiac", "Emergency possible"],
    },
  ],
  abdomen: [
    {
      name: "Irritable Bowel Syndrome",
      pct: 68,
      level: "low",
      desc: "A common functional digestive disorder causing abdominal pain, bloating and altered bowel habits.",
      tags: ["Chronic", "Manageable", "Common"],
    },
    {
      name: "Peptic Ulcer",
      pct: 45,
      level: "moderate",
      desc: "Sores in the stomach lining often caused by H. pylori bacteria or NSAID use.",
      tags: ["Testing needed", "Treatable", "Antibiotics"],
    },
    {
      name: "Acute Appendicitis",
      pct: 22,
      level: "high",
      desc: "Inflammation of the appendix — a surgical emergency requiring immediate evaluation.",
      tags: ["Emergency", "Surgery", "Urgent"],
    },
  ],
  arm: [
    {
      name: "Bursitis",
      pct: 62,
      level: "moderate",
      desc: "Inflammation of the fluid-filled sacs (bursae) that cushion joints.",
      tags: ["Inflammatory", "Rest & PT", "Common"],
    },
    {
      name: "Carpal Tunnel Syndrome",
      pct: 50,
      level: "moderate",
      desc: "Compression of the median nerve causing hand numbness, tingling and weakness.",
      tags: ["Nerve", "Treatable", "Surgery possible"],
    },
    {
      name: "Rheumatoid Arthritis",
      pct: 30,
      level: "high",
      desc: "An autoimmune condition causing chronic joint inflammation requiring specialist care.",
      tags: ["Autoimmune", "Specialist", "Chronic"],
    },
  ],
  pelvis: [
    {
      name: "Mechanical Back Pain",
      pct: 72,
      level: "low",
      desc: "The most common cause of lower back pain, often related to poor posture or muscle strain.",
      tags: ["Common", "Self-care", "Exercise"],
    },
    {
      name: "Lumbar Disc Herniation",
      pct: 45,
      level: "moderate",
      desc: "A displaced lumbar disc pressing on spinal nerves, causing radiating leg pain (sciatica).",
      tags: ["Imaging needed", "Specialist", "Possible surgery"],
    },
    {
      name: "Urinary Tract Infection",
      pct: 38,
      level: "moderate",
      desc: "Bacterial infection in the urinary system causing pain and frequent urination.",
      tags: ["Infection", "Antibiotics", "Lab test"],
    },
  ],
  leg: [
    {
      name: "Tendinitis",
      pct: 62,
      level: "low",
      desc: "Inflammation of tendons, commonly in the knee or ankle, often from overuse.",
      tags: ["Overuse", "Rest", "Physical therapy"],
    },
    {
      name: "Varicose Veins",
      pct: 50,
      level: "moderate",
      desc: "Enlarged, twisted veins often causing leg heaviness, aching and swelling.",
      tags: ["Vascular", "Manageable", "Evaluation"],
    },
    {
      name: "Deep Vein Thrombosis",
      pct: 25,
      level: "high",
      desc: "A blood clot in a deep vein — a potentially serious condition requiring urgent evaluation.",
      tags: ["Urgent", "Vascular", "Emergency possible"],
    },
  ],
};

const recMap = {
  low: [
    {
      icon: "fa-bed",
      text: "Rest and avoid strenuous activity for 24–48 hours to help your body recover.",
    },
    {
      icon: "fa-droplet",
      text: "Stay well-hydrated and maintain a balanced diet to support immune function.",
    },
    {
      icon: "fa-pills",
      text: "Over-the-counter medications may relieve mild symptoms — follow dosage instructions.",
    },
    {
      icon: "fa-calendar-check",
      text: "Monitor your symptoms. If they worsen or persist beyond 3 days, consult a doctor.",
    },
  ],
  moderate: [
    {
      icon: "fa-user-doctor",
      text: "Schedule an appointment with a primary care physician within the next 24–48 hours.",
    },
    {
      icon: "fa-flask",
      text: "A blood panel or urine test may help identify the underlying cause of your symptoms.",
    },
    {
      icon: "fa-clipboard-list",
      text: "Keep a symptom diary noting when symptoms occur, their intensity and any triggers.",
    },
    {
      icon: "fa-triangle-exclamation",
      text: "If symptoms suddenly worsen or new severe symptoms appear, seek immediate care.",
    },
  ],
  high: [
    {
      icon: "fa-ambulance",
      text: "Seek medical attention urgently. Do not wait if you experience severe or worsening symptoms.",
    },
    {
      icon: "fa-hospital",
      text: "Visit an emergency room or urgent care if you have chest pain, difficulty breathing, or fainting.",
    },
    {
      icon: "fa-phone",
      text: "Call emergency services (123) immediately if you suspect a heart attack, stroke, or severe allergic reaction.",
    },
    {
      icon: "fa-shield-halved",
      text: "Do not drive yourself. Have someone accompany you to the hospital or call for assistance.",
    },
  ],
};

// ===== STATE =====
let currentRegion = null;
let selectedSymptoms = [];

// ===== FUNCTIONS =====
function selectRegion(region) {
  currentRegion = region;
  selectedSymptoms = [];

  // Update SVG
  document
    .querySelectorAll(".body-part")
    .forEach((el) => el.classList.remove("selected"));
  const svgEl = document.getElementById("svg-" + region);
  if (svgEl) svgEl.classList.add("selected");
  // Handle arm (two parts)
  if (region === "arm") {
    document.getElementById("svg-arm-l").classList.add("selected");
    document.getElementById("svg-arm-r").classList.add("selected");
  }

  // Update buttons
  document
    .querySelectorAll(".region-btn")
    .forEach((el) => el.classList.remove("selected"));
  const btn = document.getElementById("rbtn-" + region);
  if (btn) btn.classList.add("selected");

  // Update body label
  const labels = {
    head: "Head & Brain",
    neck: "Neck & Throat",
    chest: "Chest & Heart",
    abdomen: "Abdomen",
    arm: "Arms & Shoulders",
    pelvis: "Pelvis & Back",
    leg: "Legs & Feet",
  };
  document.getElementById("body-label").textContent = "✓ " + labels[region];
  document.getElementById("region-display").textContent = labels[region];

  // Show step 2
  document.getElementById("step2-card").classList.remove("hidden");
  document
    .getElementById("step2-card")
    .scrollIntoView({ behavior: "smooth", block: "center" });

  // Render symptoms
  const syms = symptomsMap[region] || [];
  const container = document.getElementById("symptoms-tags");
  container.innerHTML = syms
    .map(
      (s) =>
        `<button class="symptom-tag" onclick="toggleSymptom(this,'${s}')">${s}</button>`,
    )
    .join("");

  // Update step indicator
  markStep(1);

  // Hide further steps
  document.getElementById("step3-card").classList.add("hidden");
  document.getElementById("results-card").classList.remove("show");
  document.getElementById("results-card").classList.add("hidden");
}

function toggleSymptom(el, sym) {
  el.classList.toggle("selected");
  if (el.classList.contains("selected")) {
    selectedSymptoms.push(sym);
  } else {
    selectedSymptoms = selectedSymptoms.filter((s) => s !== sym);
  }
  // Update count
  const countWrap = document.getElementById("selected-count-wrap");
  const countNum = document.getElementById("selected-count-num");
  if (selectedSymptoms.length > 0) {
    countWrap.classList.remove("hidden");
    countNum.textContent = selectedSymptoms.length;
  } else {
    countWrap.classList.add("hidden");
  }
}

function goToStep3() {
  if (selectedSymptoms.length === 0) {
    alert("Please select at least one symptom to continue.");
    return;
  }
  document.getElementById("step3-card").classList.remove("hidden");
  document
    .getElementById("step3-card")
    .scrollIntoView({ behavior: "smooth", block: "center" });
  markStep(2);
}

function runAnalysis() {
  markStep(3);
  // Show loading
  document.getElementById("step3-card").classList.add("hidden");
  document.getElementById("loading-card").classList.remove("hidden");

  // Animate progress dots
  let dotIdx = 0;
  const dots = document.querySelectorAll(".p-dot");
  const dotInterval = setInterval(() => {
    dots.forEach((d) => d.classList.remove("active"));
    dots[dotIdx % dots.length].classList.add("active");
    dotIdx++;
  }, 300);

  setTimeout(() => {
    clearInterval(dotInterval);
    document.getElementById("loading-card").classList.add("hidden");
    renderResults();
  }, 2500);
}

function renderResults() {
  const conditions = diagnosisMap[currentRegion] || [];
  const severity = parseInt(document.getElementById("severity-slider").value);

  // Determine overall severity
  let overallLevel = "low";
  if (severity >= 7) overallLevel = "high";
  else if (severity >= 4) overallLevel = "moderate";

  // Result title
  const titleMap = {
    head: "Head & Neurological Assessment",
    neck: "Neck & Throat Assessment",
    chest: "Cardiac & Pulmonary Assessment",
    abdomen: "Gastrointestinal Assessment",
    arm: "Musculoskeletal Assessment",
    pelvis: "Pelvic & Spinal Assessment",
    leg: "Lower Limb Assessment",
  };
  document.getElementById("result-title").textContent =
    titleMap[currentRegion] || "Assessment Results";
  document.getElementById("res-symptoms-count").textContent =
    selectedSymptoms.length;

  // Accuracy
  const acc = Math.min(95, 65 + selectedSymptoms.length * 4);
  document.getElementById("res-accuracy").textContent = acc + "%";

  // Severity pill
  const pill = document.getElementById("sev-pill");
  pill.className = "severity-pill";
  if (overallLevel === "high") {
    pill.classList.add("sev-high");
    pill.textContent = "High";
  } else if (overallLevel === "moderate") {
    pill.classList.add("sev-moderate");
    pill.textContent = "Moderate";
  } else {
    pill.classList.add("sev-low");
    pill.textContent = "Mild";
  }

  // Conditions
  const condOut = document.getElementById("conditions-output");
  condOut.innerHTML = conditions
    .map((c) => {
      const rankClass =
        c.pct >= 65 ? "rank-high" : c.pct >= 45 ? "rank-moderate" : "rank-low";
      const barColor =
        c.pct >= 65
          ? "linear-gradient(90deg,#ff4444,#cc0000)"
          : c.pct >= 45
            ? "linear-gradient(90deg,var(--bg),var(--secondary-light))"
            : "linear-gradient(90deg,#0000ff,#6a51ff)";
      return `
            <div class="condition-card">
              <div class="condition-rank ${rankClass}">
                <span class="rank-pct">${c.pct}%</span>
                <span class="rank-pct-label">match</span>
              </div>
              <div class="condition-info">
                <div class="condition-name">${c.name}</div>
                <div class="condition-desc">${c.desc}</div>
                <div class="condition-tags">${c.tags.map((t) => `<span class="condition-tag">${t}</span>`).join("")}</div>
                <div class="match-bar-wrap"><div class="match-bar" style="width:${c.pct}%;background:${barColor}"></div></div>
              </div>
            </div>
          `;
    })
    .join("");

  // Recommendations
  const recs = recMap[overallLevel] || recMap.moderate;
  document.getElementById("rec-list").innerHTML = recs
    .map(
      (r) =>
        `<div class="rec-item"><i class="fa-solid ${r.icon}"></i><span>${r.text}</span></div>`,
    )
    .join("");

  // Show results
  const resCard = document.getElementById("results-card");
  resCard.classList.remove("hidden");
  resCard.classList.add("show");
  resCard.scrollIntoView({ behavior: "smooth", block: "start" });

  markStep(4, true);
}

function markStep(num, final = false) {
  for (let i = 1; i <= 4; i++) {
    const circle = document.getElementById("sc" + i);
    const label = document.getElementById("sl" + i);
    circle.classList.remove("active", "done");
    label.classList.remove("active");
    if (i < num) {
      circle.classList.add("done");
      circle.innerHTML =
        '<i class="fa-solid fa-check" style="font-size:0.8rem"></i>';
    } else if (i === num) {
      circle.classList.add("active");
      circle.textContent = i;
      label.classList.add("active");
    } else {
      circle.textContent = i;
    }
  }
  // Connectors
  for (let i = 1; i <= 3; i++) {
    const con = document.getElementById("con" + i);
    if (i < num) con.classList.add("done");
    else con.classList.remove("done");
  }
}

function resetDiagnosis() {
  currentRegion = null;
  selectedSymptoms = [];
  document
    .querySelectorAll(".body-part")
    .forEach((el) => el.classList.remove("selected"));
  document
    .querySelectorAll(".region-btn")
    .forEach((el) => el.classList.remove("selected"));
  document.getElementById("body-label").textContent = "Click to select";
  document.getElementById("step2-card").classList.add("hidden");
  document.getElementById("step3-card").classList.add("hidden");
  document.getElementById("results-card").classList.remove("show");
  document.getElementById("results-card").classList.add("hidden");
  document.getElementById("selected-count-wrap").classList.add("hidden");
  // Reset step circles
  for (let i = 1; i <= 4; i++) {
    const circle = document.getElementById("sc" + i);
    circle.className = "step-circle" + (i === 1 ? " active" : "");
    circle.textContent = i;
    const label = document.getElementById("sl" + i);
    label.classList.toggle("active", i === 1);
    if (i <= 3) document.getElementById("con" + i).classList.remove("done");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
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

// Show modal after 5 seconds
setTimeout(function () {
  document.getElementById("subscribeModal").classList.add("active");
}, 10000);

// Close modal function
function closeSubscribeModal() {
  document.getElementById("subscribeModal").classList.remove("active");
}

// Close when clicking outside
document
  .getElementById("subscribeModal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closeSubscribeModal();
    }
  });
// ============================================================
// GOOGLE TRANSLATE - LANGUAGE TOGGLE
// ============================================================

// 1. Init Google Translate (مخفي)
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,ar",
      autoDisplay: false,
    },
    "google_translate_element",
  );
}

// 2. تحميل سكريبت جوجل
var gtScript = document.createElement("script");
gtScript.src =
  "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(gtScript);

// 3. زرار التبديل
var currentLang = "en";
var toggleBtn = document.getElementById("lang-toggle");

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
