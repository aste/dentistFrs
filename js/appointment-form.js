const alertParent = document.getElementById("appointment-status");
const form = document.getElementById("appointment-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const cprInput = document.getElementById("cpr");

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
    cprInput.setCustomValidity("Indtast dit fulde CPR-nummer (10 cifre)");
  } else {
    cprInput.setCustomValidity("");
  }
});

// Format phone number and CPR


// Add bootstrap validation styles
(() => {
  "use strict";
  window.addEventListener(
    "load",
    () => {
      let forms = document.getElementsByClassName("needs-validation");
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
  let subject = document.getElementById("subject");

  replyto.value = `${emailInput.value}`;
  subject.value = `Ny tidsbestilling fra ${nameInput.value}`;

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
      form.classList.remove("was-validated"); // Remove validation styling
      const invalidFeedbacks = form.querySelectorAll(".invalid-feedback");
      invalidFeedbacks.forEach((feedback) => (feedback.style.display = "none"));
      setTimeout(() => {
        while (alertParent.hasChildNodes()) {
          alertParent.removeChild(alertParent.firstChild);
        }
      }, 8000);
    });
};
