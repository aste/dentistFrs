// Reusable animation configurations
const animationConfig = {
  fadeIn: {
    threshold: 0.75,
    rootMargin: "0px",
    classNames: {
      initial: "fade-in",
      visible: "fade-in-visible",
    },
  },
  slideIn: {
    threshold: 0.75,
    rootMargin: "0px",
    classNames: {
      initial: "slide-in",
      visible: "slide-in-visible",
    },
  },
  scaleIn: {
    threshold: 0.75,
    rootMargin: "0px",
    classNames: {
      initial: "scale-in",
      visible: "scale-in-visible",
    },
  },
};

// Create an Intersection Observer that monitors elements and toggles the "show" class
// when they enter/exit the viewport. For each observed element:
// - element.target is the element being observed
// - isIntersecting is true when element enters viewport, false when it exits
// - toggle() adds the class if isIntersecting is true, removes it if false

// Toggles 'show' class on elements when they become visible in the viewport
// const animationObserver = new IntersectionObserver((elements) => {
//   elements.forEach((element) => element.target.classList.toggle("show", element.isIntersecting));
// });

const animationObserver = (animationConfigObj) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationConfigObj.classNames.visible);
        } else {
          entry.target.classList.remove(animationConfigObj.classNames.visible);
        }
      });
    },
    {
      threshold: animationConfigObj.threshold,
      rootMargin: animationConfigObj.rootMargin,
    }
  );
};

// const createAnimationObserver = (config) => {
//   return new IntersectionObserver(
//     (entries, intersectionObserverInstance) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add(config.classNames.visible);
//         }
//       });
//     },
//     {
//       threshold: config.threshold,
//       rootMargin: config.rootMargin,
//     }
//   );
// };

// Initialize animations for elements
// const initializeAnimations = () => {
//   // Fade in animations
//   const fadeElements = document.querySelectorAll(".fade");
//   const fadeObserver = createAnimationObserver(animationConfig.fadeIn);
//   fadeElements.forEach((element) => {
//     element.classList.add(animationConfig.fadeIn.classNames.initial);
//     fadeObserver.observe(element);
//   });

//   // Slide in animations
//   const slideElements = document.querySelectorAll(".slide");
//   const slideObserver = createAnimationObserver(animationConfig.slideIn);
//   slideElements.forEach((element) => {
//     element.classList.add(animationConfig.slideIn.classNames.initial);
//     slideObserver.observe(element);
//   });

//   // Scale in animations
//   const scaleElements = document.querySelectorAll('[data-animation="scale"]');
//   const scaleObserver = createAnimationObserver(animationConfig.scaleIn);
//   scaleElements.forEach((element) => {
//     element.classList.add(animationConfig.scaleIn.classNames.initial);
//     scaleObserver.observe(element);
//   });
// };

const initializeAnimations = () => {
  // About section animation
  const aboutSection = document.querySelector(".about .icon-boxes");
  if (aboutSection) {
    aboutSection.classList.add(animationConfig.scaleIn.classNames.initial);
    const fadeObserver = createAnimationObserver(animationConfig.scaleIn);
    fadeObserver.observe(aboutSection);
  }

  // Services cards animation
  // const serviceCards = document.querySelectorAll(".services .icon-box");
  // if (serviceCards.length) {
  // serviceCards.forEach((card, index) => {
  // card.setAttribute("data-animation", "slide");
  // card.classList.add(animationConfig.slideIn.classNames.initial);
  // card.classList.add(`delay-${index + 1}`);
  // const slideObserver = createAnimationObserver(animationConfig.slideIn);
  // slideObserver.observe(card);
  // });
  // }
};

// Export for use in main.js
export { initializeAnimations };
