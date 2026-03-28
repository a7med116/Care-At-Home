const medicationsData = [
  {
    id: 1,
    name: "Paracetamol",
    category: "Pain Relief",
    genericName: "Acetaminophen",
    dosage: "500-1000mg every 4-6 hours",
    maxDaily: "4000mg",
    uses: "Fever, mild to moderate pain, headache, muscle aches, toothache, back pain",
    sideEffects: "Nausea, stomach upset, liver damage (overdose), rash",
    warnings:
      "Do not exceed 4g/day. Avoid alcohol. Consult doctor if liver disease. Not for prolonged use without medical advice.",
    interactions:
      "Warfarin, alcohol, other acetaminophen products, carbamazepine",
  },
  {
    id: 2,
    name: "Ibuprofen",
    category: "Pain Relief",
    genericName: "Ibuprofen",
    dosage: "200-400mg every 4-6 hours",
    maxDaily: "1200mg (OTC)",
    uses: "Pain, inflammation, fever, menstrual cramps, arthritis, migraine, dental pain",
    sideEffects:
      "Stomach upset, heartburn, dizziness, rash, fluid retention, high blood pressure",
    warnings:
      "Take with food. Avoid if pregnant (3rd trimester). Caution with heart disease, kidney problems, or stroke history.",
    interactions:
      "Aspirin, blood thinners, ACE inhibitors, diuretics, lithium, methotrexate",
  },
  {
    id: 3,
    name: "Amoxicillin",
    category: "Antibiotics",
    genericName: "Amoxicillin",
    dosage: "250-500mg every 8 hours",
    maxDaily: "As prescribed",
    uses: "Bacterial infections, ear infections, strep throat, pneumonia, urinary tract infections, skin infections",
    sideEffects:
      "Diarrhea, nausea, rash, allergic reactions, yeast infections, vomiting",
    warnings:
      "Complete full course even if feeling better. Avoid if allergic to penicillin. May reduce effectiveness of birth control pills.",
    interactions:
      "Probenecid, allopurinol, methotrexate, birth control pills, warfarin, antacids",
  },
  {
    id: 4,
    name: "Azithromycin",
    category: "Antibiotics",
    genericName: "Azithromycin",
    dosage: "500mg day 1, then 250mg daily for 4 days",
    maxDaily: "As prescribed",
    uses: "Respiratory infections, skin infections, ear infections, STIs, pneumonia, bronchitis, sinusitis",
    sideEffects:
      "Nausea, diarrhea, stomach pain, liver problems, irregular heartbeat, allergic reactions",
    warnings:
      "May cause heart rhythm problems (QT prolongation). Avoid with antacids within 2 hours. Not for viral infections.",
    interactions:
      "Warfarin, digoxin, ergotamine, antiarrhythmics, antacids, cyclosporine",
  },
  {
    id: 5,
    name: "Aspirin",
    category: "Cardiac",
    genericName: "Acetylsalicylic Acid",
    dosage: "75-325mg daily (cardiac)",
    maxDaily: "4000mg (pain relief)",
    uses: "Heart attack prevention, stroke prevention, pain, fever, inflammation, blood clot prevention",
    sideEffects:
      "Stomach bleeding, ulcers, ringing in ears, bruising, heartburn, allergic reactions",
    warnings:
      "Never give to children/teens with viral illness (Reye's syndrome). Avoid before surgery. Caution with asthma.",
    interactions:
      "Blood thinners, NSAIDs, methotrexate, steroids, SSRIs, heparin",
  },
  {
    id: 6,
    name: "Atorvastatin",
    category: "Cardiac",
    genericName: "Atorvastatin",
    dosage: "10-80mg once daily at bedtime",
    maxDaily: "80mg",
    uses: "High cholesterol, heart disease prevention, stroke prevention, triglyceride reduction",
    sideEffects:
      "Muscle pain, liver damage, digestive problems, headache, joint pain, memory issues",
    warnings:
      "Avoid grapefruit and grapefruit juice. Report unexplained muscle pain immediately. Regular liver function tests needed.",
    interactions:
      "Grapefruit, cyclosporine, macrolide antibiotics, fibrates, HIV protease inhibitors, warfarin",
  },
  {
    id: 7,
    name: "Metformin",
    category: "Diabetes",
    genericName: "Metformin Hydrochloride",
    dosage: "500mg twice daily with meals",
    maxDaily: "2550mg",
    uses: "Type 2 diabetes, insulin resistance, PCOS, prediabetes, metabolic syndrome",
    sideEffects:
      "Nausea, diarrhea, stomach upset, vitamin B12 deficiency, metallic taste, lactic acidosis (rare)",
    warnings:
      "Stop before surgery/CT scans with contrast dye. Risk of lactic acidosis with kidney/liver disease. Avoid excessive alcohol.",
    interactions:
      "Contrast dyes, alcohol, cimetidine, corticosteroids, diuretics, beta-blockers",
  },
  {
    id: 8,
    name: "Insulin Glargine",
    category: "Diabetes",
    genericName: "Insulin Glargine (Lantus)",
    dosage: "As prescribed by doctor - individualized",
    maxDaily: "Individualized based on blood sugar",
    uses: "Type 1 & 2 diabetes, blood sugar control, diabetic ketoacidosis prevention, gestational diabetes",
    sideEffects:
      "Hypoglycemia (low blood sugar), weight gain, injection site reactions, lipodystrophy, allergic reactions",
    warnings:
      "Monitor blood sugar regularly. Never skip meals. Always carry glucose tablets. Rotate injection sites.",
    interactions:
      "Beta-blockers, alcohol, ACE inhibitors, steroids, thyroid hormones, oral diabetes medications",
  },
  {
    id: 9,
    name: "Omeprazole",
    category: "Digestive",
    genericName: "Omeprazole",
    dosage: "20-40mg once daily before breakfast",
    maxDaily: "40mg (OTC: 20mg for 14 days max)",
    uses: "GERD, acid reflux, stomach ulcers, Zollinger-Ellison syndrome, erosive esophagitis, H. pylori treatment",
    sideEffects:
      "Headache, diarrhea, nausea, vitamin B12 deficiency, magnesium deficiency, bone fractures (long-term), C. difficile infection",
    warnings:
      "Long-term use (>1 year) may increase fracture risk, kidney disease, and certain infections. Don't use >14 days OTC without doctor.",
    interactions:
      "Clopidogrel, ketoconazole, digoxin, methotrexate, iron supplements, calcium, vitamin B12",
  },
  {
    id: 10,
    name: "Loperamide",
    category: "Digestive",
    genericName: "Loperamide",
    dosage: "4mg initially, then 2mg after each loose stool",
    maxDaily: "8mg (OTC)",
    uses: "Diarrhea, travelers' diarrhea, chronic diarrhea, IBS-related diarrhea, reducing stool frequency",
    sideEffects:
      "Constipation, drowsiness, stomach pain, bloating, nausea, dry mouth",
    warnings:
      "Don't use if bloody diarrhea, high fever, or mucus in stool. Not for children under 2. Stop if symptoms persist >48 hours.",
    interactions:
      "Antibiotics, saquinavir, quinidine, ritonavir, grapefruit, CYP3A4 inhibitors",
  },
  {
    id: 11,
    name: "Salbutamol",
    category: "Respiratory",
    genericName: "Albuterol",
    dosage: "1-2 puffs every 4-6 hours as needed",
    maxDaily: "12 puffs/24 hours",
    uses: "Asthma, COPD, bronchospasm, exercise-induced bronchospasm, wheezing, shortness of breath",
    sideEffects:
      "Tremors, nervousness, headache, rapid heartbeat, palpitations, muscle cramps, hypokalemia",
    warnings:
      "Overuse indicates poor asthma control. Monitor heart rate. May worsen certain heart conditions. Keep for rescue use only.",
    interactions:
      "Beta-blockers, diuretics, digoxin, MAO inhibitors, tricyclic antidepressants, other bronchodilators",
  },
  {
    id: 12,
    name: "Montelukast",
    category: "Respiratory",
    genericName: "Montelukast",
    dosage: "10mg once daily in evening",
    maxDaily: "10mg",
    uses: "Asthma, allergic rhinitis, exercise-induced bronchospasm, seasonal allergies, perennial allergies",
    sideEffects:
      "Headache, stomach pain, mood changes, suicidal thoughts, depression, agitation, sleep disturbances",
    warnings:
      "Report mood changes, depression, or suicidal thoughts immediately. Not for acute asthma attacks. Takes days to weeks for full effect.",
    interactions:
      "Phenytoin, phenobarbital, rifampin, gemfibrozil, certain anticonvulsants",
  },
  {
    id: 13,
    name: "Sertraline",
    category: "Mental Health",
    genericName: "Sertraline",
    dosage: "25-200mg once daily (morning or evening)",
    maxDaily: "200mg",
    uses: "Depression, anxiety disorders, OCD, PTSD, panic disorder, PMDD, social anxiety disorder",
    sideEffects:
      "Nausea, insomnia, sexual dysfunction, headache, diarrhea, dry mouth, sweating, tremor",
    warnings:
      "May increase suicidal thoughts in young adults (under 25). Don't stop suddenly - taper gradually. Avoid alcohol. Takes 4-6 weeks for full effect.",
    interactions:
      "MAO inhibitors, warfarin, NSAIDs, St. John's Wort, tramadol, tryptophan, linezolid",
  },
  {
    id: 14,
    name: "Alprazolam",
    category: "Mental Health",
    genericName: "Alprazolam (Xanax)",
    dosage: "0.25-0.5mg three times daily",
    maxDaily: "4mg",
    uses: "Anxiety disorders, panic disorder, generalized anxiety, social anxiety, short-term stress relief",
    sideEffects:
      "Drowsiness, dizziness, memory problems, dependence, confusion, depression, difficulty speaking",
    warnings:
      "HIGH ADDICTION POTENTIAL. Never mix with alcohol or opioids (can be fatal). Taper slowly when stopping to avoid withdrawal. Short-term use preferred.",
    interactions:
      "Alcohol, opioids, other CNS depressants, grapefruit, ketoconazole, itraconazole, fluoxetine, cimetidine",
  },
  {
    id: 15,
    name: "Vitamin D3",
    category: "Vitamins",
    genericName: "Cholecalciferol",
    dosage: "1000-4000 IU daily",
    maxDaily: "4000 IU (unless prescribed higher)",
    uses: "Bone health, calcium absorption, immune support, mood regulation, osteoporosis prevention, muscle function",
    sideEffects:
      "Nausea, vomiting, poor appetite, constipation, weakness, kidney stones (high doses), hypercalcemia",
    warnings:
      "Don't exceed recommended dose without medical supervision. Regular monitoring needed with high doses. Caution with kidney disease or sarcoidosis.",
    interactions:
      "Thiazide diuretics, digoxin, steroids, orlistat, cholestyramine, certain weight loss drugs",
  },
  {
    id: 16,
    name: "Vitamin B12",
    category: "Vitamins",
    genericName: "Cyanocobalamin",
    dosage: "1000mcg daily (oral) or monthly injection",
    maxDaily: "As prescribed",
    uses: "Pernicious anemia, nerve function, energy production, red blood cell formation, cognitive function",
    sideEffects:
      "Diarrhea, itching, rash, headache, nausea, anxiety, hypokalemia (rapid correction)",
    warnings:
      "May mask folate deficiency. Leber's disease (hereditary optic nerve atrophy) - contraindicated. Monitor potassium with high-dose therapy.",
    interactions:
      "Chloramphenicol, proton pump inhibitors, metformin, colchicine, folic acid (masking effect)",
  },
  {
    id: 17,
    name: "Vitamin C",
    category: "Vitamins",
    genericName: "Ascorbic Acid",
    dosage: "75-90mg daily (higher for smokers)",
    maxDaily: "2000mg",
    uses: "Immune support, collagen synthesis, antioxidant, wound healing, iron absorption, gum health",
    sideEffects:
      "Stomach upset, diarrhea, kidney stones (high doses), nausea, insomnia, headache",
    warnings:
      "High doses may cause kidney stones in susceptible individuals. Stop before certain medical tests. May affect blood sugar readings.",
    interactions:
      "Aluminum-containing antacids, chemotherapy drugs, statins, warfarin, estrogen, protease inhibitors",
  },
  {
    id: 18,
    name: "Cetirizine",
    category: "Allergy",
    genericName: "Cetirizine Hydrochloride",
    dosage: "10mg once daily",
    maxDaily: "10mg",
    uses: "Seasonal allergies, perennial allergies, hay fever, hives, itching, allergic rhinitis, conjunctivitis",
    sideEffects:
      "Drowsiness (less than older antihistamines), dry mouth, headache, fatigue, dizziness, nausea",
    warnings:
      "May cause mild drowsiness - use caution driving. Avoid alcohol. Caution with kidney disease (dose adjustment needed).",
    interactions:
      "Alcohol, other CNS depressants, theophylline, ritonavir, sedatives, muscle relaxants",
  },
  {
    id: 19,
    name: "Loratadine",
    category: "Allergy",
    genericName: "Loratadine",
    dosage: "10mg once daily",
    maxDaily: "10mg",
    uses: "Seasonal allergies, hay fever, hives, allergic rhinitis, itchy eyes, runny nose, sneezing",
    sideEffects:
      "Headache, drowsiness (rare), fatigue, dry mouth, nervousness, stomach pain",
    warnings:
      "Generally non-drowsy but may affect some people. Caution with liver or kidney disease (dose adjustment). Safe for most adults and children over 2.",
    interactions:
      "Ketoconazole, erythromycin, cimetidine, rifampin, phenytoin, St. John's Wort",
  },
  {
    id: 20,
    name: "Epinephrine",
    category: "Allergy",
    genericName: "Epinephrine (Adrenaline)",
    dosage: "0.3mg intramuscular injection (EpiPen)",
    maxDaily: "As needed for emergency",
    uses: "Severe allergic reactions (anaphylaxis), cardiac arrest, severe asthma attacks, anaphylactic shock",
    sideEffects:
      "Rapid heartbeat, tremors, anxiety, headache, sweating, nausea, dizziness, pale skin",
    warnings:
      "EMERGENCY USE ONLY. Inject into outer thigh. Call 911 immediately after use. Check expiration date regularly. Second dose may be needed after 5-15 minutes.",
    interactions:
      "Beta-blockers (may block effect), MAO inhibitors, tricyclic antidepressants, digoxin, certain anesthetics",
  },
  {
    id: 21,
    name: "Prednisone",
    category: "Allergy",
    genericName: "Prednisone",
    dosage: "5-60mg daily (tapering doses common)",
    maxDaily: "As prescribed",
    uses: "Severe allergies, asthma exacerbations, autoimmune diseases, inflammation, skin conditions, arthritis flare-ups",
    sideEffects:
      "Weight gain, mood changes, insomnia, high blood sugar, osteoporosis, immune suppression, fluid retention, acne",
    warnings:
      "Never stop suddenly - must taper. Long-term use requires bone protection and monitoring. Avoid live vaccines. Increased infection risk.",
    interactions:
      "NSAIDs (increased bleeding risk), blood thinners, diabetes medications, vaccines, phenytoin, ketoconazole, diuretics",
  },
  {
    id: 22,
    name: "Magnesium",
    category: "Vitamins",
    genericName: "Magnesium Oxide/Citrate",
    dosage: "200-400mg daily",
    maxDaily: "350mg (supplement) - higher with prescription",
    uses: "Muscle function, nerve function, heart rhythm, bone health, energy production, migraine prevention, constipation",
    sideEffects:
      "Diarrhea, stomach cramps, nausea, low blood pressure (high IV doses), muscle weakness (overdose)",
    warnings:
      "Caution with kidney disease. High doses can cause serious heart rhythm problems. Separate from antibiotics by 2-4 hours.",
    interactions:
      "Antibiotics (tetracyclines, quinolones), bisphosphonates, diuretics, muscle relaxants, blood pressure medications",
  },
  {
    id: 23,
    name: "Omega-3 Fish Oil",
    category: "Vitamins",
    genericName: "EPA/DHA",
    dosage: "1000-4000mg daily",
    maxDaily: "3000-4000mg (under medical supervision)",
    uses: "Heart health, triglyceride reduction, brain function, eye health, inflammation reduction, joint health",
    sideEffects:
      "Fishy aftertaste, nausea, diarrhea, increased bleeding risk (high doses), blood sugar elevation",
    warnings:
      "Stop before surgery (bleeding risk). Quality varies by brand. May increase LDL slightly. Caution with fish/shellfish allergy.",
    interactions:
      "Blood thinners, blood pressure medications, contraceptives, orlistat, vitamin E",
  },
  {
    id: 24,
    name: "Calcium Carbonate",
    category: "Vitamins",
    genericName: "Calcium Carbonate",
    dosage: "500-1200mg daily (elemental calcium)",
    maxDaily: "2500mg",
    uses: "Bone health, osteoporosis prevention, heart rhythm, muscle function, nerve transmission, antacid",
    sideEffects:
      "Constipation, bloating, gas, kidney stones (high doses), dry mouth, frequent urination",
    warnings:
      "Take with food for best absorption. Space 2 hours from other medications. Caution with kidney stones history or hypercalcemia.",
    interactions:
      "Thyroid medications, antibiotics, iron supplements, osteoporosis medications, diuretics, heart medications",
  },
];

let currentCategory = "all";
let searchTerm = "";

function renderMedications() {
  const grid = document.getElementById("meds-grid");
  const noResults = document.getElementById("meds-no-results");
  const countLabel = document.getElementById("meds-count");

  if (!grid) return;

  let filtered = medicationsData.filter((med) => {
    const matchesCategory =
      currentCategory === "all" || med.category === currentCategory;
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.uses.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  countLabel.textContent = filtered.length;

  if (filtered.length === 0) {
    grid.style.display = "none";
    noResults.style.display = "block";
  } else {
    grid.style.display = "grid";
    noResults.style.display = "none";

    grid.innerHTML = filtered
      .map(
        (med) => `
      <div class="med-card" onclick="showMedModal(${med.id})">
        <div class="med-card-header">
          <span class="med-category">${med.category}</span>
          <h3 class="med-name">${med.name}</h3>
          <p class="med-generic">${med.genericName}</p>
        </div>
        <div class="med-card-body">
          <p class="med-uses"><i class="fa-solid fa-check-circle"></i> ${med.uses.substring(0, 60)}...</p>
          <p class="med-dosage"><i class="fa-solid fa-pills"></i> ${med.dosage}</p>
        </div>
        <div class="med-card-footer">
          <span class="click-hint">Click for full details <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    `,
      )
      .join("");
  }
}

function showMedModal(medId) {
  const med = medicationsData.find((m) => m.id === medId);
  if (!med) return;

  const modalHeader = document.getElementById("med-modal-header");
  const modalBody = document.getElementById("med-modal-body");

  modalHeader.innerHTML = `
    <span class="med-modal-category">${med.category}</span>
    <h2 class="med-modal-name">${med.name}</h2>
    <p class="med-modal-generic">${med.genericName}</p>
  `;

  modalBody.innerHTML = `
    <div class="med-detail-section dosage">
      <h4><i class="fa-solid fa-syringe"></i> Dosage & Administration</h4>
      <p><strong>Standard:</strong> ${med.dosage}<br><strong>Maximum Daily:</strong> ${med.maxDaily}</p>
    </div>

    <div class="med-detail-section uses">
      <h4><i class="fa-solid fa-bullseye"></i> Uses & Indications</h4>
      <p>${med.uses}</p>
    </div>

    <div class="med-detail-section side-effects">
      <h4><i class="fa-solid fa-triangle-exclamation"></i> Side Effects</h4>
      <p>${med.sideEffects}</p>
    </div>

    <div class="med-detail-section warnings">
      <h4><i class="fa-solid fa-shield-halved"></i> Warnings & Precautions</h4>
      <p>${med.warnings}</p>
    </div>

    <div class="med-detail-section interactions">
      <h4><i class="fa-solid fa-flask"></i> Drug Interactions</h4>
      <p>${med.interactions}</p>
    </div>
  `;

  const overlay = document.getElementById("med-modal-overlay");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMedModal(event) {
  if (
    event &&
    event.target !== document.getElementById("med-modal-overlay") &&
    event.target !== document.querySelector(".med-modal-close")
  ) {
    return;
  }

  const overlay = document.getElementById("med-modal-overlay");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function setMedCat(btn, category) {
  document
    .querySelectorAll(".meds-cat-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  currentCategory = category;
  renderMedications();
}

function filterMeds(value) {
  searchTerm = value;
  const clearBtn = document.getElementById("meds-clear-btn");
  clearBtn.style.display = value.length > 0 ? "flex" : "none";
  renderMedications();
}

function clearMedSearch() {
  document.getElementById("meds-search-input").value = "";
  searchTerm = "";
  document.getElementById("meds-clear-btn").style.display = "none";
  renderMedications();
}

// Close modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeMedModal();
  }
});

// Initial render
renderMedications();
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
