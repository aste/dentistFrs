// Import vendor dependencies
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GLightbox from "glightbox";
import Swiper from "swiper";
import flatpickr from "flatpickr";
import { Danish } from "flatpickr/dist/l10n/da.js";

// Import custom scripts
import "./appointment-form.js";
import "./contact-form.js";

// Import critical hero images
import heroLarge from "../assets/img/hero-bg.webp";
import heroMedium from "../assets/img/hero-bg-1200.webp";
import heroSmall from "../assets/img/hero-bg-768.webp";

  // Essential selector helper
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

// Critical Path IIFE - Immediately executed for above-the-fold content
(function () {
  "use strict";

  // Critical hero image handling
  function setHeroBackground() {
    const hero = document.getElementById("hero");
    if (window.matchMedia("(max-width: 767px)").matches) {
      hero.style.backgroundImage = `url(${heroSmall})`;
    } else if (window.matchMedia("(max-width: 1199px)").matches) {
      hero.style.backgroundImage = `url(${heroMedium})`;
    } else {
      hero.style.backgroundImage = `url(${heroLarge})`;
    }
  }

  // Critical header functionality
  function initializeCritical() {
    let selectHeader = select("#header");
    let selectTopbar = select("#topbar");
    if (selectHeader) {
      let lastScrollY = window.scrollY;
      const headerScrolled = () => {
        let currentScrollY = window.scrollY;
        if (window.scrollY > lastScrollY) {
          selectHeader.classList.add("header-scrolled");
          if (selectTopbar) {
            selectTopbar.classList.add("topbar-scrolled");
          }
        } else {
          selectHeader.classList.remove("header-scrolled");
          if (selectTopbar) {
            selectTopbar.classList.remove("topbar-scrolled");
          }
        }
        lastScrollY = currentScrollY;
      };
      window.addEventListener("load", headerScrolled);
      document.addEventListener("scroll", headerScrolled);
    }
  }

  // Initialize critical features
  window.addEventListener("load", () => {
    setHeroBackground();
    initializeCritical();
  });
  window.addEventListener("resize", setHeroBackground);
})();

// Non-Critical Path IIFE - Deferred for below-the-fold content
(function () {
  "use strict";
  
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  // Initialize non-critical features
  function initializeNonCritical() {
    // Back to top button
    let backtotop = select(".back-to-top");
    if (backtotop) {
      const toggleBacktotop = () => {
        backtotop.classList.toggle("active", window.scrollY > 100);
      };
      window.addEventListener("load", toggleBacktotop);
      document.addEventListener("scroll", toggleBacktotop);
    }

    // Mobile navigation
    on("click", ".mobile-nav-toggle", function (e) {
      select("#navbar").classList.toggle("navbar-mobile");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });

    // Mobile dropdowns
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

    // Scroll handling
    on(
      "click",
      ".scrollto",
      function (e) {
        if (select(this.hash)) {
          e.preventDefault();
          let navbar = select("#navbar");
          if (navbar.classList.contains("navbar-mobile")) {
            navbar.classList.remove("navbar-mobile");
            let navbarToggle = select(".mobile-nav-toggle");
            navbarToggle.classList.toggle("bi-list");
            navbarToggle.classList.toggle("bi-x");
          }
          scrollto(this.hash);
        }
      },
      true
    );

    // Initialize libraries
    flatpickr.localize(Danish);
    flatpickr("#date", {
      locale: "da",
    });

    GLightbox({
      selector: ".glightbox, .gallery-lightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });

    new Swiper(".testimonials-slider", {
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

    // Remove preloader
    let preloader = select("#preloader");
    if (preloader) {
      preloader.remove();
    }

    // Handle hash links
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  }

  // Initialize non-critical features with a slight delay
  window.addEventListener("load", () => {
    setTimeout(initializeNonCritical, 100);
  });
})();
