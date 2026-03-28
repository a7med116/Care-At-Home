const vitalDetails = {
  temperature: {
    title: "درجة حرارة الجسم",
    icon: "fa-temperature-half",
    color: "#06b6d4",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> عن درجة حرارة الجسم</h4>
      <p>تتراوح درجة حرارة الجسم الطبيعية من 36.1°م إلى 37.2°م (97°F إلى 99°F). قراءتك الحالية 36.8°م ضمن المعدل الطبيعي.</p>

      <h4><i class="fa-solid fa-triangle-exclamation"></i> متى تطلب المساعدة</h4>
      <p>اتصل بطبيبك إذا كانت درجة حرارتك أقل من 35°م (95°F) أو أعلى من 39°م (102°F)، أو إذا استمر الحمى أكثر من 3 أيام.</p>

      <h4><i class="fa-solid fa-lightbulb"></i> نصائح</h4>
      <p>• قس في نفس الوقت يومياً<br>• تجنب القياس بعد التمرين أو الاستحمام الساخن<br>• ترمومتر الفم يوفر قراءات أكثر دقة</p>
    `,
  },
  sugar: {
    title: "سكر الدم",
    icon: "fa-cube",
    color: "#f59e0b",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> عن سكر الدم</h4>
      <p>المعدل الطبيعي لسكر الدم الصائم: 70-100 mg/dL. قراءتك 105 mg/dL مرتفعة قليلاً (مرحلة ما قبل السكري).</p>

      <h4><i class="fa-solid fa-triangle-exclamation"></i> التوصيات</h4>
      <p>فكر في تعديل نمط الحياة: تقليل تناول السكر، زيادة النشاط البدني، والمراقبة المنتظمة. استشر طبيبك إذا استمرت القراءات أعلى من 100 mg/dL.</p>

      <h4><i class="fa-solid fa-lightbulb"></i> نصائح للتحكم</h4>
      <p>• افحص صائماً (8+ ساعات بدون طعام)<br>• التمرين المنتظم يساعد على خفض سكر الدم<br>• اختر الأطعمة منخفضة مؤشر الجلايسيمي</p>
    `,
  },
  pressure: {
    title: "ضغط الدم",
    icon: "fa-droplet",
    color: "#ec4899",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> عن ضغط الدم</h4>
      <p>قراءتك 120/80 mmHg تعتبر مثالية. الرقم الأول (الانقباضي) يقيس الضغط عند نبض القلب؛ الثاني (الانبساطي) عند راحة القلب.</p>

      <h4><i class="fa-solid fa-chart-line"></i> الفئات</h4>
      <p>• طبيعي: أقل من 120/80<br>• مرتفع: 120-129 انقباضي<br>• عالٍ: 130+ انقباضي أو 80+ انبساطي</p>

      <h4><i class="fa-solid fa-lightbulb"></i> للحفاظ عليه</h4>
      <p>• قلل من تناول الملح<br>• مارس الرياضة بانتظام<br>• حافظ على وزن صحي<br>• قلل الكحول واقف التدخين</p>
    `,
  },
  heartrate: {
    title: "ضربات القلب",
    icon: "fa-heart",
    color: "#ef4444",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> عن معدل ضربات القلب في الراحة</h4>
      <p>المعدل الطبيعي لضربات القلب في الراحة للبالغين: 60-100 نبضة/د. الرياضيون قد يكون لديهم 40-60 نبضة/د. نبضاتك 78 صحية.</p>

      <h4><i class="fa-solid fa-heart-pulse"></i> العوامل المؤثرة</h4>
      <p>• مستوى اللياقة<br>• التوتر والعواطف<br>• الأدوية<br>• وضعية الجسم<br>• درجة حرارة الهواء</p>

      <h4><i class="fa-solid fa-lightbulb"></i> نصائح للتحسين</h4>
      <p>التمارين الرياضية القلبية المنتظمة يمكن أن تخفض معدل ضربات القلب في الراحة وتحسن كفاءة القلب مع الوقت.</p>
    `,
  },
  oxygen: {
    title: "تشبع الأكسجين",
    icon: "fa-lungs",
    color: "#8b5cf6",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> عن SpO2</h4>
      <p>تشبع الأكسجين الطبيعي: 95-100%. نسبتك 98% ممتازة. أقل من 90% تعتبر منخفضة (نقص التأكسج).</p>

      <h4><i class="fa-solid fa-lungs-virus"></i> العوامل المؤثرة</h4>
      <p>• حالات الرئة (الربو، الانسداد الرئوي المزمن)<br>• الارتفاعات العالية<br>• توقف التنفس أثناء النوم<br>• أمراض القلب</p>

      <h4><i class="fa-solid fa-lightbulb"></i> للمراقبة</h4>
      <p>أجهزة قياس النبض تقيس مستويات الأكسجين بدون تداخل. يمكن أن تتأثر القراءات بالطلاء الأظافر، اليدين الباردتين، أو ضعف الدورة الدموية.</p>
    `,
  },
  respiratory: {
    title: "معدل التنفس",
    icon: "fa-wind",
    color: "#14b8a6",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> عن معدل التنفس</h4>
      <p>معدل التنفس الطبيعي للبالغين: 12-20 نفساً في الدقيقة. نسبتك 16 طبيعية.</p>

      <h4><i class="fa-solid fa-triangle-exclamation"></i> المعدلات غير الطبيعية</h4>
      <p>• بطء التنفس: أقل من 12 (بطيء)<br>• تسرع التنفس: أكثر من 20 (سريع)<br>• كلاهما قد يشير إلى حالات كامنة</p>

      <h4><i class="fa-solid fa-lungs"></i> تمارين التنفس</h4>
      <p>تدرب على التنفس العميق: 4 ثواني شهيق، احتفظ 4 ثوانٍ، زفير 4 ثوانٍ. يساعد على تقليل التوتر وتحسين سعة الرئة.</p>
    `,
  },
  bmi: {
    title: "مؤشر كتلة الجسم",
    icon: "fa-weight-scale",
    color: "#f97316",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> عن مؤشر كتلة الجسم</h4>
      <p>BMI = الوزن (كجم) / الطول² (م²). نسبتك 22.5 ضمن نطاق الوزن الصحي (18.5-24.9).</p>

      <h4><i class="fa-solid fa-chart-pie"></i> فئات مؤشر كتلة الجسم</h4>
      <p>• نقص الوزن: أقل من 18.5<br>• صحي: 18.5-24.9<br>• زيادة الوزن: 25-29.9<br>• سمنة: 30 وأعلى</p>

      <h4><i class="fa-solid fa-triangle-exclamation"></i> القيود</h4>
      <p>لا يميز مؤشر كتلة الجسم بين العضلات والدهون. الرياضيون قد يكون لديهم مؤشر كتلة جسم أعلى بسبب الكتلة العضلية. محيط الخصر مهم أيضاً.</p>
    `,
  },
  sleep: {
    title: "جودة النوم",
    icon: "fa-moon",
    color: "#6366f1",
    content: `
      <h4><i class="fa-solid fa-circle-info"></i> عن النوم</h4>
      <p>يحتاج البالغون إلى 7-9 ساعات من النوم الجيد. نومك 7.5 ساعات جيد. الجودة مهمة مثل الكمية.</p>

      <h4><i class="fa-solid fa-bed"></i> مراحل النوم</h4>
      <p>• النوم الخفيف: 50-60% من الليل<br>• النوم العميق: 15-20% (التجدد)<br>• نوم حركة العين السريعة: 20-25% (الأحلام، الذاكرة)</p>

      <h4><i class="fa-solid fa-lightbulb"></i> نظافة النوم</h4>
      <p>• موعد نوم ثابت<br>• غرفة مظلمة وباردة (18°م)<br>• لا شاشات قبل ساعة من النوم<br>• تجنب الكافيين بعد الظهر</p>
    `,
  },
};

function showVitalDetails(vitalKey) {
  const vital = vitalDetails[vitalKey];
  if (!vital) return;

  const header = document.getElementById("vital-modal-header");
  const body = document.getElementById("vital-modal-body");

  header.innerHTML = `
    <i class="fa-solid ${vital.icon}" style="font-size: 3rem; color: ${vital.color}; margin-bottom: 15px;"></i>
    <h2>${vital.title}</h2>
    <p>معلومات تفصيلية وتوصيات</p>
  `;

  body.innerHTML = vital.content;

  const overlay = document.getElementById("vital-modal-overlay");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeVitalModal(event) {
  if (
    event &&
    event.target !== document.getElementById("vital-modal-overlay") &&
    !event.target.closest(".vital-modal-close")
  ) {
    return;
  }

  const overlay = document.getElementById("vital-modal-overlay");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeVitalModal();
  }
});

// Animate progress bars on load
window.addEventListener("load", function () {
  const progressBars = document.querySelectorAll(
    ".progress-bar, .progress-fill, .bp-bar, .bar",
  );
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
});
