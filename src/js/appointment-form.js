import IMask from "imask";
import { Modal } from "bootstrap";

document.addEventListener("DOMContentLoaded", function () {
  const status = document.getElementById("appointment-status");
  const form = document.getElementById("appointment-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const cprInput = document.getElementById("cpr");
  const replyToInput = document.getElementById("appointment-replyto");
  const submitButton = document.getElementById("appointment-submit");
  const successModalElement = document.getElementById("appointment-success-modal");
  const successModal = Modal.getOrCreateInstance(successModalElement);
  const submitButtonLabel = submitButton.textContent.trim();

  nameInput.addEventListener("input", () => {
    if (nameInput.validity.tooShort) {
      nameInput.setCustomValidity("Indtast venligst dit fulde navn");
    } else {
      nameInput.setCustomValidity("");
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.validity.patternMismatch) {
      emailInput.setCustomValidity("Indtast din email");
    } else {
      emailInput.setCustomValidity("");
    }
  });

  phoneInput.addEventListener("input", () => {
    if (phoneInput.validity.patternMismatch) {
      phoneInput.setCustomValidity("Indtast dit danske telefonnummer");
    } else {
      phoneInput.setCustomValidity("");
    }
  });

  cprInput.addEventListener("input", () => {
    if (cprInput.validity.patternMismatch) {
      cprInput.setCustomValidity("Indtast dit fulde CPR-nummer");
    } else {
      cprInput.setCustomValidity("");
    }
  });

  IMask(phoneInput, {
    mask: "+{45} 00 00 00 00",
  });

  IMask(cprInput, {
    mask: "000000-0000",
  });

  const setBusy = (isBusy) => {
    submitButton.disabled = isBusy;
    submitButton.textContent = isBusy ? "Sender..." : submitButtonLabel;

    if (isBusy) {
      form.setAttribute("aria-busy", "true");
    } else {
      form.removeAttribute("aria-busy");
    }
  };

  const showStatus = (message, isError = false) => {
    status.textContent = message;
    status.className = isError ? "alert alert-danger mt-3" : "mt-3";
    status.setAttribute("role", isError ? "alert" : "status");
  };

  const submitAppointmentForm = async () => {
    setBusy(true);
    showStatus("Vent venligst. Din bookinganmodning sendes.");
    replyToInput.value = emailInput.value;

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const responseBody = await response.json();
      if (!response.ok || responseBody.success === false) {
        throw new Error(responseBody.message || "Bookinganmodningen kunne ikke sendes");
      }

      form.reset();
      form.classList.remove("was-validated");
      showStatus("");
      form.removeAttribute("aria-busy");
      submitButton.textContent = submitButtonLabel;
      successModal.show();
    } catch (error) {
      console.error("Booking submission failed", error);
      setBusy(false);
      showStatus(
        "Der opstod en fejl. Prøv venligst igen. Kontakt os på info@tandklinikken-frederikssund.dk eller 47 31 04 42, hvis fejlen fortsætter.",
        true
      );
      status.focus({ preventScroll: true });
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    if (!submitButton.disabled) {
      submitAppointmentForm();
    }
  });

  successModalElement.addEventListener("shown.bs.modal", () => {
    successModalElement.querySelector("[data-bs-dismiss='modal']").focus();
  });

  successModalElement.addEventListener("hidden.bs.modal", () => {
    setBusy(false);
    submitButton.focus();
  });
});
