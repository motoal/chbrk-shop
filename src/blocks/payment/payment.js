import ready from "../../js/utils/documentReady.js";
import IMask from "imask";

ready(function () {
  const payment = document.querySelector(".payment");

  if (payment) {
    const sumField = payment.querySelector("#sum");
    const totalField = payment.querySelector("#total");
    const checkbox = payment.querySelector(".checkbox__input");
    const methods = payment.querySelectorAll(".payment__radio");
    const popularSums = payment.querySelectorAll(".payment__button");
    let percentAmount;

    const maskOptions = {
      mask: Number,
      min: 50,
      max: 1000000,
      scale: 2,
      thousandsSeparator: "",
      padFractionalZeros: true,
    };

    const sumMask = IMask(sumField, maskOptions);
    const totalMask = IMask(totalField, maskOptions);

    setPercentAmount(methods);
    percentAmount = setPercentAmount(methods);

    totalCalc(sumField, totalField, percentAmount);
    sumMask.updateValue();
    totalMask.updateValue();

    for (const method of methods) {
      method.addEventListener("click", () => {
        percentAmount = setPercentAmount(methods);
        totalCalc(sumField, totalField, percentAmount);
      });
    }

    for (const popularSum of popularSums) {
      const popularSumAmount = popularSum.dataset.amount;

      popularSum.addEventListener("click", () => {
        sumField.value = popularSumAmount;
        totalCalc(sumField, totalField, percentAmount);
        resetPopularButtons(popularSums);
        sumMask.updateValue();
        totalMask.updateValue();
        popularSum.classList.add("payment__button--active");
        paymentFormCheck(payment);
      });
    }

    checkbox.addEventListener("change", () => {
      paymentFormCheck(payment);
    });

    sumField.addEventListener("input", () => {
      resetPopularButtons(popularSums);
      totalCalc(sumField, totalField, percentAmount);
      totalMask.updateValue();
      paymentFormCheck(payment);
    });

    sumField.addEventListener("focusout", () => {
      totalCalc(sumField, totalField, percentAmount);
      sumMask.updateValue();
      totalMask.updateValue();
      paymentFormCheck(payment);
    });

    totalField.addEventListener("input", () => {
      resetPopularButtons(popularSums);
      sumCalc(sumField, totalField, percentAmount);
      sumMask.updateValue();
      paymentFormCheck(payment);
    });

    totalField.addEventListener("focusout", () => {
      sumCalc(sumField, totalField, percentAmount);
      totalMask.updateValue();
      sumMask.updateValue();
      paymentFormCheck(payment);
    });
  }
});

function sumCalc(sum, total, percent) {
  const totalFieldValue = total.value.replace(",", ".");
  if (totalFieldValue === "." || +totalFieldValue < 50) {
    sum.value = "0,00";
  } else {
    sum.value = (+totalFieldValue / (1 + +percent)).toFixed(2).replace(".", ",");
  }
}
function totalCalc(sum, total, percent) {
  const sumFieldValue = sum.value.replace(",", ".");
  if (sumFieldValue === ".") {
    total.value = "0,00";
  } else {
    total.value = (+sumFieldValue * (1 + +percent)).toFixed(2).replace(".", ",");
  }
}

function setPercentAmount(methods) {
  for (const method of methods) {
    if (method.checked === true) {
      return method.dataset.percent;
    }
  }
}

function resetPopularButtons(buttons) {
  for (const button of buttons) {
    button.classList.remove("payment__button--active");
  }
}

function paymentFormCheck(form) {
  const fieldValue = +form.querySelector("#total").value.replace(",", ".");
  const checkbox = form.querySelector(".checkbox__input");
  const submitButton = form.querySelector(".payment__submit");

  fieldValue !== "" && fieldValue > 50 && checkbox.checked
    ? submitButton.removeAttribute("disabled")
    : submitButton.setAttribute("disabled", "true");
}
