document.querySelectorAll('input[name="plan"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.querySelectorAll(".pricing-card").forEach((card) => {
      card.classList.remove("active");
    });
    this.closest(".pricing-card").classList.add("active");
  });
});
