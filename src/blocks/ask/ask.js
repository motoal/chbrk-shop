import ready from "../../js/utils/documentReady.js";

ready(function () {
  const askForm = document.querySelector(".ask__form");

  if (askForm) {
    const formInputs = askForm.querySelectorAll("input");
    const formTextarea = askForm.querySelector("textarea");
    const formButton = askForm.querySelector("button");

    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        contactsFormCheck(askForm, formButton);
      });
    });

    formTextarea.addEventListener("input", () => {
      contactsFormCheck(askForm, formButton);
    });
  }
});

function contactsFormCheck(form, submit) {
  const formNameValue = form.querySelector("input[type='text']").value;
  const formEmailValue = form.querySelector("input[type='email']").value;
  const formTextareaValue = form.querySelector("textarea").value;
  const noEmptyValues = !!formNameValue && !!formEmailValue && !!formTextareaValue;
  const emailFormat = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formEmailValue);

  noEmptyValues && emailFormat
    ? submit.removeAttribute("disabled")
    : submit.setAttribute("disabled", "true");
}
