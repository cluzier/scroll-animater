"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fadeIn = exports.slideInFromLeft = exports.scrollAnimate = exports.easingFunctions = exports.applyScrollAnim = void 0;
function scrollAnimate(options) {
    const defaultOptions = {
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
    const delay = settings.delay || 0; // Access delay from settings with default value
    if (duration === undefined) {
        console.error("Duration must be provided for scroll animation.");
        return;
    }
    const start = performance.now();
    const end = start + duration;
    const animate = (currentTime) => {
        if (currentTime < start + delay) {
            requestAnimationFrame(animate);
            return;
        }
        const progress = (currentTime - start - delay) / duration; // Use delay and duration
        if (progress >= 1) {
            element.style.transform = "translateY(0)";
        }
        else {
            const selectedEasing = settings.easing || "linear"; // Explicit type assertion
            const ease = easingFunctions[selectedEasing](progress);
            const translateY = (1 - ease) * 100;
            element.style.transform = `translateY(${translateY}%)`;
            requestAnimationFrame(animate);
        }
    };
    requestAnimationFrame(animate);
}
exports.scrollAnimate = scrollAnimate;
const easingFunctions = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    fadeIn: (t) => t,
    slideInFromLeft: (t) => t,
};
exports.easingFunctions = easingFunctions;
function applyScrollAnim(element, animation, options) {
    const animationMap = {
        fadeIn: () => fadeIn(element, options),
        slideInFromLeft: () => slideInFromLeft(element, options),
        easeInOutQuad: () => scrollAnimate({ element, easing: "easeInOutQuad", ...options }),
        easeInQuad: () => scrollAnimate({ element, easing: "easeInQuad", ...options }),
        easeOutQuad: () => scrollAnimate({ element, easing: "easeOutQuad", ...options }),
        linear: () => scrollAnimate({ element, easing: "linear", ...options }),
    };
    const selectedAnimation = animationMap[animation];
    if (selectedAnimation) {
        selectedAnimation();
    }
    else {
        console.error(`Unsupported animation: ${animation}`);
    }
}
exports.applyScrollAnim = applyScrollAnim;
function slideInFromLeft(element, options) {
    scrollAnimate({ element, easing: "easeInOutQuad", ...options });
}
exports.slideInFromLeft = slideInFromLeft;
function fadeIn(element, options) {
    scrollAnimate({ element, easing: "easeInOutQuad", ...options });
}
exports.fadeIn = fadeIn;
//# sourceMappingURL=scroll-animater.js.map