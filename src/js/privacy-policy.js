document.addEventListener("DOMContentLoaded", () => {
  const footerList = document.querySelector("#footer [data-footer-information] ul");

  ensurePrivacyPolicyTrigger(footerList);
  createPrivacyPolicyModal();
});

const ensurePrivacyPolicyTrigger = (footerList) => {
  if (!footerList || document.querySelector('[data-bs-target="#privatlivspolitik"]')) return;

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <i class="bx bx-chevron-right" aria-hidden="true"></i>
    <a href="#privatlivspolitik" data-bs-toggle="modal" data-bs-target="#privatlivspolitik">
      Privatlivspolitik
    </a>
  `;
  footerList.appendChild(listItem);
};

const createPrivacyPolicyModal = () => {
  const existingModal = document.getElementById("privatlivspolitik");
  if (existingModal) return existingModal;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div
      class="modal fade policy-modal"
      id="privatlivspolitik"
      tabindex="-1"
      aria-labelledby="privacy-policy-title"
      aria-describedby="privacy-policy-introduction"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="privacy-policy-title">Privatlivspolitik</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Luk"></button>
          </div>
          <div class="modal-body">
            <h5>Kære Patient</h5>
            <p id="privacy-policy-introduction">
              Nedenfor kan du læse klinikkens privatlivspolitik for patientbehandling.
            </p>
            <p>
              Når du er patient på klinikken, er det nødvendigt, at vi registrerer og anvender visse
              oplysninger om dig.
            </p>
            <p>
              Dette har vi pligt til at gøre efter hhv. autorisationsloven,
              journalføringsbekendtgørelsen og sundhedsloven.
            </p>
            <p>
              De oplysninger, som vi registrerer og behandler om dig, har vi pligt til at opbevare
              sikkert, ligesom vi har tavshedspligt. Videregivelse af informationer om dine
              helbredsmæssige forhold kan, hvor det er nødvendigt, udveksles internt på klinikken,
              hvorimod videregivelse af helbredsoplysninger til personer mv. udenfor klinikken som
              udgangspunkt kun kan ske med dit samtykke, jf. sundhedslovens kapitel 9.
            </p>
            <p>
              Visse oplysninger om dig registrerer og anvender vi til brug for afregningsmæssige
              formål, hvis dette er nødvendigt for at kunne gennemføre en betaling for klinikkens
              behandling af dig, fx via din region, kommune eller et forsikringsselskab.
            </p>
            <p>
              Klinikken har pligt til at opbevare din journal, indtil der er gået 10 år, efter at du
              har været i kontakt med klinikken sidste gang. Vælger du at skifte tandlæge, overfører
              vi din journal til din nye tandlæge, som herefter overtager pligten til at opbevare
              din journal. I særlige tilfælde, som er beskrevet i journalføringsbekendtgørelsen, kan
              vi opbevare din journal i længere tid end ovenfor beskrevet.
            </p>
            <p>
              Oplysninger om dig, som klinikken opbevarer til brug for afregningsmæssige formål,
              opbevarer vi så længe, dette har relevans, og er påkrævet af hensyn til klinikkens
              afregning og bogføring. Oplysninger om dig til afregningsformål registreres på
              grundlag af art. 6, stk. 1, litra b og f (indtil 25. maj 2018 registreres
              oplysningerne på baggrund af persondatalovens § 6, stk. 1, nr. 2 og nr. 7).
            </p>
            <p>
              Du har til enhver tid krav på at få aktindsigt i de oplysninger, som klinikken
              registrerer og behandler om dig. Hvis du mener, at vi har registreret forkerte
              oplysninger om dig, kan du bede os om at rette oplysningerne. Vi må ikke slette
              oplysninger i din journal, men hvis du mener, at der er en fejl i journalen, kan du
              bede os om, at der laves en tilføjelse med dine bemærkninger.
            </p>
            <p>
              Skulle du ønske at klage over klinikkens behandling af dine personoplysninger, kan du
              klage til Datatilsynet, som du kan finde nærmere oplysninger om på
              <a href="https://www.datatilsynet.dk/" target="_blank" rel="noopener noreferrer">
                datatilsynet.dk</a
              >.
            </p>
            <p>
              Det er Styrelsen for Patientsikkerhed, som fører tilsyn med reglerne i
              sundhedslovgivningen. Du kan finde nærmere oplysninger på
              <a href="https://www.stps.dk/" target="_blank" rel="noopener noreferrer">stps.dk</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  const modalElement = wrapper.firstElementChild;
  document.body.appendChild(modalElement);
  return modalElement;
};
