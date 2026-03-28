// ===== ARTICLES DATA =====
const articles = [
  {
    id: 1,
    title: "The Power of a Balanced Diet: What Your Plate Should Look Like",
    category: "Nutrition",
    excerpt:
      "A balanced diet is the cornerstone of good health. Learn how to build the perfect plate with the right mix of proteins, carbs, and healthy fats.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    author: "Dr. Sarah Mitchell",
    authorInitial: "S",
    date: "Mar 8, 2026",
    readTime: "5 min read",
    fullText:
      "A balanced diet provides your body with the essential nutrients it needs to function properly. Without good nutrition, your body is more prone to disease, infection, fatigue, and poor performance. A well-balanced diet should include a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Avoid ultra-processed foods, excessive sugar, and trans fats which are linked to chronic diseases.",
    tips: [
      "Fill half your plate with colorful vegetables and fruits",
      "Choose whole grains over refined carbohydrates",
      "Include lean protein at every meal (chicken, fish, legumes)",
      "Stay hydrated — aim for 8 glasses of water daily",
      "Limit added sugars to less than 10% of daily calories",
    ],
  },
  {
    id: 2,
    title: "10 Reasons to Quit Smoking Today — And How to Start",
    category: "Smoking",
    excerpt:
      "Smoking is the leading cause of preventable death worldwide. Discover the immediate benefits your body experiences within hours of quitting.",
    image:
      "https://images.unsplash.com/photo-1587491439149-bd2ff295d450?w=600&q=80",
    author: "Dr. James Harrison",
    authorInitial: "J",
    date: "Mar 5, 2026",
    readTime: "7 min read",
    fullText:
      "Within 20 minutes of quitting smoking, your heart rate drops. Within 12 hours, carbon monoxide in your blood returns to normal. Within weeks, your lung function begins to improve. Long-term quitters dramatically reduce their risk of lung cancer, heart disease, and stroke. The journey to quitting is challenging, but with the right support — medications, counseling, and nicotine replacement therapy — success is very achievable.",
    tips: [
      "Set a firm quit date and tell friends and family",
      "Try nicotine replacement therapy (patches, gum)",
      "Identify your triggers and plan alternative activities",
      "Download a quit-smoking app to track your progress",
      "Seek professional support or join a cessation program",
    ],
  },
  {
    id: 3,
    title: "Mediterranean Diet: The Gold Standard for Heart Health",
    category: "Heart Health",
    excerpt:
      "Endorsed by cardiologists worldwide, the Mediterranean diet has been proven to reduce heart disease risk by over 30%. Here is how to adopt it.",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80",
    author: "Dr. Carlos Rivera",
    authorInitial: "C",
    date: "Mar 3, 2026",
    readTime: "6 min read",
    fullText:
      "The Mediterranean diet is rich in olive oil, fish, nuts, legumes, whole grains, fruits, and vegetables — while limiting red meat and processed foods. Multiple large-scale studies have shown it reduces cardiovascular disease risk by up to 30%, lowers LDL cholesterol, reduces inflammation, and even protects against cognitive decline.",
    tips: [
      "Use extra-virgin olive oil as your primary cooking fat",
      "Eat fatty fish (salmon, sardines) at least twice a week",
      "Replace red meat with legumes 3–4 times per week",
      "Snack on nuts and fresh fruit instead of processed snacks",
      "Enjoy moderate red wine with meals (optional)",
    ],
  },
  {
    id: 4,
    title: "Managing Anxiety: Proven Strategies That Actually Work",
    category: "Mental Health",
    excerpt:
      "Anxiety affects 1 in 5 adults. Learn evidence-based techniques from our psychiatrists to manage anxiety without relying solely on medication.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    author: "Dr. Layla Hassan",
    authorInitial: "L",
    date: "Mar 1, 2026",
    readTime: "8 min read",
    fullText:
      "Anxiety is the most common mental health condition globally. While medication can help, behavioral strategies are equally powerful. Cognitive Behavioral Therapy (CBT) is the gold standard treatment, teaching you to identify and reframe negative thought patterns. Mindfulness meditation, regular exercise, and a consistent sleep schedule also significantly reduce anxiety symptoms over time.",
    tips: [
      "Practice box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s",
      "Limit caffeine and alcohol — both worsen anxiety",
      "Schedule daily 'worry time' to contain anxious thoughts",
      "Exercise for at least 30 minutes 5 days a week",
      "Consider CBT therapy — it has the strongest evidence base",
    ],
  },
  {
    id: 5,
    title: "Why 10,000 Steps a Day is More Than Just a Trend",
    category: "Exercise",
    excerpt:
      "Walking is one of the most underrated forms of exercise. Discover the science behind daily step counts and how movement transforms your health.",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80",
    author: "Dr. Daniel Brooks",
    authorInitial: "D",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    fullText:
      "Research consistently shows that walking 7,000–10,000 steps per day reduces mortality risk by up to 50% compared to sedentary lifestyles. Regular walking improves cardiovascular fitness, lowers blood pressure, reduces blood sugar, strengthens bones, and significantly improves mood through endorphin release. You don't need a gym — you just need to move more throughout your day.",
    tips: [
      "Use a pedometer or fitness tracker to monitor daily steps",
      "Take the stairs instead of the elevator",
      "Walk during phone calls or lunch breaks",
      "Park further away and walk the extra distance",
      "Start with 5,000 steps and gradually increase over weeks",
    ],
  },
  {
    id: 6,
    title: "Understanding Type 2 Diabetes: Prevention Starts Now",
    category: "Diabetes",
    excerpt:
      "Type 2 diabetes is largely preventable. Our endocrinology team explains the risk factors and lifestyle changes that can dramatically lower your risk.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    author: "Dr. Robert Kim",
    authorInitial: "R",
    date: "Feb 25, 2026",
    readTime: "9 min read",
    fullText:
      "Type 2 diabetes develops when cells become resistant to insulin or the pancreas doesn't produce enough. Risk factors include obesity, physical inactivity, family history, and poor diet. The good news: lifestyle changes can prevent or delay type 2 diabetes in up to 58% of high-risk individuals. Losing just 5–7% of body weight, combined with 150 minutes of weekly exercise, makes a dramatic difference.",
    tips: [
      "Reduce refined carbs and sugary beverages",
      "Lose 5-7% of body weight if overweight",
      "Exercise for 150 minutes of moderate activity per week",
      "Get regular blood sugar screening if you have risk factors",
      "Eat high-fiber foods to slow glucose absorption",
    ],
  },
  {
    id: 7,
    title: "The Science of Sleep: Why 7–9 Hours is Non-Negotiable",
    category: "Sleep",
    excerpt:
      "Chronic sleep deprivation is linked to obesity, heart disease, diabetes, and even dementia. A sleep medicine specialist explains how to reclaim your rest.",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80",
    author: "Dr. Priya Sharma",
    authorInitial: "P",
    date: "Feb 22, 2026",
    readTime: "6 min read",
    fullText:
      "Sleep is not a luxury — it is a biological necessity. During sleep, your brain consolidates memories, your body repairs tissues, and your immune system strengthens. Adults sleeping fewer than 6 hours per night have a 48% higher risk of heart disease and 15% higher risk of stroke. Poor sleep also dramatically increases appetite hormones, making weight management very difficult.",
    tips: [
      "Maintain a consistent sleep and wake time, even on weekends",
      "Keep your bedroom cool, dark, and quiet",
      "Avoid screens for 1 hour before bed (blue light disrupts melatonin)",
      "Limit caffeine after 2 PM",
      "Try a relaxing bedtime routine: reading, warm bath, meditation",
    ],
  },
  {
    id: 8,
    title: "Superfoods Explained: Fact vs. Marketing Fiction",
    category: "Nutrition",
    excerpt:
      "Blueberries, kale, turmeric — are superfoods really super? Our nutritionists separate the science from the hype to help you eat smarter.",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    author: "Dr. Emily Clarke",
    authorInitial: "E",
    date: "Feb 20, 2026",
    readTime: "5 min read",
    fullText:
      "The term 'superfood' is a marketing term, not a medical one. That said, many foods labeled as superfoods do contain exceptional concentrations of beneficial nutrients. Blueberries are genuinely high in antioxidants. Fatty fish contains omega-3s proven to reduce heart disease. Leafy greens provide folate, iron, and vitamin K. The key is dietary variety — no single food is a magic bullet.",
    tips: [
      "Eat a rainbow of fruits and vegetables for diverse antioxidants",
      "Include fatty fish like salmon or mackerel twice a week",
      "Add berries to breakfast for a natural antioxidant boost",
      "Use turmeric and ginger in cooking for anti-inflammatory benefits",
      "Don't rely on supplements — real food is always better",
    ],
  },
  {
    id: 9,
    title: "The Smoking Cessation Timeline: Hour by Hour Recovery",
    category: "Smoking",
    excerpt:
      "Your body begins to heal within minutes of smoking your last cigarette. This remarkable timeline will motivate you to quit and stay quit.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    author: "Dr. James Harrison",
    authorInitial: "J",
    date: "Feb 18, 2026",
    readTime: "6 min read",
    fullText:
      "After 20 minutes: heart rate and blood pressure drop. After 12 hours: carbon monoxide levels normalize. After 48 hours: nerve endings begin to regenerate — taste and smell improve. After 2 weeks: lung function increases by 30%. After 1 year: risk of coronary heart disease is half that of a smoker. After 15 years: cardiovascular disease risk equals that of a non-smoker.",
    tips: [
      "Track your recovery milestones using a cessation app",
      "Keep a cough drop or straw handy to manage oral cravings",
      "Exercise when cravings hit — it reduces urge intensity",
      "Avoid alcohol in the first weeks (it lowers quit resolve)",
      "Celebrate each milestone — 1 day, 1 week, 1 month",
    ],
  },
  {
    id: 10,
    title: "Strength Training After 40: It's Never Too Late to Start",
    category: "Exercise",
    excerpt:
      "After 40, adults lose 3–8% of muscle mass per decade. Resistance training is the most effective intervention — and it has benefits far beyond muscle.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    author: "Dr. Daniel Brooks",
    authorInitial: "D",
    date: "Feb 15, 2026",
    readTime: "7 min read",
    fullText:
      "Sarcopenia — age-related muscle loss — begins in your 30s and accelerates after 60. The consequences include falls, fractures, metabolic decline, and reduced independence. Resistance training twice weekly is the most powerful intervention: it builds muscle, strengthens bones, improves insulin sensitivity, boosts metabolism, and is strongly linked to lower all-cause mortality. Anyone can start — at any age.",
    tips: [
      "Start with bodyweight exercises (squats, push-ups, lunges)",
      "Train each muscle group at least twice per week",
      "Increase weight gradually — progressive overload is key",
      "Ensure adequate protein intake: 1.2–1.6g per kg body weight",
      "Always warm up and cool down to prevent injury",
    ],
  },
  {
    id: 11,
    title: "How Stress Silently Damages Your Heart",
    category: "Heart Health",
    excerpt:
      "Chronic psychological stress triggers inflammation, raises blood pressure, and disrupts sleep — a perfect storm for heart disease. Here's how to break the cycle.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    author: "Dr. Carlos Rivera",
    authorInitial: "C",
    date: "Feb 12, 2026",
    readTime: "8 min read",
    fullText:
      "Chronic stress activates the sympathetic nervous system, releasing cortisol and adrenaline that raise heart rate and blood pressure. Over time, this leads to arterial inflammation, plaque buildup, and increased clotting risk. People with high stress levels have a 27% higher risk of heart attack. Stress management is therefore a genuine medical intervention — not just self-care.",
    tips: [
      "Practice mindfulness meditation for 10–20 minutes daily",
      "Identify your top stressors and address them systematically",
      "Maintain strong social connections — isolation worsens stress",
      "Prioritize physical activity as a natural stress buffer",
      "Consider speaking with a therapist about chronic stressors",
    ],
  },
  {
    id: 12,
    title: "Hydration and Health: Are You Actually Drinking Enough?",
    category: "Nutrition",
    excerpt:
      "Mild dehydration impairs cognition, reduces energy, and strains the kidneys. Learn how much water you really need and the best sources beyond plain water.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    author: "Dr. Robert Kim",
    authorInitial: "R",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    fullText:
      "Water makes up about 60% of the human body and is essential for virtually every bodily function. Losing just 1–2% of body water causes measurable declines in cognitive performance, mood, and energy. The classic '8 glasses a day' advice is a reasonable guideline, but needs vary based on body size, activity level, climate, and diet. Fruits and vegetables also contribute significantly to hydration.",
    tips: [
      "Check your urine color — pale yellow means well hydrated",
      "Drink a glass of water first thing in the morning",
      "Eat water-rich foods: cucumber, watermelon, celery, oranges",
      "Set hydration reminders on your phone throughout the day",
      "Increase intake during exercise and hot weather significantly",
    ],
  },
  {
    id: 13,
    title: "Sleep Apnea: The Silent Epidemic Affecting Millions",
    category: "Sleep",
    excerpt:
      "Over 80% of sleep apnea cases go undiagnosed. This serious condition stops breathing hundreds of times per night — the consequences are severe.",
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80",
    author: "Dr. Priya Sharma",
    authorInitial: "P",
    date: "Feb 8, 2026",
    readTime: "7 min read",
    fullText:
      "Obstructive sleep apnea occurs when throat muscles relax during sleep, blocking the airway. This causes repeated oxygen drops and micro-awakenings that prevent restorative sleep. Untreated sleep apnea dramatically increases risk of hypertension, heart disease, type 2 diabetes, stroke, and depression. CPAP therapy is highly effective and often completely resolves symptoms.",
    tips: [
      "Watch for red flags: loud snoring, gasping, morning headaches",
      "Maintain a healthy weight — obesity is the #1 risk factor",
      "Avoid alcohol and sedatives before sleep",
      "Sleep on your side rather than your back",
      "Request a sleep study if you suspect sleep apnea",
    ],
  },
  {
    id: 14,
    title: "Depression Is Not Weakness: A Doctor's Guide to Getting Help",
    category: "Mental Health",
    excerpt:
      "Depression is a medical condition caused by brain chemistry changes — not a character flaw. Learn to recognize symptoms and effective treatment options.",
    image:
      "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=600&q=80",
    author: "Dr. Layla Hassan",
    authorInitial: "L",
    date: "Feb 5, 2026",
    readTime: "9 min read",
    fullText:
      "Major depressive disorder affects over 280 million people worldwide. It involves persistent low mood, loss of interest, changes in sleep and appetite, fatigue, and difficulty concentrating. Depression has clear neurobiological causes including altered serotonin, dopamine, and norepinephrine regulation. Treatment combining antidepressant medication with psychotherapy has over 80% effectiveness.",
    tips: [
      "Recognize that depression is a medical illness — seek help early",
      "Antidepressants work — give them 4–6 weeks to take full effect",
      "Exercise has antidepressant effects comparable to mild medication",
      "Maintain social contact even when you don't feel like it",
      "Talk to your doctor — depression screening is quick and effective",
    ],
  },
  {
    id: 15,
    title: "Blood Sugar Control: Daily Habits for Diabetics",
    category: "Diabetes",
    excerpt:
      "Living with diabetes requires more than medication. These daily habits — endorsed by our endocrinology team — can help you maintain excellent glucose control.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    author: "Dr. Robert Kim",
    authorInitial: "R",
    date: "Feb 3, 2026",
    readTime: "8 min read",
    fullText:
      "Tight blood sugar control in diabetes significantly reduces the risk of complications including neuropathy, retinopathy, kidney disease, and cardiovascular events. The target HbA1c for most diabetics is below 7%. This is achievable through consistent carbohydrate monitoring, regular physical activity, stress management, adequate sleep, and working closely with your healthcare team to adjust medications.",
    tips: [
      "Monitor blood glucose at consistent times each day",
      "Count carbohydrates — aim for consistent amounts per meal",
      "Walk for 10 minutes after each meal to reduce glucose spikes",
      "Check your feet daily for cuts, blisters, or sores",
      "Never skip meals — it causes dangerous blood sugar swings",
    ],
  },
  {
    id: 16,
    title: "The Anti-Inflammatory Diet: Fighting Disease With Food",
    category: "Nutrition",
    excerpt:
      "Chronic inflammation underlies heart disease, cancer, diabetes, and Alzheimer's. Certain foods powerfully suppress inflammation — others ignite it.",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&q=80",
    author: "Dr. Sarah Mitchell",
    authorInitial: "S",
    date: "Jan 30, 2026",
    readTime: "6 min read",
    fullText:
      "Inflammation is the body's natural defense mechanism, but when it becomes chronic, it drives disease. The Western diet — high in processed foods, refined sugars, and industrial seed oils — promotes systemic inflammation. An anti-inflammatory diet rich in omega-3 fatty acids, polyphenols, fiber, and antioxidants can measurably reduce inflammatory markers like CRP and IL-6 within weeks.",
    tips: [
      "Eat fatty fish rich in omega-3s (salmon, mackerel, sardines)",
      "Add turmeric to cooking — curcumin is a powerful anti-inflammatory",
      "Replace refined vegetable oils with olive oil",
      "Eat plenty of berries, which are rich in anti-inflammatory anthocyanins",
      "Eliminate ultra-processed foods, fast food, and sugary drinks",
    ],
  },
  {
    id: 17,
    title: "HIIT vs. Steady-State Cardio: Which Is Better for You?",
    category: "Exercise",
    excerpt:
      "High-intensity interval training promises maximum results in minimum time. But is it right for everyone? Our sports medicine specialist compares both approaches.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    author: "Dr. Daniel Brooks",
    authorInitial: "D",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    fullText:
      "HIIT involves alternating between high-intensity bursts and recovery periods, producing superior improvements in VO2 max and metabolic rate compared to equivalent time of steady-state exercise. However, steady-state cardio (jogging, cycling) is safer for beginners and those with joint issues, and is very effective for fat burning and cardiovascular health. The best exercise is one you will actually do consistently.",
    tips: [
      "Beginners should start with steady-state cardio for 4–6 weeks",
      "Limit HIIT to 2–3 sessions per week to prevent overtraining",
      "Use a heart rate monitor to ensure proper intensity zones",
      "Always include a 5-minute warm-up and cool-down",
      "Combine both HIIT and steady-state for optimal results",
    ],
  },
  {
    id: 18,
    title: "Lung Cancer and Smoking: What 50 Years of Research Tells Us",
    category: "Smoking",
    excerpt:
      "Smoking causes 85% of all lung cancer cases. Understanding the mechanism of tobacco carcinogens can help you truly grasp the stakes of every cigarette.",
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80",
    author: "Dr. James Harrison",
    authorInitial: "J",
    date: "Jan 25, 2026",
    readTime: "10 min read",
    fullText:
      "Tobacco smoke contains over 70 known carcinogens. These chemicals directly damage DNA in lung cells, causing mutations that can lead to uncontrolled cell growth. Smokers have a 15–30 times higher risk of developing lung cancer compared to non-smokers. Encouragingly, quitting at any age reduces risk — former smokers who quit before 40 reduce their excess risk of dying from smoking-related disease by 90%.",
    tips: [
      "Understand that every cigarette causes cumulative DNA damage",
      "Second-hand smoke exposure also causes lung cancer in non-smokers",
      "Radon gas (test your home) is the #2 cause of lung cancer",
      "Annual low-dose CT screening is recommended for heavy smokers over 50",
      "Quitting today reduces your cancer risk — it's never too late",
    ],
  },
  {
    id: 19,
    title: "Heart Attack Warning Signs You Should Never Ignore",
    category: "Heart Health",
    excerpt:
      "Every second counts during a heart attack. Knowing the warning signs — especially the subtle ones many people miss — could save your life or someone else's.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
    author: "Dr. Carlos Rivera",
    authorInitial: "C",
    date: "Jan 22, 2026",
    readTime: "6 min read",
    fullText:
      "Not all heart attacks feel like the dramatic chest-clutching portrayed in movies. Common symptoms include chest pressure or tightness, pain radiating to the left arm, jaw, neck or back, shortness of breath, nausea, and cold sweats. Women often experience atypical symptoms: unusual fatigue, jaw pain, nausea, without obvious chest pain. Time to treatment is critical — call emergency services immediately.",
    tips: [
      "Call emergency services immediately — do not drive yourself",
      "Chew an aspirin (325mg) if you are not allergic while waiting",
      "Note the time symptoms started — it matters for treatment",
      "Learn CPR — it doubles survival chances for cardiac arrest",
      "Know your risk factors and discuss prevention with your doctor",
    ],
  },
  {
    id: 20,
    title:
      "Mindfulness Meditation: The Brain-Changing Practice Backed by Science",
    category: "Mental Health",
    excerpt:
      "MRI studies show mindfulness meditation literally changes brain structure — reducing the amygdala and growing the prefrontal cortex. Here's how to start.",
    image:
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80",
    author: "Dr. Layla Hassan",
    authorInitial: "L",
    date: "Jan 20, 2026",
    readTime: "7 min read",
    fullText:
      "Neuroscience research has confirmed that just 8 weeks of regular mindfulness meditation produces measurable changes in the brain: increased gray matter density in regions associated with self-awareness and compassion, and decreased amygdala size (the brain's alarm system). Regular practitioners show reduced cortisol levels, lower blood pressure, improved immune function, and significantly reduced symptoms of anxiety and depression.",
    tips: [
      "Start with just 5 minutes per day — consistency beats duration",
      "Use a guided app (Headspace, Calm, Insight Timer)",
      "Focus on your breath — when mind wanders, gently return",
      "Practice body scan meditation before sleep to improve rest",
      "Commit to 8 weeks — that is when brain changes become measurable",
    ],
  },
];

// ===== STATE =====
let activeFilter = "all";
let currentArticle = null;

// ===== RENDER =====
function renderArticles(list) {
  const grid = document.getElementById("articles-grid");
  const noRes = document.getElementById("no-results");
  document.getElementById("result-count").textContent = list.length;

  if (list.length === 0) {
    grid.innerHTML = "";
    noRes.classList.add("show");
    return;
  }
  noRes.classList.remove("show");

  grid.innerHTML = list
    .map((a) => {
      const catClass = "cat-" + a.category.replace(/\s+/g, "-");
      return `
      <div class="article-card" onclick="openAlert(${a.id})">
        <div class="article-img-wrap">
          <img src="${a.image}" alt="${a.title}" loading="lazy"/>
          <span class="article-cat ${catClass}">${a.category}</span>
          <span class="read-time-badge"><i class="fa-regular fa-clock"></i> ${a.readTime}</span>
        </div>
        <div class="article-body">
          <div class="article-title">${a.title}</div>
          <div class="article-excerpt">${a.excerpt}</div>
          <div class="article-footer-row">
            <div class="article-author">
              <div class="author-dot">${a.authorInitial}</div>
              <div>
                <div class="author-name">${a.author}</div>
                <div class="author-date">${a.date}</div>
              </div>
            </div>
            <button class="read-more-btn">Read More</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

// ===== FILTER =====
function filterArticles() {
  const query = document.getElementById("search-input").value.toLowerCase();

  let list = articles.filter((a) => {
    const matchCat = activeFilter === "all" || a.category === activeFilter;
    const matchQuery =
      !query ||
      a.title.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  renderArticles(list);
}

function setFilter(el, cat) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  activeFilter = cat;
  filterArticles();
}

// ===== CUSTOM ALERT MODAL =====
function openAlert(id) {
  currentArticle = articles.find((a) => a.id === id);
  if (!currentArticle) return;

  const catClass = "cat-" + currentArticle.category.replace(/\s+/g, "-");

  document.getElementById("alert-img").src = currentArticle.image;
  document.getElementById("alert-img").alt = currentArticle.title;
  document.getElementById("alert-cat").textContent = currentArticle.category;
  document.getElementById("alert-cat").className = "alert-cat-tag " + catClass;
  document.getElementById("alert-read").innerHTML =
    `<i class="fa-regular fa-clock"></i> ${currentArticle.readTime} &nbsp;|&nbsp; <i class="fa-solid fa-calendar"></i> ${currentArticle.date}`;
  document.getElementById("alert-title").textContent = currentArticle.title;
  document.getElementById("alert-author").innerHTML =
    `<i class="fa-solid fa-user-doctor"></i> Written by ${currentArticle.author}`;
  document.getElementById("alert-text").textContent = currentArticle.fullText;

  // Build tips section
  const tipsHTML = `
    <div class="tips-heading">
      <i class="fa-solid fa-lightbulb" style="color:var(--bg)"></i>
      Key Takeaways & Health Tips
    </div>
    ${currentArticle.tips
      .map(
        (t, i) => `
      <div class="tip-item">
        <div class="tip-icon">${i + 1}</div>
        <span>${t}</span>
      </div>
    `,
      )
      .join("")}
  `;
  document.getElementById("alert-tips").innerHTML = tipsHTML;

  document.getElementById("alert-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeAlert() {
  document.getElementById("alert-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function shareArticle() {
  if (currentArticle) {
    showToast("🔗 Link copied to clipboard!");
  }
}

// Close on outside click
document
  .getElementById("alert-overlay")
  .addEventListener("click", function (e) {
    if (e.target === this) closeAlert();
  });

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ===== NAV SIDEBAR =====
function showsidebar() {
  const sb = document.querySelector(".sidebar");
  sb.style.display = "flex";
  setTimeout(() => sb.classList.add("active"), 10);
}
function hidesidebar() {
  const sb = document.querySelector(".sidebar");
  sb.classList.remove("active");
  setTimeout(() => {
    sb.style.display = "none";
  }, 400);
}

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, i * 60);
        revealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

// ===== INIT =====
filterArticles();

setTimeout(() => {
  document.querySelectorAll(".article-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = "opacity 0.55s ease, transform 0.55s ease";
    revealObs.observe(card);
  });
}, 50);

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
