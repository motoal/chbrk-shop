import ready from "../../js/utils/documentReady.js";

ready(function () {
  const faq = document.querySelector(".faq");

  if (faq) {
    const faqItems = faq.querySelectorAll(".faq__item");

    faqItems.forEach((item) => {
      const faqHead = item.querySelector(".faq__head");
      const faqTrigger = item.querySelector(".faq__trigger");

      faqHead.addEventListener("click", () => {
        if (item.classList.contains("faq__item--open")) {
          item.classList.remove("faq__item--open");
          faqTrigger.textContent = "+";
        } else {
          item.classList.add("faq__item--open");
          faqTrigger.textContent = "−";
        }
      });
    });
  }
});
