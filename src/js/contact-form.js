import { Modal } from "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("contact-status");
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");
  const replyToInput = document.getElementById("contact-replyto");
  const submitButton = document.getElementById("contact-submit");
  const successModalElement = document.getElementById("contact-success-modal");
  const successModal = Modal.getOrCreateInstance(successModalElement);
  const submitButtonLabel = submitButton.textContent.trim();

  nameInput.addEventListener("input", () => {
    nameInput.setCustomValidity(nameInput.validity.tooShort ? "Indtast venligst dit fulde navn" : "");
  });

  emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity(emailInput.validity.patternMismatch ? "Indtast din email" : "");
  });

  messageInput.addEventListener("input", () => {
    messageInput.setCustomValidity(
      messageInput.validity.tooShort ? "Din besked skal være på minimum 15 tegn" : ""
    );
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
    status.className = message ? (isError ? "alert alert-danger mt-3" : "mt-3") : "";

    if (message) {
      status.setAttribute("role", isError ? "alert" : "status");
    } else {
      status.removeAttribute("role");
    }
  };

  const submitContactForm = async () => {
    setBusy(true);
    showStatus("Vent venligst. Din besked sendes.");
    replyToInput.value = emailInput.value;

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(object),
      });

      const responseBody = await response.json();
      if (!response.ok || responseBody.success === false) {
        throw new Error(responseBody.message || "Beskeden kunne ikke sendes");
      }

      form.reset();
      form.classList.remove("was-validated");
      showStatus("");
      form.removeAttribute("aria-busy");
      submitButton.textContent = submitButtonLabel;
      successModal.show();
    } catch (error) {
      console.error("Contact submission failed", error);
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
      submitContactForm();
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
