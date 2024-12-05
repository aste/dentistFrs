// Import CSS
import "flatpickr/dist/flatpickr.min.css";
import "swiper/css";
import "swiper/css/pagination";

// Import vendor dependencies
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GLightbox from "glightbox";
import flatpickr from "flatpickr";
import { Danish } from "flatpickr/dist/l10n/da.js";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import custom scripts
import "./appointment-form.js";
import "./contact-form.js";

// Initialize Flatpickr with Danish locale
flatpickr.localize(Danish);

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

  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );
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

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  flatpickr("#date", { locale: "da" });
  initializeGallery();
  initializeTestimonials();
  initializeHeader();
  initializeBackToTop();
  initializeMobileNav();
  initializeScrollTo();

  // Handle hash links on page load
  if (window.location.hash && select(window.location.hash)) {
    scrollto(window.location.hash);
  }

  // Remove preloader if exists
  const preloader = select("#preloader");
  preloader?.remove();
});
