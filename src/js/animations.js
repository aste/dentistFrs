const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("showAnimation");
    } else {
      entry.target.classList.remove("showAnimation");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hiddenAnimation");
hiddenElements.forEach((element) => {
  console.log(element);
  observer.observe(element);
});

// // animations.js
const animationConfig = {
  fadeIn: {
    threshold: 0.25,
    rootMargin: "0px",
    classNames: {
      initial: "fade-in",
      visible: "fade-in-visible",
    },
  },
  slideIn: {
    threshold: 0.25,
    rootMargin: "0px",
    classNames: {
      initial: "slide-in",
      visible: "slide-in-visible",
    },
  },
  scaleIn: {
    threshold: 0.25,
    rootMargin: "0px",
    classNames: {
      initial: "scale-in",
      visible: "scale-in-visible",
    },
  },
};

// const createAnimationObserver = (element, config) => {
//   // First add the initial class
//   console.log(`createAnimationObserver is called of ${element}`);
//   element.classList.add(config.classNames.initial);
//   const observer = new IntersectionObserver(
//     (entries) => {
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

//   observer.observe(element);
//   return observer;
// };

// const initializeAnimations = () => {
//   console.log(`initializeAnimations is called`);
//   // About section animation
//   const aboutSection = document.querySelector(".about .icon-boxes");
//   if (aboutSection) {
//     console.log(`Hello we will add a slide-in animation`);
//     createAnimationObserver(aboutSection, animationConfig.slideIn);
//   }
// };

// export { initializeAnimations };
