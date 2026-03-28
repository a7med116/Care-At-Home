// ===== INJECT STYLES =====
(function () {
  const style = document.createElement("style");
  style.textContent = `
    /* ---- Suggestions ---- */
    .search-input-wrap { position: relative; }
    .suggestions-dropdown {
      position: absolute; top: calc(100% + 8px); left: 0; right: 0;
      background: #fff; border: 2px solid rgba(106,81,255,.2);
      border-radius: 16px; box-shadow: 0 16px 48px rgba(106,81,255,.18);
      z-index: 500; max-height: 300px; overflow-y: auto; display: none;
    }
    .suggestions-dropdown.open { display: block; animation: fadeDown .2s ease; }
    @keyframes fadeDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
    .suggestion-item {
      display: flex; align-items: center; gap: 12px;
      padding: 11px 18px; cursor: pointer; transition: background .15s;
      border-bottom: 1px solid #f0f0f8;
    }
    .suggestion-item:last-child { border-bottom: none; }
    .suggestion-item:hover { background: #f4f2ff; }
    .sug-icon {
      width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
      background: linear-gradient(135deg,#6a51ff,#3c1778);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; color: #fff;
    }
    .sug-name { font-weight: 700; font-size: .85rem; color: #1a1a2e; text-transform: capitalize; }
    .sug-cat  { font-size: .7rem; color: #6a51ff; font-weight: 600; text-transform: uppercase; }
    .sug-empty { padding: 18px; text-align: center; color: #9ca3af; font-size: .85rem; }
    /* ---- Category chips ---- */
    .category-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .cat-chip {
      background: #f8f9ff; border: 2px solid #e5e7eb; border-radius: 30px;
      padding: 6px 15px; font-family: 'Poppins',sans-serif; font-size: .76rem;
      font-weight: 600; color: #66686c; cursor: pointer; transition: all .2s;
      text-transform: capitalize;
    }
    .cat-chip:hover { border-color: #6a51ff; color: #3c1778; background: #f0edff; }
    .cat-chip.active {
      background: rgba(106,81,255,.12); border-color: #6a51ff;
      color: #3c1778; box-shadow: 0 3px 10px rgba(106,81,255,.2);
    }
    /* ---- Pagination ---- */
    .pagination-controls { text-align: center; margin: 40px 0 20px; }
    .page-btn {
      display: inline-flex; align-items: center; gap: 9px;
      border: none; padding: 14px 46px; border-radius: 50px;
      font-family: 'Poppins',sans-serif; font-size: .93rem;
      font-weight: 700; cursor: pointer; transition: all .3s;
    }
    .more-btn {
      background: linear-gradient(135deg,#6a51ff,#3c1778); color: #fff;
      box-shadow: 0 8px 28px rgba(106,81,255,.3);
    }
    .more-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(106,81,255,.4); }
    .less-btn {
      background: linear-gradient(135deg,#ffaf12,#ffc020); color: #1a1a2e;
      box-shadow: 0 8px 28px rgba(255,175,18,.3);
    }
    .less-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(255,175,18,.4); }
    .page-info { font-size: .8rem; color: #66686c; margin-top: 10px; font-weight: 600; }
    /* ---- Modal ---- */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.72);
      backdrop-filter: blur(10px); z-index: 9999;
      display: none; align-items: center; justify-content: center; padding: 20px;
    }
    .modal-overlay.open { display: flex; }
    .modal-box {
      background: #fff; border-radius: 26px; width: 100%; max-width: 660px;
      max-height: 92vh; overflow-y: auto; position: relative;
      animation: mslide .35s ease; box-shadow: 0 40px 100px rgba(0,0,0,.3);
    }
    @keyframes mslide {
      from{transform:translateY(38px) scale(.97);opacity:0}
      to  {transform:translateY(0)   scale(1);  opacity:1}
    }
    .modal-hero {
      width: 100%; height: 210px; background-size: cover; background-position: center;
      border-radius: 26px 26px 0 0; position: relative;
    }
    .modal-hero-ov {
      position: absolute; inset: 0; border-radius: 26px 26px 0 0;
      background: linear-gradient(to bottom,transparent 35%,rgba(0,0,0,.65));
    }
    .modal-hero-badge {
      position: absolute; top: 14px; left: 14px;
      background: rgba(106,81,255,.92); color: #fff;
      padding: 5px 13px; border-radius: 20px; font-size: 10px;
      font-weight: 800; text-transform: uppercase; letter-spacing: 1px;
      backdrop-filter: blur(4px);
    }
    .modal-close-x {
      position: absolute; top: 12px; right: 12px;
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,.92); border: none; cursor: pointer;
      font-size: 17px; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,.2); transition: all .2s; z-index: 10; color: #333;
    }
    .modal-close-x:hover { background: #fff; transform: scale(1.1); }
    .modal-body { padding: 24px 28px 28px; }
    .modal-title {
      font-size: 1.65rem; font-weight: 900; color: #1a1a2e;
      margin-bottom: 6px; text-transform: capitalize; line-height: 1.2;
    }
    .modal-desc { font-size: .9rem; color: #66686c; line-height: 1.7; margin-bottom: 22px; }
    .m-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
    .m-card {
      border-radius: 14px; padding: 14px 16px; border-left: 4px solid;
    }
    .m-card.purple { background: #f4f2ff; border-color: #6a51ff; }
    .m-card.green  { background: #f0fff4; border-color: #00b894; }
    .m-card.orange { background: #fff8f0; border-color: #ffaf12; }
    .m-card.red    { background: #fff0f0; border-color: #e74c3c; }
    .m-card.blue   { background: #f0f8ff; border-color: #3498db; }
    .m-card.teal   { background: #f0fffe; border-color: #14b8a6; }
    .m-card.full   { grid-column: 1/-1; }
    .m-card-title {
      font-size: .72rem; font-weight: 800; text-transform: uppercase;
      letter-spacing: .8px; margin-bottom: 7px;
      display: flex; align-items: center; gap: 6px;
    }
    .m-card.purple .m-card-title { color: #6a51ff; }
    .m-card.green  .m-card-title { color: #00b894; }
    .m-card.orange .m-card-title { color: #e08a00; }
    .m-card.red    .m-card-title { color: #e74c3c; }
    .m-card.blue   .m-card-title { color: #3498db; }
    .m-card.teal   .m-card-title { color: #14b8a6; }
    .m-card-body { font-size: .83rem; color: #374151; line-height: 1.62; }
    /* Special groups */
    .groups-wrap {
      grid-column: 1/-1; border: 2px solid #e5e7eb;
      border-radius: 16px; padding: 16px 18px; background: #fafafe;
    }
    .groups-title {
      font-size: .73rem; font-weight: 800; color: #3c1778;
      text-transform: uppercase; letter-spacing: .8px;
      margin-bottom: 12px; display: flex; align-items: center; gap: 7px;
    }
    .groups-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
    .g-card { border-radius: 11px; padding: 11px 13px; border: 1.5px solid; }
    .g-card.preg  { background:#fff0fb; border-color:#f472b6; }
    .g-card.child { background:#fff7ed; border-color:#fb923c; }
    .g-card.old   { background:#f0f9ff; border-color:#60a5fa; }
    .g-card.young { background:#f0fdf4; border-color:#4ade80; }
    .g-label {
      font-size: .68rem; font-weight: 800; text-transform: uppercase;
      letter-spacing: .5px; margin-bottom: 4px;
      display: flex; align-items: center; gap: 4px;
    }
    .g-card.preg  .g-label { color: #db2777; }
    .g-card.child .g-label { color: #ea580c; }
    .g-card.old   .g-label { color: #2563eb; }
    .g-card.young .g-label { color: #16a34a; }
    .g-text { font-size: .76rem; color: #374151; line-height: 1.52; }
    .modal-cta {
      width: 100%; background: linear-gradient(135deg,#6a51ff,#3c1778);
      color: #fff; border: none; padding: 15px;
      border-radius: 13px; font-family: 'Poppins',sans-serif;
      font-weight: 700; font-size: .92rem; cursor: pointer;
      margin-top: 18px; transition: all .3s;
      box-shadow: 0 8px 28px rgba(106,81,255,.3);
    }
    .modal-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(106,81,255,.4); }
    @media(max-width:560px){
      .m-grid, .groups-grid { grid-template-columns: 1fr; }
      .modal-body { padding: 18px 16px 22px; }
      .modal-title { font-size: 1.35rem; }
      .m-card.full { grid-column: 1; }
      .groups-wrap { grid-column: 1; }
    }
  `;
  document.head.appendChild(style);
})();

// ===== CATEGORY ICONS =====
const catIcon = {
  Chronic:"🩸", Cardiovascular:"❤️", Respiratory:"🫁", Renal:"🫘",
  Autoimmune:"🛡️", Neurological:"🧠", Gastrointestinal:"🍃", Infectious:"🦠",
  Hepatic:"🟡", Endocrine:"⚗️", Musculoskeletal:"🦴", Rheumatological:"💊",
  Dermatological:"🩹", Ophthalmological:"👁️", ENT:"👂", "Sleep Disorders":"😴",
  Hematological:"🔴", Oncological:"🎗️", Psychiatric:"💙", Urological:"💧",
  Gynecological:"🌸", Systemic:"⚙️", default:"🏥"
};
function icon(cat){ return catIcon[cat] || catIcon.default; }

// ===== DISEASES DATA — 100 =====
const diseases = [
  { id:1,  name:"Diabetes Type 2",           category:"Chronic",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Increased thirst, frequent urination, fatigue, blurred vision, slow-healing wounds, tingling in hands/feet",
    diagnosis:"Fasting blood glucose, HbA1c, oral glucose tolerance test, random blood sugar test",
    treatment:"Metformin, GLP-1 agonists, SGLT2 inhibitors, insulin therapy, diet & lifestyle modification",
    description:"A metabolic disorder where the body cannot effectively use insulin, causing elevated blood glucose that damages multiple organs over time.",
    complications:"Cardiovascular disease, diabetic nephropathy, peripheral neuropathy, retinopathy, diabetic foot, stroke",
    tips:"Monitor blood sugar daily, follow low-glycemic diet, exercise 30 min/day, take medications consistently",
    sideEffects:"Metformin: nausea, diarrhea, B12 deficiency. Insulin: hypoglycemia, weight gain, injection-site reactions",
    prevention:"Maintain healthy BMI, reduce refined-carb intake, exercise regularly, annual blood-sugar screening",
    whenToSeeDoctor:"Blood sugar >300 mg/dL, hypoglycemia signs, non-healing foot ulcers, sudden vision changes, chest pain",
    specialGroups:{pregnantWomen:"Intensive insulin management required; many oral meds unsafe; fetal macrosomia risk; gestational diabetes monitoring.",children:"Type 1 more common; rapid symptom onset; affects growth; school management plans needed.",elderly:"Higher hypoglycemia risk; cognitive impairment may affect compliance; polypharmacy interactions.",youngAdults:"Lifestyle interventions highly effective; CGM technology aids management; mental health support important."} },
  { id:2,  name:"Hypertension",               category:"Cardiovascular",
    image:"https://images.unsplash.com/photo-1615461066842-32561977e3d8?w=700",
    symptoms:"Often asymptomatic; occasional headaches, nosebleeds, dizziness, chest pain, visual changes in severe cases",
    diagnosis:"BP monitoring (≥130/80 mmHg), ambulatory BP, ECG, urine tests, serum creatinine",
    treatment:"ACE inhibitors, ARBs, calcium-channel blockers, thiazide diuretics, beta-blockers, DASH diet",
    description:"Persistently elevated arterial blood pressure that silently damages heart, kidneys, brain, and vessels if untreated.",
    complications:"Heart attack, stroke, heart failure, chronic kidney disease, aortic aneurysm, vision loss",
    tips:"DASH diet, reduce sodium <2 g/day, 30 min aerobic exercise daily, limit alcohol, quit smoking, manage stress",
    sideEffects:"ACE inhibitors: dry cough, hyperkalemia. Diuretics: electrolyte imbalance. Beta-blockers: fatigue, bradycardia",
    prevention:"Regular BP screening, healthy diet, regular exercise, no smoking, stress management, limit alcohol",
    whenToSeeDoctor:"BP >180/120 mmHg, severe headache, vision changes, chest pain, difficulty breathing, sudden weakness",
    specialGroups:{pregnantWomen:"Preeclampsia risk; labetalol and nifedipine safer options; close fetal monitoring required.",children:"Rare but possible; secondary causes common; lifestyle changes first; kidney and heart monitoring.",elderly:"Fall risk with aggressive lowering; isolated systolic hypertension common; standard first-line treatment.",youngAdults:"Secondary causes should be ruled out; lifestyle changes often sufficient; white-coat hypertension common."} },
  { id:3,  name:"Asthma",                      category:"Respiratory",
    image:"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700",
    symptoms:"Episodic wheezing, chest tightness, shortness of breath, dry cough (especially at night), triggered by allergens",
    diagnosis:"Spirometry with bronchodilator reversibility, peak flow, allergy testing, FeNO test",
    treatment:"Short-acting beta-agonists (salbutamol), inhaled corticosteroids, LABAs, leukotriene modifiers, biologics",
    description:"Chronic inflammatory airway disease causing recurrent episodes of reversible airflow obstruction.",
    complications:"Severe life-threatening attacks, respiratory failure, chronic airway remodeling, pneumothorax",
    tips:"Always carry rescue inhaler, avoid triggers (smoke, dust mites, pets), use spacer correctly, follow action plan",
    sideEffects:"Inhaled steroids: oral candidiasis, hoarseness. Beta-agonists: tremor, palpitations, tachycardia",
    prevention:"Avoid allergens and smoking, reduce indoor air pollution, maintain healthy weight",
    whenToSeeDoctor:"Rescue inhaler >2 days/week, waking at night with symptoms, severe attack not responding to inhaler",
    specialGroups:{pregnantWomen:"Uncontrolled asthma more dangerous than medications; ICS safe; oxygen delivery to fetus at risk.",children:"Leading chronic childhood illness; affects school attendance; growth monitoring with ICS use.",elderly:"Underdiagnosed; overlap with COPD; cardiac issues may mimic asthma; cautious beta-agonist use.",youngAdults:"Exercise-induced asthma common; trigger identification key; full sport participation possible with management."} },
  { id:4,  name:"Coronary Artery Disease",     category:"Cardiovascular",
    image:"https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=700",
    symptoms:"Chest pain (angina) on exertion, shortness of breath, fatigue, palpitations, jaw/arm pain, nausea, sweating",
    diagnosis:"ECG, exercise stress test, coronary CTA, echocardiogram, cardiac catheterization with angiography",
    treatment:"Aspirin, statins, beta-blockers, nitrates, ACE inhibitors, angioplasty with stenting, bypass surgery",
    description:"Atherosclerotic plaque buildup in coronary arteries reduces blood flow to heart muscle, causing ischemia.",
    complications:"Myocardial infarction, heart failure, arrhythmias, sudden cardiac death, cardiogenic shock",
    tips:"Quit smoking, control cholesterol and BP, exercise regularly, Mediterranean diet, reduce stress",
    sideEffects:"Statins: myopathy, rarely rhabdomyolysis. Aspirin: GI bleeding. Beta-blockers: fatigue, erectile dysfunction",
    prevention:"Healthy lifestyle from youth, control risk factors (diabetes, hypertension, dyslipidemia), no smoking",
    whenToSeeDoctor:"Chest pain especially at rest, pain radiating to arm/jaw, sudden severe shortness of breath, sweating",
    specialGroups:{pregnantWomen:"Very rare; statins contraindicated in pregnancy; aspirin may be used cautiously; specialist care essential.",children:"Rare; Kawasaki disease history; congenital anomalies; family hypercholesterolemia screening important.",elderly:"Leading cause of death; atypical presentation common; frailty affects treatment decisions; fall risk.",youngAdults:"Often underdiagnosed; cocaine use risk; family history important; aggressive risk-factor modification."} },
  { id:5,  name:"Chronic Kidney Disease",      category:"Renal",
    image:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700",
    symptoms:"Fatigue, edema (legs/face), decreased urine output, nausea, itchy skin, shortness of breath, brain fog",
    diagnosis:"eGFR, serum creatinine, urine albumin-to-creatinine ratio, kidney ultrasound, kidney biopsy",
    treatment:"BP control (ACEi/ARB), glucose management, low-protein diet, phosphate binders, dialysis, transplant",
    description:"Progressive and irreversible loss of kidney function affecting fluid balance, waste excretion, and blood pressure.",
    complications:"End-stage renal failure, cardiovascular disease, anemia, hyperkalemia, metabolic acidosis, bone disease",
    tips:"Strict BP and glucose control, avoid NSAIDs, stay hydrated, regular kidney-function monitoring",
    sideEffects:"ACE inhibitors: hyperkalemia, cough, acute kidney injury. Phosphate binders: constipation, hypercalcemia",
    prevention:"Control diabetes and hypertension, avoid nephrotoxic drugs, regular kidney-function screening",
    whenToSeeDoctor:"Significant change in urine output, severe edema, uncontrolled blood pressure, potassium >6 mmol/L",
    specialGroups:{pregnantWomen:"High maternal and fetal complication risk; close monitoring of BP and kidney function required.",children:"Often due to congenital anomalies; growth retardation; puberty delay; psychosocial support critical.",elderly:"High prevalence; polypharmacy-related nephrotoxicity; conservative management often preferred over dialysis.",youngAdults:"Lifestyle modification critical; employment and family planning affected; emotional support important."} },
  { id:6,  name:"Rheumatoid Arthritis",        category:"Autoimmune",
    image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700",
    symptoms:"Symmetric joint pain/swelling, morning stiffness >1 hour, fatigue, low-grade fever, rheumatoid nodules",
    diagnosis:"RF and anti-CCP antibodies, ESR/CRP, joint X-rays, MRI, joint fluid analysis",
    treatment:"Methotrexate (anchor), hydroxychloroquine, TNF inhibitors, JAK inhibitors, corticosteroids",
    description:"Systemic autoimmune disease causing chronic joint inflammation leading to cartilage and bone destruction.",
    complications:"Joint deformity, disability, cardiovascular disease, interstitial lung disease, osteoporosis, lymphoma risk",
    tips:"Early aggressive treatment key, physical and occupational therapy, balance rest and exercise",
    sideEffects:"Methotrexate: hepatotoxicity, nausea, bone marrow suppression. Biologics: infection risk, TB reactivation",
    prevention:"Smoking cessation (major risk factor), dental hygiene; gum disease linked to RA risk",
    whenToSeeDoctor:"Increasing joint swelling, fever, signs of infection on biologic therapy, difficulty with daily activities",
    specialGroups:{pregnantWomen:"Disease often improves in pregnancy; MTX stopped before conception; high relapse risk postpartum.",children:"Juvenile idiopathic arthritis; affects growth plates; uveitis monitoring critical; school support needed.",elderly:"Higher comorbidities; infection risk with immunosuppression; osteoporosis management; drug interactions.",youngAdults:"Work disability risk; psychological impact significant; family planning requires medication adjustment."} },
  { id:7,  name:"COPD",                        category:"Respiratory",
    image:"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700",
    symptoms:"Progressive dyspnea, chronic productive cough, wheezing, barrel chest, frequent chest infections, cyanosis",
    diagnosis:"Spirometry (FEV1/FVC <0.7), chest X-ray, CT thorax, pulse oximetry, arterial blood gas",
    treatment:"Smoking cessation (critical), SABA/LABA inhalers, LAMA, inhaled corticosteroids, pulmonary rehabilitation, LTOT",
    description:"Progressive irreversible airflow limitation primarily caused by smoking; characterized by emphysema and chronic bronchitis.",
    complications:"Respiratory failure, cor pulmonale, pulmonary hypertension, pneumothorax, lung cancer, depression",
    tips:"Quit smoking immediately, get flu and pneumonia vaccines, pulmonary rehabilitation, energy conservation",
    sideEffects:"LABAs: tremor, tachycardia. ICS: pneumonia risk, oral candidiasis. Theophylline: narrow therapeutic window",
    prevention:"Never smoke, avoid occupational dust/chemicals, early spirometry screening for smokers",
    whenToSeeDoctor:"Sudden worsening breathlessness, change in sputum color, cyanosis, confusion, respiratory failure signs",
    specialGroups:{pregnantWomen:"Rare in reproductive age; oxygen supplementation critical; inhaled bronchodilators generally safe.",children:"Alpha-1 antitrypsin deficiency; passive smoke exposure worsens course; genetic testing indicated.",elderly:"Overlap with asthma and heart failure; depression and anxiety common; palliative care planning.",youngAdults:"Alpha-1 antitrypsin deficiency screening; occupational exposure assessment; smoking cessation paramount."} },
  { id:8,  name:"Alzheimer's Disease",         category:"Neurological",
    image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700",
    symptoms:"Progressive memory loss, language difficulties, disorientation, personality changes, difficulty with complex tasks",
    diagnosis:"Cognitive assessment (MMSE, MoCA), brain MRI, PET scan, CSF biomarkers (amyloid, tau), genetic testing",
    treatment:"Cholinesterase inhibitors (donepezil, rivastigmine), memantine, anti-amyloid therapy, caregiver support",
    description:"Progressive neurodegenerative disease destroying memory and cognitive function through amyloid plaques and tau tangles.",
    complications:"Complete dependence, aspiration pneumonia, infections, falls, malnutrition, death (average 8-10 years survival)",
    tips:"Mental stimulation (reading, puzzles), social engagement, physical exercise, safe home environment",
    sideEffects:"Cholinesterase inhibitors: nausea, bradycardia, syncope, insomnia. Memantine: dizziness, headache",
    prevention:"Cardiovascular risk-factor control, regular exercise, cognitive engagement, Mediterranean diet, quality sleep",
    whenToSeeDoctor:"Significant memory lapses affecting daily life, personality changes, getting lost in familiar places, safety concerns",
    specialGroups:{pregnantWomen:"Early-onset rare; genetic counseling for APOE4 carriers; family planning implications.",children:"Not applicable for classic presentation; childhood dementia (NCL) is a separate entity.",elderly:"Most common dementia; behavioral symptoms require careful management; palliative approach in late stages.",youngAdults:"Early-onset (<65) affects employment and family; genetic forms; aggressive management warranted."} },
  { id:9,  name:"Parkinson's Disease",         category:"Neurological",
    image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700",
    symptoms:"Resting tremor, bradykinesia, rigidity, postural instability, micrographia, hypophonia, facial masking",
    diagnosis:"Clinical diagnosis, neurological exam, DaTscan, MRI to rule out other causes, response to levodopa",
    treatment:"Levodopa/carbidopa, dopamine agonists, MAO-B inhibitors, amantadine, deep brain stimulation (DBS)",
    description:"Neurodegenerative disorder caused by loss of dopaminergic neurons in substantia nigra, primarily affecting movement.",
    complications:"Dementia, depression, orthostatic hypotension, dysphagia, aspiration pneumonia, falls, freezing",
    tips:"Physical, speech, and occupational therapy, regular exercise (boxing, cycling), home safety modifications",
    sideEffects:"Levodopa: dyskinesia, on/off fluctuations, nausea. Dopamine agonists: impulse-control disorders, hallucinations",
    prevention:"Exercise may be neuroprotective; caffeine associated with lower risk; avoid pesticide exposure",
    whenToSeeDoctor:"Tremors interfering with daily life, falls, swallowing difficulties, sudden worsening of symptoms",
    specialGroups:{pregnantWomen:"Rare in reproductive age; levodopa requires risk-benefit discussion; rigidity may affect labor.",children:"Juvenile Parkinson's very rare; genetic forms; different medication approach required.",elderly:"Polypharmacy increases confusion; fall prevention critical; aspiration risk; palliative care consideration.",youngAdults:"Young-onset (<50): genetic testing; employment, driving, and family planning are major concerns."} },
  { id:10, name:"Multiple Sclerosis",           category:"Autoimmune",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Fatigue, numbness/tingling, optic neuritis, weakness, spasticity, balance problems, bladder dysfunction, cognitive fog",
    diagnosis:"MRI brain and spine (McDonald criteria), visual evoked potentials, CSF oligoclonal bands, neurological exam",
    treatment:"Disease-modifying therapies (interferon, natalizumab, ocrelizumab), corticosteroids for relapses, symptom management",
    description:"Autoimmune demyelinating CNS disease causing unpredictable relapses and progressive disability.",
    complications:"Severe disability, depression, pain syndromes, bladder/bowel dysfunction, sexual dysfunction, cognitive decline",
    tips:"Stay cool (heat worsens symptoms), regular exercise, fatigue management strategies, psychological support",
    sideEffects:"Interferon: flu-like symptoms, injection reactions. Natalizumab: PML risk. Ocrelizumab: infection risk",
    prevention:"No proven prevention; vitamin D sufficiency may reduce risk; avoiding smoking is protective",
    whenToSeeDoctor:"New neurological symptoms, worsening existing symptoms, visual disturbance, severe fatigue episode",
    specialGroups:{pregnantWomen:"Pregnancy reduces relapse rate; postpartum relapse risk increases; many DMTs stopped before conception.",children:"Pediatric MS rare but aggressive; high MRI lesion load; treatment similar to adults.",elderly:"Primary progressive MS more common; limited DMT evidence; symptom management focus.",youngAdults:"Peak diagnosis age 20-40; major impact on employment, relationships, family planning."} },
  { id:11, name:"Epilepsy",                     category:"Neurological",
    image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700",
    symptoms:"Recurrent unprovoked seizures, temporary confusion, staring spells, uncontrolled jerking movements, loss of consciousness",
    diagnosis:"EEG, MRI brain, video-EEG monitoring, blood tests, lumbar puncture if infection suspected",
    treatment:"Anti-seizure medications (valproate, levetiracetam, lamotrigine), ketogenic diet, vagus nerve stimulation, surgery",
    description:"Neurological disorder with recurrent seizures due to abnormal brain electrical activity, affecting 1% of population.",
    complications:"Status epilepticus, SUDEP, cognitive impairment, depression, injuries during seizures",
    tips:"Never miss medication, adequate sleep, identify and avoid triggers, wear medical ID, no solo swimming/bathing",
    sideEffects:"Valproate: weight gain, teratogenic. Levetiracetam: behavioral changes. Lamotrigine: rash, Stevens-Johnson syndrome",
    prevention:"Head injury prevention, prompt treatment of CNS infections, prenatal care for birth-related causes",
    whenToSeeDoctor:"First seizure, seizure >5 min, injury during seizure, cluster seizures, change in seizure pattern",
    specialGroups:{pregnantWomen:"Teratogenicity varies by medication; folate supplementation essential; valproate avoid in women of childbearing age.",children:"Common pediatric hospitalization cause; learning disabilities associated; school management plan needed.",elderly:"New-onset requires investigation (stroke, tumor); drug interactions; increased fall risk.",youngAdults:"Driving restrictions; employment limitations; AED interactions with contraceptives; pregnancy planning."} },
  { id:12, name:"Migraine",                     category:"Neurological",
    image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700",
    symptoms:"Severe unilateral throbbing headache, nausea, vomiting, photophobia, phonophobia, aura (visual/sensory) in some",
    diagnosis:"Clinical diagnosis (ICHD criteria), neurological exam, MRI to exclude secondary causes",
    treatment:"Acute: triptans, NSAIDs, anti-emetics. Preventive: propranolol, topiramate, CGRP monoclonal antibodies",
    description:"Neurological disorder causing recurrent severe headache attacks lasting 4-72 hours, often debilitating.",
    complications:"Chronic daily headache, medication overuse headache, migraine-related stroke (rare), vestibular migraine",
    tips:"Keep headache diary, regular sleep/meals, stay hydrated, identify triggers (stress, certain foods, hormones)",
    sideEffects:"Triptans: chest tightness, contraindicated in CVD. Topiramate: cognitive effects, kidney stones",
    prevention:"Regular sleep schedule, stress management, avoid known triggers, regular meals, limit caffeine",
    whenToSeeDoctor:"Thunderclap headache, new headache pattern, associated fever/stiff neck, neurological symptoms",
    specialGroups:{pregnantWomen:"Triptans relatively contraindicated; paracetamol safe; migraine often improves in pregnancy; magnesium safe preventive.",children:"Shorter duration, bilateral location common; behavioral triggers important; medication doses adjusted.",elderly:"New-onset requires investigation; CVD history limits triptan use; consider secondary causes.",youngAdults:"Hormonal triggers common in women; workplace impact significant; CGRP medications now available."} },
  { id:13, name:"GERD",                         category:"Gastrointestinal",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Heartburn (burning behind sternum), acid regurgitation, difficulty swallowing, chest pain, chronic cough, hoarseness",
    diagnosis:"Endoscopy (gold standard), pH impedance monitoring, esophageal manometry, barium swallow",
    treatment:"PPIs (omeprazole, lansoprazole), H2 blockers, antacids, fundoplication surgery, dietary modifications",
    description:"Chronic condition where stomach acid frequently flows back into the esophagus causing mucosal damage.",
    complications:"Esophagitis, Barrett's esophagus, esophageal stricture, adenocarcinoma, aspiration pneumonia",
    tips:"Elevate bed head 30 cm, eat 3 hours before lying down, avoid fatty/spicy foods, lose weight if overweight",
    sideEffects:"Long-term PPIs: hypomagnesemia, C. diff risk, B12 deficiency, possible bone density reduction",
    prevention:"Healthy weight, avoid trigger foods, no smoking, limit alcohol, small frequent meals",
    whenToSeeDoctor:"Difficulty swallowing, vomiting blood, black stools, unintended weight loss, symptoms not responding to PPIs",
    specialGroups:{pregnantWomen:"Very common due to hormonal changes; antacids and H2 blockers safe; PPIs second-line.",children:"Spitting up normal in infants; GERD affects sleep and causes failure to thrive; carefully managed.",elderly:"Higher complication rate; Barrett's more prevalent; medication review important.",youngAdults:"Lifestyle modifications highly effective; avoid late-night meals; stress management important."} },
  { id:14, name:"Irritable Bowel Syndrome",     category:"Gastrointestinal",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Recurrent abdominal pain related to bowel habits, bloating, alternating diarrhea and constipation, mucus in stool",
    diagnosis:"Rome IV criteria, excluding organic disease (colonoscopy, blood tests, stool calprotectin)",
    treatment:"Low-FODMAP diet, antispasmodics, loperamide (IBS-D), linaclotide (IBS-C), probiotics, CBT",
    description:"Functional bowel disorder without structural abnormality, strongly linked to gut-brain axis dysregulation.",
    complications:"Anxiety, depression, social isolation, reduced quality of life, work/school impairment",
    tips:"Low-FODMAP diet (with dietitian), regular exercise, stress management, scheduled meals, adequate fiber",
    sideEffects:"Antispasmodics: dry mouth, constipation. Loperamide: constipation if overused",
    prevention:"Stress management, gut microbiome health, avoid trigger foods, regular eating pattern",
    whenToSeeDoctor:"Rectal bleeding, unexplained weight loss, fever, nocturnal symptoms, age >50 with new symptoms",
    specialGroups:{pregnantWomen:"Symptoms may worsen due to hormonal changes; safe dietary management; probiotics relatively safe.",children:"Common cause of recurrent abdominal pain; school absenteeism; psychological factors important.",elderly:"New IBS symptoms should prompt investigation to exclude organic disease.",youngAdults:"High prevalence; stress-related exacerbations; dietary management most effective long-term."} },
  { id:15, name:"Hepatitis B",                  category:"Infectious",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Acute: jaundice, fatigue, abdominal pain, nausea, dark urine. Chronic: often asymptomatic until advanced disease",
    diagnosis:"HBsAg, anti-HBs, anti-HBc, HBV DNA, liver function tests, FibroScan, ultrasound",
    treatment:"Antiviral therapy (tenofovir, entecavir), interferon alpha, regular monitoring, liver transplant for end-stage",
    description:"Viral hepatitis caused by HBV affecting 300 million people worldwide; chronic infection leads to cirrhosis and liver cancer.",
    complications:"Cirrhosis, hepatocellular carcinoma, liver failure, extrahepatic manifestations",
    tips:"Complete vaccination course, avoid alcohol, regular liver monitoring, do not share needles/razors/toothbrushes",
    sideEffects:"Tenofovir: kidney and bone effects with long-term use. Interferon: flu-like symptoms, depression, cytopenias",
    prevention:"Vaccination (3-dose series), safe sex, avoid needle sharing, screening of blood products",
    whenToSeeDoctor:"Jaundice, severe fatigue, abdominal pain, signs of liver failure, pregnancy planning with hepatitis B",
    specialGroups:{pregnantWomen:"Vertical transmission risk 70-90% if HBeAg positive; antiviral in 3rd trimester; infant immunoprophylaxis at birth.",children:"Perinatal transmission highest risk for chronicity (90%); vaccination at birth critical.",elderly:"Reactivation with immunosuppressive therapy; liver cancer screening essential.",youngAdults:"Vaccination if not immune; testing if high-risk; treatment based on viral load and liver damage."} },
  { id:16, name:"HIV/AIDS",                     category:"Infectious",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Acute: flu-like illness. Chronic: often asymptomatic. AIDS: weight loss, opportunistic infections, cancers, dementia",
    diagnosis:"4th-gen HIV Ag/Ab test, HIV RNA PCR, CD4 count, HIV viral load, resistance testing, STI screen",
    treatment:"ART single-tablet regimens (bictegravir/tenofovir/emtricitabine), lifelong therapy achieves undetectable viral load",
    description:"Retroviral infection depleting CD4 T-cells leading to immunodeficiency and AIDS-defining conditions without treatment.",
    complications:"Opportunistic infections (PCP, CMV, cryptococcal meningitis), AIDS-related malignancies, HIV-associated neurocognitive disorder",
    tips:"Undetectable = Untransmittable (U=U); never miss ART doses; PrEP for HIV-negative high-risk individuals",
    sideEffects:"Modern ART: generally well-tolerated; weight gain, dyslipidemia, kidney effects with certain agents",
    prevention:"PrEP for high-risk individuals, consistent condom use, needle exchange programs, universal antenatal testing",
    whenToSeeDoctor:"Fever with CD4 <200, opportunistic infection symptoms, new neurological symptoms, any high-risk exposure",
    specialGroups:{pregnantWomen:"PMTCT: ART reduces vertical transmission to <1%; zidovudine to neonate; breastfeeding guidance provided.",children:"Rapid progression in untreated infants; early ART initiation critical; treatment for life.",elderly:"Accelerated aging; cardiovascular and bone complications; drug interactions with comorbidity medications.",youngAdults:"Highest new infection rates globally; PrEP programs; stigma reduction essential; mental health support."} },
  { id:17, name:"Pneumonia",                    category:"Respiratory",
    image:"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700",
    symptoms:"Fever, productive cough, dyspnea, pleuritic chest pain, tachycardia, consolidation signs on examination",
    diagnosis:"Chest X-ray, CBC, CRP, procalcitonin, sputum and blood cultures, urine antigen (Legionella/pneumococcus)",
    treatment:"Antibiotics (amoxicillin ± clarithromycin for CAP), oxygen therapy, IV fluids, physiotherapy",
    description:"Acute lower respiratory tract infection causing alveolar inflammation and consolidation.",
    complications:"Parapneumonic effusion, empyema, lung abscess, respiratory failure, sepsis, ARDS",
    tips:"Complete full antibiotic course, rest, adequate hydration, flu and pneumococcal vaccination if eligible",
    sideEffects:"Penicillins: allergic reactions, diarrhea. Macrolides: GI upset, QTc prolongation",
    prevention:"Annual influenza vaccine, pneumococcal vaccine for >65 and high-risk, smoking cessation, good hand hygiene",
    whenToSeeDoctor:"Shortness of breath, confusion, cyanosis, very high fever, not improving after 2-3 days of antibiotics",
    specialGroups:{pregnantWomen:"Increased severity risk; amoxicillin/cephalosporins safe; hospitalization threshold lower.",children:"Viral (RSV) most common in infants; bacterial more common in school-age; bronchiolitis precursor.",elderly:"Atypical presentation (confusion, no fever); aspiration pneumonia common; vaccination essential.",youngAdults:"Atypical pathogens (Mycoplasma) common; viral pneumonia including influenza; rapid recovery expected."} },
  { id:18, name:"Tuberculosis",                 category:"Infectious",
    image:"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700",
    symptoms:"Persistent productive cough >3 weeks, hemoptysis, weight loss, night sweats, fever, fatigue, chest pain",
    diagnosis:"Sputum AFB smear and culture, chest X-ray, IGRA/TST, Gene Xpert MTB/RIF, CT chest",
    treatment:"DOTS: RIPE 2 months then RI 4 months; MDR-TB needs specialist; B6 with isoniazid",
    description:"Mycobacterium tuberculosis infection primarily affecting lungs; second most infectious disease killer worldwide.",
    complications:"Pulmonary cavitation, bronchiectasis, hemoptysis, TB meningitis, miliary TB, MDR/XDR-TB",
    tips:"Never skip doses (DOT program), take isoniazid with pyridoxine, complete all 6 months, screen close contacts",
    sideEffects:"Isoniazid: hepatotoxicity, peripheral neuropathy (take B6). Rifampicin: orange body fluids, drug interactions. Pyrazinamide: gout",
    prevention:"BCG vaccination, contact tracing, LTBI treatment in high-risk contacts, proper ventilation",
    whenToSeeDoctor:"Hemoptysis, worsening despite treatment, contacts of confirmed TB case, immunocompromised with respiratory symptoms",
    specialGroups:{pregnantWomen:"Active TB requires treatment; avoid pyrazinamide if possible; pyridoxine supplementation.",children:"BCG vaccine protective; IGRA unreliable <5 years; close contact screening essential.",elderly:"Reactivation TB common; atypical presentation; drug side effects more pronounced.",youngAdults:"HIV co-infection risk; close living conditions (dormitories); LTBI treatment prevents progression."} },
  { id:19, name:"Dengue Fever",                 category:"Infectious",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"High fever, severe headache, retro-orbital pain, myalgia/arthralgia ('breakbone fever'), rash, mild bleeding",
    diagnosis:"NS1 antigen (early), dengue IgM/IgG, PCR, CBC (thrombocytopenia/leukopenia), LFTs",
    treatment:"Supportive: IV fluids, paracetamol (NO NSAIDs/aspirin – bleeding risk), monitoring of platelet count",
    description:"Mosquito-borne flaviviral infection affecting 400 million per year globally; endemic in tropical regions.",
    complications:"Dengue hemorrhagic fever, dengue shock syndrome, organ involvement, severe thrombocytopenia",
    tips:"Prevent mosquito bites (repellent, long sleeves, nets), eliminate stagnant water, watch for warning signs",
    sideEffects:"Supportive care only; NSAIDs and aspirin must be avoided as they worsen bleeding tendency",
    prevention:"Dengvaxia vaccine (limited), mosquito control, eliminate breeding sites, personal protection",
    whenToSeeDoctor:"Warning signs: severe abdominal pain, persistent vomiting, bleeding, rapid breathing, fluid accumulation, pallor",
    specialGroups:{pregnantWomen:"Increased severity; vertical transmission possible; fetal loss risk; IV fluids and monitoring.",children:"Higher risk of severe disease; fever management critical; hospitalization if warning signs.",elderly:"Higher mortality; comorbidities complicate management; fluid balance challenging.",youngAdults:"Second infection with different serotype increases hemorrhagic fever risk; travel awareness."} },
  { id:20, name:"Malaria",                      category:"Infectious",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Cyclical fever, chills, sweating, headache, myalgia, vomiting, anemia, hepatosplenomegaly",
    diagnosis:"Thick and thin blood smears (gold standard), RDT, PCR for species confirmation, CBC",
    treatment:"P. falciparum: artemisinin-based combination therapy (ACT). P. vivax: chloroquine + primaquine for radical cure",
    description:"Plasmodium parasite infection transmitted by female Anopheles mosquitoes; P. falciparum most deadly.",
    complications:"Cerebral malaria, severe anemia, renal failure, pulmonary edema, hypoglycemia, spleen rupture",
    tips:"Take full antimalarial course, use insecticide-treated bed nets, repellent containing DEET, prophylaxis when traveling",
    sideEffects:"Primaquine: hemolysis in G6PD-deficient patients (screen first). ACTs: generally well-tolerated",
    prevention:"Insecticide-treated bed nets, indoor spraying, antimalarial prophylaxis for travelers, mosquito control",
    whenToSeeDoctor:"Any fever within 3 months of travel to endemic area — treat as malaria until proven otherwise (URGENT)",
    specialGroups:{pregnantWomen:"High mortality; placental malaria; preterm birth; quinine+clindamycin in 1st trimester; ACT in 2nd/3rd.",children:"<5 years highest mortality; IV artesunate for severe malaria; seasonal malaria chemoprevention.",elderly:"Atypical presentation; organ dysfunction; drug interactions; rapidly fatal with P. falciparum.",youngAdults:"Travelers most at risk; prophylaxis essential; complete full prophylaxis course; avoid mosquito bites."} },
  { id:21, name:"Meningitis",                   category:"Infectious",
    image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700",
    symptoms:"Classic triad: fever, severe headache, neck stiffness; photophobia, phonophobia, non-blanching rash (meningococcal)",
    diagnosis:"Lumbar puncture (CSF analysis), blood cultures, PCR, CT before LP if raised ICP suspected, full blood count",
    treatment:"Bacterial: IV ceftriaxone immediately, dexamethasone; Viral: supportive; Fungal: amphotericin B",
    description:"Life-threatening inflammation of meninges; bacterial meningitis is a medical emergency.",
    complications:"Sensorineural hearing loss, neurological deficits, hydrocephalus, limb amputation (meningococcal), death",
    tips:"Recognize early symptoms, seek emergency care IMMEDIATELY, do not wait for rash, complete vaccination",
    sideEffects:"IV antibiotics: allergic reactions. Dexamethasone: hyperglycemia",
    prevention:"MenACWY, MenB, Hib, pneumococcal vaccines; chemoprophylaxis for close contacts",
    whenToSeeDoctor:"THIS IS A MEDICAL EMERGENCY — call ambulance immediately for any suspected meningitis",
    specialGroups:{pregnantWomen:"Cephalosporins safe; penicillin for GBS; preterm labor risk; urgent ICU care essential.",children:"Most common in infants; bulging fontanelle; MenB vaccine from 2 months; school exclusion.",elderly:"Streptococcus pneumoniae most common; atypical presentation; ampicillin for listeria risk.",youngAdults:"Meningococcal peaks in teens/young adults; university freshers vaccination; alcohol reduces immune response."} },
  { id:22, name:"Sepsis",                       category:"Infectious",
    image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700",
    symptoms:"Fever or hypothermia, tachycardia, tachypnea, altered mental status, systolic BP ≤100, reduced urine output",
    diagnosis:"Blood cultures, PCT, lactate, CBC, CRP, metabolic panel, CXR, urine culture, sepsis screening tool",
    treatment:"Hour-1 Bundle: IV fluids, broad-spectrum antibiotics (within 1 hour), vasopressors if needed, source control",
    description:"Life-threatening organ dysfunction caused by dysregulated host response to infection; 11 million deaths annually.",
    complications:"Septic shock, multi-organ failure, ARDS, AKI, DIC, long-term cognitive and functional impairment",
    tips:"Recognize early — TIME CRITICAL; complete antibiotic course; post-sepsis rehabilitation support",
    sideEffects:"Broad-spectrum antibiotics: resistance, C. diff, nephrotoxicity. Vasopressors: peripheral ischemia",
    prevention:"Appropriate antibiotic use, vaccination, hand hygiene, early treatment of infections",
    whenToSeeDoctor:"ANY signs of sepsis — MEDICAL EMERGENCY; if unwell with infection, think sepsis",
    specialGroups:{pregnantWomen:"Maternal sepsis (GBS, E. coli common); IV antibiotics urgent; modified SOFA score for pregnancy.",children:"Different sepsis criteria; shock may present late; broad-spectrum antibiotics within 1 hour.",elderly:"Atypical presentation (confusion, falls); high mortality; frailty complicates recovery.",youngAdults:"Usually good outcomes with prompt treatment; post-sepsis rehabilitation; psychological support after ICU."} },
  { id:23, name:"Atrial Fibrillation",          category:"Cardiovascular",
    image:"https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=700",
    symptoms:"Palpitations, irregular heartbeat, dyspnea, fatigue, dizziness, chest pain, presyncope; may be asymptomatic",
    diagnosis:"ECG (irregularly irregular, absent P waves), Holter monitor, echocardiogram, thyroid function, electrolytes",
    treatment:"Rate control (beta-blockers, digoxin), rhythm control (flecainide, amiodarone), anticoagulation, cardioversion, ablation",
    description:"Most common sustained cardiac arrhythmia with irregular ventricular response; major stroke risk factor.",
    complications:"Stroke (5× increased risk), heart failure, cardiomyopathy, cognitive decline, hemodynamic compromise",
    tips:"Anticoagulation is stroke-prevention cornerstone; regular monitoring; avoid triggers (alcohol, caffeine, sleep deprivation)",
    sideEffects:"Warfarin: bleeding risk, multiple interactions. DOACs: bleeding risk. Amiodarone: thyroid/lung toxicity",
    prevention:"Treat underlying conditions (hypertension, sleep apnea), limit alcohol, maintain healthy weight",
    whenToSeeDoctor:"Palpitations with dizziness or fainting, rapid heart rate, chest pain, new diagnosis — urgent cardiology referral",
    specialGroups:{pregnantWomen:"Rare; rate control with digoxin/metoprolol; LMWH preferred for anticoagulation.",children:"Rare; usually structural heart disease; electrophysiology referral required.",elderly:"Most common in >65; falls risk with anticoagulation; rate control often pragmatic approach.",youngAdults:"Holiday heart (alcohol-induced); hyperthyroidism; ablation offers cure in appropriate patients."} },
  { id:24, name:"Heart Failure",               category:"Cardiovascular",
    image:"https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=700",
    symptoms:"Exertional dyspnea, orthopnoea, PND, ankle edema, fatigue, reduced exercise tolerance, basal crepitations",
    diagnosis:"BNP/NT-proBNP, echocardiogram (EF%), chest X-ray, ECG, cardiopulmonary exercise testing",
    treatment:"ACEi/ARB, beta-blocker, MRA, SGLT2 inhibitor, loop diuretics; CRT, ICD; TAVI, LVAD, heart transplant",
    description:"Clinical syndrome from cardiac structural/functional abnormality causing inadequate cardiac output.",
    complications:"Cardiorenal syndrome, arrhythmias, pulmonary hypertension, cardiogenic shock, sudden cardiac death",
    tips:"Daily weight monitoring (>2 kg/2 days = report), fluid restriction, low-sodium diet, avoid NSAIDs",
    sideEffects:"ACEi: cough, hyperkalemia. Loop diuretics: hypokalemia, electrolyte imbalance. Beta-blockers: fatigue",
    prevention:"Treat hypertension, CAD, valvular disease, diabetes; rhythm control in AF; cardioprotective meds post-MI",
    whenToSeeDoctor:"Rapid weight gain, worsening breathlessness, orthopnoea, reduced urine output, new cardiac symptoms",
    specialGroups:{pregnantWomen:"Peripartum cardiomyopathy; hemodynamic stress of pregnancy; multidisciplinary management essential.",children:"Dilated cardiomyopathy, congenital heart disease; myocarditis; aggressive management with transplant consideration.",elderly:"HFpEF more common; comorbidities complicate management; diuretics key; palliative care planning.",youngAdults:"Dilated cardiomyopathy; genetic forms; alcohol-related; Chagas disease; ICD consideration."} },
  { id:25, name:"Stroke",                       category:"Neurological",
    image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700",
    symptoms:"FAST: Face droop, Arm weakness, Speech difficulty, Time to call; also sudden headache, vision loss, vertigo",
    diagnosis:"CT brain (immediate), CTA, MRI DWI, carotid Doppler, ECG, cardiac monitoring, lipid profile",
    treatment:"Ischemic: IV thrombolysis (within 4.5h), mechanical thrombectomy (within 24h), antiplatelets, statins",
    description:"Brain infarction or hemorrhage causing acute neurological deficits; leading cause of disability.",
    complications:"Post-stroke disability, dysphagia, aspiration pneumonia, DVT, epilepsy, depression, vascular dementia",
    tips:"TIME IS BRAIN — Act FAST; secondary prevention: antiplatelets, anticoagulation for AF, BP/cholesterol control",
    sideEffects:"Thrombolysis: major/minor hemorrhage. Aspirin: GI bleeding. Anticoagulants: bleeding risk",
    prevention:"BP and AF treatment most important; statin therapy; lifestyle modification; carotid endarterectomy for stenosis",
    whenToSeeDoctor:"IMMEDIATE 999 CALL — stroke is a medical emergency; TIA symptoms also require emergency assessment",
    specialGroups:{pregnantWomen:"Cerebral venous thrombosis risk in puerperium; LMWH anticoagulation; hemorrhagic stroke with severe hypertension.",children:"Sickle cell disease; congenital heart disease; arterial dissection; different etiology to adult stroke.",elderly:"Most strokes occur here; balance aggressive treatment with frailty; rehabilitation paramount.",youngAdults:"PFO, arterial dissection, OCP, migraine with aura, antiphospholipid syndrome; aggressive investigation."} },
  { id:26, name:"Hypothyroidism",               category:"Endocrine",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Fatigue, weight gain, cold intolerance, dry skin and hair, constipation, depression, bradycardia, myxedema in severe cases",
    diagnosis:"Elevated TSH, low free T4, thyroid antibodies (anti-TPO for Hashimoto's), thyroid ultrasound",
    treatment:"Levothyroxine (T4 replacement) titrated to normalize TSH, combination T3/T4 therapy in some cases",
    description:"Underactive thyroid gland producing insufficient hormones, slowing metabolic processes throughout the body.",
    complications:"Myxedema coma, cardiovascular disease, infertility, depression, peripheral neuropathy, congenital hypothyroidism",
    tips:"Take levothyroxine 30-60 min before breakfast, avoid calcium/iron supplements within 4 hours, regular TSH monitoring",
    sideEffects:"Levothyroxine: over-replacement causes palpitations, bone loss, anxiety, insomnia",
    prevention:"No prevention for autoimmune type; iodine sufficiency important; avoid excessive iodine intake",
    whenToSeeDoctor:"Myxedema crisis signs (confusion, hypothermia), pregnancy, persistent symptoms despite treatment",
    specialGroups:{pregnantWomen:"Untreated hypothyroidism impairs fetal brain development; dose increase ~30% needed; TSH target <2.5.",children:"Congenital hypothyroidism causes cretinism if untreated (screened at birth); prompt treatment prevents cognitive impairment.",elderly:"Symptoms overlap with aging; atrial fibrillation risk; start with lower levothyroxine doses.",youngAdults:"Hashimoto's most common cause; fatigue and depression may be attributed to other causes; fertility effects."} },
  { id:27, name:"Hyperthyroidism",              category:"Endocrine",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Weight loss despite increased appetite, tachycardia, palpitations, anxiety, tremor, heat intolerance, exophthalmos",
    diagnosis:"Suppressed TSH, elevated free T3/T4, TSH-receptor antibodies (Graves'), radioactive iodine uptake scan",
    treatment:"Antithyroid drugs (methimazole, PTU), radioactive iodine ablation, thyroidectomy, beta-blockers for symptoms",
    description:"Overactive thyroid producing excess hormones; most commonly due to Graves' disease, toxic adenoma, or thyroiditis.",
    complications:"Thyroid storm (life-threatening), atrial fibrillation, osteoporosis, Graves' ophthalmopathy, heart failure",
    tips:"Regular thyroid-function monitoring, avoid high-iodine foods (kelp, amiodarone), stress management, adequate calcium",
    sideEffects:"Methimazole: agranulocytosis (rare but serious), hepatotoxicity. Radioiodine: eventual hypothyroidism in most",
    prevention:"No proven prevention; avoid excess iodine; genetic predisposition in Graves' disease",
    whenToSeeDoctor:"Thyroid storm signs (fever, extreme tachycardia, confusion), new atrial fibrillation, severe eye symptoms",
    specialGroups:{pregnantWomen:"PTU preferred in 1st trimester (methimazole teratogenic); neonatal hyperthyroidism risk; radioiodine contraindicated.",children:"Graves' disease most common; may affect school performance; long-term antithyroid therapy preferred.",elderly:"Atypical presentation ('apathetic hyperthyroidism'); cardiovascular complications most concerning.",youngAdults:"Graves' disease peak incidence; exophthalmos management; remission possible with medical treatment."} },
  { id:28, name:"Osteoporosis",                 category:"Musculoskeletal",
    image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700",
    symptoms:"Usually asymptomatic until fracture; back pain, loss of height, kyphosis; fragility fractures (hip, spine, wrist)",
    diagnosis:"DEXA scan (T-score ≤-2.5), FRAX fracture risk calculator, Vitamin D and calcium levels",
    treatment:"Calcium 1200 mg + Vitamin D3 1000-2000 IU daily, bisphosphonates, denosumab, teriparatide",
    description:"Systemic skeletal disease characterized by low bone mass and microarchitectural deterioration increasing fracture risk.",
    complications:"Hip fracture (30% mortality at 1 year), vertebral fractures, chronic pain, disability, pneumonia from immobility",
    tips:"Weight-bearing exercise, smoking cessation, limit alcohol, fall prevention (home safety, balance training, eye checks)",
    sideEffects:"Bisphosphonates: osteonecrosis of jaw (rare), atypical femur fractures. Denosumab: rebound fracture risk on stopping",
    prevention:"Peak bone mass development in youth, adequate calcium/vitamin D, regular exercise, no smoking",
    whenToSeeDoctor:"Back pain after minor trauma, loss of height >3 cm, first fracture, starting corticosteroid therapy",
    specialGroups:{pregnantWomen:"Pregnancy-associated osteoporosis rare; bisphosphonates contraindicated; calcium and D supplementation.",children:"Pediatric osteoporosis usually secondary (steroids, immobility); growth and bone health monitoring.",elderly:"Leading cause of morbidity; hip fracture prevention critical; fall prevention as important as medication.",youngAdults:"Premature onset from eating disorders, amenorrhea, steroids; investigation for secondary causes."} },
  { id:29, name:"Osteoarthritis",               category:"Musculoskeletal",
    image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700",
    symptoms:"Joint pain worsening with activity, morning stiffness <30 min, crepitus, bony enlargement, reduced range of motion",
    diagnosis:"Clinical diagnosis, X-rays (joint space narrowing, osteophytes), MRI for soft tissue assessment",
    treatment:"Paracetamol, topical NSAIDs, intra-articular corticosteroids, physiotherapy, weight loss, joint replacement surgery",
    description:"Most common form of arthritis causing cartilage degradation and bone changes, especially in knees and hips.",
    complications:"Disability, chronic pain, falls, depression, reduced quality of life, cardiovascular deconditioning",
    tips:"Exercise in water if weight-bearing painful, healthy weight essential, walking aids if needed, rest during flares",
    sideEffects:"NSAIDs: GI bleeding, cardiovascular risk, renal impairment. Repeated corticosteroid injections: cartilage effects",
    prevention:"Maintain healthy weight, avoid joint injury, regular muscle-strengthening exercise, ergonomic workplace",
    whenToSeeDoctor:"Severe joint pain interfering with activities, sudden joint swelling or warmth, signs of infection in joint",
    specialGroups:{pregnantWomen:"NSAIDs avoided especially in third trimester; paracetamol relatively safe; physiotherapy and aquatics beneficial.",children:"Extremely rare primary OA; secondary from Perthes disease or sport injuries.",elderly:"Leading cause of disability; polypharmacy risks with NSAIDs; joint replacement highly beneficial.",youngAdults:"Post-traumatic OA; ACL tears increase risk; activity modification; physiotherapy rehabilitation."} },
  { id:30, name:"Gout",                         category:"Musculoskeletal",
    image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700",
    symptoms:"Sudden severe joint pain (classic: first MTP joint), redness, swelling, warmth, tophi in chronic gout",
    diagnosis:"Uric acid level, joint aspiration (monosodium urate crystals), X-ray, ultrasound",
    treatment:"Acute: colchicine, NSAIDs, corticosteroids. Preventive: allopurinol, febuxostat (target uric acid <360 µmol/L)",
    description:"Crystal arthropathy caused by uric acid monosodium urate crystal deposition in joints due to hyperuricemia.",
    complications:"Chronic tophaceous gout, joint destruction, uric acid kidney stones, chronic kidney disease",
    tips:"Avoid purine-rich foods (organ meats, shellfish), limit alcohol (especially beer), stay well hydrated",
    sideEffects:"Allopurinol: Stevens-Johnson syndrome (rare; screen HLA-B*5801 in high-risk populations). Colchicine: GI toxicity",
    prevention:"Maintain healthy weight, limit alcohol, avoid purine-rich diet, stay hydrated",
    whenToSeeDoctor:"First attack, attack not improving in 24-48 h, multiple joints involved, tophi development, renal stones",
    specialGroups:{pregnantWomen:"Rare; colchicine relatively safe; allopurinol used cautiously; NSAIDs avoided in 3rd trimester.",children:"Rare; consider Lesch-Nyhan syndrome or secondary gout from leukemia treatment.",elderly:"Polypharmacy (diuretics) major cause; cardiovascular medications affect uric acid; falls risk with pain.",youngAdults:"Alcohol and diet major contributors; metabolic syndrome association; early urate-lowering therapy recommended."} },
  { id:31, name:"Lupus (SLE)",                  category:"Autoimmune",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Malar (butterfly) rash, photosensitivity, mouth ulcers, arthritis, serositis, renal involvement, cytopenias, neuropsychiatric features",
    diagnosis:"ANA (sensitive), anti-dsDNA (specific), complement levels (C3/C4), CBC, urinalysis, ACR/EULAR criteria",
    treatment:"Hydroxychloroquine (all patients), NSAIDs, corticosteroids, mycophenolate/azathioprine, belimumab, anifrolumab",
    description:"Systemic autoimmune disease where antibodies attack multiple organs including kidneys, brain, skin, heart, and blood cells.",
    complications:"Lupus nephritis (30%), cardiovascular disease, avascular necrosis, antiphospholipid syndrome, increased malignancy",
    tips:"Strict sun avoidance and SPF 50+ sunscreen, never stop hydroxychloroquine, regular monitoring of renal function",
    sideEffects:"Hydroxychloroquine: retinal toxicity (annual eye exam after 5 years). Mycophenolate: GI effects, teratogenic",
    prevention:"Sun protection, vitamin D supplementation, avoid silica exposure, no smoking",
    whenToSeeDoctor:"Urine changes (foamy, hematuria), new neurological symptoms, fever, severe rash, joint flare",
    specialGroups:{pregnantWomen:"High-risk pregnancy; neonatal lupus risk; anti-Ro/La causes fetal heart block; hydroxychloroquine safe.",children:"Pediatric SLE more severe; high rates of renal involvement; long-term steroids affect growth.",elderly:"Late-onset lupus less typical features; higher Sjögren's overlap; careful drug monitoring.",youngAdults:"Peak in women 15-44; major impact on reproductive years; fertility considerations with medications."} },
  { id:32, name:"Psoriasis",                    category:"Dermatological",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Well-demarcated red plaques with silvery scales, scalp involvement, nail pitting/onycholysis, Koebner phenomenon, itching",
    diagnosis:"Clinical diagnosis, skin biopsy if uncertain, PASI score, consider joint imaging for psoriatic arthritis",
    treatment:"Topical: corticosteroids, vitamin D analogues. Systemic: methotrexate, cyclosporine. Biologics: TNF, IL-17, IL-23 inhibitors",
    description:"Immune-mediated skin disease causing rapid keratinocyte turnover with silvery plaques; affects 2-3% of population.",
    complications:"Psoriatic arthritis (30%), metabolic syndrome, cardiovascular disease, depression, IBD",
    tips:"Moisturize daily, avoid triggers (stress, infections, medications), moderate sun exposure may help",
    sideEffects:"Methotrexate: hepatotoxicity, teratogenic. Cyclosporine: nephrotoxicity, hypertension. Biologics: infection risk",
    prevention:"Stress management, avoid triggers, healthy weight, quit smoking, moisturize regularly",
    whenToSeeDoctor:"Widespread sudden flare, joint involvement signs, erythrodermic psoriasis, infection in plaques",
    specialGroups:{pregnantWomen:"Pregnancy may improve disease; methotrexate and acitretin absolutely contraindicated; biologics stopped before birth.",children:"Common in children; scalp psoriasis frequent; impacts self-esteem significantly; biologics approved from age 6.",elderly:"Nail psoriasis prevalent; drug interactions with systemics; cardiovascular risk management important.",youngAdults:"Psychological impact severe; biologics transform management; tattoos and piercings can trigger Koebner."} },
  { id:33, name:"Eczema",                       category:"Dermatological",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Intense itch, dry skin, erythema, vesicles, weeping in acute phase, lichenification in chronic disease; flexural distribution",
    diagnosis:"Clinical diagnosis, IgE levels, allergy skin tests, patch testing for contact triggers, SCORAD severity scoring",
    treatment:"Emollients (cornerstone), topical corticosteroids, calcineurin inhibitors, crisaborole, dupilumab, tralokinumab, phototherapy",
    description:"Chronic inflammatory skin condition driven by skin barrier defect and immune dysregulation, often starting in infancy.",
    complications:"Secondary infections (Staph, eczema herpeticum), sleep disturbance, atopic march (asthma, rhinitis)",
    tips:"Moisturize within 3 min of bathing (soak and seal), avoid scratching, short fingernails, cotton clothing",
    sideEffects:"Topical steroids: skin atrophy with overuse. Dupilumab: conjunctivitis, injection-site reactions",
    prevention:"Emollient use from birth may reduce risk; exclusive breastfeeding; avoiding tobacco smoke exposure",
    whenToSeeDoctor:"Secondary infection signs (crusting, weeping, fever), eczema herpeticum (urgent), severe sleep disruption",
    specialGroups:{pregnantWomen:"Gestational AD common; emollients and mild TCS generally safe; dupilumab limited data.",children:"Most common pediatric skin disease; sleep disturbance affects whole family; quality of life impact.",elderly:"Other diagnoses (contact dermatitis, xerosis) must be considered; careful TCS use.",youngAdults:"Employment challenges; psychological burden; biologics (dupilumab) transformed management."} },
  { id:34, name:"Depression",                   category:"Psychiatric",
    image:"https://images.unsplash.com/photo-1541199249251-f713e6145474?w=700",
    symptoms:"Persistent low mood >2 weeks, anhedonia, hopelessness, sleep disturbance, appetite change, fatigue, poor concentration, guilt",
    diagnosis:"PHQ-9 screening, clinical assessment (ICD/DSM criteria), thyroid function, FBC to exclude organic causes",
    treatment:"SSRIs (first-line), SNRIs, mirtazapine; CBT (equally effective); combined for moderate-severe; ECT for refractory",
    description:"Common and disabling mental disorder affecting 280 million people globally; leading cause of disability worldwide.",
    complications:"Suicide (15% lifetime risk in major depression), substance abuse, social and occupational impairment",
    tips:"Regular physical exercise (antidepressant effect), social connection, structured routine, mindfulness, therapy adherence",
    sideEffects:"SSRIs: sexual dysfunction, initial anxiety, GI upset, rarely serotonin syndrome, discontinuation syndrome",
    prevention:"Stress management, regular exercise, social support, sleep hygiene, early treatment of anxiety disorders",
    whenToSeeDoctor:"Suicidal thoughts or intent — EMERGENCY; symptoms persisting >2 weeks, inability to function, substance use",
    specialGroups:{pregnantWomen:"Perinatal depression common; SSRIs relatively safe; untreated depression more harmful than medication.",children:"Adolescent depression rising; CBT first-line in mild-moderate; fluoxetine approved >12 years; suicide risk assessment.",elderly:"Often undiagnosed; masked by physical symptoms; mirtazapine useful for insomnia/weight loss; vascular depression.",youngAdults:"Peak onset in young adulthood; suicide risk highest; screen for bipolar before antidepressants."} },
  { id:35, name:"Anxiety Disorder",             category:"Psychiatric",
    image:"https://images.unsplash.com/photo-1541199249251-f713e6145474?w=700",
    symptoms:"Excessive worry, restlessness, fatigue, muscle tension, poor concentration, irritability, sleep disturbance; panic attacks in PD",
    diagnosis:"GAD-7 screening, clinical assessment (DSM-5 criteria), physical examination to exclude medical causes",
    treatment:"SSRIs/SNRIs (first-line), buspirone for GAD, high-intensity CBT, applied relaxation, exposure therapy",
    description:"Group of disorders including GAD, panic disorder, social anxiety, and phobias; most common mental health condition.",
    complications:"Depression (50% comorbidity), substance abuse, cardiovascular effects, impaired social and occupational function",
    tips:"Controlled breathing, progressive muscle relaxation, mindfulness, challenge catastrophic thinking, limit caffeine",
    sideEffects:"SSRIs: see above. Benzodiazepines: dependence, cognitive impairment, withdrawal — minimize use",
    prevention:"Stress management techniques, CBT-based prevention programs, limiting alcohol/caffeine, regular exercise",
    whenToSeeDoctor:"Anxiety significantly impairing function, panic attacks, suicidal thoughts, alcohol/substance coping",
    specialGroups:{pregnantWomen:"Very common; CBT preferred first-line; SSRIs relatively safe if needed; avoid benzodiazepines.",children:"Separation anxiety, social anxiety common; CBT most effective; medication second-line; school impact.",elderly:"Often coexists with physical illness; minimize benzodiazepines (falls, cognitive effects); CBT effective.",youngAdults:"Peak prevalence; social anxiety significant; performance anxiety; CBT highly effective."} },
  { id:36, name:"ADHD",                         category:"Psychiatric",
    image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700",
    symptoms:"Inattention (poor focus, forgetfulness, disorganization) and/or hyperactivity-impulsivity (fidgeting, interrupting, risk-taking)",
    diagnosis:"Clinical assessment using DSM-5 criteria, structured interview, ADHD rating scales (Conners, CAARS), psychological testing",
    treatment:"Stimulants (methylphenidate, amphetamines) first-line; non-stimulants (atomoxetine, guanfacine); CBT, coaching",
    description:"Neurodevelopmental disorder with core symptoms of inattention and/or hyperactivity-impulsivity, affecting 5% of children.",
    complications:"Academic failure, occupational difficulties, relationship problems, substance abuse, depression, anxiety",
    tips:"Structured environment, written schedules, minimize distractions, exercise, consistent routines, parent training",
    sideEffects:"Stimulants: appetite suppression, sleep problems, elevated HR/BP, growth (monitor in children). Atomoxetine: hepatotoxicity (rare)",
    prevention:"No proven prevention; omega-3, lead-exposure reduction, breastfeeding potentially protective",
    whenToSeeDoctor:"School failure, severe behavioral problems, family disruption, suspected ADHD in adult with lifelong symptoms",
    specialGroups:{pregnantWomen:"Methylphenidate use uncertain; non-pharmacological management preferred; atomoxetine avoid.",children:"Primary presentation; early diagnosis and treatment critical for academic and social development.",elderly:"Rarely new diagnosis; stimulants used cautiously with cardiovascular issues.",youngAdults:"Underdiagnosed in women; driving risks; workplace accommodation; substance abuse risk."} },
  { id:37, name:"Bipolar Disorder",             category:"Psychiatric",
    image:"https://images.unsplash.com/photo-1541199249251-f713e6145474?w=700",
    symptoms:"Alternating manic episodes (elevated mood, decreased sleep, grandiosity, risky behavior) and depressive episodes",
    diagnosis:"Careful clinical history, DIGFAST criteria for mania, MDQ screening, ruling out secondary causes (drugs, thyroid)",
    treatment:"Lithium (gold standard), valproate, lamotrigine (bipolar II/depression), antipsychotics (acute mania), ECT",
    description:"Episodic mood disorder with manic and depressive episodes causing severe impairment; high suicide risk.",
    complications:"Suicide (30× higher risk), substance abuse, psychosis, relationship and employment disruption, metabolic syndrome",
    tips:"Mood diary, medication adherence (lithium monitoring), regular sleep schedule, avoid alcohol and drugs",
    sideEffects:"Lithium: tremor, polyuria, thyroid effects, teratogenic; regular serum-level monitoring. Valproate: teratogenic",
    prevention:"No prevention; early recognition and treatment reduces severity; psychoeducation",
    whenToSeeDoctor:"Signs of mania (not sleeping, poor judgment), suicidal ideation, psychotic symptoms",
    specialGroups:{pregnantWomen:"Very high-risk period; valproate absolutely contraindicated; lithium requires monitoring; mood stabilization critical.",children:"Diagnosis challenging; often presents as ADHD/conduct disorder; quetiapine and aripiprazole used.",elderly:"Cognitive impairment with higher lithium levels; lower lithium doses; vascular mania may occur.",youngAdults:"Often misdiagnosed as depression initially; antidepressants alone can trigger mania; substance use common."} },
  { id:38, name:"Glaucoma",                     category:"Ophthalmological",
    image:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=700",
    symptoms:"Often asymptomatic (OAG); angle-closure: sudden eye pain, halos, headache, nausea; gradual peripheral vision loss",
    diagnosis:"IOP measurement (tonometry), optic nerve assessment, visual field testing, OCT of RNFL, gonioscopy",
    treatment:"Eye drops (prostaglandin analogues, beta-blockers, CAIs, alpha-agonists), laser (SLT), trabeculectomy",
    description:"Optic neuropathy characterized by progressive loss of retinal ganglion cells, often associated with elevated IOP.",
    complications:"Irreversible vision loss, legal blindness, complete blindness if untreated",
    tips:"Never miss eye drop doses, regular follow-up, sleep with head slightly elevated, avoid tight neckwear",
    sideEffects:"Prostaglandin analogues: eyelash changes, periorbital fat atrophy, iris color change. Timolol: systemic effects (bradycardia)",
    prevention:"Regular eye pressure checks after age 40; especially if family history or African descent",
    whenToSeeDoctor:"Sudden eye pain with visual changes (angle closure — emergency), noticing peripheral vision loss",
    specialGroups:{pregnantWomen:"IOP naturally decreases in pregnancy; topical medications may be absorbed systemically; cautious use.",children:"Congenital glaucoma: photophobia and epiphora in infants; surgery often required urgently.",elderly:"Most common cause of irreversible blindness; falls risk with visual field loss; compliance challenges.",youngAdults:"Normal-tension glaucoma; regular monitoring critical; early treatment prevents lifelong visual disability."} },
  { id:39, name:"Cataracts",                    category:"Ophthalmological",
    image:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=700",
    symptoms:"Blurred/cloudy vision, glare and halos around lights, poor night vision, faded colors, double vision in one eye",
    diagnosis:"Slit-lamp examination, visual acuity testing, dilated fundal exam, contrast sensitivity testing",
    treatment:"Stronger glasses initially, phacoemulsification with IOL implant (definitive, outpatient procedure)",
    description:"Clouding of the crystalline lens causing progressive visual impairment; leading cause of treatable blindness worldwide.",
    complications:"Phacomorphic glaucoma, hypermature cataract, phacolytic uveitis, falls, driving accidents",
    tips:"UV-protective sunglasses, antioxidant diet, blood sugar control in diabetics, no smoking",
    sideEffects:"Cataract surgery: posterior capsule opacification (treatable), endophthalmitis (rare), retinal detachment (rare)",
    prevention:"UV protection from youth, avoid smoking, control diabetes, antioxidant-rich diet (lutein, zeaxanthin)",
    whenToSeeDoctor:"When vision impairment affects quality of life, driving, or reading; sudden vision change in diabetics",
    specialGroups:{pregnantWomen:"Surgery can be performed in pregnancy if visually significant; regional anesthesia preferred.",children:"Congenital cataracts require urgent treatment to prevent amblyopia; patching therapy after surgery.",elderly:"Leading surgical intervention in elderly; marked quality-of-life improvement; falls reduction after surgery.",youngAdults:"Traumatic cataracts most common; secondary cataracts from steroids or metabolic disease."} },
  { id:40, name:"Macular Degeneration",         category:"Ophthalmological",
    image:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=700",
    symptoms:"Blurred/distorted central vision, scotoma, difficulty reading and recognizing faces, Amsler grid distortion",
    diagnosis:"Dilated eye exam, OCT macula (gold standard), fluorescein angiography, AREDS2 supplements indication assessment",
    treatment:"Wet AMD: anti-VEGF injections (ranibizumab, aflibercept, brolucizumab). Dry AMD: AREDS2 supplements",
    description:"Progressive degeneration of the central retina (macula); leading cause of legal blindness over age 65.",
    complications:"Legal blindness, inability to drive or read, loss of independence, depression",
    tips:"AREDS2 supplements for intermediate AMD, stop smoking, eat leafy greens and fish, home Amsler grid monitoring",
    sideEffects:"Anti-VEGF injections: endophthalmitis (rare), retinal tear, retinal detachment, sustained IOP elevation",
    prevention:"No smoking (2-3× higher risk in smokers), UV protection, Mediterranean diet, cardiovascular health",
    whenToSeeDoctor:"Any distortion or scotoma in central vision is urgent; annual monitoring if intermediate AMD",
    specialGroups:{pregnantWomen:"Rarely occurs; anti-VEGF has theoretical fetal risks; individual risk-benefit assessment.",children:"Juvenile macular dystrophies (Stargardt) are different entities; genetic testing and low vision support.",elderly:"Most common in >65; low vision aids; home safety assessment; emotional and psychological support.",youngAdults:"Stargardt disease presents in adolescents; genetic counseling; vocational rehabilitation important."} },
  { id:41, name:"Sinusitis",                    category:"ENT",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Facial pain/pressure, nasal congestion, thick discolored discharge, reduced smell, headache, fatigue, tooth pain",
    diagnosis:"Clinical diagnosis, nasal endoscopy, CT sinuses (for chronic/recurrent), allergy testing, nasal culture",
    treatment:"Saline irrigation, intranasal corticosteroids, antibiotics (bacterial: 10-14 days), functional endoscopic sinus surgery",
    description:"Inflammation of the mucosal lining of the paranasal sinuses, classified as acute (<4 weeks) or chronic (>12 weeks).",
    complications:"Orbital cellulitis/abscess, meningitis, brain abscess, cavernous sinus thrombosis (rare but serious)",
    tips:"Nasal saline rinses twice daily, steam inhalation, humidifier use, adequate hydration, avoid irritants",
    sideEffects:"Nasal steroids: minimal systemic absorption at standard doses. Antibiotics: GI side effects, resistance",
    prevention:"Treat allergies aggressively, avoid smoke, vaccinate against influenza/pneumococcus, dental hygiene",
    whenToSeeDoctor:"Severe headache, vision changes, orbital swelling, high fever, stiff neck, not improving with treatment",
    specialGroups:{pregnantWomen:"Saline rinses and INCS generally safe; amoxicillin preferred antibiotic; physiological nasal congestion worsens it.",children:"Adenoidal hypertrophy contributes; INCS and saline first-line; adenotonsillectomy if recurrent.",elderly:"Impaired mucociliary clearance; fungi more common; dental infection may precipitate; complications more severe.",youngAdults:"Allergic rhinitis most common predisposing factor; deviated septum may need correction."} },
  { id:42, name:"Allergic Rhinitis",            category:"ENT",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Sneezing, watery rhinorrhea, nasal congestion, itchy nose/eyes/palate, postnasal drip, periocular swelling",
    diagnosis:"Clinical history, skin prick testing, specific IgE serum tests, nasal eosinophilia, nasal allergen challenge",
    treatment:"Allergen avoidance, intranasal corticosteroids (most effective), antihistamines, allergen immunotherapy",
    description:"IgE-mediated allergic inflammation of nasal mucosa triggered by aeroallergens (pollen, dust mites, pet dander, mold).",
    complications:"Sinusitis, otitis media, sleep apnea, asthma exacerbation, dental malocclusion in children",
    tips:"Monitor pollen counts, keep windows closed during high pollen, HEPA air filters, regular vacuuming",
    sideEffects:"INCS: rare systemic effects at recommended doses. Antihistamines (older generation): sedation, anticholinergic effects",
    prevention:"Early allergen immunotherapy; avoid smoking exposure; exclusive breastfeeding may reduce risk",
    whenToSeeDoctor:"Not responding to treatment, suspected asthma, recurrent ear infections, sleep disruption, considering immunotherapy",
    specialGroups:{pregnantWomen:"INCS first-line (loratadine antihistamine also safe); allergen immunotherapy maintained but not started.",children:"Very common; impairs sleep, learning, and sports; immunotherapy modifies natural history.",elderly:"Less likely to be allergic; vasomotor rhinitis with aging; non-allergic rhinitis more common.",youngAdults:"High impact on quality of life; immunotherapy (SCIT or SLIT) can provide long-term cure."} },
  { id:43, name:"Sleep Apnea",                  category:"Sleep Disorders",
    image:"https://images.unsplash.com/photo-1541199249251-f713e6145474?w=700",
    symptoms:"Loud snoring, observed apneas, gasping/choking at night, unrefreshing sleep, excessive daytime sleepiness, morning headaches",
    diagnosis:"Polysomnography (gold standard), home sleep testing, Epworth Sleepiness Scale, overnight oximetry",
    treatment:"CPAP therapy (first-line for moderate-severe), mandibular advancement device, positional therapy, surgery",
    description:"Repetitive upper airway obstruction during sleep causing oxygen desaturations, sleep fragmentation, cardiovascular strain.",
    complications:"Hypertension, cardiac arrhythmias (especially AF), heart failure, type 2 diabetes, road traffic accidents",
    tips:"Use CPAP every night and all night, humidifier to improve tolerance, positional devices for positional OSA, weight loss",
    sideEffects:"CPAP: mask discomfort, nasal congestion, pressure intolerance (auto-CPAP helps), central apnea emergence",
    prevention:"Weight management most important, avoid alcohol before bed, stop smoking, sleep on side",
    whenToSeeDoctor:"Witnessed apneas, excessive daytime sleepiness affecting function or driving, morning headaches, cardiac arrhythmias",
    specialGroups:{pregnantWomen:"Increases preeclampsia, gestational DM, and preterm birth risk; CPAP is safe and recommended.",children:"Adenotonsillar hypertrophy primary cause; ADHD overlap; adenotonsillectomy often curative.",elderly:"Prevalence increases with age; cardiovascular significance major; CPAP adherence can be challenging.",youngAdults:"Increasing with obesity; untreated increases accident risk; affects academic and work performance."} },
  { id:44, name:"Insomnia",                     category:"Sleep Disorders",
    image:"https://images.unsplash.com/photo-1541199249251-f713e6145474?w=700",
    symptoms:"Difficulty initiating or maintaining sleep, early morning awakening, non-restorative sleep, daytime impairment, fatigue",
    diagnosis:"Sleep diary, Insomnia Severity Index, exclusion of other sleep disorders, actigraphy",
    treatment:"CBT-I (gold standard), sleep restriction, stimulus control, sleep medications short-term",
    description:"Persistent difficulty with sleep initiation, maintenance, or quality despite adequate opportunity, causing daytime dysfunction.",
    complications:"Depression, anxiety disorders, substance abuse, cardiovascular disease, impaired immune function",
    tips:"Consistent sleep/wake times, no screens 1 hour before bed, cool dark quiet bedroom, limit caffeine after noon",
    sideEffects:"Benzodiazepines/Z-drugs: dependence, rebound insomnia, falls in elderly, daytime sedation. Melatonin: minimal",
    prevention:"Sleep hygiene from early life, stress management, regular exercise, avoid caffeine and alcohol disrupting sleep",
    whenToSeeDoctor:"Symptoms >3 months, affecting daily function, suspected sleep apnea, psychiatric comorbidity, medication dependence",
    specialGroups:{pregnantWomen:"Common in all trimesters; CBT-I first-line; melatonin limited safety data; avoid benzodiazepines.",children:"Behavioral insomnia of childhood; stimulus control and bedtime fading effective; parental guidance critical.",elderly:"Chronic insomnia most prevalent; sleep architecture changes normal; fall risk with sedatives; CBT-I effective.",youngAdults:"Delayed sleep phase common; social media and screen use disrupts circadian rhythm; light therapy helpful."} },
  { id:45, name:"Anemia",                       category:"Hematological",
    image:"https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=700",
    symptoms:"Fatigue, pallor (conjunctival, palmar), dyspnea on exertion, palpitations, dizziness, headache, cold extremities",
    diagnosis:"CBC (Hb, MCV, MCH), reticulocyte count, iron studies, B12/folate, peripheral blood smear, bone marrow if needed",
    treatment:"Iron supplements, IV iron, B12 injections, folate, erythropoietin, transfusion for severe, treat underlying cause",
    description:"Reduction in red blood cells or hemoglobin causing reduced oxygen-carrying capacity; iron deficiency most common globally.",
    complications:"Cardiac failure, impaired immune function, cognitive dysfunction, pregnancy complications, functional limitation",
    tips:"Iron-rich foods (lean meat, spinach, legumes) with vitamin C; tea/coffee separate from iron tablets",
    sideEffects:"Oral iron: constipation, dark stools, nausea. IV iron: infusion reactions (rare but serious). B12 injections: generally safe",
    prevention:"Balanced diet, treat underlying blood loss, screen pregnant women, food fortification with iron/folate",
    whenToSeeDoctor:"Hb <7 g/dL or symptomatic, rapid drop in Hb, not responding to oral iron, unexplained anemia",
    specialGroups:{pregnantWomen:"Iron deficiency most common; increased iron requirement; severe anemia increases premature birth risk.",children:"Iron deficiency impairs neurodevelopment; cow's milk >500 ml/day reduces iron absorption.",elderly:"Multifactorial; myelodysplasia and chronic disease common; thorough GI investigation for blood loss.",youngAdults:"Heavy menstrual bleeding (iron deficiency); B12 deficiency in vegans; sports anemia."} },
  { id:46, name:"Sickle Cell Disease",          category:"Hematological",
    image:"https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=700",
    symptoms:"Vaso-occlusive crises (acute pain), hemolytic anemia, splenomegaly in childhood, stroke risk, acute chest syndrome",
    diagnosis:"Hemoglobin electrophoresis, HPLC, full blood count (chronic normocytic anemia, elevated reticulocyte), neonatal screening",
    treatment:"Hydroxyurea (reduces crises), pain management for crises, exchange transfusions, iron chelation, bone marrow transplant",
    description:"Autosomal recessive hemoglobin disorder causing rigid sickle-shaped red cells causing vascular occlusion and hemolysis.",
    complications:"Stroke, AVN, chronic pain, splenic sequestration, pulmonary hypertension, chronic organ damage, priapism",
    tips:"Hydration, warmth, avoid extreme exertion or altitude; vaccination (functional asplenia); hydroxyurea adherence",
    sideEffects:"Hydroxyurea: cytopenias (dose-related), teratogenic. Iron chelation: GI side effects, audiological effects",
    prevention:"Genetic counseling for carriers; prenatal diagnosis; neonatal screening programs; early management prevents complications",
    whenToSeeDoctor:"Severe pain crisis, fever (potential sepsis), priapism, neurological symptoms, acute chest crisis",
    specialGroups:{pregnantWomen:"High maternal/fetal morbidity; transfusions may be needed; hydroxyurea stopped pre-conception; multidisciplinary care.",children:"Neonatal screening enables early prophylaxis; penicillin from 2 months; stroke screening with TCD.",elderly:"Organ damage accumulates; chronic pain management; pulmonary hypertension; renal disease.",youngAdults:"Gene therapy now available; fertility concerns with hydroxyurea; bone marrow transplant as curative option."} },
  { id:47, name:"Leukemia",                     category:"Oncological",
    image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700",
    symptoms:"Fatigue, fever, easy bruising/bleeding, frequent infections, pallor, lymphadenopathy, bone pain, night sweats",
    diagnosis:"CBC with differential, peripheral blood smear, bone marrow biopsy, immunophenotyping, cytogenetics, molecular testing",
    treatment:"Chemotherapy protocols, targeted therapy (imatinib for CML), immunotherapy, stem cell transplant, supportive care",
    description:"Malignancy of hematopoietic cells affecting white blood cell production, classified as acute or chronic.",
    complications:"Infections (immunosuppression), bleeding, tumor lysis syndrome, CNS involvement, treatment-related second malignancies",
    tips:"Infection prevention (hand hygiene, crowd avoidance), nutrition support, exercise as tolerated, psychological support",
    sideEffects:"Chemotherapy: myelosuppression, nausea, hair loss, mucositis, cardiotoxicity, neuropathy. TKIs: edema, hepatotoxicity",
    prevention:"Avoid benzene exposure and radiation; no proven primary prevention; genetic predisposition screening in families",
    whenToSeeDoctor:"Unexplained bruising/bleeding, persistent fever, significant fatigue, lymphadenopathy, bone pain",
    specialGroups:{pregnantWomen:"AML during pregnancy; multidisciplinary team essential; chemotherapy given with fetal monitoring.",children:"ALL most common childhood cancer; cure rates >90% with current protocols; late effects monitoring critical.",elderly:"CLL most common in elderly; often indolent; watchful waiting may be appropriate; frailty affects treatment.",youngAdults:"CML most treatable with TKIs; fertility preservation before treatment; psychological impact significant."} },
  { id:48, name:"Breast Cancer",                category:"Oncological",
    image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700",
    symptoms:"Painless breast lump, skin dimpling, nipple inversion or discharge, breast asymmetry, skin redness or scaling",
    diagnosis:"Triple assessment: clinical exam, mammogram/ultrasound, core biopsy; MRI staging; receptor testing; gene panel",
    treatment:"Surgery, sentinel node biopsy, radiotherapy, chemotherapy, hormone therapy, HER2-targeted therapy, CDK4/6 inhibitors",
    description:"Most common cancer in women globally; outcomes determined by stage at diagnosis, molecular subtype, and treatment response.",
    complications:"Lymphedema, neuropathy, cardiac toxicity, bone metastases, psychological distress, fertility effects",
    tips:"Monthly self-examination, annual mammogram (>40 or earlier with risk), BRCA testing if strong family history",
    sideEffects:"Tamoxifen: hot flashes, endometrial cancer risk, DVT. Aromatase inhibitors: arthralgia, bone loss",
    prevention:"Maintain healthy weight, exercise, limit alcohol, avoid postmenopausal HRT, consider prophylactic surgery for BRCA1/2",
    whenToSeeDoctor:"Any new breast lump, nipple discharge (esp. bloody), skin changes, nipple inversion, axillary swelling",
    specialGroups:{pregnantWomen:"Pregnancy-associated breast cancer; delays in diagnosis; modified treatment possible with fetal monitoring.",children:"Pediatric breast cancer very rare; fibroadenoma more common; biopsy for suspicious lesions.",elderly:"Most common in postmenopausal women; treatment based on biologic age and comorbidities; endocrine therapy often effective.",youngAdults:"BRCA mutation testing; fertility preservation before chemotherapy; psychosocial impact; reconstruction planning."} },
  { id:49, name:"Lung Cancer",                  category:"Oncological",
    image:"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700",
    symptoms:"Persistent new cough, hemoptysis, chest pain, unexplained weight loss, hoarseness, dyspnea, recurrent chest infections",
    diagnosis:"CT thorax, PET-CT, bronchoscopy with biopsy, EBUS, molecular testing (EGFR, ALK, PD-L1), mediastinoscopy",
    treatment:"Surgery (early stage), stereotactic radiotherapy, chemotherapy, immunotherapy (pembrolizumab), EGFR/ALK inhibitors",
    description:"Most common cause of cancer death worldwide; 85% NSCLC; 15% SCLC; smoking responsible for 85% of cases.",
    complications:"SVC obstruction, brain metastases, malignant effusion, paraneoplastic syndromes, hypercalcemia",
    tips:"Quit smoking now (even late benefit), annual low-dose CT if heavy smoker 50-80 years, radon testing at home",
    sideEffects:"Cisplatin: nephrotoxicity, ototoxicity. Immunotherapy: pneumonitis, thyroiditis, colitis. EGFR TKIs: rash, diarrhea",
    prevention:"Smoking cessation is primary prevention; radon reduction; asbestos avoidance; air pollution reduction",
    whenToSeeDoctor:"Persistent new cough >3 weeks, coughing blood, unexplained weight loss, chest pain, worsening breathlessness",
    specialGroups:{pregnantWomen:"Extremely rare; diagnosis often delayed; multidisciplinary management; treatment depends on gestational age.",children:"Primary lung tumors rare; secondary involvement more common; different histological subtypes.",elderly:"Most cases in elderly; pulmonary function affects surgical eligibility; stereotactic radiotherapy alternative.",youngAdults:"Non-smokers may have EGFR/ALK mutations; targeted therapies effective; genetic testing important."} },
  { id:50, name:"Colorectal Cancer",            category:"Oncological",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Change in bowel habit, rectal bleeding, abdominal pain, unexplained weight loss, iron-deficiency anemia",
    diagnosis:"Colonoscopy with biopsy (gold standard), CT colonography, CEA tumor marker, CT staging, MSI/MMR testing",
    treatment:"Surgery (colectomy/TME), adjuvant FOLFOX chemotherapy, radiotherapy (rectal), bevacizumab, immunotherapy (MSI-H)",
    description:"Third most common cancer worldwide; 95% adenocarcinoma; most develop from polyps over 10-15 years (preventable).",
    complications:"Bowel obstruction, peritoneal metastases, liver/lung metastases, stoma complications, anastomotic leak",
    tips:"Colonoscopy screening from age 45; high-fiber, low red/processed meat diet; exercise regularly",
    sideEffects:"Oxaliplatin: peripheral neuropathy. Irinotecan: diarrhea, hair loss. Bevacizumab: hypertension, GI perforation risk",
    prevention:"Annual fecal occult blood testing, colonoscopy screening, aspirin in high-risk, high-fiber diet",
    whenToSeeDoctor:"Any rectal bleeding, change in bowel habit >6 weeks, iron deficiency without explanation",
    specialGroups:{pregnantWomen:"Rare; diagnosis often delayed; modified surgical approach; chemotherapy in 2nd/3rd trimester if essential.",children:"FAP and HNPCC; colonoscopy surveillance from childhood; genetic testing of at-risk family members.",elderly:"Most common in >70; stoma considerations; quality-of-life emphasis; palliative surgery for obstruction.",youngAdults:"Rising incidence in <50; Lynch syndrome screening; rectal cancer in younger patients; fertility preservation."} },
  { id:51, name:"Peptic Ulcer Disease",         category:"Gastrointestinal",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Epigastric pain (burning/gnawing), pain relief or worsening with food, nausea, vomiting, dark stools",
    diagnosis:"Upper GI endoscopy (gold standard), H. pylori testing (urea breath test, stool antigen, serology)",
    treatment:"H. pylori eradication (PPI + amoxicillin + clarithromycin 7-14 days), PPI for 4-8 weeks, stop NSAIDs",
    description:"Ulcers in gastric or duodenal mucosa caused by H. pylori infection (80%) or NSAID use (20%).",
    complications:"Bleeding, perforation, gastric outlet obstruction, penetration",
    tips:"Complete H. pylori treatment and confirm eradication, avoid NSAIDs (use PPI cover if essential), no smoking",
    sideEffects:"Triple therapy: metallic taste (clarithromycin), C. diff risk, antibiotic resistance. PPIs: see GERD section",
    prevention:"H. pylori treatment when detected, PPI with NSAIDs in high-risk patients, smoking cessation",
    whenToSeeDoctor:"Hematemesis, melena, perforation signs (sudden severe pain), weight loss, anemia, dysphagia",
    specialGroups:{pregnantWomen:"PPI relatively safe; H. pylori treatment post-delivery preferred; amoxicillin safer than clarithromycin.",children:"H. pylori eradication curative; family cluster treatment may be needed; diagnostic criteria different.",elderly:"Increased bleeding complication risk; lower threshold for endoscopy; PPI prophylaxis routinely.",youngAdults:"H. pylori testing and eradication; stress-related ulcers in ICU patients; NSAID reduction strategy."} },
  { id:52, name:"PCOS",                         category:"Gynecological",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Irregular/absent periods, hirsutism, acne, alopecia, obesity, acanthosis nigricans, infertility",
    diagnosis:"Rotterdam criteria (2 of 3): oligo/anovulation, hyperandrogenism, polycystic ovaries on ultrasound",
    treatment:"OCP for cycle regulation, metformin for insulin resistance, spironolactone for hyperandrogenism, letrozole for fertility",
    description:"Most common endocrine disorder in women of reproductive age affecting 10-15%; metabolic and reproductive manifestations.",
    complications:"Type 2 diabetes, cardiovascular disease, endometrial cancer, infertility, metabolic syndrome, depression",
    tips:"Weight loss most effective treatment (5-10% reduces all symptoms), regular exercise, low-GI diet",
    sideEffects:"OCP: DVT risk, hypertension, mood changes. Metformin: GI side effects. Spironolactone: hyperkalemia, teratogenic",
    prevention:"Healthy weight from adolescence, regular exercise, balanced diet to reduce insulin resistance",
    whenToSeeDoctor:"Irregular periods, fertility concerns, signs of diabetes, significant hirsutism or acne not responding",
    specialGroups:{pregnantWomen:"Higher miscarriage, gestational diabetes and preeclampsia risk; metformin may reduce miscarriage rate.",children:"Adolescent PCOS difficult to diagnose; irregular periods normal for 2 years after menarche.",elderly:"Symptoms may improve post-menopause; long-term cardiovascular and endometrial cancer surveillance.",youngAdults:"Significant psychological impact; body image; fertility anxiety; long-term metabolic risk management."} },
  { id:53, name:"Endometriosis",                category:"Gynecological",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Dysmenorrhea (severe period pain), deep dyspareunia, chronic pelvic pain, dysuria/dyschezia, infertility, fatigue",
    diagnosis:"Laparoscopy (gold standard), MRI pelvis, pelvic ultrasound, CA-125 (limited), clinical diagnosis may be adequate",
    treatment:"Hormonal: OCP, progestins, GnRH agonists, LNG-IUS; Surgical: laparoscopic excision; IVF if required",
    description:"Endometrial-like tissue implants outside uterus causing chronic inflammation, pain, and infertility in 10% of women.",
    complications:"Severe chronic pain, infertility (30-50%), ovarian endometrioma, bowel/bladder involvement, psychological impact",
    tips:"Pain management plan, heat therapy, pelvic physiotherapy, multidisciplinary team care, peer support groups",
    sideEffects:"GnRH agonists: menopausal symptoms, bone density loss (need add-back HRT). Progestins: irregular bleeding",
    prevention:"No proven prevention; early hormonal treatment after diagnosis; oral contraceptives may slow progression",
    whenToSeeDoctor:"Severe period pain, chronic pelvic pain, deep pain during sex, fertility concerns, pain not responding to analgesia",
    specialGroups:{pregnantWomen:"Symptoms often improve during pregnancy; higher ectopic pregnancy risk; conception challenges.",children:"Adolescent endometriosis underdiagnosed; severe dysmenorrhea in teens should prompt evaluation.",elderly:"Usually resolves post-menopause; malignant transformation of deep lesions very rare.",youngAdults:"Average 7-10 year diagnostic delay; significant impact on quality of life, employment, relationships."} },
  { id:54, name:"Kidney Stones",                category:"Urological",
    image:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700",
    symptoms:"Sudden severe flank/loin pain radiating to groin ('renal colic'), nausea, vomiting, hematuria, urinary frequency",
    diagnosis:"Non-contrast CT KUB (most sensitive), ultrasound, urine dipstick, serum creatinine/calcium/uric acid, stone analysis",
    treatment:"Pain management (NSAIDs/opioids), alpha-blocker (tamsulosin) to facilitate stone passage, ESWL, ureteroscopy, PCNL",
    description:"Crystalline deposits of calcium, uric acid, struvite, or cystine forming in renal collecting system; 10% lifetime risk.",
    complications:"Urinary obstruction, hydronephrosis, recurrent UTIs, chronic kidney disease, bacterial superinfection",
    tips:"Fluid intake >2.5 L/day, reduce oxalate/salt/protein intake, citrate supplementation, metabolic evaluation after first stone",
    sideEffects:"ESWL: hematoma, renal bruising. Alpha-blockers: retrograde ejaculation, orthostatic hypotension",
    prevention:"High fluid intake, dietary modifications based on stone type, potassium citrate for calcium stones, allopurinol for uric acid stones",
    whenToSeeDoctor:"Fever with renal colic (infected obstructed kidney — emergency), severe pain not controlled, complete obstruction",
    specialGroups:{pregnantWomen:"Increased risk; ultrasound for diagnosis; NSAIDs avoided; ureteroscopy can be performed safely.",children:"Metabolic workup essential; underlying metabolic disorder likely; increasing incidence with obesity.",elderly:"May present atypically; dehydration common precipitant; renal function consideration before contrast CT.",youngAdults:"Recurrence prevention critical; metabolic evaluation; dietary modification and hydration most important."} },
  { id:55, name:"Urinary Tract Infection",      category:"Urological",
    image:"https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700",
    symptoms:"Dysuria, frequency, urgency, suprapubic pain, cloudy/malodorous urine; fever and loin pain if pyelonephritis",
    diagnosis:"Urine dipstick (nitrites, leukocytes), MSU culture, pregnancy test if applicable, imaging if complicated",
    treatment:"Uncomplicated: nitrofurantoin or trimethoprim 3 days. Complicated/pyelonephritis: cefalexin 7-14 days",
    description:"Bacterial infection of urinary tract; most common infectious condition in women with 50% lifetime prevalence.",
    complications:"Pyelonephritis, urosepsis, renal abscess, papillary necrosis, recurrent UTI, preterm birth in pregnancy",
    tips:"High fluid intake, void after intercourse, wipe front-to-back, cranberry products may reduce recurrence",
    sideEffects:"Nitrofurantoin: GI upset, pulmonary toxicity (long-term). Trimethoprim: folate antagonism (avoid in 1st trimester)",
    prevention:"Adequate hydration, regular voiding, post-coital voiding, avoid spermicides, topical estrogen post-menopause",
    whenToSeeDoctor:"Fever with loin pain (pyelonephritis), UTI in pregnancy, UTI in men (always), recurrent UTI",
    specialGroups:{pregnantWomen:"Asymptomatic bacteriuria must be treated to prevent pyelonephritis; avoid nitrofurantoin near term.",children:"Atypical presentation in young children; renal ultrasound after first UTI; MCUG for recurrent UTI.",elderly:"Asymptomatic bacteriuria common — do NOT treat unless symptomatic; catheter-associated UTI prevention.",youngAdults:"Most common in sexually active women; post-coital antibiotics prophylactic option; contraceptive method review."} },
  { id:56, name:"Cirrhosis",                    category:"Hepatic",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Fatigue, jaundice, ascites, edema, confusion (hepatic encephalopathy), easy bruising, spider angiomas",
    diagnosis:"Blood tests (LFTs, coagulation), imaging (ultrasound, CT, MRI), FibroScan, endoscopy for varices, liver biopsy",
    treatment:"Treat underlying cause, diuretics for ascites, propranolol for varices, lactulose for encephalopathy, liver transplant",
    description:"End-stage liver scarring with loss of functional liver tissue, representing the final common pathway of chronic liver disease.",
    complications:"Portal hypertension, esophageal varices, hepatocellular carcinoma, SBP, hepatorenal syndrome",
    tips:"Absolute alcohol abstinence, sodium-restricted diet, HCC surveillance every 6 months, vaccination against hepatitis A/B",
    sideEffects:"Diuretics: electrolyte imbalances, renal impairment. Lactulose: diarrhea, bloating",
    prevention:"Treat hepatitis B/C early, avoid alcohol excess, control NAFLD risk factors, weight management",
    whenToSeeDoctor:"Sudden abdominal pain (SBP), fever, confusion, GI bleeding, rapid deterioration",
    specialGroups:{pregnantWomen:"Extremely high-risk pregnancy; portal hypertension worsens; specialist hepatology and obstetric care.",children:"Biliary atresia leading cause; early diagnosis critical for Kasai procedure and transplant.",elderly:"Comorbidities complicate management; drug metabolism impaired; transplant evaluation if appropriate.",youngAdults:"Alcohol-related cirrhosis rising; addiction treatment crucial; transplant listing if abstinence maintained."} },
  { id:57, name:"Pancreatitis",                 category:"Gastrointestinal",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Acute: severe epigastric pain radiating to back, nausea, vomiting, fever. Chronic: recurrent pain, steatorrhea, weight loss",
    diagnosis:"Serum amylase/lipase, CT abdomen (Balthazar score), MRCP, endoscopic ultrasound, HbA1c",
    treatment:"Acute: IV fluids, pain control, nutritional support, ERCP for stones. Chronic: enzyme replacement, pain management, insulin",
    description:"Inflammatory condition of the pancreas; acute form often self-limiting but severe cases carry significant mortality.",
    complications:"Pancreatic necrosis, pseudocyst, abscess, ARDS, multi-organ failure, endocrine/exocrine insufficiency",
    tips:"Absolute alcohol abstinence, low-fat diet, small frequent meals, enzyme supplements with meals, no smoking",
    sideEffects:"Pancreatic enzymes: abdominal discomfort at high doses. Analgesics: dependence risk in chronic pancreatitis",
    prevention:"Avoid excessive alcohol, treat gallstones early, control hypertriglyceridemia, no smoking",
    whenToSeeDoctor:"Severe abdominal pain, fever, jaundice, persistent vomiting, signs of shock, worsening despite initial treatment",
    specialGroups:{pregnantWomen:"Gallstone pancreatitis most common in pregnancy; IV fluids and supportive care; ERCP if needed.",children:"Usually due to trauma, medications, or metabolic disorders; hereditary pancreatitis genetic forms.",elderly:"Higher complication and mortality rate; atypical presentation possible; aggressive fluid resuscitation.",youngAdults:"Alcohol is leading cause; addiction counseling critical; chronic pancreatitis leads to diabetes."} },
  { id:58, name:"Gallstones",                   category:"Gastrointestinal",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Biliary colic (right upper quadrant pain after fatty meals), nausea, vomiting. Many asymptomatic",
    diagnosis:"Abdominal ultrasound (first choice), CT scan, MRCP, HIDA scan, ERCP for CBD stones",
    treatment:"Laparoscopic cholecystectomy (definitive), ERCP for CBD stones, ursodeoxycholic acid (medical dissolution)",
    description:"Hardened deposits of bile components forming in the gallbladder, affecting 10-15% of adults in Western countries.",
    complications:"Acute cholecystitis, choledocholithiasis, pancreatitis, cholangitis, gallbladder cancer (rare)",
    tips:"Low-fat diet, maintain healthy weight, avoid rapid weight loss, regular meals, gradual weight reduction if needed",
    sideEffects:"UDCA: diarrhea, pruritus. Post-cholecystectomy: bile-acid diarrhea in some patients",
    prevention:"Healthy weight maintenance, avoid crash diets, regular physical activity, high-fiber diet",
    whenToSeeDoctor:"Severe worsening abdominal pain, fever and chills with jaundice (Charcot's triad), clay-colored stools",
    specialGroups:{pregnantWomen:"Increased risk due to progesterone and cholesterol changes; surgery in 2nd trimester if needed.",children:"Rare; associated with hemolytic anemias (sickle cell), obesity, or total parenteral nutrition.",elderly:"Higher surgical risk; higher malignancy risk; consider conservative management in asymptomatic elderly.",youngAdults:"Female > male; oral contraceptives increase risk; obesity significant risk factor."} },
  { id:59, name:"Fatty Liver Disease (NAFLD)",  category:"Hepatic",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Usually asymptomatic; fatigue, right upper quadrant discomfort; metabolic syndrome features common; incidental finding",
    diagnosis:"Liver enzymes (ALT elevated), ultrasound, FibroScan, FIB-4 fibrosis score, liver biopsy",
    treatment:"Weight loss (7-10% reduces liver fat), exercise, treat metabolic comorbidities, vitamin E (non-diabetic NASH), resmetirom",
    description:"Spectrum from simple steatosis to NASH and cirrhosis in absence of excess alcohol; affects 25% of adults globally.",
    complications:"NASH, cirrhosis, hepatocellular carcinoma, cardiovascular disease (leading cause of death in NAFLD)",
    tips:"Even 5-7% weight loss improves liver histology; Mediterranean diet; minimize fructose/sugar; alcohol abstinence",
    sideEffects:"Vitamin E: potential prostate cancer risk in long-term use. Resmetirom (FDA-approved 2024): diarrhea, nausea",
    prevention:"Healthy weight, regular exercise, avoid fructose-rich foods and ultra-processed foods, no alcohol",
    whenToSeeDoctor:"Liver enzymes persistently elevated, suspected advanced fibrosis (FIB-4 >2.67), signs of cirrhosis",
    specialGroups:{pregnantWomen:"AFLP (acute fatty liver of pregnancy) rare but life-threatening emergency in 3rd trimester; requires urgent delivery.",children:"Pediatric NAFLD rising with childhood obesity; fructose reduction critical; lifestyle intervention.",elderly:"High prevalence with metabolic comorbidities; cardiovascular risk management paramount.",youngAdults:"Increasingly common with obesity; early intervention prevents progression; lifestyle modification most effective."} },
  { id:60, name:"Deep Vein Thrombosis",         category:"Cardiovascular",
    image:"https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=700",
    symptoms:"Unilateral leg swelling, pain, warmth, erythema; calf or thigh tenderness; may be asymptomatic",
    diagnosis:"Wells score, D-dimer, compression ultrasound (gold standard), CT venography if proximal DVT suspected",
    treatment:"Anticoagulation: DOAC (rivaroxaban, apixaban) for ≥3 months; LMWH initially; treat PE if coexistent",
    description:"Thrombus formation in deep veins, typically lower limbs, with risk of pulmonary embolism — part of VTE spectrum.",
    complications:"Pulmonary embolism (potentially fatal), post-thrombotic syndrome, recurrent VTE, chronic venous insufficiency",
    tips:"Compression stockings, regular leg exercises on long flights, adequate hydration, mobilize early post-operatively",
    sideEffects:"DOACs: bleeding risk. Warfarin: multiple interactions, requires monitoring. LMWH: injection-site reactions",
    prevention:"Early mobilization post-surgery, LMWH prophylaxis for high-risk patients, hydration, graduated compression stockings",
    whenToSeeDoctor:"Unilateral swollen/painful leg, new breathing difficulty (possible PE), suspected DVT in pregnancy",
    specialGroups:{pregnantWomen:"Risk increases 5×; LMWH safe throughout pregnancy; avoid warfarin; postpartum 6 weeks anticoagulation.",children:"Rare; risk with cancer, central venous catheters, congenital thrombophilia; LMWH treatment.",elderly:"Higher prevalence; recurrence risk; bleeding risk with anticoagulation; falls assessment.",youngAdults:"OCP, pregnancy, cancer, thrombophilia, long-haul travel; thrombophilia screen after unprovoked DVT."} },
  { id:61, name:"Pulmonary Embolism",           category:"Respiratory",
    image:"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700",
    symptoms:"Sudden onset pleuritic chest pain, dyspnea, tachycardia, hemoptysis, syncope; massive PE: cardiovascular collapse",
    diagnosis:"Wells criteria + D-dimer, CT pulmonary angiogram (gold standard), BNP, troponin, ECG (S1Q3T3), echocardiogram",
    treatment:"Anticoagulation (DOAC/LMWH); systemic thrombolysis for massive PE; catheter-directed therapy",
    description:"Occlusion of pulmonary arteries by thrombus, usually from DVT, causing 5% of sudden deaths if massive.",
    complications:"Right heart failure, post-PE syndrome, CTEPH, death",
    tips:"Immediate medical attention; anticoagulation adherence for prescribed duration; risk stratification for treatment setting",
    sideEffects:"Thrombolytics: major bleeding risk including intracranial. Anticoagulants: bleeding; DOAC reversal agents available",
    prevention:"VTE prophylaxis in hospital, post-surgery mobilization, thromboprophylaxis in high-risk outpatients",
    whenToSeeDoctor:"MEDICAL EMERGENCY — sudden breathlessness, chest pain, hemoptysis, syncope; call ambulance immediately",
    specialGroups:{pregnantWomen:"Leading cause of maternal death in developed countries; CTPA preferred for diagnosis; LMWH treatment.",children:"Rare; secondary to underlying condition; managed similarly to adults with weight-based dosing.",elderly:"High mortality; treatment decisions complicated by renal function, falls risk, comorbidities.",youngAdults:"OCP interaction; thrombophilia; immobility; cancer screening after unprovoked PE; DOACs preferred."} },
  { id:62, name:"Fibromyalgia",                 category:"Rheumatological",
    image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700",
    symptoms:"Widespread musculoskeletal pain, extreme fatigue, sleep disturbance, cognitive difficulties ('fibro fog'), depression, anxiety",
    diagnosis:"Revised ACR 2010 criteria, widespread pain index ≥7, ruling out inflammatory/metabolic conditions",
    treatment:"Duloxetine, milnacipran, pregabalin, aerobic exercise (most evidence), CBT, sleep hygiene, amitriptyline",
    description:"Central sensitization syndrome with amplified pain processing, affecting 2-6% of population, predominantly women.",
    complications:"Depression, anxiety disorders, chronic fatigue syndrome, IBS, bladder dysfunction, reduced quality of life",
    tips:"Graduated aerobic exercise program, pacing activities, sleep hygiene, stress management, multidisciplinary approach",
    sideEffects:"Duloxetine: nausea, sexual dysfunction. Pregabalin: dizziness, weight gain, cognitive effects",
    prevention:"Stress management, trauma treatment, regular exercise, good sleep hygiene",
    whenToSeeDoctor:"Symptoms severely affecting daily function, suspected underlying inflammatory condition, worsening",
    specialGroups:{pregnantWomen:"Symptoms often worsen; non-pharmacological treatments preferred; pregabalin avoid.",children:"Juvenile fibromyalgia recognized; school impact significant; exercise critical; multidisciplinary approach.",elderly:"Distinguish from arthritis and other age-related conditions; careful medication choices.",youngAdults:"Peak incidence reproductive age; mental health comorbidities; work disability risk; acceptance therapy."} },
  { id:63, name:"Lyme Disease",                 category:"Infectious",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Early: erythema migrans (expanding ring rash), flu-like illness. Late: arthritis, Bell's palsy, heart block, neuropathy",
    diagnosis:"Two-tier serology (ELISA then Western blot), PCR of synovial fluid/CSF, clinical diagnosis if erythema migrans present",
    treatment:"Doxycycline 21 days (early disease), amoxicillin (pregnant/children), IV ceftriaxone for neurological/cardiac",
    description:"Multisystem infection caused by Borrelia burgdorferi transmitted by Ixodes tick bites; most common vector-borne disease in USA/Europe.",
    complications:"Lyme arthritis, Lyme neuroborreliosis, Lyme carditis, post-treatment Lyme disease syndrome (PTLDS)",
    tips:"Tick checks after outdoor activities, repellent (DEET), long sleeves, remove ticks within 24-36 hours",
    sideEffects:"Doxycycline: GI upset, photosensitivity, teratogenic. IV ceftriaxone: gallbladder sludge with prolonged courses",
    prevention:"DEET repellent, permethrin-treated clothing, tick checks, removing ticks promptly",
    whenToSeeDoctor:"Expanding ring rash, facial palsy, palpitations, joint swelling in endemic area, after tick bite",
    specialGroups:{pregnantWomen:"Amoxicillin preferred over doxycycline; vertical transmission rare but reported; complete treatment.",children:"Erythema migrans often atypical; Lyme facial palsy common; amoxicillin or doxycycline >8 years.",elderly:"Lyme arthritis more common; cardiac evaluation needed for heart block; Jarisch-Herxheimer reaction possible.",youngAdults:"Outdoor activity increases risk; camping and hiking precautions; prophylactic doxycycline after known tick bite."} },
  { id:64, name:"Chickenpox",                   category:"Infectious",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Prodrome (fever, malaise) followed by pruritic vesicular rash in crops starting on trunk and face",
    diagnosis:"Clinical diagnosis, PCR of vesicle fluid for confirmation, VZV IgM/IgG serology",
    treatment:"Paracetamol, antihistamines, calamine lotion; aciclovir for immunocompromised or severe disease",
    description:"Highly contagious primary VZV infection; typically mild in children, but adults and immunocompromised at risk.",
    complications:"Secondary bacterial infection, pneumonia, encephalitis, Reye's syndrome with aspirin, shingles in adulthood",
    tips:"Isolate until all lesions crusted, calamine lotion, trim nails, no scratching to prevent scarring and secondary infection",
    sideEffects:"Aciclovir: nephrotoxicity if dehydrated. VZV vaccine: mild rash, very rarely shingles",
    prevention:"Varicella vaccine (2 doses >90% effective), isolation of cases, VZIG for non-immune high-risk contacts",
    whenToSeeDoctor:"Severe secondary infection, difficulty breathing, confusion, very high fever, immunocompromised patient",
    specialGroups:{pregnantWomen:"Severe maternal pneumonia risk; fetal varicella syndrome if <20 weeks; VZIG urgently if exposed.",children:"Usually mild; school exclusion until crusted; acetaminophen not aspirin; secondary impetigo common.",elderly:"Reactivation as shingles; herpes zoster vaccine recommended from age 50.",youngAdults:"More severe than childhood; vaccination before pregnancy or travel to endemic areas."} },
  { id:65, name:"Appendicitis",                 category:"Gastrointestinal",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Periumbilical pain migrating to RIF, anorexia, nausea, vomiting, fever, Rovsing's sign, rebound tenderness",
    diagnosis:"Alvarado score, CRP/WBC, ultrasound (first in children/pregnant), CT abdomen (best sensitivity)",
    treatment:"Appendicectomy (laparoscopic preferred); antibiotics alone for uncomplicated in selected patients",
    description:"Acute inflammation of vermiform appendix; most common surgical emergency with lifetime risk of 8%.",
    complications:"Perforation (16-36h if untreated), abscess formation, peritonitis, sepsis",
    tips:"Do not delay medical care for severe abdominal pain; avoid laxatives if appendicitis suspected",
    sideEffects:"Laparoscopic appendicectomy: wound infection, ileus, rare bowel injury",
    prevention:"No proven prevention; high-fiber diet may reduce risk; prompt treatment prevents perforation",
    whenToSeeDoctor:"Severe abdominal pain especially right lower quadrant with fever and nausea — URGENT surgical assessment",
    specialGroups:{pregnantWomen:"Most common non-obstetric surgical emergency; displaced appendix (up and to right); MRI preferred over CT.",children:"Diagnosis more difficult; higher perforation rate; CT limited due to radiation; antibiotic consideration.",elderly:"Atypical presentation; higher perforation rate; higher surgical morbidity; CT important for diagnosis.",youngAdults:"Peak incidence 10-30 years; laparoscopic surgery excellent outcomes; return to activity within 1-2 weeks."} },
  { id:66, name:"Sciatica",                     category:"Musculoskeletal",
    image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700",
    symptoms:"Radiating pain from lower back through buttock down leg (dermatomal), numbness, tingling, weakness",
    diagnosis:"Clinical diagnosis (straight leg raise test), MRI lumbar spine (gold standard), EMG/NCS",
    treatment:"NSAIDs, physiotherapy, exercise, nerve root blocks, gabapentinoids for neuropathic pain, discectomy if severe",
    description:"Radicular pain caused by irritation or compression of sciatic nerve roots (L4-S1), most commonly by lumbar disc herniation.",
    complications:"Cauda equina syndrome (emergency), motor weakness, chronic neuropathic pain, long-term functional impairment",
    tips:"Stay active (not bed rest), physiotherapy for core strengthening, pain management to enable exercise",
    sideEffects:"NSAIDs: GI, cardiovascular, renal. Gabapentinoids: dizziness, sedation, weight gain, dependence risk",
    prevention:"Core strengthening, proper lifting techniques, healthy weight, regular exercise, good posture",
    whenToSeeDoctor:"Cauda equina signs (saddle anesthesia, bladder/bowel dysfunction) — IMMEDIATE; progressive neurological weakness",
    specialGroups:{pregnantWomen:"Common in pregnancy; physiotherapy; position modification; avoid opioids; piriformis syndrome often mimics.",children:"Rare; consider spinal infection or tumor; spondylolisthesis in young athletes.",elderly:"Spinal stenosis more common than disc herniation; neurogenic claudication; careful NSAID use.",youngAdults:"Disc herniation most common cause; return to sport usually possible; physiotherapy rehabilitation."} },
  { id:67, name:"Influenza",                    category:"Infectious",
    image:"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700",
    symptoms:"Abrupt onset fever, rigors, severe myalgia, headache, malaise, dry cough, rhinorrhea, sore throat",
    diagnosis:"Clinical diagnosis, rapid influenza test (nasal swab), PCR for confirmation, CXR if pneumonia suspected",
    treatment:"Rest, fluids, antipyretics; oseltamivir (Tamiflu) within 48 hours for high-risk; hospital admission if severe",
    description:"Acute respiratory illness caused by influenza A or B viruses, responsible for seasonal epidemics and occasional pandemics.",
    complications:"Bacterial pneumonia, exacerbation of chronic conditions, myocarditis, encephalitis",
    tips:"Annual flu vaccination, hand hygiene, cover coughs, stay home when unwell, adequate rest and fluids",
    sideEffects:"Oseltamivir: nausea, vomiting (take with food). Flu vaccine: arm soreness, mild fever; anaphylaxis very rare",
    prevention:"Annual influenza vaccine; antiviral prophylaxis for household contacts in high-risk settings",
    whenToSeeDoctor:"Rapidly worsening symptoms, respiratory distress, confusion, persistent vomiting, underlying serious health condition",
    specialGroups:{pregnantWomen:"Highest risk group for severe flu; vaccination mandatory in any trimester; oseltamivir safe.",children:"Febrile seizures; no aspirin (Reye's syndrome); antiviral if high-risk.",elderly:"Complications and hospitalization most common; annual vaccination especially important.",youngAdults:"Generally mild; vaccination protects vulnerable contacts; antiviral if presenting within 48 hours."} },
  { id:68, name:"COVID-19",                     category:"Infectious",
    image:"https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=700",
    symptoms:"Fever, dry cough, fatigue, loss of taste/smell, dyspnea, myalgia, sore throat; spectrum from mild to critical",
    diagnosis:"Nasopharyngeal RT-PCR (gold standard), rapid antigen test, chest CT (ground-glass opacities), inflammatory markers",
    treatment:"Mild: symptomatic. Moderate-severe: remdesivir, corticosteroids, anticoagulation. Severe: oxygen, ICU, tocilizumab",
    description:"SARS-CoV-2 infection causing spectrum from asymptomatic to severe pneumonia with multi-organ involvement.",
    complications:"ARDS, cytokine storm, thromboembolism, myocarditis, AKI, secondary infections, Long COVID syndrome",
    tips:"Vaccination prevents severe disease, stay home when symptomatic, ventilation of indoor spaces",
    sideEffects:"Corticosteroids: hyperglycemia, secondary infections. Anticoagulation: bleeding risk. mRNA vaccines: rare myocarditis",
    prevention:"COVID-19 vaccination (most effective), ventilation, masks in high-risk settings, hand hygiene",
    whenToSeeDoctor:"Oxygen saturation <94%, severe breathlessness, chest pain, confusion, cannot eat or drink, cyanosis",
    specialGroups:{pregnantWomen:"Higher risk of ICU admission and preterm birth; vaccination safe and recommended.",children:"Usually mild; MIS-C rare but serious; vaccination recommended >6 months.",elderly:"Highest mortality risk; vaccination most beneficial; antiviral treatment (Paxlovid) for high-risk.",youngAdults:"Generally mild; vaccination prevents Long COVID; myocarditis risk from infection far exceeds vaccine risk."} },
  { id:69, name:"Type 1 Diabetes",              category:"Endocrine",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Polyuria, polydipsia, weight loss, blurred vision, fatigue; DKA (fruity breath, vomiting, confusion) if not diagnosed",
    diagnosis:"Fasting glucose, HbA1c, autoantibodies (GAD, IA-2, ZnT8), C-peptide (low/absent), DKA management if presenting",
    treatment:"Insulin therapy (basal-bolus or pump), carbohydrate counting, CGM, closed-loop systems (artificial pancreas)",
    description:"Autoimmune destruction of pancreatic beta cells resulting in absolute insulin deficiency; lifelong insulin required.",
    complications:"DKA, hypoglycemia, retinopathy, nephropathy, neuropathy, cardiovascular disease, Addison's (polyglandular syndrome)",
    tips:"Carb counting, rotate injection sites, always carry fast-acting glucose, CGM use, regular complication screening",
    sideEffects:"Insulin: hypoglycemia, weight gain, lipohypertrophy (rotate sites). Pumps: skin infections at infusion sites",
    prevention:"No prevention; HLA-DR3/4 genetic predisposition; immune modulation trials in high-risk individuals ongoing",
    whenToSeeDoctor:"DKA symptoms (vomiting, fruity breath, confusion) — EMERGENCY; recurrent severe hypoglycemia",
    specialGroups:{pregnantWomen:"Intensive glucose monitoring; insulin doses change significantly; periconceptional control critical.",children:"Most common endocrine disorder in children; school management plan essential; CGM/pumps improve outcomes.",elderly:"Hypoglycemia risk high; simpler regimens; reduced HbA1c targets; frailty and cognitive impairment.",youngAdults:"Technology aids management; transition from pediatric care critical; psychological burnout ('diabetes distress')."} },
  { id:70, name:"Obesity",                      category:"Endocrine",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"BMI >30 kg/m², waist circumference M>102 cm/F>88 cm, physical limitation, sleep apnea, joint pain, breathlessness",
    diagnosis:"BMI calculation, waist circumference, metabolic assessment (glucose, lipids, BP), sleep study, assess comorbidities",
    treatment:"Behavioral interventions, caloric restriction, exercise, GLP-1 agonists (semaglutide), bariatric surgery (BMI >40)",
    description:"Complex chronic disease with excess adiposity increasing risk of multiple serious medical conditions.",
    complications:"Type 2 diabetes, cardiovascular disease, sleep apnea, osteoarthritis, NAFLD, multiple cancers",
    tips:"Sustainable lifestyle changes, behavioral support, sleep optimization, stress management, avoid ultra-processed foods",
    sideEffects:"GLP-1 agonists: nausea, vomiting, pancreatitis (rare). Bariatric surgery: dumping, nutritional deficiencies",
    prevention:"From childhood; healthy eating patterns, physical activity, sleep, stress management; food environment policy",
    whenToSeeDoctor:"Weight-related complications develop, bariatric surgery evaluation, suspected eating disorder",
    specialGroups:{pregnantWomen:"Gestational diabetes, preeclampsia, large baby, C-section risk all increased; bariatric surgery >2 years pre-pregnancy.",children:"Childhood obesity increases adult obesity risk; family-based interventions; avoid stigma.",elderly:"Sarcopenic obesity; functional decline more important target; falls prevention.",youngAdults:"Rapidly increasing prevalence; metabolic complications begin early; greatest long-term impact from early intervention."} },
  { id:71, name:"Peripheral Neuropathy",        category:"Neurological",
    image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700",
    symptoms:"Glove-and-stocking sensory loss, burning/tingling, weakness, gait disturbance, loss of reflexes, autonomic features",
    diagnosis:"Nerve conduction studies and EMG (axonal vs demyelinating), blood tests (glucose, B12, folate, TSH), nerve biopsy",
    treatment:"Treat underlying cause; pain: duloxetine, pregabalin, amitriptyline; IVIG for CIDP; B12 if deficient",
    description:"Damage to peripheral nerves with diverse causes (diabetes most common), affecting sensory, motor, and autonomic function.",
    complications:"Falls, neuropathic ulcers, autonomic dysfunction, chronic pain, disability, reduced quality of life",
    tips:"Foot care in diabetic neuropathy, safety modifications at home, exercise for neuropathic pain, B12 supplementation",
    sideEffects:"Pregabalin: dizziness, sedation, weight gain, dependence. Amitriptyline: anticholinergic effects, sedation",
    prevention:"Optimal glycemic control in diabetes, B12-rich diet for vegetarians, avoid neurotoxic medications/alcohol",
    whenToSeeDoctor:"Rapid progression, motor weakness, autonomic symptoms, unexplained neuropathy, difficulty walking",
    specialGroups:{pregnantWomen:"B12 deficiency common with vegan diet; carpal tunnel syndrome common; pain management limited.",children:"Hereditary neuropathies (Charcot-Marie-Tooth); developmental delay; genetic counseling.",elderly:"Falls prevention paramount; polypharmacy common cause; B12 deficiency very common.",youngAdults:"Hereditary neuropathies; chemotherapy-induced; occupational exposures; alcohol-related."} },
  { id:72, name:"Celiac Disease",               category:"Autoimmune",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Diarrhea, weight loss, abdominal bloating, fatigue, anemia, mouth ulcers, dermatitis herpetiformis (skin)",
    diagnosis:"IgA anti-tissue transglutaminase antibody, total IgA, duodenal biopsy (Marsh classification), HLA-DQ2/DQ8",
    treatment:"Strict lifelong gluten-free diet (wheat, rye, barley); dietitian support; supplement deficiencies (iron, folate, B12, D)",
    description:"Autoimmune enteropathy triggered by gluten exposure causing villous atrophy and nutrient malabsorption.",
    complications:"Malnutrition, osteoporosis, infertility, lymphoma (enteropathy-associated T-cell), refractory celiac disease",
    tips:"Read labels carefully; 'gluten-free' certification; separate cooking utensils; inform restaurants; cross-contamination risk",
    sideEffects:"Strict GFD is the only treatment; deficiency supplements: generally well-tolerated",
    prevention:"No prevention; breastfeeding and delayed gluten introduction may modify risk; genetic testing for family members",
    whenToSeeDoctor:"Diarrhea with weight loss and fatigue, iron deficiency anemia without obvious cause, unexplained bone pain",
    specialGroups:{pregnantWomen:"Untreated celiac increases miscarriage and neural tube defect risk; folate supplementation critical; strict GFD.",children:"Short stature, failure to thrive, behavioral changes; screening if family history; GFD improves growth.",elderly:"Often atypical presentation; osteoporosis risk; lymphoma surveillance on strict GFD.",youngAdults:"Dermatitis herpetiformis common; fertility concerns; social challenges of GFD; increased lymphoma risk if untreated."} },
  { id:73, name:"Chronic Fatigue Syndrome",     category:"Systemic",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Profound fatigue >6 months, post-exertional malaise (hallmark), unrefreshing sleep, cognitive impairment, orthostatic intolerance",
    diagnosis:"CDC/NICE criteria, exclusion of other conditions, autonomic testing, sleep study, cognitive assessments",
    treatment:"Pacing (energy envelope theory), sleep management, low-dose antidepressants, orthostatic intolerance treatment",
    description:"Complex multi-system disease causing severe disabling fatigue and post-exertional malaise, often following viral illness.",
    complications:"Social isolation, disability, unemployment, secondary depression, relationship breakdown",
    tips:"Strict pacing — never exceed energy envelope, rest before exhaustion, symptom diary",
    sideEffects:"Low-dose amitriptyline: dry mouth, sedation. Melatonin: generally well-tolerated",
    prevention:"No proven prevention; may be triggered by viral infections (including COVID-19); stress management post-infection",
    whenToSeeDoctor:"Significantly limiting daily function, new symptoms, symptoms following COVID-19 ('Long COVID'), severe relapse",
    specialGroups:{pregnantWomen:"Symptoms may improve or worsen; monitoring essential; fatigue management crucial.",children:"Pediatric ME/CFS recognized; school non-attendance common; recovery generally better; home education may be needed.",elderly:"Overlap with aging fatigue and comorbidities; thorough investigation to exclude other diagnoses.",youngAdults:"Peak onset 20-40 years; career and educational impact severe; peer support and online communities helpful."} },
  { id:74, name:"Vitiligo",                     category:"Dermatological",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Depigmented white macules and patches on skin, often on sun-exposed areas and body folds, premature hair whitening",
    diagnosis:"Clinical examination, Wood's lamp, dermoscopy, autoantibody screen, thyroid function tests",
    treatment:"Potent topical corticosteroids, tacrolimus ointment, narrow-band UVB phototherapy, JAK inhibitors (ruxolitinib cream)",
    description:"Autoimmune destruction of melanocytes causing depigmented patches affecting 1-2% of population; significant psychological impact.",
    complications:"Sun damage in depigmented areas, psychological distress, associated autoimmune conditions (thyroid, Addison's)",
    tips:"Strict sun protection (SPF 50+ on affected areas), camouflage cosmetics, connect with support groups",
    sideEffects:"Potent TCS: skin atrophy with long-term use. Tacrolimus: initial burning sensation. JAK inhibitors: generally well-tolerated",
    prevention:"No proven prevention; early treatment may stabilize disease; sun protection prevents burns in affected areas",
    whenToSeeDoctor:"Rapidly spreading vitiligo, significant psychological impact, symptoms of associated autoimmune conditions",
    specialGroups:{pregnantWomen:"May improve or worsen; topical treatments considered safe; systemic treatments avoided.",children:"Common pediatric presentation; significant bullying and psychological impact; narrow-band UVB safe from age 6.",elderly:"May develop with age; thyroid disease association important; cosmetic camouflage helpful.",youngAdults:"Disproportionate psychological impact; new JAK inhibitor treatments showing excellent results."} },
  { id:75, name:"Rosacea",                      category:"Dermatological",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Central facial redness/erythema, papules and pustules, telangiectasia, phymatous changes (rhinophyma in men), ocular rosacea",
    diagnosis:"Clinical diagnosis; Demodex density assessment; ocular examination; skin biopsy if uncertain",
    treatment:"Topical: metronidazole, azelaic acid, ivermectin; Brimonidine for erythema; oral low-dose doxycycline; IPL/laser",
    description:"Chronic facial inflammatory skin condition predominantly in fair-skinned individuals, with characteristic facial distribution.",
    complications:"Rhinophyma, ocular rosacea (keratitis), significant psychological impact, social withdrawal",
    tips:"Identify and avoid triggers (sun, heat, alcohol, spicy food, stress), SPF 50+ daily, gentle skincare",
    sideEffects:"Low-dose doxycycline: rare GI upset. Topical ivermectin: well-tolerated. Metronidazole: minimal",
    prevention:"Sun protection, trigger avoidance, gentle skincare; early treatment prevents progression",
    whenToSeeDoctor:"Ocular symptoms (blurred vision, light sensitivity), severe rhinophyma development, inadequate response to topical therapy",
    specialGroups:{pregnantWomen:"Topical azelaic acid preferred; metronidazole topical relatively safe; oral antibiotics avoided in 3rd trimester.",children:"Rare; pediatric rosacea underrecognized; ocular rosacea more prominent.",elderly:"Rhinophyma more common in elderly men; cardiovascular medication triggers possible.",youngAdults:"Significant impact on professional and social confidence; combination topical and oral treatment highly effective."} },
  { id:76, name:"Alopecia Areata",              category:"Dermatological",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Sudden patchy non-scarring hair loss, exclamation mark hairs at edges, nail pitting, alopecia totalis (complete scalp loss)",
    diagnosis:"Clinical examination, trichoscopy, scalp biopsy if uncertain, thyroid function, antinuclear antibodies",
    treatment:"Intralesional corticosteroids, topical immunotherapy (DPCP), JAK inhibitors (baricitinib, ritlecitinib FDA-approved)",
    description:"Autoimmune hair loss affecting 2% of population; inflammatory attack on hair follicles causing reversible alopecia.",
    complications:"Alopecia totalis/universalis, psychological distress, nail abnormalities, associated autoimmune conditions",
    tips:"Concealment options (wigs, hats), support groups, psychological support, regular monitoring of thyroid",
    sideEffects:"Intralesional steroids: skin atrophy, hypopigmentation. JAK inhibitors: infections, acne; generally well-tolerated",
    prevention:"No prevention; stress management may reduce flares; treat associated conditions",
    whenToSeeDoctor:"Rapid or extensive hair loss, total scalp hair loss, nail changes, significant psychological impact",
    specialGroups:{pregnantWomen:"Disease often improves in pregnancy; postpartum relapse common; topical treatments safe.",children:"Common in children; affects self-esteem; school counseling support; topical treatments first-line.",elderly:"JAK inhibitors used cautiously with infection risk; hairpieces and wigs excellent option.",youngAdults:"JAK inhibitors (baricitinib, ritlecitinib) revolutionizing treatment; excellent outcomes in early treatment."} },
  { id:77, name:"Acne Vulgaris",                category:"Dermatological",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Comedones (open/closed), papules, pustules, nodules, cysts; face, chest, back affected; potential scarring",
    diagnosis:"Clinical diagnosis, hormonal workup in females (PCOS), bacterial cultures if antibiotic-resistant",
    treatment:"Topical: benzoyl peroxide, retinoids, antibiotics. Oral: antibiotics, isotretinoin (severe). Female-specific: OCP, spironolactone",
    description:"Multifactorial skin condition involving follicular hyperkeratinization, Cutibacterium acnes colonization, and sebaceous hyperactivity.",
    complications:"Atrophic or hypertrophic scarring, post-inflammatory hyperpigmentation, depression, anxiety, social withdrawal",
    tips:"Gentle non-comedogenic skincare, avoid picking/squeezing, sunscreen, give treatments 8-12 weeks to work",
    sideEffects:"Isotretinoin: teratogenicity (IPLEDGE required), dry lips/eyes, mood changes, rarely IBD. Antibiotics: resistance, GI upset",
    prevention:"No proven prevention; avoid heavy oils and occlusive cosmetics; gentle skincare",
    whenToSeeDoctor:"Severe nodular/cystic acne, significant scarring, inadequate response to OTC treatments, suspected PCOS",
    specialGroups:{pregnantWomen:"Isotretinoin absolutely contraindicated; tetracyclines avoided; topical retinoids avoided; azelaic acid and BP relatively safe.",children:"Infantile acne (0-12 months) benign; prepubertal acne requires hormonal evaluation.",elderly:"Not typical; consider rosacea or perioral dermatitis in older adults.",youngAdults:"Peak incidence; massive psychological impact on self-esteem; isotretinoin can be life-changing for severe cases."} },
  { id:78, name:"Vertigo (BPPV)",               category:"ENT",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Brief episodes of vertigo (seconds-minutes) triggered by head position change, nausea, horizontal nystagmus",
    diagnosis:"Dix-Hallpike test (positive: geotropic rotatory nystagmus), roll test for horizontal canal BPPV, audiometry",
    treatment:"Epley manoeuvre (highly effective ~90% single session), Semont manoeuvre, vestibular exercises (Brandt-Daroff)",
    description:"Most common cause of vertigo; canaliths (calcium carbonate crystals) displaced into semicircular canals.",
    complications:"Falls (especially in elderly), dehydration from nausea/vomiting, psychological anxiety about episodes",
    tips:"Epley manoeuvre can be self-performed at home; sleep with head elevated; move slowly when changing positions",
    sideEffects:"Epley manoeuvre: brief severe vertigo during treatment; minimal risks; repositioning only required once usually",
    prevention:"Head injury avoidance; osteoporosis treatment; calcium/vitamin D supplementation",
    whenToSeeDoctor:"Vertigo with hearing loss or tinnitus, persistent vertigo, diplopia, neurological signs, first episode",
    specialGroups:{pregnantWomen:"Common in pregnancy; Epley safe; antiemetics if needed; medication minimized.",children:"Rare; benign paroxysmal vertigo of childhood associated with migraine; reassurance usually sufficient.",elderly:"High fall risk; aggressive treatment; vestibular rehabilitation; cardiac cause exclusion.",youngAdults:"Often misdiagnosed; single Epley treatment usually curative; return to sports possible after treatment."} },
  { id:79, name:"Hearing Loss",                 category:"ENT",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Muffled sounds, difficulty understanding speech in noise, asking to repeat, increasing TV volume, tinnitus",
    diagnosis:"Audiometry (pure tone and speech), tympanometry, otoacoustic emissions, ABR, middle ear assessment",
    treatment:"Hearing aids, bone-anchored hearing aids, cochlear implants, middle ear surgery, assistive listening devices",
    description:"Partial or complete inability to hear affecting communication and quality of life; affects 1.5 billion people globally.",
    complications:"Social isolation, depression, dementia (significant association), communication difficulties, reduced employability",
    tips:"Wear hearing aids consistently, face speaker, reduce background noise, hearing loop systems, lip-reading classes",
    sideEffects:"Cochlear implants: facial nerve injury (rare), meningitis risk (vaccination required), loss of residual hearing",
    prevention:"Protect ears from loud noise (earplugs at concerts, work), avoid prolonged earphone use at high volumes",
    whenToSeeDoctor:"Sudden hearing loss (emergency), asymmetric hearing loss, tinnitus with hearing loss, balance problems",
    specialGroups:{pregnantWomen:"Sudden SNHL in pregnancy; steroids used cautiously; otosclerosis may worsen during pregnancy.",children:"Neonatal hearing screening; congenital deafness; language development affected; early intervention critical.",elderly:"Presbycusis most common; dementia association; hearing aids improve cognitive outcomes; social isolation prevention.",youngAdults:"Noise-induced from music; ototoxic medication exposure; occupational noise exposure."} },
  { id:80, name:"Tinnitus",                     category:"ENT",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Ringing, buzzing, hissing, clicking, or roaring sound perceived in ears without external source",
    diagnosis:"Audiometry, tympanometry, ABR, MRI (to exclude acoustic neuroma), vascular assessment if pulsatile",
    treatment:"Sound therapy/masking, hearing aids, cognitive behavioral therapy, tinnitus retraining therapy, medications for anxiety",
    description:"Phantom auditory perception without external stimulus, affecting 15% of adults, with significant impact on daily life.",
    complications:"Sleep disturbance, anxiety, depression, concentration difficulties, social withdrawal",
    tips:"Sound enrichment (white noise machines), avoid silence, limit caffeine/alcohol, stress management, protect ears",
    sideEffects:"Antidepressants for tinnitus distress: standard antidepressant side effects. TRT: requires commitment and time",
    prevention:"Hearing protection, avoid ototoxic medications when alternatives exist, treat middle ear infections promptly",
    whenToSeeDoctor:"Pulsatile tinnitus (vascular issue), unilateral tinnitus (exclude tumor), sudden hearing loss",
    specialGroups:{pregnantWomen:"Can develop or worsen in pregnancy; pre-eclampsia association; avoid ototoxic medications.",children:"Rare; usually associated with ear infections or noise exposure; thorough audiological assessment needed.",elderly:"Often accompanies age-related hearing loss; CBT most effective; hearing aids help both conditions.",youngAdults:"Noise exposure at concerts/clubs; occupational noise; psychological support important; hearing protection."} },
  { id:81, name:"Conjunctivitis",               category:"Ophthalmological",
    image:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=700",
    symptoms:"Red eye, discharge (watery: viral/allergic; purulent: bacterial), itching, crusting of lids, foreign body sensation",
    diagnosis:"Clinical diagnosis; bacterial culture if severe or recurrent; PCR for chlamydial/gonococcal",
    treatment:"Viral: artificial tears, self-limiting. Bacterial: topical antibiotics (chloramphenicol). Allergic: antihistamine drops",
    description:"Inflammation of conjunctiva; extremely common; viral most frequent (adenovirus); bacterial also common.",
    complications:"Corneal ulcer (rare), neonatal ophthalmia (gonococcal — serious), pseudomembrane formation",
    tips:"Hand hygiene to prevent spread, avoid sharing towels, remove contact lenses, no school until discharge resolves",
    sideEffects:"Chloramphenicol: aplastic anemia (extremely rare with topical). Aminoglycosides: corneal toxicity with prolonged use",
    prevention:"Hand hygiene, no eye rubbing, separate towels, contact lens hygiene, allergy trigger avoidance",
    whenToSeeDoctor:"Photophobia, reduced vision, severe pain, corneal haziness, newborn with eye discharge (urgent)",
    specialGroups:{pregnantWomen:"Safe topical antibiotics; chloramphenicol avoided near term; azithromycin for chlamydial.",children:"Sticky eye in neonates requires urgent assessment; school exclusion often required; gonococcal conjunctivitis serious.",elderly:"Dry eye predisposes; blepharitis association; systemic cause consideration; contact lens wearers at risk.",youngAdults:"Contact lens-related most common; Acanthamoeba keratitis risk with poor contact lens hygiene."} },
  { id:82, name:"Tonsillitis",                  category:"ENT",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Sore throat, dysphagia, tonsillar enlargement with exudate, fever, cervical lymphadenopathy, halitosis",
    diagnosis:"Clinical examination (Centor score), throat swab culture, monospot test (EBV in adolescents), FBC",
    treatment:"Paracetamol/ibuprofen, fluids; antibiotics (phenoxymethylpenicillin) if Centor ≥3 or bacterial; tonsillectomy for recurrent",
    description:"Inflammation of palatine tonsils, most common in children; group A Streptococcus most important bacterial cause.",
    complications:"Peritonsillar abscess (quinsy), parapharyngeal abscess, post-streptococcal (rheumatic fever, glomerulonephritis)",
    tips:"Complete antibiotic course for strep throat, adequate fluid intake, rest, cold fluids may soothe discomfort",
    sideEffects:"Phenoxymethylpenicillin: GI upset, allergic reactions. Amoxicillin: rash (do NOT give in EBV/mononucleosis)",
    prevention:"Hand hygiene, no sharing utensils, complete antibiotic course to prevent complications",
    whenToSeeDoctor:"Difficulty breathing or swallowing, severe trismus, symptoms of quinsy, high fever in child",
    specialGroups:{pregnantWomen:"Penicillin safe in pregnancy; rheumatic fever prevention critical; tonsillectomy avoided during pregnancy.",children:"Most common presentation; tonsillectomy if recurrent ≥7/year (Paradise criteria); OSA consideration.",elderly:"Rare primary tonsillitis; consider malignancy if unilateral tonsil enlargement; lymphoma differential.",youngAdults:"Mononucleosis (EBV) common mimicker; avoid contact sports 3-4 weeks; splenomegaly risk."} },
  { id:83, name:"Diabetic Retinopathy",         category:"Ophthalmological",
    image:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=700",
    symptoms:"Early stages asymptomatic; late: floaters, blurred vision, dark areas in visual field, sudden vision loss",
    diagnosis:"Annual dilated fundus exam, fundus photography, OCT, fluorescein angiography, visual acuity",
    treatment:"Strict metabolic control (most important), laser photocoagulation, anti-VEGF injections, vitrectomy",
    description:"Microvascular complication of diabetes affecting retinal capillaries; leading cause of preventable blindness in working-age adults.",
    complications:"Vitreous hemorrhage, tractional retinal detachment, neovascular glaucoma, blindness",
    tips:"Annual eye screening, HbA1c <7%, BP and lipid control; screening from diabetes diagnosis (Type 2)",
    sideEffects:"Laser: peripheral vision restriction, scotoma, night vision reduction. Anti-VEGF: injection-related risks",
    prevention:"Optimal glycemic control is best prevention; BP control; cholesterol management; smoking cessation",
    whenToSeeDoctor:"Annual screening essential; any sudden vision change warrants urgent ophthalmology review",
    specialGroups:{pregnantWomen:"Rapid progression can occur in pregnancy; pre-pregnancy eye assessment essential; stricter glycemic control needed.",children:"Rarely affects prepubertal children with Type 1 DM; screening from puberty; lifelong monitoring.",elderly:"Combined with other age-related eye disease; complex management; falls prevention with visual impairment.",youngAdults:"Type 1 DM most affected; technology (CGM, insulin pumps) helps achieve glycemic control; regular screening."} },
  { id:84, name:"Schizophrenia",                category:"Psychiatric",
    image:"https://images.unsplash.com/photo-1541199249251-f713e6145474?w=700",
    symptoms:"Positive: hallucinations (auditory typical), delusions, disorganized thinking. Negative: flat affect, alogia, avolition. Cognitive symptoms",
    diagnosis:"DSM-5 clinical criteria (symptoms >6 months), physical examination, blood tests, CT/MRI brain, ECG",
    treatment:"Antipsychotics (clozapine for treatment-resistant), CBT, social skills training, family therapy, assertive community treatment",
    description:"Chronic severe mental illness with hallucinations, delusions, and significant cognitive and negative symptoms affecting 1% of population.",
    complications:"Suicide (10% lifetime risk), substance abuse, social deterioration, metabolic syndrome, cardiovascular disease",
    tips:"Medication adherence paramount, recognizing relapse signs, social support, avoiding substance use, structured daily routine",
    sideEffects:"Antipsychotics: metabolic syndrome, EPS, tardive dyskinesia, QTc prolongation. Clozapine: agranulocytosis (monitoring essential)",
    prevention:"Cannabis avoidance in at-risk adolescents; early intervention programs",
    whenToSeeDoctor:"First episode psychosis, signs of relapse, medication non-compliance, self-harm or harm to others",
    specialGroups:{pregnantWomen:"High-risk; antipsychotics generally continued; clozapine requires extra monitoring; neonatal adaptation syndrome.",children:"Early-onset rare; diagnosis challenging; aggressive treatment with monitoring; school support.",elderly:"Late-onset schizophrenia; secondary causes must be excluded; lower antipsychotic doses; falls risk.",youngAdults:"Peak onset 18-25; early intervention services; educational and vocational support; cannabis avoidance."} },
  { id:85, name:"ALS (Motor Neurone Disease)",  category:"Neurological",
    image:"https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700",
    symptoms:"Progressive muscle weakness, fasciculations, dysarthria, dysphagia, respiratory muscle weakness; UMN and LMN features",
    diagnosis:"El Escorial criteria, EMG/NCS, MRI brain and spine (to exclude others), genetic testing, respiratory function",
    treatment:"Riluzole (extends survival ~3 months), edaravone, AMX0035; multidisciplinary: PEG, NIV, communication aids",
    description:"Fatal progressive neurodegenerative disease affecting motor neurons with median survival 2-5 years from symptom onset.",
    complications:"Respiratory failure (leading cause of death), aspiration pneumonia, malnutrition, depression, loss of communication",
    tips:"Multidisciplinary ALS clinic, early NIV improves survival, PEG before respiratory compromise, advance care planning",
    sideEffects:"Riluzole: liver toxicity (monitor LFTs), GI side effects. Edaravone: infusion-related reactions",
    prevention:"No proven prevention; genetic counseling for familial ALS",
    whenToSeeDoctor:"Progressive muscle weakness, speech or swallowing difficulties, breathing difficulties, unexplained falls",
    specialGroups:{pregnantWomen:"Extremely rare; multidisciplinary management; NIV support during delivery; advance care planning.",children:"Juvenile ALS very rare; genetic forms important; different prognosis; pediatric palliative care.",elderly:"Most cases in 50-70 age group; aggressive respiratory management improves quality/quantity of life.",youngAdults:"Familial ALS cases; genetic counseling critical; quality of life focus; communication technology."} },
  { id:86, name:"Prostate Cancer",              category:"Oncological",
    image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700",
    symptoms:"Often asymptomatic (PSA-detected); advanced: urinary frequency, weak stream, hematuria, bone pain, weight loss",
    diagnosis:"PSA test, digital rectal exam, mpMRI prostate, transperineal biopsy, PSMA-PET scan staging",
    treatment:"Active surveillance (low-risk), radical prostatectomy, radiotherapy, ADT, enzalutamide, docetaxel, PARP inhibitors",
    description:"Most common cancer in men, with highly variable biology from indolent disease to aggressive metastatic cancer.",
    complications:"Urinary incontinence, erectile dysfunction, bone metastases, spinal cord compression, hormonal effects of ADT",
    tips:"Discuss PSA screening with doctor age 50-74 (earlier if African descent or family history); healthy diet, exercise",
    sideEffects:"ADT: hot flashes, erectile dysfunction, bone loss, cardiovascular effects. Radiotherapy: bowel and urinary changes",
    prevention:"Healthy weight, exercise, tomato-rich diet (lycopene); no definitive proven prevention",
    whenToSeeDoctor:"Lower urinary tract symptoms, PSA elevation, bone pain, hematuria, or abnormal DRE findings",
    specialGroups:{pregnantWomen:"Not applicable.",children:"Pediatric prostate tumors extremely rare; rhabdomyosarcoma main consideration.",elderly:"Most common in >65; active surveillance often appropriate; frailty consideration; ADT well-tolerated.",youngAdults:"Rare <50; more aggressive; genetic testing (BRCA2 mutations) in young-onset cases; fertility consideration."} },
  { id:87, name:"Skin Cancer (Melanoma)",        category:"Oncological",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Changing mole (ABCDE: Asymmetry, Border, Color variation, Diameter >6mm, Evolution), new pigmented lesion",
    diagnosis:"Dermoscopy, excision biopsy, sentinel lymph node biopsy, CT-PET staging, BRAF/NRAS/CKIT mutation testing",
    treatment:"Wide local excision, sentinel node biopsy, adjuvant immunotherapy (pembrolizumab) or targeted therapy (BRAF+MEK inhibitors)",
    description:"Most dangerous form of skin cancer arising from melanocytes; incidence rising worldwide due to UV exposure.",
    complications:"Lymph node metastases, distant metastases (brain, liver, lung), treatment-related autoimmunity",
    tips:"Daily SPF 50+ broad-spectrum sunscreen, avoid tanning beds, protective clothing, monthly self-skin check",
    sideEffects:"Immunotherapy: immune-related adverse events (colitis, thyroiditis, hepatitis). BRAF inhibitors: photosensitivity, pyrexia",
    prevention:"UV protection from childhood, no tanning beds, regular skin surveillance especially in fair-skinned individuals",
    whenToSeeDoctor:"Any changing mole, new unexplained pigmented lesion, non-healing skin ulcer, bleeding mole",
    specialGroups:{pregnantWomen:"Pregnancy does not worsen melanoma; surgical treatment safe; immunotherapy limited data.",children:"Congenital nevi; risk with large nevi; sun protection education from childhood critical.",elderly:"Lentigo maligna melanoma most common subtype; drug tolerability considerations.",youngAdults:"Fastest-growing cancer in young adults; tanning bed use major risk; surveillance after excision."} },
  { id:88, name:"Lymphoma",                     category:"Oncological",
    image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700",
    symptoms:"Painless lymphadenopathy, B symptoms (fever, night sweats, weight loss >10%), pruritus, fatigue, hepatosplenomegaly",
    diagnosis:"Lymph node biopsy (excisional preferred), CT-PET scan, bone marrow biopsy, blood tests, IHC",
    treatment:"Hodgkin's: ABVD chemotherapy ± radiotherapy. NHL: R-CHOP, ibrutinib, CAR-T cell therapy, stem cell transplant",
    description:"Cancer of the lymphatic system; Hodgkin's highly curable; NHL encompasses >80 subtypes with varying prognosis.",
    complications:"Immunocompromise, infection, transformation to aggressive lymphoma, secondary malignancies, cardiac toxicity",
    tips:"Infection prevention, complete all treatment cycles, PET scan response assessment, survivorship program enrollment",
    sideEffects:"ABVD: pulmonary toxicity (bleomycin), cardiotoxicity (doxorubicin). R-CHOP: myelosuppression, infections",
    prevention:"No proven prevention; EBV, H. pylori, and HIV links with some subtypes",
    whenToSeeDoctor:"Unexplained painless lymph node swelling >2 weeks, B symptoms, unexplained fatigue and weight loss",
    specialGroups:{pregnantWomen:"Hodgkin's relatively common in pregnancy; delay if possible; ABVD in 2nd/3rd trimester with monitoring.",children:"HL highly curable in adolescents; NHL less common; fertility preservation; late effects monitoring essential.",elderly:"Dose-reduced regimens; frailty assessment; infection risk high; quality of life vs aggressive treatment balance.",youngAdults:"HL peak incidence; high cure rates; fertility preservation important; long-term surveillance for cardiac effects."} },
  { id:89, name:"Crohn's Disease",              category:"Autoimmune",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Diarrhea, abdominal pain, weight loss, fatigue, rectal bleeding, perianal disease, fever, mouth ulcers",
    diagnosis:"Ileocolonoscopy with biopsies, MR enterography, capsule endoscopy, stool calprotectin, CRP",
    treatment:"Aminosalicylates, steroids (bridge), azathioprine, methotrexate, anti-TNF biologics, ustekinumab",
    description:"Transmural inflammatory bowel disease that can affect any part of GI tract from mouth to anus.",
    complications:"Strictures, fistulas, abscesses, malnutrition, colorectal cancer, extraintestinal manifestations",
    tips:"Avoid NSAIDs, smoking cessation essential, food diary to identify triggers, regular colonoscopy surveillance",
    sideEffects:"Azathioprine: myelosuppression, pancreatitis, lymphoma risk. Anti-TNF: serious infections, demyelination",
    prevention:"No proven prevention; early treatment to achieve mucosal healing; smoking cessation reduces severity",
    whenToSeeDoctor:"High fever, severe abdominal pain, significant rectal bleeding, suspected bowel obstruction, signs of infection",
    specialGroups:{pregnantWomen:"Disease activity at conception predicts pregnancy outcome; anti-TNF generally safe; aminosalicylates preferred.",children:"Growth retardation; delayed puberty; enteral nutrition effective and steroid-sparing; school support.",elderly:"Increased infection risk with biologics; polypharmacy; surgical decision more complex.",youngAdults:"Family planning affected; psychosocial impact significant; adherence to therapy critical."} },
  { id:90, name:"Ulcerative Colitis",           category:"Autoimmune",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Bloody diarrhea (hallmark), urgency to defecate, cramping, tenesmus, fatigue, fever in severe cases",
    diagnosis:"Colonoscopy with biopsies (continuous mucosal inflammation from rectum), blood tests, stool cultures, CT scan",
    treatment:"Aminosalicylates (5-ASA), corticosteroids, thiopurines, biologics (infliximab, vedolizumab), tofacitinib, colectomy",
    description:"Chronic IBD causing continuous mucosal inflammation starting from rectum extending proximally.",
    complications:"Toxic megacolon, colorectal cancer, perforation, primary sclerosing cholangitis, extraintestinal manifestations",
    tips:"5-ASA maintenance therapy essential, regular colonoscopy from year 8, avoid NSAIDs, iron supplementation for anemia",
    sideEffects:"5-ASA: nephritis (rare). Steroids: multiple systemic effects. Biologics: infection risk, infusion reactions",
    prevention:"5-ASA provides some colon cancer protection",
    whenToSeeDoctor:"Severe bleeding, high fever, abdominal distension (toxic megacolon signs), rapid worsening despite treatment",
    specialGroups:{pregnantWomen:"Active disease increases premature birth risk; 5-ASA and anti-TNF biologics relatively safe; IBD team required.",children:"Extensive disease at presentation; growth and development affected; biologics often required.",elderly:"Surgical risk higher; infection risk with immunosuppression; diagnostic challenge with ischemic colitis.",youngAdults:"Quality of life impact; psychological support; adherence crucial for cancer prevention."} },
  { id:91, name:"Celiac Disease",               category:"Autoimmune",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Diarrhea, weight loss, abdominal bloating, fatigue, anemia, mouth ulcers, dermatitis herpetiformis",
    diagnosis:"IgA anti-tissue transglutaminase, total IgA, duodenal biopsy (Marsh classification), HLA-DQ2/DQ8",
    treatment:"Strict lifelong gluten-free diet; dietitian support; supplement deficiencies (iron, folate, B12, D)",
    description:"Autoimmune enteropathy triggered by gluten exposure causing villous atrophy and nutrient malabsorption.",
    complications:"Malnutrition, osteoporosis, infertility, T-cell lymphoma, refractory celiac disease",
    tips:"Read labels carefully; 'gluten-free' certification; separate cooking utensils; inform restaurants",
    sideEffects:"Strict GFD is the only treatment; deficiency supplements: generally well-tolerated",
    prevention:"No prevention; breastfeeding and delayed gluten introduction may modify risk",
    whenToSeeDoctor:"Diarrhea with weight loss and fatigue, iron deficiency anemia without obvious cause, unexplained bone pain",
    specialGroups:{pregnantWomen:"Untreated celiac increases miscarriage and NTD risk; folate supplementation critical; strict GFD.",children:"Short stature, failure to thrive, behavioral changes; GFD improves growth; screening if family history.",elderly:"Often atypical presentation; osteoporosis risk; lymphoma surveillance on strict GFD.",youngAdults:"Dermatitis herpetiformis common; fertility concerns; social challenges of GFD."} },
  { id:92, name:"Pelvic Inflammatory Disease",  category:"Gynecological",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Lower abdominal pain, purulent vaginal discharge, fever, dyspareunia, cervical motion tenderness on examination",
    diagnosis:"Clinical examination, vaginal/cervical swabs (NAAT for chlamydia/gonorrhea), pelvic ultrasound, laparoscopy if uncertain",
    treatment:"Antibiotics: doxycycline + metronidazole ± ceftriaxone (14 days); IV antibiotics if severe or tubo-ovarian abscess",
    description:"Infection of upper female genital tract (uterus, tubes, ovaries) usually from ascending sexually transmitted infection.",
    complications:"Ectopic pregnancy (10× increased risk), tubal infertility, chronic pelvic pain, recurrent PID, peri-hepatitis",
    tips:"Complete full antibiotic course, treat sexual partner(s), avoid intercourse during treatment, STI testing",
    sideEffects:"Doxycycline: photosensitivity, GI upset, teratogenic. Metronidazole: metallic taste, avoid alcohol",
    prevention:"Consistent condom use, regular STI screening, prompt treatment of cervicitis, partner notification",
    whenToSeeDoctor:"Lower abdominal pain with fever, purulent discharge, suspected tubo-ovarian abscess, symptoms during pregnancy",
    specialGroups:{pregnantWomen:"Rarely occurs; IV antibiotics required urgently; risk of miscarriage and preterm birth.",children:"Consider sexual abuse if PID in pre-pubescent children.",elderly:"Rare; consider other causes of pelvic pain and discharge.",youngAdults:"Most common in sexually active young women; repeated PID causes progressive tubal damage; contraception review."} },
  { id:93, name:"Hepatitis C",                  category:"Infectious",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Usually asymptomatic for decades; acute: fatigue, jaundice, dark urine; chronic: fatigue, right upper quadrant discomfort",
    diagnosis:"Anti-HCV antibody, HCV RNA PCR, genotyping, FibroScan, liver biopsy, liver function tests",
    treatment:"Direct-acting antivirals (DAAs): sofosbuvir/velpatasvir, glecaprevir/pibrentasvir — 8-12 week cure rate >95%",
    description:"Blood-borne viral infection causing chronic liver disease in 70% of infected individuals, leading to cirrhosis in 15-20%.",
    complications:"Cirrhosis, hepatocellular carcinoma, liver failure, cryoglobulinemia, membranous nephropathy",
    tips:"No alcohol, avoid hepatotoxic drugs, regular monitoring, complete full DAA course, screen close contacts",
    sideEffects:"DAAs: generally well-tolerated; fatigue, headache; drug interactions particularly with certain cardiac medications",
    prevention:"No vaccine; harm reduction for PWID, safe sex, no needle/razor sharing, blood product screening",
    whenToSeeDoctor:"Unexpected fatigue, jaundice, signs of liver failure, high-risk exposure, screening if born 1945-1965",
    specialGroups:{pregnantWomen:"Vertical transmission 5%; DAA treatment ideally completed pre-pregnancy.",children:"Vertical transmission source; treatment with DAAs approved from age 3; liver disease monitoring.",elderly:"Decades of untreated infection may lead to advanced liver disease; DAA treatment effective at any age.",youngAdults:"Highest new infection rates; harm reduction programs; treatment and cure prevent long-term complications."} },
  { id:94, name:"Thyroid Cancer",               category:"Oncological",
    image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700",
    symptoms:"Painless neck lump, hoarseness, dysphagia, cervical lymphadenopathy; often incidentally found on imaging",
    diagnosis:"Thyroid ultrasound, FNAC (fine needle aspiration cytology), thyroid function tests, serum calcitonin, CT for staging",
    treatment:"Total thyroidectomy, radioactive iodine ablation (papillary/follicular), thyroid hormone suppression therapy, neck dissection",
    description:"Most common endocrine malignancy; papillary thyroid cancer (80%) has excellent prognosis with >95% 10-year survival.",
    complications:"Recurrent laryngeal nerve injury, hypoparathyroidism post-surgery, metastases (anaplastic type), hypothyroidism",
    tips:"Regular surveillance with thyroglobulin levels and neck ultrasound, thyroid hormone replacement after surgery",
    sideEffects:"Radioactive iodine: salivary gland dysfunction, dry mouth, secondary malignancy risk. Total thyroidectomy: hypoparathyroidism",
    prevention:"Avoid radiation to neck in childhood; genetic counseling for MTC in families with RET mutations (MEN2)",
    whenToSeeDoctor:"Any palpable neck lump, hoarseness, difficulty swallowing, rapid lump growth, family history of thyroid cancer",
    specialGroups:{pregnantWomen:"Avoid radioactive iodine; surgery in 2nd trimester if necessary; differentiated thyroid cancer management deferred.",children:"Pediatric thyroid cancer rare; often more advanced at presentation; surgery and RAI if needed.",elderly:"More aggressive course in older patients; anaplastic carcinoma rare but lethal; palliation often appropriate.",youngAdults:"Most common cancer type in young women; excellent prognosis with treatment; fertility considerations."} },
  { id:95, name:"Ovarian Cancer",               category:"Gynecological",
    image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700",
    symptoms:"Abdominal bloating, pelvic pain, early satiety, urinary frequency; often late diagnosis due to vague symptoms",
    diagnosis:"Pelvic ultrasound, CA-125, CT abdomen/pelvis, surgical staging, histological diagnosis, BRCA mutation testing",
    treatment:"Surgery (debulking), platinum-based chemotherapy (carboplatin/paclitaxel), bevacizumab, PARP inhibitors (BRCA-mutated)",
    description:"Leading gynecological cancer death; 'silent killer' — often diagnosed at advanced stage (III/IV).",
    complications:"Bowel obstruction, pleural effusion, peritoneal carcinomatosis, stoma formation, chemotherapy resistance",
    tips:"BRCA testing if family history, annual screening not proven effective, present early symptoms to doctor promptly",
    sideEffects:"Carboplatin: myelosuppression, neuropathy, allergic reactions. Paclitaxel: neuropathy, hair loss. PARP inhibitors: nausea, fatigue",
    prevention:"Oral contraceptive use reduces risk; BRCA mutation carriers — risk-reducing bilateral salpingo-oophorectomy after childbearing",
    whenToSeeDoctor:"Persistent abdominal bloating >3 weeks, pelvic pain, early satiety, urinary urgency — symptoms for >12 times/month",
    specialGroups:{pregnantWomen:"Rare; adnexal mass in pregnancy requires careful assessment; surgery in 2nd trimester if malignant features.",children:"Germ cell tumors most common in children and adolescents; fertility-sparing surgery often possible.",elderly:"Advanced disease most common; frailty assessment for chemotherapy; quality of life focus.",youngAdults:"BRCA testing essential; fertility-sparing surgery in early-stage; PARP inhibitors extend survival in BRCA-mutated."} },
  { id:96, name:"Cervical Cancer",              category:"Gynecological",
    image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700",
    symptoms:"Post-coital bleeding, intermenstrual bleeding, offensive vaginal discharge, pelvic pain; early stages asymptomatic",
    diagnosis:"Cervical smear (primary screening), colposcopy, cervical biopsy, staging with MRI/CT, LLETZ for high-grade CIN",
    treatment:"Stage I: surgery (LLETZ, cone biopsy, radical hysterectomy). Advanced: concurrent chemoradiotherapy (cisplatin)",
    description:"Preventable cancer caused primarily by high-risk HPV (16, 18); routine screening and vaccination have transformed outcomes.",
    complications:"Fistula formation, lymphedema, radiation-related complications, infertility from treatment",
    tips:"HPV vaccination most important prevention, regular cervical screening per national schedule, avoid smoking",
    sideEffects:"Radical hysterectomy: bladder/bowel dysfunction. Chemoradiotherapy: vaginal stenosis, bowel/bladder changes",
    prevention:"HPV vaccination (ideally before sexual debut), regular cervical screening program, smoking cessation",
    whenToSeeDoctor:"Abnormal cervical smear result, post-coital or intermenstrual bleeding, any suspicious cervical appearance",
    specialGroups:{pregnantWomen:"Cervical changes common in pregnancy; colposcopy and biopsy safe; treatment usually deferred to after delivery.",children:"HPV vaccination ideally at 11-13 years (before sexual debut); catch-up vaccination for older groups.",elderly:"Screening continues until age 65; post-menopausal bleeding always requires investigation.",youngAdults:"Peak HPV acquisition in early sexual activity; vaccination, regular smears, and condom use are protective."} },
  { id:97, name:"Bladder Cancer",               category:"Oncological",
    image:"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=700",
    symptoms:"Painless hematuria (hallmark), frequency, urgency, dysuria, recurrent UTIs, loin pain if upper tract involved",
    diagnosis:"Urine cytology, cystoscopy (gold standard), CT urogram, biopsy and histological staging",
    treatment:"TURBT for non-muscle-invasive, intravesical BCG; radical cystectomy for muscle-invasive, cisplatin-based chemotherapy",
    description:"Most common urological cancer; transitional cell carcinoma accounts for 90%; smoking is leading risk factor.",
    complications:"Muscle-invasive spread, metastases (liver, lung, bone), recurrence (high in non-muscle-invasive), stoma formation",
    tips:"Regular cystoscopy surveillance every 3-6 months initially, stay well-hydrated, smoking cessation most important",
    sideEffects:"Intravesical BCG: cystitis, systemic BCG infection (rare). Radical cystectomy: urinary diversion, sexual dysfunction",
    prevention:"Quit smoking (single most important), avoid aniline dye exposure, stay well-hydrated, limit cyclophosphamide exposure",
    whenToSeeDoctor:"Any painless hematuria requires urgent investigation — 2-week wait referral; recurrent UTIs in middle-aged/elderly men",
    specialGroups:{pregnantWomen:"Extremely rare; cystoscopy safe; CT imaging avoided; MRI for staging.",children:"Rare; usually rhabdomyosarcoma rather than TCC; treated at specialist centers.",elderly:"Most common in >65; TURBT well-tolerated; radical cystectomy risk assessment; neo-adjuvant chemotherapy.",youngAdults:"Rare; occupational exposure (aniline dyes); smoking cessation; haematuria always investigated urgently."} },
  { id:98, name:"Osteoporosis-Related Fracture", category:"Musculoskeletal",
    image:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700",
    symptoms:"Fragility fracture after minimal trauma, height loss >3 cm, kyphosis (Dowager's hump), sudden-onset back pain",
    diagnosis:"Clinical assessment, X-ray of fracture site, DEXA scan (BMD), VFA (vertebral fracture assessment), bone turnover markers",
    treatment:"Fracture fixation, pain management, bisphosphonate therapy, denosumab, calcium + vitamin D, physiotherapy for rehab",
    description:"Fractures occurring from low-energy trauma in bones weakened by osteoporosis; hip fractures most serious.",
    complications:"Functional decline, prolonged hospitalization, DVT/PE, pneumonia, chronic pain, mortality (hip fracture: 30% at 1 year)",
    tips:"Fall prevention essential: home assessment, appropriate footwear, balance training, hip protectors, eyesight correction",
    sideEffects:"Bisphosphonates: jaw osteonecrosis (rare, especially post-dental extraction); atypical femur fractures with long-term use",
    prevention:"Fracture Liaison Service (FLS) for all fragility fractures; optimize bone treatment after first fracture",
    whenToSeeDoctor:"Any fragility fracture (minimal trauma), acute back pain in elderly, height loss >3 cm",
    specialGroups:{pregnantWomen:"Pregnancy-associated osteoporosis; calcium/D supplementation; bisphosphonates contraindicated.",children:"Rare; secondary causes (malnutrition, steroids, inactivity); optimize diet and activity.",elderly:"Hip fracture is a geriatric emergency; perioperative care optimized; early surgery within 36 hours target.",youngAdults:"Usually secondary cause; eating disorders, amenorrhea, hypercortisolism; treat the underlying condition."} },
  { id:99, name:"Hypothyroidism in Pregnancy", category:"Endocrine",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700",
    symptoms:"Fatigue, weight gain (excess for pregnancy), cold intolerance, constipation, depression, carpal tunnel syndrome in pregnancy",
    diagnosis:"TSH and free T4 in all symptomatic pregnant women; trimester-specific TSH reference ranges",
    treatment:"Levothyroxine — dose increased ~30% from early pregnancy; TSH target <2.5 mU/L in 1st trimester; monitor monthly",
    description:"Thyroid deficiency in pregnancy impairs fetal neurodevelopment; both overt and subclinical hypothyroidism require management.",
    complications:"Miscarriage, preeclampsia, preterm birth, fetal growth restriction, congenital hypothyroidism, impaired fetal brain development",
    tips:"Never stop levothyroxine in pregnancy; monitor TSH monthly; take tablet separately from iron/calcium supplements",
    sideEffects:"Over-replacement risks: tachycardia, bone loss; under-treatment risks fetal harm — correct dose titration critical",
    prevention:"Pre-pregnancy thyroid function testing; universal screening in first trimester in some guidelines",
    whenToSeeDoctor:"Any pregnant woman with thyroid symptoms or TSH >4.0 mU/L; known hypothyroidism must increase dose immediately",
    specialGroups:{pregnantWomen:"THIS IS PRIMARILY A PREGNANCY CONDITION; optimized levothyroxine dose critical; endocrinology and obstetric co-management.",children:"Congenital hypothyroidism screened at birth; maternal hypothyroidism increases congenital risk.",elderly:"Not applicable to pregnancy-specific form.",youngAdults:"Hashimoto's thyroiditis most common cause; test thyroid function pre-pregnancy planning; adjust doses promptly."} },
  { id:100, name:"Pancreatitis (Chronic)",      category:"Gastrointestinal",
    image:"https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700",
    symptoms:"Recurrent epigastric pain radiating to back, steatorrhea (fatty/pale stools), weight loss, diabetes (endocrine insufficiency), malabsorption",
    diagnosis:"CT abdomen (calcifications), MRCP, endoscopic ultrasound, fecal elastase-1 (exocrine insufficiency), HbA1c",
    treatment:"Pain management, pancreatic enzyme replacement therapy (PERT), insulin for diabetes, nutritional support, no alcohol",
    description:"Irreversible progressive destruction of pancreatic parenchyma causing permanent exocrine and endocrine insufficiency.",
    complications:"Pseudocyst, biliary obstruction, portal hypertension, severe malnutrition, pancreatic cancer, narcotic dependence",
    tips:"Absolute alcohol abstinence, small frequent low-fat meals, enzyme supplements with every meal, fat-soluble vitamin supplementation",
    sideEffects:"Pancreatic enzymes: GI discomfort at high doses. Analgesics: opioid dependence significant risk in chronic pancreatitis",
    prevention:"Alcohol abstinence most important; smoking cessation; treat hypercalcemia and hypertriglyceridemia",
    whenToSeeDoctor:"Uncontrolled pain, jaundice, weight loss >10%, steatorrhea, new-onset diabetes in context of pancreatic disease",
    specialGroups:{pregnantWomen:"Gallstone-related acute-on-chronic; severe malnutrition affects fetus; TPN may be required; multidisciplinary team.",children:"Hereditary pancreatitis (PRSS1, SPINK1 mutations); tropical pancreatitis in endemic areas; genetic testing.",elderly:"Pancreatic cancer surveillance important; malnutrition worsens frailty; pain management challenges.",youngAdults:"Alcohol is leading cause; addiction treatment critical; enzyme replacement and diabetes management lifelong."} },
];

// ===== STATE =====
const PAGE_SIZE = 30;
let currentPage  = 1;
let filteredList = [...diseases];
let activeCategory = "all";

// ===== CATEGORY FILTER CHIPS =====
const categories = ["all", ...new Set(diseases.map(d => d.category))];

function buildSearchBar() {
  const bar = document.querySelector(".search-filter-bar");
  if (!bar) return;

  const chipsHtml = `<div class="category-filters" id="cat-filters">
    ${categories.map(c =>
      `<button class="cat-chip ${c==="all"?"active":""}" data-cat="${c}">
        ${c==="all" ? "🏥 All Diseases" : icon(c)+" "+c}
      </button>`
    ).join("")}
  </div>`;

  // Suggestions dropdown
  const wrap = bar.querySelector(".search-input-wrap");
  if (wrap) {
    wrap.insertAdjacentHTML("beforeend", `<div class="suggestions-dropdown" id="suggestions"></div>`);
    const inp = document.getElementById("search-input");
    if (inp) {
      inp.addEventListener("input", () => {
        filterAndRender();
        showSuggestions(inp.value.trim());
      });
      inp.addEventListener("focus", () => {
        if (inp.value.trim()) showSuggestions(inp.value.trim());
      });
      document.addEventListener("click", e => {
        if (!bar.contains(e.target)) closeSuggestions();
      });
    }
  }

  bar.insertAdjacentHTML("beforeend", chipsHtml);

  document.getElementById("cat-filters").addEventListener("click", e => {
    const chip = e.target.closest(".cat-chip");
    if (!chip) return;
    document.querySelectorAll(".cat-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    activeCategory = chip.dataset.cat;
    filterAndRender();
  });
}

function showSuggestions(query) {
  const box = document.getElementById("suggestions");
  if (!box) return;
  if (!query) { box.classList.remove("open"); return; }

  const matches = diseases.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.symptoms.toLowerCase().includes(query.toLowerCase()) ||
    d.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  if (!matches.length) {
    box.innerHTML = `<div class="sug-empty">No results for "${query}"</div>`;
  } else {
    box.innerHTML = matches.map(d => `
      <div class="suggestion-item" onclick="selectSuggestion(${d.id})">
        <div class="sug-icon">${icon(d.category)}</div>
        <div>
          <div class="sug-name">${d.name}</div>
          <div class="sug-cat">${d.category}</div>
        </div>
      </div>
    `).join("");
  }
  box.classList.add("open");
}

function selectSuggestion(id) {
  const d = diseases.find(x => x.id === id);
  if (!d) return;
  closeSuggestions();
  document.getElementById("search-input").value = d.name;
  filterAndRender();
  openDisease(id);
}

function closeSuggestions() {
  const box = document.getElementById("suggestions");
  if (box) box.classList.remove("open");
}

// ===== FILTER =====
function filterAndRender() {
  const q = (document.getElementById("search-input")?.value || "").toLowerCase();
  filteredList = diseases.filter(d => {
    const matchCat = activeCategory === "all" || d.category === activeCategory;
    const matchSearch = !q ||
      d.name.toLowerCase().includes(q) ||
      d.symptoms.toLowerCase().includes(q) ||
      d.diagnosis.toLowerCase().includes(q) ||
      d.treatment.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
  currentPage = 1;
  renderPage();
}
window.filterDiseases = filterAndRender;

// ===== RENDER =====
function renderPage() {
  const grid  = document.getElementById("diseases-grid");
  const noRes = document.getElementById("no-results");

  document.getElementById("result-count").textContent = filteredList.length;

  if (!filteredList.length) {
    grid.innerHTML = "";
    noRes.classList.add("show");
    removePagination();
    return;
  }
  noRes.classList.remove("show");

  const visible = filteredList.slice(0, currentPage * PAGE_SIZE);
  grid.innerHTML = visible.map(d => `
    <div class="doctor-card" onclick="openDisease(${d.id})" style="cursor:pointer">
      <div style="width:100%;height:180px;background:url('${d.image}') center/cover no-repeat;
                  border-radius:16px;margin-bottom:14px;position:relative;overflow:hidden;">
        <div style="position:absolute;inset:0;background:linear-gradient(transparent 45%,rgba(0,0,0,.65));border-radius:16px;"></div>
        <span style="position:absolute;bottom:10px;left:12px;color:#fff;font-size:11px;
                     font-weight:700;text-transform:uppercase;letter-spacing:1px;">
          ${icon(d.category)} ${d.category}
        </span>
      </div>
      <div class="doc-info" style="text-align:left;">
        <div class="doc-name" style="font-size:1.05rem;margin-bottom:6px;">${d.name}</div>
        <div style="font-size:.82rem;color:#66686c;line-height:1.55;margin-bottom:10px;
                    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
          ${d.description}
        </div>
      </div>
      <div class="doc-tags" style="justify-content:flex-start;margin-bottom:10px;">
        <span class="doc-tag" style="background:rgba(106,81,255,.1);color:#6a51ff;border-color:#6a51ff;">
          <i class="fa-solid fa-stethoscope" style="margin-right:4px;"></i>${d.symptoms.split(",")[0].trim()}
        </span>
      </div>
      <div style="padding-top:10px;border-top:1px solid #e5e7eb;text-align:center;
                  font-size:.72rem;color:#6a51ff;font-weight:700;text-transform:uppercase;letter-spacing:.5px;">
        Click for full details →
      </div>
    </div>
  `).join("");

  buildPagination();
}

// ===== PAGINATION =====
function buildPagination() {
  removePagination();
  const total   = filteredList.length;
  const showing = Math.min(currentPage * PAGE_SIZE, total);
  const wrapper = document.getElementById("diseases-grid").parentElement;

  const div = document.createElement("div");
  div.className = "pagination-controls";
  div.id = "pagination-controls";

  let btns = "";
  if (showing < total) {
    btns += `<button class="page-btn more-btn" onclick="loadMore()">
               <i class="fa-solid fa-plus"></i> More Diseases
             </button>`;
  }
  if (currentPage > 1) {
    btns += `<button class="page-btn less-btn" onclick="loadLess()" style="margin-left:12px;">
               <i class="fa-solid fa-minus"></i> Less
             </button>`;
  }
  div.innerHTML = btns + `<div class="page-info">Showing ${showing} of ${total} diseases</div>`;
  wrapper.appendChild(div);
}

function removePagination() {
  const el = document.getElementById("pagination-controls");
  if (el) el.remove();
}

window.loadMore = function() {
  currentPage++;
  renderPage();
  document.getElementById("pagination-controls")?.scrollIntoView({behavior:"smooth", block:"start"});
};

window.loadLess = function() {
  if (currentPage > 1) currentPage--;
  renderPage();
  window.scrollTo({top: document.querySelector(".doctors-wrapper")?.offsetTop - 20 || 0, behavior:"smooth"});
};

// ===== MODAL =====
function buildModal(d) {
  const modalBox = document.querySelector(".modal-box");
  if (!modalBox) return;

  const sg = d.specialGroups || {};

  modalBox.innerHTML = `
    <button class="modal-close-x" onclick="closeDisease()">✕</button>
    <div class="modal-hero" style="background-image:url('${d.image}')">
      <div class="modal-hero-ov"></div>
      <span class="modal-hero-badge">${icon(d.category)} ${d.category}</span>
    </div>
    <div class="modal-body">
      <h2 class="modal-title">${d.name}</h2>
      <p class="modal-desc">${d.description}</p>

      <div class="m-grid">
        <div class="m-card purple">
          <div class="m-card-title"><i class="fa-solid fa-temperature-high"></i> Symptoms</div>
          <div class="m-card-body">${d.symptoms}</div>
        </div>
        <div class="m-card orange">
          <div class="m-card-title"><i class="fa-solid fa-microscope"></i> Diagnosis</div>
          <div class="m-card-body">${d.diagnosis}</div>
        </div>
        <div class="m-card green">
          <div class="m-card-title"><i class="fa-solid fa-pills"></i> Treatment</div>
          <div class="m-card-body">${d.treatment}</div>
        </div>
        <div class="m-card red">
          <div class="m-card-title"><i class="fa-solid fa-triangle-exclamation"></i> Complications</div>
          <div class="m-card-body">${d.complications}</div>
        </div>
        <div class="m-card blue">
          <div class="m-card-title"><i class="fa-solid fa-shield-halved"></i> Side Effects</div>
          <div class="m-card-body">${d.sideEffects}</div>
        </div>
        <div class="m-card teal">
          <div class="m-card-title"><i class="fa-solid fa-ban"></i> Prevention</div>
          <div class="m-card-body">${d.prevention}</div>
        </div>
        <div class="m-card purple full">
          <div class="m-card-title"><i class="fa-solid fa-lightbulb"></i> Patient Tips</div>
          <div class="m-card-body">${d.tips}</div>
        </div>
        <div class="m-card orange full">
          <div class="m-card-title"><i class="fa-solid fa-stethoscope"></i> When to See a Doctor</div>
          <div class="m-card-body">${d.whenToSeeDoctor}</div>
        </div>

        <div class="groups-wrap">
          <div class="groups-title"><i class="fa-solid fa-users"></i> Special Groups</div>
          <div class="groups-grid">
            <div class="g-card preg">
              <div class="g-label">🤰 Pregnant Women</div>
              <div class="g-text">${sg.pregnantWomen || "Consult your specialist for personalized advice."}</div>
            </div>
            <div class="g-card child">
              <div class="g-label">👶 Children</div>
              <div class="g-text">${sg.children || "Consult a pediatrician for age-appropriate management."}</div>
            </div>
            <div class="g-card old">
              <div class="g-label">🧓 Elderly</div>
              <div class="g-text">${sg.elderly || "Geriatric assessment recommended for tailored treatment."}</div>
            </div>
            <div class="g-card young">
              <div class="g-label">🧑 Young Adults</div>
              <div class="g-text">${sg.youngAdults || "Follow standard management with focus on lifestyle factors."}</div>
            </div>
          </div>
        </div>
      </div>

      <button class="modal-cta" onclick="closeDisease()">
        <i class="fa-solid fa-check" style="margin-right:8px;"></i>Got it, thanks!
      </button>
    </div>
  `;
}

window.openDisease = function(id) {
  const d = diseases.find(x => x.id === id);
  if (!d) return;
  buildModal(d);
  document.getElementById("disease-modal").classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeDisease = function() {
  document.getElementById("disease-modal").classList.remove("open");
  document.body.style.overflow = "";
};

document.getElementById("disease-modal")?.addEventListener("click", function(e) {
  if (e.target === this) closeDisease();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeDisease();
});

// ===== INIT =====
buildSearchBar();
renderPage();

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
