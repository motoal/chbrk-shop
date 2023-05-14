import ready from "../../js/utils/documentReady.js";

ready(function () {
  const productCards = document.querySelectorAll(".card-product");

  if (productCards.length !== 0) {
    productCards.forEach((card) => {
      const cardButton = card.querySelector(".card-product__button");

      cardButton.addEventListener("click", () => {
        if (cardButton.classList.contains("card-product__button--active")) {
          cardButton.classList.remove("card-product__button--active");
          cardButton.textContent = `В корзину`;
        } else {
          cardButton.classList.add("card-product__button--active");
          cardButton.textContent = `В корзине`;
        }
      });
    });
  }
});
