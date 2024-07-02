document.getElementById("appointment-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  console.log(`https://formsubmit.co/ajax/${config.formSubmitEmail}`);

  fetch(`https://formsubmit.co/ajax/${config.formSubmitEmail}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formObject),
    mode: "no-cors", // For testing purposes should be removed at deployment
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(
          "Din booking anmodning er modtaget. Vi vender tilbage med en endelig bekræftelse på din aftale hurtigst muligt."
        );
        form.reset();
      } else {
        alert(
          `2 Der opstod en fejl. Prøv venligst igen. Kontakt os via ${config.formSubmitEmail} eller på 47 31 04 42, hvis fejlen fortsætter.`
        );
      }
    })
    .catch((error) => {
      console.error("Error", error);
      alert(
        `1 Der opstod en fejl. Prøv venligst igen. Kontakt os via ${config.formSubmitEmail} eller på 47 31 04 42, hvis fejlen fortsætter.`
      );
    });
});

function showAlert(message, type) {
  const alertContainer = document.getElementById("alert-container");
  alertContainer.textContent = message;
  alertContainer.className = `custom-alert alert-${type}`;
  alertContainer.style.display = "block";

  setTimeout(() => {
    alertContainer.style.display = "none";
  }, 5000);
}
