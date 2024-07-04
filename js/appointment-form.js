const alertParent = document.getElementById("appointment-status");
const form = document.getElementById("appointment-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

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
      setTimeout(() => {
        while (alertParent.hasChildNodes()) {
          alertParent.removeChild(alertParent.firstChild);
        }
      }, 8000);
    });
});
