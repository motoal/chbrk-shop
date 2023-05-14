import ready from "../../js/utils/documentReady.js";
import IMask from "imask";
import noUiSlider from "nouislider";
import wNumb from "../../js/common/wNumb.js";

ready(function () {
  const filterTrigger = document.querySelector(".filter__trigger");
  const filterInner = document.querySelector(".filter__inner");

  if (filterTrigger) {
    filterTrigger.addEventListener("click", () => {
      filterInner.classList.toggle("filter__inner--show");
    });
  }

  const rangeSliders = document.querySelectorAll(".filter__input-range");

  if (rangeSliders.length !== 0) {
    const rangeMin = 0;
    const rangeMax = 100000;
    const rangeSliderOptions = {
      start: [rangeMin, rangeMax],
      connect: true,
      range: {
        min: rangeMin,
        max: rangeMax,
      },
      format: wNumb({
        decimals: 0,
        thousand: " ",
      }),
    };
    const numberMask = {
      mask: Number,
      min: rangeMin,
      max: rangeMax,
      thousandsSeparator: " ",
    };

    rangeSliders.forEach((rangeSliderInstant) => {
      const fromField = rangeSliderInstant.querySelector('input[name="priceFrom"]');
      const toField = rangeSliderInstant.querySelector('input[name="priceTo"]');
      const slider = rangeSliderInstant.querySelector(".range__inner");

      noUiSlider.create(slider, rangeSliderOptions);
      makeSliderLink(slider, fromField, toField, numberMask);
    });
  }

  function makeSliderLink(range, fromField, toField, mask, rangeMin, rangeMax) {
    const fromFieldMask = IMask(fromField, mask);
    const toFieldMask = IMask(toField, mask);

    range.noUiSlider.on("update", function (values, handle) {
      if (handle) {
        toField.value = values[handle];
        fromFieldMask.updateValue();
        toFieldMask.updateValue();
      } else {
        fromField.value = values[handle];
        fromFieldMask.updateValue();
        toFieldMask.updateValue();
      }
    });

    fromField.addEventListener("change", function () {
      range.noUiSlider.set([this.value, null]);
    });

    toField.addEventListener("change", function () {
      range.noUiSlider.set([null, this.value]);
    });

    fromField.addEventListener("focus", function () {
      fromField.value = "";
      fromFieldMask.updateValue();
    });

    toField.addEventListener("focus", function () {
      toField.value = null;
      toFieldMask.updateValue();
    });

    fromField.addEventListener("focusout", function () {
      if (fromField.value === "") {
        fromField.value = rangeMin;
        range.noUiSlider.set([this.value, null]);
      }
    });

    toField.addEventListener("focusout", function () {
      if (toField.value === "") {
        toField.value = rangeMax;
        range.noUiSlider.set([null, this.value]);
      }
    });

    fromField.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        range.noUiSlider.set([this.value, null]);
      }
    });

    toField.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        range.noUiSlider.set([null, this.value]);
      }
    });
  }
});
