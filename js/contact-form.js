document.getElementById("contact").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  fetch(`http://formsubmit.co/ajax/${config.formSubmitEmail}`, {
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
        alert("Din besked er modtaget, vi vender tilbage hurtigst muligt.");
        form.reset();
      } else {
        alert(
          "Der opstod en fejl. Prøv venligst igen. Kontakt os via info@tandklinikken-frederikssund.dk eller på 47 31 04 42, hvis fejlen fortsætter."
        );
      }
    })
    .catch((error) => {
      console.error("Error", error);
      alert(
        "Der opstod en fejl. Prøv venligst igen. Kontakt os via info@tandklinikken-frederikssund.dk eller på 47 31 04 42, hvis fejlen fortsætter."
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
