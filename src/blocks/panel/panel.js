import ready from "../../js/utils/documentReady.js";

ready(function () {
  const panelTriggers = document.querySelectorAll("[data-panel-trigger]");
  const panelCloseButtons = document.querySelectorAll(".panel__close");
  const panelDarker = document.querySelector(".page__darker");

  if (panelTriggers.length !== 0) {
    panelTriggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const pageState = document.body.getAttribute("data-state");
        const triggerTarget = trigger.getAttribute("data-panel-trigger");
        if (pageState === `open-panel-${triggerTarget}`) {
          document.body.dataset.state = "";
          document.documentElement.classList.remove("ovh");
        } else {
          document.body.dataset.state = `open-panel-${triggerTarget}`;
          document.documentElement.classList.add("ovh");
        }
      });
    });
  }

  if (panelCloseButtons.length !== 0) {
    panelCloseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        document.body.dataset.state = "";
        document.documentElement.classList.remove("ovh");
      });
    });
  }

  panelDarker.addEventListener("click", () => {
    document.body.dataset.state = "";
    document.documentElement.classList.remove("ovh");
  });
});
