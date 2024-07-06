const alertParent = document.getElementById("contact-status");
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const message = document.getElementById("contact-message");

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


// Add bootstrap validation styles
(() => {
  "use strict";
  window.addEventListener(
    "load",
    () => {
      let forms = document.getElementsByClassName("contact-needs-validation");
      let validation = Array.prototype.filter.call(forms, (form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              event.preventDefault();
              submitForm();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );
})();

const submitForm = () => {
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  let replyto = document.getElementById("replyto");
  replyto.value = `${emailInput.value}`;

  let alertStatus = document.createElement("div");
  alertStatus.classList.add("mt-3");
  alertStatus.innerHTML = "Vent venligst.";

  alertParent.appendChild(alertStatus);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        alertStatus.innerHTML =
          "Din booking anmodning er modtaget. </br> Vi vender tilbage med en endelig bekræftelse på din aftale hurtigst muligt.";
      } else {
        console.log(response);
        console.log(json.message);
        alertStatus.innerHTML =
          "Der opstod en fejl. Prøv venligst igen. </br> Kontakt os via info@tandklinikken-frederikssund.dk eller </br> på 47 31 04 42, hvis fejlen fortsætter.";
      }
    })
    .catch((error) => {
      console.log(error);
      alertStatus.innerHTML =
        "Der opstod en fejl. Prøv venligst igen. </br> Kontakt os via info@tandklinikken-frederikssund.dk eller </br> på 47 31 04 42, hvis fejlen fortsætter.";
    })
    .then(() => {
      form.reset();
      form.classList.remove("was-validated");
      const invalidFeedbacks = form.querySelectorAll(".invalid-feedback");
      invalidFeedbacks.forEach((feedback) => (feedback.style.display = "none"));
      setTimeout(() => {
        while (alertParent.hasChildNodes()) {
          alertParent.removeChild(alertParent.firstChild);
        }
      }, 8000);
    });
};
