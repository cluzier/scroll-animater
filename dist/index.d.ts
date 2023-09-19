type ScrollAnimType = "fadeIn" | "slideInFromLeft" | "easeInOutQuad" | "easeInQuad" | "easeOutQuad" | "linear";
interface AnimationOptions {
    element: HTMLElement;
    duration?: number;
    delay?: number;
    easing?: ScrollAnimType;
}
declare function scrollAnimate(options: AnimationOptions): void;
declare const easingFunctions: {
    linear: (t: number) => number;
    easeInQuad: (t: number) => number;
    easeOutQuad: (t: number) => number;
    easeInOutQuad: (t: number) => number;
    fadeIn: (t: number) => number;
    slideInFromLeft: (t: number) => number;
};
declare function applyScrollAnim(element: HTMLElement, animation: ScrollAnimType, options?: AnimationOptions): void;
declare function slideInFromLeft(element: HTMLElement, options?: AnimationOptions): void;
declare function fadeIn(element: HTMLElement, options?: AnimationOptions): void;
export { applyScrollAnim, easingFunctions, scrollAnimate, slideInFromLeft, fadeIn, ScrollAnimType, };
