import ready from "../../js/utils/documentReady.js";

ready(function () {
  const registrationForm = document.querySelector(".form--registration");
  const loginForm = document.querySelector(".form--login");
  const forgetForm = document.querySelector(".form--forget");

  if (registrationForm) {
    const formInputs = registrationForm.querySelectorAll("input");
    const formPassword = registrationForm.querySelector("#password");
    const formPasswordRepeat = registrationForm.querySelector("#passwordRepeat");
    const formButton = registrationForm.querySelector("button");

    formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        registrationFormCheck(registrationForm, formButton);
      });
    });

    formPassword.addEventListener("input", () => {
      passwordCheck(formPassword, formPasswordRepeat);
    });

    formPasswordRepeat.addEventListener("input", () => {
      passwordCheck(formPassword, formPasswordRepeat);
    });
  }

  if (loginForm) {
    const loginInputs = loginForm.querySelectorAll("input");
    const loginButton = loginForm.querySelector("button");

    loginInputs.forEach((input) => {
      input.addEventListener("input", () => {
        loginFormCheck(loginForm, loginButton);
      });
    });
  }

  if (forgetForm) {
    const forgetEmail = forgetForm.querySelector("input[type='email']");
    const formButton = forgetForm.querySelector("button");

    forgetEmail.addEventListener("input", () => {
      const forgetEmailValue = forgetEmail.value;

      forgetEmailValue && /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(forgetEmailValue)
        ? formButton.removeAttribute("disabled")
        : formButton.setAttribute("disabled", "true");
    });
  }
});

function loginFormCheck(form, submit) {
  const formEmailValue = form.querySelector("input[type='email']").value;
  const formPasswordValue = form.querySelector("#password").value;
  const noEmptyValues = !!formEmailValue && !!formPasswordValue;
  const emailFormat = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formEmailValue);

  noEmptyValues && emailFormat
    ? submit.removeAttribute("disabled")
    : submit.setAttribute("disabled", "true");
}

function registrationFormCheck(form, submit) {
  const formNameValue = form.querySelector("input[type='text']").value;
  const formEmailValue = form.querySelector("input[type='email']").value;
  const formPasswordValue = form.querySelector("#password").value;
  const formPasswordRepeatValue = form.querySelector("#passwordRepeat").value;
  const noEmptyValues =
    !!formNameValue && !!formEmailValue && !!formPasswordValue && !!formPasswordRepeatValue;
  const isSamePass = formPasswordValue === formPasswordRepeatValue;
  const checkbox = form.querySelector("input[type='checkbox']").checked;
  const emailFormat = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formEmailValue);

  noEmptyValues &&
  emailFormat &&
  isSamePass &&
  checkbox &&
  formPasswordValue.length >= 4 &&
  formPasswordRepeatValue.length >= 4
    ? submit.removeAttribute("disabled")
    : submit.setAttribute("disabled", "true");
}

function passwordCheck(first, second) {
  const firstValue = first.value;
  const secondValue = second.value;
  const message = document.querySelector(".form__message");

  if (
    firstValue &&
    secondValue &&
    firstValue.length >= 4 &&
    secondValue.length >= 4 &&
    firstValue === secondValue
  ) {
    message.classList.remove("form__message--active");
  } else {
    message.classList.add("form__message--active");
  }
  if (!firstValue || !secondValue) {
    message.classList.remove("form__message--active");
  }
}
