import ready from "../utils/documentReady.js";
import SimpleBar from "simplebar";

ready(function () {
  Array.prototype.forEach.call(
    document.querySelectorAll(".panel__scroll"),
    (el) => new SimpleBar(el, { autoHide: false }),
  );
});
