import { Modal } from "bootstrap";

const STORAGE_KEY = "tandklinikken-google-maps-consent";
const CONSENT_GRANTED = "granted";
const CONSENT_DENIED = "denied";

document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.getElementById("google-maps-consent");
  const mapPlaceholder = mapContainer?.querySelector(".google-map-placeholder");
  let currentConsent = readConsent();

  const modalElement = createSettingsModal();
  const settingsModal = Modal.getOrCreateInstance(modalElement);
  const status = modalElement.querySelector("[data-google-maps-status]");
  const allowButton = modalElement.querySelector("[data-google-maps-allow-setting]");
  const denyButton = modalElement.querySelector("[data-google-maps-deny-setting]");

  ensureSettingsTrigger();

  const updateStatus = () => {
    if (!status) return;

    status.textContent =
      currentConsent === CONSENT_GRANTED
        ? "Google Maps er tilladt og indlæses på kontaktsiden."
        : "Google Maps er deaktiveret og indlæses ikke på hjemmesiden.";
  };

  const loadMap = () => {
    if (!mapContainer || mapContainer.querySelector("iframe")) return;

    const mapSource = mapContainer.dataset.mapSrc;
    if (!mapSource) return;

    const iframe = document.createElement("iframe");
    iframe.src = mapSource;
    iframe.className = "google-map-frame";
    iframe.title =
      "Kort der viser Tandklinikken Frederikssunds placering på Færgeparken 23, 3600 Frederikssund";
    iframe.setAttribute("aria-label", iframe.title);
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");

    mapPlaceholder?.setAttribute("hidden", "");
    mapContainer.appendChild(iframe);
  };

  const unloadMap = () => {
    mapContainer?.querySelector("iframe")?.remove();
    mapPlaceholder?.removeAttribute("hidden");
  };

  const setConsent = (value) => {
    currentConsent = value;
    writeConsent(value);

    if (value === CONSENT_GRANTED) {
      loadMap();
    } else {
      unloadMap();
    }

    updateStatus();
  };

  document.querySelectorAll("[data-google-maps-accept]").forEach((button) => {
    button.addEventListener("click", () => setConsent(CONSENT_GRANTED));
  });

  document.querySelectorAll("[data-cookie-settings-trigger]").forEach((button) => {
    button.addEventListener("click", () => {
      updateStatus();
      settingsModal.show();
    });
  });

  allowButton?.addEventListener("click", () => {
    setConsent(CONSENT_GRANTED);
    settingsModal.hide();
  });

  denyButton?.addEventListener("click", () => {
    setConsent(CONSENT_DENIED);
    settingsModal.hide();
  });

  if (currentConsent === CONSENT_GRANTED) {
    loadMap();
  } else {
    unloadMap();
  }

  updateStatus();
});

const readConsent = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeConsent = (value) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // The current page can still honor the choice when browser storage is unavailable.
  }
};

const ensureSettingsTrigger = () => {
  if (document.querySelector("[data-cookie-settings-trigger]")) return;

  const footerList =
    document.querySelector("#footer [data-footer-information] ul") ||
    document.querySelector("#footer .footer-links ul");
  if (!footerList) return;

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <i class="bx bx-chevron-right" aria-hidden="true"></i>
    <button type="button" class="footer-modal-link" data-cookie-settings-trigger>
      Cookieindstillinger
    </button>
  `;
  footerList.appendChild(listItem);
};

const createSettingsModal = () => {
  const existingModal = document.getElementById("cookie-settings-modal");
  if (existingModal) return existingModal;

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div
      class="modal fade"
      id="cookie-settings-modal"
      tabindex="-1"
      aria-labelledby="cookie-settings-title"
      aria-describedby="cookie-settings-description"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="cookie-settings-title">Cookieindstillinger</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Luk"></button>
          </div>
          <div class="modal-body">
            <p id="cookie-settings-description">
              Vi anvender ikke egne cookies til statistik eller markedsføring. Google Maps er en
              valgfri tredjepartstjeneste. Hvis du tillader kortet, kan Google anvende cookies eller
              lignende teknologier og modtage oplysninger om dit besøg.
            </p>
            <p>
              Dit valg gemmes lokalt i browseren og anvendes kun til at huske denne indstilling.
            </p>
            <p class="cookie-settings-status" data-google-maps-status aria-live="polite"></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-google-maps-deny-setting>
              Deaktivér Google Maps
            </button>
            <button type="button" class="btn btn-primary turquoise-btn" data-google-maps-allow-setting>
              Tillad Google Maps
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
