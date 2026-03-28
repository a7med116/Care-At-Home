// bot.js - قاعدة بيانات طبية محلية + نظام الرد

const MedicalDB = {
  // قاعدة بيانات ضخمة من الأسئلة والأجوبة
  knowledgeBase: {
    // الأعراض
    symptoms: {
      diabetes: {
        keywords: ["diabetes", "diabetic", "sugar", "type 2", "نوع 2", "سكري"],
        response: `**Type 2 Diabetes - الأعراض الرئيسية:**

🩺 **الأعراض المبكرة:**
• العطش الشديد والتبول المتكرر
• الجوع المستمر حتى بعد الأكل
• التعب والإرهاق المزمن
• ضبابية الرؤية
• التئام الجروح ببطء

⚠️ **تحذير:** هذه المعلومات تعليمية فقط. التشخيص يتطلب فحص السكر التراكمي (HbA1c) واستشارة طبيب.`,
        urgency: "medium",
      },
      fever: {
        keywords: ["fever", "temperature", "hot", "حرارة", "حمى"],
        response: `**Fever Management - علاج الحمى:**

🌡️ **الدرجات:**
• 37.5°C - 38°C: حمى خفيفة
• 38°C - 39°C: حمى متوسطة
• >39°C: حمى عالية (استشر طبيب)

💊 **العلاج المنزلي:**
• الباراسيتامول: 500-1000mg كل 6 ساعات
• شرب السوائل بكثرة
• الراحة التامة
• كمادات ماء فاترة

🚨 **اذهب للطوارئ إذا:**
• الحمى >40°C
• صعوبة في التنفس
• طفح جلدي أرجواني`,
        urgency: "low",
      },
    },

    // الأدوية
    medications: {
      ibuprofen: {
        keywords: ["ibuprofen", "brufen", "advil", "ibuprofen", "أيبوبروفين"],
        response: `**Ibuprofen - دليل الاستخدام الآمن:**

💊 **الاستخدامات:**
• تخفيف الألم والالتهاب
• خفض الحمى
• آلام الدورة الشهرية

⚠️ **الآثار الجانبية:**
• اضطرابات معدية (آلام، قرحة)
• ارتفاع ضغط الدم
• مشاكل كلوية مع الاستخدام الطويل

🚫 **ممنوع لـ:**
• الحوامل (خاصة الثلث الأخير)
• مرضى القرحة الهضمية
• مرضى الفشل الكلوي

📋 **الجرعة:** 200-400mg كل 6-8 ساعات (بحد أقصى 1200mg/يوم للاستخدام بدون وصفة)`,
        urgency: "low",
      },
      paracetamol: {
        keywords: [
          "paracetamol",
          "acetaminophen",
          "panadol",
          "tylenol",
          "باراسيتامول",
          "بانادول",
        ],
        response: `**Paracetamol (Acetaminophen) - الأكثر أماناً:**

💊 **المميزات:**
• آمن للحوامل والأطفال
• لا يسبب مشاكل معدية
• لا يؤثر على سيولة الدم

⚠️ **تحذير خطير:**
• **الجرعة القصوى: 4000mg/يوم للبالغين**
• **تجاوز الجرعة = تلف الكبد الحاد**
• انتظر 4-6 ساعات بين الجرعات

👶 **للأطفال:** 10-15mg/kg كل 4-6 ساعات`,
        urgency: "low",
      },
    },

    // الأمراض
    diseases: {
      hypertension: {
        keywords: [
          "hypertension",
          "high blood pressure",
          "bp",
          "ضغط",
          "ضغط الدم",
        ],
        response: `**High Blood Pressure - ارتفاع ضغط الدم:**

📊 **التصنيف:**
• طبيعي: <120/80 mmHg
• مرتفع: 120-129/<80
• درجة 1: 130-139/80-89
• درجة 2: ≥140/90

🥗 **تعديل نمط الحياة:**
• تقليل الملح (<5g/يوم)
• ممارسة رياضة 150 دقيقة/أسبوع
• خفض الوزن
• الإقلاع عن التدخين
• تقليل الكافيين

💊 **الأدوية الشائعة:**
• مدرات البول (Diuretics)
• حاصرات بيتا (Beta-blockers)
• مثبطات ACE
• حاصرات قنوات الكالسيوم`,
        urgency: "medium",
      },
    },

    // الإسعافات الأولية
    firstaid: {
      cpr: {
        keywords: [
          "cpr",
          "resuscitation",
          "heart stop",
          "إنعاش",
          "قلب",
          "تنفس صناعي",
        ],
        response: `**CPR - الإنعاش القلبي الرئوي:**

🚨 **اتصل بالإسعاف فوراً (123 في مصر)**

⚡ **الخطوات:**
1. **افحص الوعي** - هز الكتف، انادي بصوت عالٍ
2. **اتصل بالإسعاف** - أو اطلب من شخص آخر
3. **افحص التنفس** - 10 ثوانٍ كحد أقصى
4. **اضغط الصدر:**
   - منتصف عظم القص
   - عمق 5-6 سم
   - سرعة 100-120 ضغطة/دقيقة
   - اسمح للصدر بالارتداد الكامل

💨 **التنفس الصناعي (إذا تدربت):**
• 2 نفخة بعد كل 30 ضغطة
• كل نفخة 1 ثانية
• ارفع الذقن، اغلق الأنف

🔄 **استمر حتى:**
• وصول الإسعاف
• استعادة النبض/التنفس
• الإرهاق الكامل`,
        urgency: "critical",
      },
      burns: {
        keywords: ["burn", "fire", "hot water", "حروق", "حريق", "ماء ساخن"],
        response: `**Burns First Aid - الإسعافات الأولية للحروق:**

🔥 **الدرجات:**
• الدرجة الأولى: احمرار فقط (مثل حروق الشمس)
• الدرجة الثانية: فقاعات مائية
• الدرجة الثالثة: أسود/أبيض، لا ألم (تلف الأعصاب)

✅ **افعل:**
• بارد جارٍ لـ 20 دقيقة فوراً
• أزل المجوهرات قبل التورم
• غطِ بضمادة نظيفة غير لاصقة

❌ **لا تفعل:**
• لا زبدة/زيت/معجون أسنان!
• لا تفقع الفقاعات
• لا تلصق الضمادة مباشرة

🚨 **اذهب للطوارئ إذا:**
• الحرق في الوجه/اليدين/الأعضاء التناسلية
• مساحة >3% من الجسم (حجم اليد = 1%)
• حروق كهربائية أو كيميائية`,
        urgency: "medium",
      },
    },

    // التحاليل المخبرية
    "lab tests": {
      cbc: {
        keywords: [
          "cbc",
          "complete blood count",
          "blood test",
          "دم",
          "صورة دم",
        ],
        response: `**CBC - صورة الدم الكاملة:**

🔴 **Hemoglobin (الهيموجلوبين):**
• رجال: 13.5-17.5 g/dL
• نساء: 12.0-15.5 g/dL
• <12 = فقر دم

⚪ **WBC (كريات الدم البيضاء):**
• طبيعي: 4,500-11,000 /μL
• مرتفع = التهاب/عدوى
• منخفض = ضعف مناعة

🔵 **Platelets (الصفائح الدموية):**
• طبيعي: 150,000-450,000 /μL
• <50,000 = خطر نزيف

📊 **المؤشرات الأخرى:**
• Hematocrit (HCT): %37-48 للنساء، %42-52 للرجال
• MCV: 80-100 fL (حجم كرات الدم الحمراء)`,
        urgency: "low",
      },
    },

    // الصحة النفسية
    "mental health": {
      depression: {
        keywords: ["depression", "sad", "depressed", "اكتئاب", "حزن", "يأس"],
        response: `**Depression - الاكتئاب:**

😔 **الأعراض الرئيسية (2 أسابيع متواصلة):**
• الحزن المستمر أو الفراغ العاطفي
• فقدان الاهتمام بالأنشطة الممتعة
• تغيرات النوم (أرق أو نوم زائد)
• التعب المزمن حتى مع الراحة
• صعوبة التركيز واتخاذ القرارات
• أفكار الموت أو الانتحار

🆘 **خط الطوارئ النفسي مصر: 08008880700**

💚 **العلاج:**
• العلاج النفسي (CBT)
• مضادات الاكتئاب (SSRIs)
• دعم اجتماعي
• نشاط بدني منتظم

⚠️ **تحذير:** الأفكار الانتحارية تتطلب تدخل فوري!`,
        urgency: "high",
      },
    },
  },

  // الأسئلة الشائعة المباشرة
  quickAnswers: {
    "what are symptoms of type 2 diabetes": `**Type 2 Diabetes Symptoms:**

• Increased thirst and frequent urination
• Constant hunger
• Unexplained weight loss
• Fatigue and irritability
• Blurred vision
• Slow-healing sores
• Frequent infections

**Arabic:**
• العطش الشديد والتبول المتكرر
• الجوع المستمر
• فقدان الوزن غير المبرر
• التعب والانفعال
• ضبابية الرؤية
• بطء التئام الجروح`,

    "how to read a cbc blood test": `**CBC Reading Guide:**

🩸 **Hemoglobin (Hb):**
• Men: 13.5-17.5 g/dL
• Women: 12.0-15.5 g/dL

🦠 **WBC (White Blood Cells):**
• Normal: 4,500-11,000/μL
• High = infection/inflammation

🩹 **Platelets:**
• Normal: 150,000-450,000/μL
• Low = bleeding risk`,

    "warning signs of a heart attack": `**🚨 Heart Attack Warning Signs:**

1. **Chest pain/pressure** - lasts > few minutes
2. **Pain in arm, back, neck, jaw**
3. **Shortness of breath**
4. **Cold sweat, nausea, lightheadedness**

**Women may have atypical symptoms:**
• Fatigue, sleep disturbances
• Indigestion-like symptoms
• Anxiety

⚠️ **CALL EMERGENCY IMMEDIATELY**`,
  },

  // الردود الافتراضية
  defaultResponses: [
    "أفهم سؤالك. بناءً على المعلومات المتوفرة، أنصحك باستشارة طبيب متخصص للحصول على تشخيص دقيق.",
    "هذا الموضوع يحتاج لتقييم سريري. أرجو زيارة أقرب مركز صحي.",
    "المعلومات المتوفرة في قاعدة البيانات محدودة لهذا الموضوع. يرجى استشارة الطبيب.",
  ],
};

// ==================== نظام البحث الذكي ====================

class MedicalChatbot {
  constructor() {
    this.chatHistory = [];
    this.messageCount = 0;
    this.topicCount = 0;
    this.currentTopic = null;
  }

  // البحث في قاعدة المعرفة
  searchKnowledge(query) {
    const lowerQuery = query.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;

    // البحث في جميع الفئات
    for (const category in MedicalDB.knowledgeBase) {
      const categoryData = MedicalDB.knowledgeBase[category];

      for (const key in categoryData) {
        const item = categoryData[key];
        let score = 0;

        // مطابقة الكلمات المفتاحية
        if (item.keywords) {
          for (const keyword of item.keywords) {
            if (lowerQuery.includes(keyword.toLowerCase())) {
              score += keyword.length; // الأطول = أهم
            }
          }
        }

        // مطابقة مباشرة للسؤال
        if (MedicalDB.quickAnswers[lowerQuery]) {
          return {
            response: MedicalDB.quickAnswers[lowerQuery],
            urgency: "low",
            source: "quick",
          };
        }

        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }
    }

    // إذا وجدنا تطابق جيد
    if (bestMatch && highestScore > 2) {
      return {
        response: bestMatch.response,
        urgency: bestMatch.urgency || "low",
        source: "knowledge",
      };
    }

    // رد افتراضي
    return {
      response:
        MedicalDB.defaultResponses[
          Math.floor(Math.random() * MedicalDB.defaultResponses.length)
        ],
      urgency: "low",
      source: "default",
    };
  }

  // توليد الرد
  generateResponse(userMessage) {
    const searchResult = this.searchKnowledge(userMessage);

    // إضافة تحذير طبي إذا لزم الأمر
    let finalResponse = searchResult.response;

    if (searchResult.urgency === "critical") {
      finalResponse = `🚨 **حالة طارئة - Emergency**\n\n${finalResponse}`;
    } else if (searchResult.urgency === "high") {
      finalResponse = `⚠️ **يستلزم عناية طبية - Medical Attention Needed**\n\n${finalResponse}`;
    }

    // إضافة إخلاء مسؤولية
    finalResponse += `\n\n---\n*🩺 هذه المعلومات تعليمية فقط. لا تعتبر بديلاً عن استشارة الطبيب.*`;

    // تحديث الإحصائيات
    this.messageCount += 2; // سؤال + جواب
    this.updateStats();

    return finalResponse;
  }

  // تحديث الإحصائيات في الواجهة
  updateStats() {
    const msgElement = document.getElementById("msgCt");
    const topicElement = document.getElementById("topicCt");

    if (msgElement) msgElement.textContent = this.messageCount;
    if (topicElement)
      topicElement.textContent = Math.floor(this.messageCount / 4) + 1;
  }

  // معالجة الرسالة
  processMessage(message) {
    // محاكاة تأخير الرد (للت realism)
    return new Promise((resolve) => {
      setTimeout(
        () => {
          const response = this.generateResponse(message);
          resolve(response);
        },
        1000 + Math.random() * 1000,
      ); // 1-2 ثانية
    });
  }
}

// ==================== دوال الواجهة ====================

const bot = new MedicalChatbot();

// إرسال رسالة
async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();

  if (!message) return;

  // إضافة رسالة المستخدم
  addMessage(message, "user");

  // مسح الإدخال
  input.value = "";
  document.getElementById("charCt").textContent = "0 / 1000";

  // إظهار مؤشر الكتابة
  showTyping();

  // الحصول على الرد
  const response = await bot.processMessage(message);

  // إخفاء مؤشر الكتابة وإظهار الرد
  hideTyping();
  addMessage(response, "bot");
}

// إضافة رسالة للشات
function addMessage(text, sender) {
  const chatContainer = document.getElementById("chatMsgs");

  const messageDiv = document.createElement("div");
  messageDiv.className = `m-row ${sender}`;

  const avatar =
    sender === "bot"
      ? '<div class="m-ava bot"><i class="fa-solid fa-robot"></i></div>'
      : '<div class="m-ava usr"><i class="fa-solid fa-user"></i></div>';

  const bubble =
    sender === "bot"
      ? `<div class="m-cont"><div class="b-bub">${formatResponse(text)}</div></div>`
      : `<div class="m-cont"><div class="u-bub">${escapeHtml(text)}</div></div>`;

  messageDiv.innerHTML = avatar + bubble;
  chatContainer.appendChild(messageDiv);

  // التمرير للأسفل
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// تنسيق الرد (Markdown بسيط)
function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/•/g, "&bull;")
    .replace(/\n/g, "<br>");
}

// escape HTML للأمان
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// إظهار/إخفاء مؤشر الكتابة
function showTyping() {
  document.getElementById("typingWrap").style.display = "block";
}

function hideTyping() {
  document.getElementById("typingWrap").style.display = "none";
}

// إرسال سؤال مباشر (من الأزرار)
function sendQ(question) {
  document.getElementById("user-input").value = question;
  sendMessage();
}

// حقن نص في الإدخال
function injectText(text) {
  const input = document.getElementById("user-input");
  input.value = text;
  input.focus();
}

// معالجة مفتاح Enter
function handleKey(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

// تغيير حجم textarea
function resizeTA(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 130) + "px";

  // تحديث العداد
  const count = textarea.value.length;
  document.getElementById("charCt").textContent = `${count} / 1000`;
}

// مسح المحادثة
function clearChat() {
  const chatContainer = document.getElementById("chatMsgs");

  // إضافة رسالة ترحيب جديدة
  chatContainer.innerHTML = `
    <div class="wlc-msg">
      <div class="wlc-ico"><i class="fa-solid fa-robot"></i></div>
      <h3>Welcome to MedBot AI</h3>
      <p>Your local medical knowledge base is ready. Ask about symptoms, medications, first aid, and more.</p>
      <div class="wlc-chips">
        <button class="wlc-chip" onclick="sendQ('What are diabetes symptoms?')">Diabetes</button>
        <button class="wlc-chip" onclick="sendQ('How to treat fever?')">Fever</button>
        <button class="wlc-chip" onclick="sendQ('First aid for burns')">Burns</button>
      </div>
    </div>
  `;

  bot.messageCount = 0;
  bot.updateStats();
}

// القائمة الجانبية للموبايل
function openSidebar() {
  document.getElementById("navSidebar").classList.add("active");
}

function closeSidebar() {
  document.getElementById("navSidebar").classList.remove("active");
}

// إضافة رسالة ترحيب عند التحميل
window.addEventListener("load", () => {
  clearChat();
});

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
var currentLang = "EN";
var toggleBtn = document.getElementById("lang-toggle");

toggleBtn.addEventListener("click", function () {
  if (currentLang === "EN") {
    changeLanguage("AR");
    currentLang = "AR";
    toggleBtn.textContent = "EN";
  } else {
    changeLanguage("EN");
    currentLang = "EN";
    toggleBtn.textContent = "AR";
  }
});
