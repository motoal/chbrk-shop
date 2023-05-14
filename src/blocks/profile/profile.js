import ready from "../../js/utils/documentReady.js";

ready(function () {
  const profileForm = document.querySelector(".profile__pass");

  if (profileForm) {
    const loginInputs = profileForm.querySelectorAll("input");
    const loginButton = profileForm.querySelector("button");

    loginInputs.forEach((input) => {
      input.addEventListener("input", () => {
        profileFormCheck(profileForm, loginButton);
      });
    });
  }
});

function profileFormCheck(form, submit) {
  const formPasswordValue = form.querySelector("#password").value;
  const formNewPasswordValue = form.querySelector("#newPassword").value;
  const noEmptyValues = !!formNewPasswordValue && !!formPasswordValue;

  noEmptyValues ? submit.removeAttribute("disabled") : submit.setAttribute("disabled", "true");
}
