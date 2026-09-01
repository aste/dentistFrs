import { Modal } from "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
  const footerList = ensureInformationFooter();
  ensurePracticalInformationTrigger(footerList);

  const modalElement = createPracticalInformationModal();
  const practicalInformationModal = Modal.getOrCreateInstance(modalElement);

  document.querySelectorAll("[data-practical-information-trigger]").forEach((button) => {
    button.addEventListener("click", () => practicalInformationModal.show());
  });
});

const ensureInformationFooter = () => {
  const existingSection = document.querySelector("#footer [data-footer-information]");
  if (existingSection) return existingSection.querySelector("ul");

  const footerRow = document.querySelector("#footer .footer-top .row");
  if (!footerRow) return null;

  const section = document.createElement("div");
  section.className = "col-lg-3 col-md-3 col-8 footer-links";
  section.dataset.footerInformation = "";
  section.innerHTML = `
    <h4>Information</h4>
    <ul></ul>
  `;
  footerRow.appendChild(section);

  return section.querySelector("ul");
};

const ensurePracticalInformationTrigger = (footerList) => {
  if (!footerList || document.querySelector("[data-practical-information-trigger]")) return;

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <i class="bx bx-chevron-right" aria-hidden="true"></i>
    <button type="button" class="footer-modal-link" data-practical-information-trigger>
      Praktiske oplysninger
    </button>
  `;
  footerList.appendChild(listItem);
};

const createPracticalInformationModal = () => {
  const existingModal = document.getElementById("practical-information-modal");
  if (existingModal) return existingModal;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div
      class="modal fade policy-modal"
      id="practical-information-modal"
      tabindex="-1"
      aria-labelledby="practical-information-title"
      aria-describedby="practical-information-introduction"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="practical-information-title">Praktiske oplysninger</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Luk"></button>
          </div>
          <div class="modal-body">
            <p id="practical-information-introduction">
              Her finder du praktiske oplysninger om tidsbestilling, afbud, priser og kontakt til
              klinikken.
            </p>

            <section aria-labelledby="practical-information-prices">
              <h4 id="practical-information-prices">Priser og prisoverslag</h4>
              <p>
                Udvalgte priser fremgår af vores <a href="/#services">prisliste</a>. Hvis den
                samlede behandling forventes at koste mere end 2.500 kr., tilbyder vi et skriftligt
                prisoverslag, inden behandlingen påbegyndes. Hvis behandlingen ændres væsentligt,
                informerer vi dig og laver gerne et revideret prisoverslag.
              </p>
            </section>

            <section aria-labelledby="practical-information-cancellation">
              <h4 id="practical-information-cancellation">Afbud og udeblivelse</h4>
              <p>
                Hvis du er forhindret i at møde, bedes du kontakte klinikken hurtigst muligt og
                senest to timer før den aftalte tid. Ved udeblivelse uden rettidigt afbud kan
                klinikken opkræve gebyr efter gældende regler. For længere behandlinger kan der
                gælde et yderligere gebyr, hvis du på forhånd er blevet informeret skriftligt om
                dette.
              </p>
            </section>

            <section aria-labelledby="practical-information-booking">
              <h4 id="practical-information-booking">Online tidsbestilling</h4>
              <p>
                En online tidsbestilling er en forespørgsel og ikke en endelig aftale. Tiden er
                først endeligt aftalt, når den er blevet bekræftet af klinikken. Klinikken kan
                kontakte dig, hvis tidspunktet skal ændres, eller hvis der er behov for yderligere
                oplysninger.
              </p>
            </section>

            <section aria-labelledby="practical-information-contact">
              <h4 id="practical-information-contact">Kontakt</h4>
              <p>
                Ved spørgsmål kan du kontakte klinikken på <a href="tel:47310442">telefon</a>, via
                <a href="mailto:info@tandklinikken-frederikssund.dk">e-mail</a> eller gennem
                <a href="/#contact">kontaktformularen</a>. Ved akutte henvendelser anbefaler vi,
                at du ringer til klinikken.
              </p>
            </section>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary turquoise-btn" data-bs-dismiss="modal">
              Luk
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const modalElement = wrapper.firstElementChild;
  document.body.appendChild(modalElement);
  return modalElement;
};
