// // Import Third-party CSS Libraries
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css";
import "swiper/css/pagination";
import "glightbox/dist/css/glightbox.min.css";
import "flatpickr/dist/flatpickr.min.css";

// // Import Third-party JavaScript Libraries
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GLightbox from "glightbox";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import flatpickr from "flatpickr";
import { Danish } from "flatpickr/dist/l10n/da.js";

// // Import Local CSS Modules
import "../assets/css/main.css";

// // Import Local JavaScript Modules
import "./appointment-form.js";
import "./contact-form.js";
import "./animations.js";

const initializeGallery = () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    const link = item.querySelector("a");
    const img = item.querySelector("img");
    if (link && img) {
      const imgPath = img.getAttribute("src");
      link.setAttribute("href", imgPath);
    }
  });

  return GLightbox({
    selector: ".gallery-lightbox",
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
  });
};

const initializeTestimonials = () => {
  return new Swiper(".testimonials-slider", {
    modules: [Navigation, Pagination, Autoplay],
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });
};

const select = (el, all = false) => {
  try {
    el = el.trim();
    if (all) {
      const elements = [...document.querySelectorAll(el)];
      if (elements.length === 0) console.warn(`No elements found for selector: ${el}`);
      return elements;
    }
    const element = document.querySelector(el);
    if (!element) console.warn(`Element not found for selector: ${el}`);
    return element;
  } catch (err) {
    console.error(`Error selecting element: ${el}`, err);
    return all ? [] : null;
  }
};

const on = (type, el, listener, all = false) => {
  const selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

const scrollto = (el) => {
  const header = select("#header");
  const offset = header?.offsetHeight || 0;
  const elementPos = select(el)?.offsetTop || 0;

  window.scrollTo({
    top: elementPos - offset,
    behavior: "smooth",
  });
};

const initializeHeader = () => {
  const header = select("#header");
  const topbar = select("#topbar");

  if (header) {
    let lastScrollY = window.scrollY;
    const headerScrolled = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        header.classList.add("header-scrolled");
        topbar?.classList.add("topbar-scrolled");
      } else {
        header.classList.remove("header-scrolled");
        topbar?.classList.remove("topbar-scrolled");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("load", headerScrolled);
    document.addEventListener("scroll", headerScrolled);
  }
};

const initializeBackToTop = () => {
  const backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.toggle("active", window.scrollY > 100);
    };
    window.addEventListener("load", toggleBacktotop);
    document.addEventListener("scroll", toggleBacktotop);
  }
};

const initializeMobileNav = () => {
  on("click", ".mobile-nav-toggle", function () {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });
};

const initializeAccordionToggle = () => {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((faqItem) => {
    const toggleText = faqItem.querySelector("h3");
    const toggleIcon = faqItem.querySelector("i");

    const toggleAccordion = () => {
      const isActive = faqItem.classList.contains("faq-active");
      faqItems.forEach((item) => item.classList.remove("faq-active"));
      if (!isActive) faqItem.classList.add("faq-active");
    };

    if (toggleText) toggleText.addEventListener("click", toggleAccordion);
    if (toggleIcon) toggleIcon.addEventListener("click", toggleAccordion);
  });
};

const initializeScrollTo = () => {
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();
        const navbar = select("#navbar");
        if (navbar?.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          const navbarToggle = select(".mobile-nav-toggle");
          navbarToggle?.classList.toggle("bi-list");
          navbarToggle?.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );
};

const openAccordionFromHash = () => {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  const faqItem = target.classList.contains("faq-item") ? target : target.closest(".faq-item");

  if (!faqItem) return;

  document.querySelectorAll(".faq-item").forEach((item) => item.classList.remove("faq-active"));

  faqItem.classList.add("faq-active");

  if (hash.startsWith("#vejledning-")) {
    scrollto("#vejledninger");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Flatpickr
  flatpickr.localize(Danish);
  flatpickr("#date", { locale: "da" });

  // Initialize all components
  initializeHeader();
  initializeBackToTop();
  initializeMobileNav();
  initializeScrollTo();
  initializeGallery();
  initializeTestimonials();
  initializeAccordionToggle();

  openAccordionFromHash();
  // window.addEventListener("hashchange", openAccordionFromHash);
});
