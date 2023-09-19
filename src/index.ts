type ScrollAnimType =
  | "fadeIn"
  | "slideInFromLeft"
  | "easeInOutQuad"
  | "easeInQuad"
  | "easeOutQuad"
  | "linear";

interface AnimationOptions {
  element: HTMLElement;
  duration?: number;
  delay?: number; // Add delay as an optional property with a default value
  easing?: ScrollAnimType;
}

function scrollAnimate(options: AnimationOptions) {
  const defaultOptions: AnimationOptions = {
    duration: 1000,
    delay: 0,
    easing: "linear",
    ...options,
  };

  const settings = { ...defaultOptions, ...options };

  if (!settings.element) {
    console.error("No element provided for scroll animation.");
    return;
  }

  const element = settings.element;
  const duration = settings.duration;
  const delay = settings.delay || 0;

  if (duration === undefined) {
    console.error("Duration must be provided for scroll animation.");
    return;
  }

  const start = performance.now();
  const end = start + duration;

  const animate = (currentTime: number) => {
    if (currentTime < start + delay) {
      // Add debugging output here if needed
      console.log("Waiting for delay...");
      requestAnimationFrame(animate);
      return;
    }

    const progress = (currentTime - start - delay) / duration;

    if (progress >= 1) {
      // Ensure that the animation terminates by clearing animation frames
      element.style.transform = "translateY(0)";
      return;
    } else {
      const selectedEasing = (settings.easing as ScrollAnimType) || "linear";
      const ease = easingFunctions[selectedEasing](progress);
      const translateY = (1 - ease) * 100;
      element.style.transform = `translateY(${translateY}%)`;

      // Add debugging output here if needed
      console.log(`Progress: ${progress}`);
      console.log(`TranslateY: ${translateY}`);

      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}

const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  fadeIn: (t: number) => t,
  slideInFromLeft: (t: number) => t,
};

function applyScrollAnim(
  element: HTMLElement,
  animation: ScrollAnimType,
  options?: AnimationOptions
) {
  const animationMap: Record<ScrollAnimType, () => void> = {
    fadeIn: () => fadeIn(element, options),
    slideInFromLeft: () => slideInFromLeft(element, options),
    easeInOutQuad: () =>
      scrollAnimate({ element, easing: "easeInOutQuad", ...options }),
    easeInQuad: () =>
      scrollAnimate({ element, easing: "easeInQuad", ...options }),
    easeOutQuad: () =>
      scrollAnimate({ element, easing: "easeOutQuad", ...options }),
    linear: () => scrollAnimate({ element, easing: "linear", ...options }),
  };

  const selectedAnimation = animationMap[animation];
  if (selectedAnimation) {
    selectedAnimation();
  } else {
    console.error(`Unsupported animation: ${animation}`);
  }
}

function slideInFromLeft(element: HTMLElement, options?: AnimationOptions) {
  scrollAnimate({ element, easing: "easeInOutQuad", ...options });
}

function fadeIn(element: HTMLElement, options?: AnimationOptions) {
  scrollAnimate({ element, easing: "easeInOutQuad", ...options });
}

export {
  applyScrollAnim,
  easingFunctions,
  scrollAnimate,
  slideInFromLeft,
  fadeIn,
  ScrollAnimType, // Export the ScrollAnimType type
};
