document.getElementById("appointment-form").addEventListener("submit", (event) => {
  event.preventDefault();

  console.log(`https://formsubmit.co/ajax/${config.formSubmitEmail}`);

  const form = event.target;
  const formData = new FormData(form);

  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  // fetch("https://cors-anywhere.herokuapp.com/https://formsubmit.co/ajax/aste@tuta.io", {
  fetch("https://formsubmit.co/ajax/aste@tuta.io", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formObject),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("1");
        console.log(data);
        showAlert(
          "Din booking anmodning er modtaget. Vi vender tilbage med en endelig bekræftelse på din aftale hurtigst muligt.",
          "success"
        );
        form.reset();
      } else {
        console.log("2");
        showAlert(
          `2 Der opstod en fejl. Prøv venligst igen. Kontakt os via ${config.formSubmitEmail} eller på 47 31 04 42, hvis fejlen fortsætter.`,
          "danger"
        );
      }
    })
    .catch((error) => {
      console.log("3");
      console.error("Error", error);
      showAlert(
        `1 Der opstod en fejl. Prøv venligst igen. Kontakt os via ${config.formSubmitEmail} eller på 47 31 04 42, hvis fejlen fortsætter.`,
        "danger"
      );
    });
});

function showAlert(message, type) {
  // Create alert div
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = "alert";
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  // Append to alert container
  const alertContainer = document.getElementById("alert-appointment");
  alertContainer.appendChild(alertDiv);

  // Remove alert after 5 seconds
  // setTimeout(() => {
  //   alertDiv.classList.remove("show");
  //   setTimeout(() => {
  //     alertDiv.remove();
  //   }, 150); // Transition time to fade out
  // }, 5000);
}
