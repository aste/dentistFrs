const createAnimationObserver = (initialClass, animationClass) => {
  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        entry.target.classList.add(initialClass);
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        } else {
          entry.target.classList.remove(animationClass);
        }
      });
    },
    {
      threshold: 0.01,
      rootMargin: "-50px 0px -20px 0px",
    }
  );
};

// Get elements
const sectionTitles = document.querySelectorAll(".section-title");
const primaryButtons = document.querySelectorAll(
  ".btn-primary.turquoise-btn.animation-btn, .appointment-btn.animation-btn, .review-btn.animation-btn"
);

// Create observers
const sectionObservers = createAnimationObserver("scale-initial", "scale-animation");
const buttonObservers = createAnimationObserver("slide-initial", "slide-animation");

// Observe sections & buttons
sectionTitles.forEach((section) => sectionObservers.observe(section));
primaryButtons.forEach((button) => buttonObservers.observe(button));
