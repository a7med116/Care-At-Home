const emergencyData = [
  {
    id: 1,
    title: "Cardiac Arrest",
    category: "Cardiac",
    severity: "critical",
    description: "Sudden loss of heart function, breathing, and consciousness. Requires immediate CPR and AED use.",
    signs: ["No pulse", "No breathing", "Loss of consciousness", "Sudden collapse"],
    immediate: [
      { title: "Call 911", desc: "Immediately call emergency services or ask someone else to call" },
      { title: "Start CPR", desc: "Begin chest compressions at 100-120 per minute" },
      { title: "Use AED", desc: "If available, use Automated External Defibrillator immediately" }
    ],
    steps: [
      { title: "Check Responsiveness", desc: "Tap shoulders and shout 'Are you OK?' Check for breathing for no more than 10 seconds" },
      { title: "Call for Help", desc: "Dial 911 or ask someone to call. If alone, call on speakerphone while starting CPR" },
      { title: "Begin Compressions", desc: "Push hard and fast in center of chest, 2 inches deep, at 100-120 beats per minute" },
      { title: "Rescue Breaths", desc: "After 30 compressions, give 2 rescue breaths if trained. Continue 30:2 ratio" },
      { title: "Use AED", desc: "Turn on AED, follow voice prompts, attach pads, clear for analysis, deliver shock if advised" },
      { title: "Continue Until Help Arrives", desc: "Keep performing CPR until emergency responders take over or person shows signs of life" }
    ],
    warnings: "Cardiac arrest is a life-threatening emergency. Every minute without CPR reduces survival chances by 7-10%.",
    call911: "Call immediately for: any unconscious person not breathing normally, no pulse detected, or witnessed sudden collapse.",
    donts: [
      "Do NOT delay calling 911 to perform CPR first",
      "Do NOT stop CPR unless absolutely exhausted or AED is ready to analyze",
      "Do NOT give food or water",
      "Do NOT move the person unless in immediate danger"
    ]
  },
  {
    id: 2,
    title: "Heart Attack",
    category: "Cardiac",
    severity: "critical",
    description: "Blocked blood flow to the heart causing chest pain and potential heart damage.",
    signs: ["Chest pain/pressure", "Pain in arm/jaw/back", "Shortness of breath", "Cold sweat", "Nausea"],
    immediate: [
      { title: "Call 911", desc: "Heart attacks require immediate medical attention" },
      { title: "Chew Aspirin", desc: "If not allergic, chew 325mg aspirin (not enteric-coated)" },
      { title: "Rest", desc: "Have person sit or lie down in comfortable position" }
    ],
    steps: [
      { title: "Recognize Symptoms", desc: "Chest discomfort lasting more than a few minutes, or that goes away and comes back" },
      { title: "Call 911 Immediately", desc: "Do not drive to hospital. Ambulance provides faster treatment en route" },
      { title: "Chew Aspirin", desc: "Only if not allergic: chew (not swallow whole) one adult aspirin or 4 low-dose aspirins" },
      { title: "Loosen Clothing", desc: "Remove tight clothing, especially around neck and chest" },
      { title: "Monitor", desc: "Be prepared to start CPR if person becomes unconscious and stops breathing" },
      { title: "Gather Information", desc: "Note time symptoms started, medications taken, medical history for paramedics" }
    ],
    warnings: "Women, elderly, and diabetics may have atypical symptoms like fatigue, indigestion, or back pain without chest pain.",
    call911: "Call immediately for: chest pain lasting >5 minutes, severe chest pain, or chest pain with shortness of breath.",
    donts: [
      "Do NOT drive yourself or the person to the hospital",
      "Do NOT wait to see if symptoms improve",
      "Do NOT give aspirin if allergic or told not to take it",
      "Do NOT give food or drink except aspirin with water"
    ]
  },
  {
    id: 3,
    title: "Adult Choking",
    category: "Choking",
    severity: "critical",
    description: "Complete or partial blockage of airway preventing breathing. Requires Heimlich maneuver.",
    signs: ["Cannot speak/cry", "Clutching throat", "Weak/ineffective cough", "Blue lips/face", "Silent coughing"],
    immediate: [
      { title: "Ask 'Are you choking?'", desc: "If they can speak/cough, encourage coughing" },
      { title: "Perform Heimlich", desc: "Abdominal thrusts if cannot breathe/speak" },
      { title: "Call 911", desc: "If person becomes unconscious" }
    ],
    steps: [
      { title: "Assess Severity", desc: "If person can speak/cough forcefully, encourage continued coughing. Do NOT intervene" },
      { title: "Position Yourself", desc: "Stand behind person. Wrap arms around waist. Make fist with one hand" },
      { title: "Find Proper Position", desc: "Place thumb side of fist just above navel, below ribcage" },
      { title: "Perform Thrusts", desc: "Grasp fist with other hand. Pull inward and upward sharply. Repeat until object expelled" },
      { title: "If Person Becomes Unconscious", desc: "Lower to ground carefully. Call 911. Begin CPR starting with compressions" },
      { title: "Check Mouth", desc: "If you see object in mouth, remove with fingers. Do NOT finger sweep blindly" }
    ],
    warnings: "Partial airway obstruction with good air exchange should NOT receive abdominal thrusts. Encourage coughing instead.",
    call911: "Call immediately if: person becomes unconscious, cannot breathe after thrusts, or choking persists.",
    donts: [
      "Do NOT perform abdominal thrusts if person can speak or cough forcefully",
      "Do NOT give back blows to pregnant women or obese persons (use chest thrusts)",
      "Do NOT try to grab object you cannot see",
      "Do NOT leave person alone if severe choking"
    ]
  },
  {
    id: 4,
    title: "Infant Choking (Under 1 Year)",
    category: "Choking",
    severity: "critical",
    description: "Airway obstruction in babies requiring back slaps and chest thrusts, NOT abdominal thrusts.",
    signs: ["Weak/ineffective cry", "Cannot cough", "Blue skin", "High-pitched sounds", "Silent struggling"],
    immediate: [
      { title: "Call 911", desc: "If baby cannot cough, cry, or breathe" },
      { title: "5 Back Slaps", desc: "Support head, angle baby face-down, deliver 5 firm back slaps" },
      { title: "5 Chest Thrusts", desc: "Turn baby over, 2 fingers on breastbone, 5 quick thrusts" }
    ],
    steps: [
      { title: "Assess Breathing", desc: "If coughing effectively, let them cough. If silent or turning blue, act immediately" },
      { title: "Position for Back Slaps", desc: "Sit or kneel. Hold baby face-down on forearm, head lower than chest. Support head/jaw" },
      { title: "Deliver 5 Back Slaps", desc: "Use heel of hand to give 5 firm slaps between shoulder blades" },
      { title: "Turn and Check", desc: "Turn baby face-up while supporting head. Check mouth for visible object. Remove if seen" },
      { title: "5 Chest Thrusts", desc: "If still choking, place 2 fingers on center of chest (just below nipple line). Give 5 quick thrusts" },
      { title: "Repeat Cycle", desc: "Continue 5 back slaps and 5 chest thrusts until object expelled or baby becomes unconscious" }
    ],
    warnings: "NEVER perform blind finger sweeps in infant's mouth. Only remove object if you can clearly see it.",
    call911: "Call immediately if: baby becomes unconscious, turns blue, or obstruction not relieved after cycles.",
    donts: [
      "Do NOT use abdominal thrusts (Heimlich) on infants",
      "Do NOT perform blind finger sweeps",
      "Do NOT hang baby upside down",
      "Do NOT give water or food to try to push object down"
    ]
  },
  {
    id: 5,
    title: "Severe Bleeding",
    category: "Bleeding",
    severity: "critical",
    description: "Heavy blood loss from wounds that can lead to shock and death within minutes.",
    signs: ["Blood spurting/flowing", "Blood pooling", "Clothing soaked with blood", "Pale/clammy skin", "Confusion"],
    immediate: [
      { title: "Call 911", desc: "For severe or uncontrolled bleeding" },
      { title: "Apply Pressure", desc: "Direct pressure with clean cloth/bandage" },
      { title: "Elevate", desc: "Raise wound above heart level if possible" }
    ],
    steps: [
      { title: "Ensure Safety", desc: "Wear gloves if available. Protect yourself from bloodborne pathogens" },
      { title: "Expose Wound", desc: "Remove or cut away clothing to see injury clearly" },
      { title: "Apply Direct Pressure", desc: "Use sterile gauze, clean cloth, or hand directly on wound. Press firmly" },
      { title: "Add Layers", desc: "If blood soaks through, add more layers on top. Do NOT remove original dressing" },
      { title: "Elevate Limb", desc: "Raise injured area above heart level to reduce blood flow" },
      { title: "Apply Pressure Points", desc: "If bleeding continues, press on artery supplying area (between wound and heart)" },
      { title: "Use Tourniquet", desc: "Last resort for limb bleeding: apply 2-3 inches above wound. Note time applied" }
    ],
    warnings: "Shock can occur within minutes of severe blood loss. Watch for pale skin, rapid breathing, and confusion.",
    call911: "Call immediately for: spurting blood, bleeding not stopping after 10 minutes pressure, or signs of shock.",
    donts: [
      "Do NOT remove embedded objects (stabilize in place)",
      "Do NOT remove blood-soaked bandages (add layers on top)",
      "Do NOT apply tourniquet over joints",
      "Do NOT remove tourniquet once applied (medical professionals only)"
    ]
  },
  {
    id: 6,
    title: "Nosebleed",
    category: "Bleeding",
    severity: "moderate",
    description: "Bleeding from the nose, usually from front of nasal septum. Usually not serious but can be alarming.",
    signs: ["Blood from nostrils", "Blood in throat", "Lightheadedness (if severe)"],
    immediate: [
      { title: "Lean Forward", desc: "Do NOT tilt head back" },
      { title: "Pinch Nose", desc: "Pinch soft part of nose for 10-15 minutes" },
      { title: "Cold Compress", desc: "Apply ice to bridge of nose" }
    ],
    steps: [
      { title: "Position Properly", desc: "Sit upright and lean slightly forward. This prevents blood from going down throat" },
      { title: "Pinch Correctly", desc: "Using thumb and index finger, pinch the SOFT part of nose (just below bony bridge)" },
      { title: "Maintain Pressure", desc: "Hold continuous pressure for at least 10 minutes. Do NOT check early" },
      { title: "Breathe Through Mouth", desc: "Encourage person to breathe through mouth and spit out any blood" },
      { title: "Apply Cold", desc: "Place cold compress or ice wrapped in cloth on nose/cheeks" },
      { title: "After Bleeding Stops", desc: "Avoid blowing nose, heavy lifting, or bending over for several hours" }
    ],
    warnings: "Most nosebleeds are anterior (front of nose) and stop with pressure. Posterior nosebleeds (back of nose) are more serious.",
    call911: "Call if: bleeding continues after 20 minutes pressure, blood flow is very heavy, or person feels faint.",
    donts: [
      "Do NOT tilt head back (blood goes to stomach causing vomiting)",
      "Do NOT stuff tissues deep into nose",
      "Do NOT blow nose during or immediately after bleeding",
      "Do NOT release pressure to check too early"
    ]
  },
  {
    id: 7,
    title: "First-Degree Burns",
    category: "Burns",
    severity: "moderate",
    description: "Superficial burns affecting only the outer layer of skin (epidermis). Red, painful, no blisters.",
    signs: ["Red skin", "Pain", "Mild swelling", "Dry/peeling skin", "No blisters"],
    immediate: [
      { title: "Cool Water", desc: "Run cool (not cold) water over burn for 10-20 minutes" },
      { title: "Remove Jewelry", desc: "Take off rings, watches, tight items before swelling" },
      { title: "Cover", desc: "Loose sterile non-stick bandage" }
    ],
    steps: [
      { title: "Cool the Burn", desc: "Hold under cool running water for 10-20 minutes. Do NOT use ice" },
      { title: "Remove Constricting Items", desc: "Quickly remove jewelry, belts, tight clothing near burn before swelling occurs" },
      { title: "Clean Gently", desc: "After cooling, wash gently with mild soap and water" },
      { title: "Apply Moisturizer", desc: "Once cooled, apply pure aloe vera or moisturizer (not butter/oils)" },
      { title: "Cover Loosely", desc: "Use sterile non-stick gauze or clean cloth. Avoid fluffy cotton" },
      { title: "Pain Relief", desc: "Over-the-counter pain relievers like ibuprofen or acetaminophen" }
    ],
    warnings: "Sunburns are first-degree burns. Repeated sunburns increase skin cancer risk significantly.",
    call911: "Call if: burn covers large area, on face/hands/genitals, or caused by chemicals/electricity.",
    donts: [
      "Do NOT use ice or ice water (causes further tissue damage)",
      "Do NOT apply butter, oils, or ointments (trap heat)",
      "Do NOT break blisters if they form",
      "Do NOT use adhesive bandages directly on burn"
    ]
  },
  {
    id: 8,
    title: "Second-Degree Burns",
    category: "Burns",
    severity: "high",
    description: "Partial thickness burns affecting epidermis and part of dermis. Blisters, severe pain, swelling.",
    signs: ["Blisters", "Severe pain", "Red/white splotchy skin", "Swelling", "Wet/weeping appearance"],
    immediate: [
      { title: "Cool Water", desc: "Cool with running water 10-20 minutes" },
      { title: "Do NOT Pop Blisters", desc: "Protect intact blisters" },
      { title: "Cover Loosely", desc: "Clean, dry, non-stick dressing" }
    ],
    steps: [
      { title: "Cool Immediately", desc: "Run cool water over burn for 10-20 minutes as soon as possible" },
      { title: "Remove Tight Items", desc: "Remove jewelry, clothing near burn before swelling. Cut away if stuck to skin" },
      { title: "Do NOT Pop Blisters", desc: "Intact blisters protect against infection. Do NOT intentionally break them" },
      { title: "Elevate if Possible", desc: "Raise burned area above heart level to reduce swelling" },
      { title: "Cover Properly", desc: "Use sterile non-stick dressing. Wrap loosely to avoid pressure on blisters" },
      { title: "Monitor for Infection", desc: "Watch for increased pain, redness, swelling, pus, or fever" }
    ],
    warnings: "Second-degree burns larger than 3 inches, or on face/hands/feet/genitals/joints need emergency care.",
    call911: "Call immediately for: burns >3 inches, burns on face/hands/feet/genitals, chemical/electrical burns, or smoke inhalation.",
    donts: [
      "Do NOT pop blisters (infection risk)",
      "Do NOT apply ice, butter, or ointments",
      "Do NOT remove clothing stuck to burn",
      "Do NOT use fluffy cotton or adhesive bandages"
    ]
  },
  {
    id: 9,
    title: "Third-Degree Burns",
    category: "Burns",
    severity: "critical",
    description: "Full thickness burns destroying all skin layers. May be painless due to nerve destruction. LIFE THREATENING.",
    signs: ["White/charred/black skin", "Leathery texture", "Painless (nerve damage)", "Dry appearance", "Fat/muscle visible"],
    immediate: [
      { title: "Call 911", desc: "Full thickness burns are life-threatening" },
      { title: "Do NOT Immerse", desc: "Do not soak large burns in water" },
      { title: "Cover with Clean Cloth", desc: "Loose, dry, sterile dressing" }
    ],
    steps: [
      { title: "Call 911 Immediately", desc: "Third-degree burns require emergency medical treatment. Do not delay" },
      { title: "Ensure Scene Safety", desc: "Make sure source of burn (fire, chemical, electricity) is no longer a danger" },
      { title: "Check Breathing", desc: "Burns to face/airway can cause swelling. Monitor breathing. Be ready to perform CPR" },
      { title: "Do NOT Remove Clothing", desc: "If clothing is stuck to burn, leave it in place. Cut around it if needed" },
      { title: "Cover Burn", desc: "Use clean, dry, non-fluffy cloth or sterile dressing. Keep person warm (hypothermia risk)" },
      { title: "Elevate Burned Area", desc: "Raise above heart level if possible without causing pain" },
      { title: "Monitor for Shock", desc: "Watch for pale skin, rapid breathing, weakness. Treat for shock if present" }
    ],
    warnings: "Third-degree burns often have surrounding areas of second-degree burns. Person may not feel pain in deepest burned areas.",
    call911: "Call immediately for ALL third-degree burns. This is a life-threatening emergency requiring specialized burn center care.",
    donts: [
      "Do NOT immerse large burns in water (causes hypothermia)",
      "Do NOT apply any ointments, butter, or creams",
      "Do NOT remove stuck clothing or charred material",
      "Do NOT break blisters or peel skin",
      "Do NOT give food or drink (may need surgery)"
    ]
  },
  {
    id: 10,
    title: "Simple Fracture",
    category: "Fractures",
    severity: "moderate",
    description: "Broken bone without open wound. Swelling, pain, deformity, inability to bear weight.",
    signs: ["Severe pain", "Swelling/bruising", "Deformity", "Cannot move/use limb", "Grinding sensation"],
    immediate: [
      { title: "Immobilize", desc: "Keep injured area still and supported" },
      { title: "Ice", desc: "Apply ice wrapped in cloth to reduce swelling" },
      { title: "Elevate", desc: "Raise above heart level if possible" }
    ],
    steps: [
      { title: "Assess Injury", desc: "Check for open wounds, severe deformity, or bone visible. Check circulation beyond injury" },
      { title: "Immobilize", desc: "Keep the injured limb in position found. Do NOT try to straighten or realign" },
      { title: "Create Splint", desc: "Use rigid material (board, rolled newspaper) and soft padding. Secure above and below fracture" },
      { title: "Apply Ice", desc: "Place ice wrapped in cloth on injury for 20 minutes at a time. Reduces swelling and pain" },
      { title: "Elevate", desc: "Raise injured limb above heart level if possible and not too painful" },
      { title: "Check Circulation", desc: "Ensure fingers/toes beyond injury are warm, pink, and have sensation. Loosen splint if needed" }
    ],
    warnings: "Compartment syndrome can occur with fractures - severe pain, tight swelling, numbness requires immediate care.",
    call911: "Call if: bone visible, severe deformity, open fracture, person cannot be safely transported, or signs of shock.",
    donts: [
      "Do NOT try to straighten or realign the bone",
      "Do NOT apply ice directly to skin",
      "Do NOT give food or drink (may need surgery)",
      "Do NOT move person if neck/back injury suspected"
    ]
  },
  {
    id: 11,
    title: "Open (Compound) Fracture",
    category: "Fractures",
    severity: "critical",
    description: "Broken bone with open wound. Bone may be visible. High infection risk. Medical emergency.",
    signs: ["Bone visible", "Bleeding", "Open wound over break", "Severe pain", "Deformity"],
    immediate: [
      { title: "Call 911", desc: "Open fractures require immediate surgery" },
      { title: "Do NOT Push Bone In", desc: "Cover with clean dressing only" },
      { title: "Control Bleeding", desc: "Apply gentle pressure around wound" }
    ],
    steps: [
      { title: "Call 911 Immediately", desc: "Open fractures are surgical emergencies. Risk of severe infection and blood loss" },
      { title: "Do NOT Push Bone Back", desc: "Never attempt to push exposed bone back into body. Cover with clean, moist dressing" },
      { title: "Control Bleeding", desc: "Apply gentle pressure around (not directly on) exposed bone with clean cloth" },
      { title: "Immobilize", desc: "Keep limb still in position found. Use splints above and below fracture if trained" },
      { title: "Cover Wound", desc: "Cover exposed bone and wound with sterile dressing moistened with clean water if available" },
      { title: "Monitor for Shock", desc: "Watch for pale skin, rapid pulse, confusion. Keep person warm and lying down" }
    ],
    warnings: "Infection is the major risk with open fractures. Even with proper care, infection rates are 5-50% depending on severity.",
    call911: "Call immediately for ALL open fractures. This requires emergency surgery within hours to prevent infection.",
    donts: [
      "Do NOT push exposed bone back into body",
      "Do NOT apply pressure directly on exposed bone",
      "Do NOT attempt to clean the wound aggressively",
      "Do NOT give food or drink",
      "Do NOT straighten the limb"
    ]
  },
  {
    id: 12,
    title: "Poisoning - Swallowed",
    category: "Poisoning",
    severity: "critical",
    description: "Ingestion of toxic substances. Treatment varies by poison type. Call Poison Control immediately.",
    signs: ["Nausea/vomiting", "Abdominal pain", "Burns around mouth", "Difficulty breathing", "Altered mental status"],
    immediate: [
      { title: "Call Poison Control", desc: "1-800-222-1222 (US) or 911" },
      { title: "Do NOT Induce Vomiting", desc: "Unless specifically instructed" },
      { title: "Identify Poison", desc: "Keep container/substance for identification" }
    ],
    steps: [
      { title: "Ensure Safety", desc: "Remove any remaining poison from person's mouth. Wear gloves if substance on skin" },
      { title: "Call Poison Control", desc: "In US: 1-800-222-1222. Have age, weight, substance, amount, and time ready" },
      { title: "Do NOT Give Anything", desc: "Unless specifically instructed by poison control. Do NOT give milk, water, or induce vomiting" },
      { title: "Monitor Breathing", desc: "Be prepared to perform rescue breathing or CPR if needed" },
      { title: "Collect Evidence", desc: "Keep poison container, pills, or plant sample. Note estimated amount consumed" },
      { title: "Watch for Symptoms", desc: "Note time of ingestion and any symptoms developing. Symptoms can be delayed" }
    ],
    warnings: "Different poisons require different treatments. What helps one poison may worsen another. Always get professional guidance.",
    call911: "Call 911 if: person is unconscious, having seizures, difficulty breathing, or poison control advises emergency care.",
    donts: [
      "Do NOT induce vomiting (can cause more damage)",
      "Do NOT give milk, water, or food unless instructed",
      "Do NOT wait for symptoms to appear (some poisons delayed)",
      "Do NOT try to neutralize with other chemicals"
    ]
  },
  {
    id: 13,
    title: "Seizure",
    category: "Seizures",
    severity: "high",
    description: "Sudden, uncontrolled electrical disturbance in the brain. Most last 1-3 minutes.",
    signs: ["Convulsions", "Stiffening", "Jerking movements", "Loss of consciousness", "Eye rolling", "Drooling"],
    immediate: [
      { title: "Protect from Injury", desc: "Clear area of dangerous objects" },
      { title: "Do NOT Restrain", desc: "Do not hold person down" },
      { title: "Time the Seizure", desc: "Call 911 if >5 minutes" }
    ],
    steps: [
      { title: "Stay Calm", desc: "Most seizures stop on their own within a few minutes. Note start time" },
      { title: "Protect Person", desc: "Clear area of sharp or hard objects. Place something soft under head" },
      { title: "Do NOT Restrain", desc: "Do not hold person down or try to stop movements. Can cause injury" },
      { title: "Turn on Side", desc: "If possible, gently roll person onto side to help breathing and prevent choking" },
      { title: "Do NOT Put Objects in Mouth", desc: "Person cannot swallow tongue. Putting objects in mouth can break teeth or block airway" },
      { title: "Stay Until Recovery", desc: "After seizure, person may be confused. Stay until fully conscious and alert" }
    ],
    warnings: "Status epilepticus (seizure >5 minutes or multiple seizures without recovery) is life-threatening.",
    call911: "Call if: first seizure, seizure >5 minutes, repeated seizures, injury occurs, pregnancy/diabetes, or not breathing after.",
    donts: [
      "Do NOT restrain or hold person down",
      "Do NOT put anything in mouth (including fingers)",
      "Do NOT give food, water, or pills until fully conscious",
      "Do NOT move person unless in immediate danger"
    ]
  },
  {
    id: 14,
    title: "Heat Stroke",
    category: "Heat",
    severity: "critical",
    description: "Life-threatening condition when body temperature rises above 104°F (40°C). Medical emergency.",
    signs: ["High body temperature", "Altered mental state", "Hot/dry skin", "Nausea/vomiting", "Rapid pulse", "Headache"],
    immediate: [
      { title: "Call 911", desc: "Heat stroke is life-threatening" },
      { title: "Cool Immediately", desc: "Move to shade, remove excess clothing" },
      { title: "Ice Bath", desc: "If available, immerse in ice water" }
    ],
    steps: [
      { title: "Call 911", desc: "Heat stroke can cause organ damage and death. Emergency care needed" },
      { title: "Move to Cool Area", desc: "Get person out of sun into shade or air conditioning" },
      { title: "Remove Clothing", desc: "Remove excess clothing. Fan air over person while wetting skin with water" },
      { title: "Cool Rapidly", desc: "Best method: immerse in ice bath up to neck. If not available, apply ice packs to neck, armpits, groin" },
      { title: "Monitor Temperature", desc: "Continue cooling until body temperature drops to 101-102°F or until help arrives" },
      { title: "If Conscious", desc: "May give small sips of cool water or sports drink if fully alert and not nauseous" }
    ],
    warnings: "Classic heat stroke (no sweating) vs exertional heat stroke (may be sweating). Both are emergencies.",
    call911: "Call immediately for: temperature >104°F, confusion, fainting, or seizures. This is a life-threatening emergency.",
    donts: [
      "Do NOT give fever-reducing medications (ineffective and harmful)",
      "Do NOT give alcohol or caffeine",
      "Do NOT leave person alone",
      "Do NOT continue activity or delay cooling",
      "Do NOT immerse in ice water if unconscious (risk of drowning)"
    ]
  },
  {
    id: 15,
    title: "Hypothermia",
    category: "Hypothermia",
    severity: "high",
    description: "Dangerously low body temperature below 95°F (35°C). Can lead to cardiac arrest.",
    signs: ["Shivering", "Confusion", "Slurred speech", "Drowsiness", "Weak pulse", "Slow breathing", "Loss of coordination"],
    immediate: [
      { title: "Call 911", desc: "Severe hypothermia is life-threatening" },
      { title: "Move to Warmth", desc: "Get person indoors, remove wet clothing" },
      { title: "Warm Gradually", desc: "Warm core first, not extremities" }
    ],
    steps: [
      { title: "Call for Help", desc: "Severe hypothermia requires medical care. Call 911 if moderate to severe" },
      { title: "Move to Warm Environment", desc: "Get person out of cold. Remove wet clothing. Protect from wind" },
      { title: "Warm Gradually", desc: "Wrap in blankets, warm towels, or sleeping bags. Warm core (chest, neck, head, groin) first" },
      { title: "Skin-to-Skin Contact", desc: "If no other heat source, use your own body heat by lying next to person" },
      { title: "Warm Drinks", desc: "If conscious and able to swallow, give warm (not hot), sweet, non-alcoholic drinks" },
      { title: "Monitor Breathing", desc: "Be prepared for CPR. Hypothermia can cause irregular heartbeat" }
    ],
    warnings: "Handle gently. Rough movement can trigger cardiac arrest in severe hypothermia. 'Dead until warm and dead' - some can be revived.",
    call911: "Call if: body temperature below 95°F, person is unconscious, or signs of severe hypothermia present.",
    donts: [
      "Do NOT rub or massage extremities (can trigger cardiac arrest)",
      "Do NOT apply direct high heat (heating pads, hot water)",
      "Do NOT give alcohol (increases heat loss)",
      "Do NOT warm arms and legs first (cold blood returns to core)",
      "Do NOT immerse in hot bath"
    ]
  },
  {
    id: 16,
    title: "Drowning",
    category: "Drowning",
    severity: "critical",
    description: "Respiratory impairment from submersion in liquid. Can occur in as little as 20 seconds.",
    signs: ["Submerged/unresponsive", "Blue lips", "Not breathing", "Coughing up water", "Unconsciousness"],
    immediate: [
      { title: "Ensure Safety", desc: "Do not become second victim. Use flotation device" },
      { title: "Remove from Water", desc: "If safe to do so" },
      { title: "Begin CPR", desc: "Start rescue breathing immediately" }
    ],
    steps: [
      { title: "Ensure Scene Safety", desc: "Do not enter dangerous water. Use reach/throw technique with pole, rope, or flotation device" },
      { title: "Remove from Water", desc: "If trained and safe, remove person from water. Minimize time in water" },
      { title: "Check Responsiveness", desc: "Tap and shout. If no response, check for breathing for no more than 10 seconds" },
      { title: "Open Airway", desc: "Head tilt-chin lift. Look in mouth for visible obstruction. Remove if seen" },
      { title: "Give Rescue Breaths", desc: "If not breathing, give 2 rescue breaths. If chest doesn't rise, reposition and try again" },
      { title: "Begin CPR", desc: "If no pulse, start CPR with 30 compressions to 2 breaths. Continue until help arrives or person recovers" }
    ],
    warnings: "Secondary drowning can occur hours after rescue. Watch for difficulty breathing, coughing, or unusual behavior.",
    call911: "Call immediately for: any drowning victim, even if they seem recovered. Secondary drowning is a real risk.",
    donts: [
      "Do NOT enter dangerous water to rescue (become second victim)",
      "Do NOT delay CPR to drain water",
      "Do NOT perform abdominal thrusts unless airway obstruction confirmed",
      "Do NOT stop CPR too early (hypothermic victims can be revived after prolonged CPR)"
    ]
  },
  {
    id: 17,
    title: "Shock",
    category: "Shock",
    severity: "critical",
    description: "Life-threatening condition where blood flow to organs is insufficient. Can follow severe injury, blood loss, or allergic reaction.",
    signs: ["Pale/clammy skin", "Rapid weak pulse", "Rapid breathing", "Confusion", "Dizziness", "Nausea", "Thirst"],
    immediate: [
      { title: "Call 911", desc: "Shock is life-threatening" },
      { title: "Lie Down", desc: "Position flat on back" },
      { title: "Keep Warm", desc: "Cover with blanket" }
    ],
    steps: [
      { title: "Call 911", desc: "Shock requires emergency medical treatment. Do not delay" },
      { title: "Position Properly", desc: "Lay person flat on back. Elevate legs 12 inches if no head/spinal injury" },
      { title: "Keep Warm", desc: "Cover with blanket to maintain body temperature. Prevent heat loss" },
      { title: "Do NOT Give Food/Drink", desc: "May cause vomiting and aspiration. Moisten lips only if requested" },
      { title: "Treat Underlying Cause", desc: "Control bleeding, use EpiPen for anaphylaxis, treat injuries" },
      { title: "Monitor", desc: "Check breathing and pulse regularly. Be prepared to perform CPR if needed" }
    ],
    warnings: "Shock can progress rapidly to death even when underlying injury seems minor. Always take shock seriously.",
    call911: "Call immediately for: signs of shock following injury, severe allergic reaction, or any suspected shock.",
    donts: [
      "Do NOT give food or drink",
      "Do NOT move person unnecessarily",
      "Do NOT wait to see if symptoms improve",
      "Do NOT elevate head (reduces blood to brain)",
      "Do NOT leave person alone"
    ]
  },
  {
    id: 18,
    title: "Anaphylaxis",
    category: "Shock",
    severity: "critical",
    description: "Severe, life-threatening allergic reaction. Can cause airway closure and shock within minutes.",
    signs: ["Difficulty breathing", "Swelling of throat/tongue", "Hives", "Rapid pulse", "Dizziness", "Nausea", "Sense of doom"],
    immediate: [
      { title: "Use EpiPen", desc: "Inject into outer thigh immediately" },
      { title: "Call 911", desc: "Even if symptoms improve after EpiPen" },
      { title: "Lie Down", desc: "Elevate legs if possible" }
    ],
    steps: [
      { title: "Use Epinephrine Auto-Injector", desc: "Inject into outer thigh through clothing if necessary. Hold for 3-10 seconds" },
      { title: "Call 911", desc: "Anaphylaxis requires emergency care even if symptoms improve" },
      { title: "Position Properly", desc: "Lay person flat on back with legs elevated. If breathing difficult, allow sitting" },
      { title: "Second Dose", desc: "If symptoms persist after 5-15 minutes and help hasn't arrived, use second EpiPen if available" },
      { title: "Loosen Clothing", desc: "Remove tight clothing, especially around neck and chest" },
      { title: "Monitor", desc: "Watch for return of symptoms. Biphasic reactions can occur hours later" }
    ],
    warnings: "Biphasic anaphylaxis can occur 4-8 hours after initial reaction. Medical observation required even if symptoms resolve.",
    call911: "Call immediately for: any signs of anaphylaxis. This is a life-threatening emergency. Use EpiPen first, then call.",
    donts: [
      "Do NOT delay EpiPen use",
      "Do NOT wait to see if symptoms improve",
      "Do NOT give oral antihistamines as first treatment",
      "Do NOT let person stand or walk (increases risk of cardiac arrest)",
      "Do NOT put pillow under head"
    ]
  }
];

let currentEmergencyCategory = 'all';

function renderEmergencies() {
  const grid = document.getElementById('emergency-grid');
  const noResults = document.getElementById('emergency-no-results');
  const countLabel = document.getElementById('emergency-count');

  if (!grid) return;

  let filtered = emergencyData.filter(emergency => {
    return currentEmergencyCategory === 'all' || emergency.category === currentEmergencyCategory;
  });

  countLabel.textContent = filtered.length;

  if (filtered.length === 0) {
    grid.style.display = 'none';
    noResults.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    noResults.style.display = 'none';

    grid.innerHTML = filtered.map(emergency => {
      const severityClass = `severity-${emergency.severity}`;
      return `
        <div class="emergency-card" onclick="showEmergencyAlert(${emergency.id})">
          <div class="emergency-card-header">
            <span class="emergency-severity ${severityClass}">${emergency.severity}</span>
            <h3 class="emergency-title">${emergency.title}</h3>
            <p class="emergency-category">${emergency.category}</p>
          </div>
          <div class="emergency-card-body">
            <p class="emergency-description">${emergency.description}</p>
            <div class="emergency-signs">
              <h5><i class="fa-solid fa-eye"></i> Key Signs</h5>
              <ul>
                ${emergency.signs.slice(0, 3).map(sign => `<li>${sign}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="emergency-card-footer">
            <span class="emergency-click-hint">Click for procedure <i class="fa-solid fa-arrow-right"></i></span>
            <div class="emergency-icon-circle">
              <i class="fa-solid fa-kit-medical"></i>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

function showEmergencyAlert(emergencyId) {
  const emergency = emergencyData.find(e => e.id === emergencyId);
  if (!emergency) return;

  // Header
  document.getElementById('alert-severity').textContent = emergency.severity + ' Emergency';
  document.getElementById('alert-severity').className = `alert-severity severity-${emergency.severity}`;
  document.getElementById('alert-title').textContent = emergency.title;
  document.getElementById('alert-subtitle').textContent = emergency.category + ' Emergency Procedure';

  // Immediate Actions
  const immediateHtml = emergency.immediate.map((action, index) => `
    <div class="alert-step">
      <div class="step-number">${index + 1}</div>
      <div class="step-content">
        <h5>${action.title}</h5>
        <p>${action.desc}</p>
      </div>
    </div>
  `).join('');
  document.getElementById('alert-immediate').innerHTML = immediateHtml;

  // Steps
  const stepsHtml = emergency.steps.map((step, index) => `
    <div class="alert-step">
      <div class="step-number">${index + 1}</div>
      <div class="step-content">
        <h5>${step.title}</h5>
        <p>${step.desc}</p>
      </div>
    </div>
  `).join('');
  document.getElementById('alert-steps').innerHTML = stepsHtml;

  // Warnings
  document.getElementById('alert-warnings').innerHTML = `<p>${emergency.warnings}</p>`;

  // Call 911
  document.getElementById('alert-call-911').innerHTML = `<p>${emergency.call911}</p>`;

  // Don'ts
  const dontsHtml = `<ul>${emergency.donts.map(dont => `<li>${dont}</li>`).join('')}</ul>`;
  document.getElementById('alert-donts').innerHTML = dontsHtml;

  // Show modal
  const overlay = document.getElementById('emergency-alert-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEmergencyAlert(event) {
  if (event && event.target !== document.getElementById('emergency-alert-overlay') &&
      !event.target.classList.contains('emergency-alert-close-x') &&
      !event.target.closest('.alert-close-btn')) {
    return;
  }

  const overlay = document.getElementById('emergency-alert-overlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function setEmergencyCat(btn, category) {
  document.querySelectorAll('.emergency-cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  currentEmergencyCategory = category;
  renderEmergencies();
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeEmergencyAlert();
  }
});

// Initial render
renderEmergencies();
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
