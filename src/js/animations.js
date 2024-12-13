const createAnimationObserver = (initialClass, animationClass) => {
  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        entry.target.classList.add(initialClass);
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: "50px",
    }
  );
};

// Get elements
const sectionTitles = document.querySelectorAll(".section-title");
const primaryButtons = document.querySelectorAll(
  ".btn-primary.turquoise-btn.animation-btn, .appointment-btn.animation-btn"
); // Combined selectors

// Create observers
const sectionObservers = createAnimationObserver("scale-initial", "scale-animation");
const buttonObservers = createAnimationObserver("slide-initial", "slide-animation");

// Observe sections
sectionTitles.forEach((section) => sectionObservers.observe(section));

// Observe buttons
primaryButtons.forEach((button) => {
  console.log("Found button:", button);
  buttonObservers.observe(button);
});
