import ready from "../../js/utils/documentReady.js";

ready(function () {
  const passFields = document.querySelectorAll(".field");

  passFields.forEach((item) => {
    const passInput = item.querySelector("input[type='password']");
    const passToggle = item.querySelector(".field__show");

    if (passToggle) {
      passToggle.addEventListener("click", function () {
        if (passInput.type === "password") {
          passInput.setAttribute("type", "text");
          passToggle.classList.add("field__show--active");
        } else {
          passToggle.classList.remove("field__show--active");
          passInput.setAttribute("type", "password");
        }
      });
    }
  });
});
