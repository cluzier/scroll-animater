import * as scrollAnimModule from "../src/index";
import { applyScrollAnim, scrollAnimate, ScrollAnimType } from "../src/index";

// Mock the entire module
jest.mock("../src/index", () => {
  return {
    ...jest.requireActual("../src/index"),
    fadeIn: jest.fn(), // Mock the fadeIn function
  };
});

// Define AnimationOptions locally in the test file
interface AnimationOptions {
  element: HTMLElement;
  duration?: number;
  delay?: number; // Add delay as an optional property with a default value
  easing?: ScrollAnimType;
}

// Mock requestAnimationFrame
const requestAnimationFrameMock = (callback: FrameRequestCallback) => {
  // Call the callback immediately to simulate an animation frame
  callback(performance.now());
};

(global as any).requestAnimationFrame = requestAnimationFrameMock;

describe("ScrollAnimate", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("scrollAnimate animates correctly", () => {
    const element = document.createElement("div");
    const options: AnimationOptions = {
      element,
      duration: 1000,
      easing: "easeInOutQuad",
      delay: 0,
    };

    let animationFrameCallback: FrameRequestCallback | undefined;

    (global as any).requestAnimationFrame = (
      callback: FrameRequestCallback
    ) => {
      animationFrameCallback = callback; // Capture the callback
    };

    scrollAnimate(options);

    // Simulate passing time
    const currentTime = performance.now();
    const animationStartTime = currentTime + (options.delay || 0) + 1;
    const animationEndTime = animationStartTime + (options.duration || 0) + 1;

    // Call the animation frame callback at the end of the animation
    if (animationFrameCallback) {
      animationFrameCallback(animationEndTime);
    }

    // Verify that the animation completes by checking for "translateY(0)"
    expect(element.style.transform).toBe("translateY(0)");
  });

  test("applyScrollAnim calls the correct animation function for unsupported animation", () => {
    const element = document.createElement("div");
    const animation: ScrollAnimType = "unsupportedAnimation" as ScrollAnimType; // Use an unsupported animation type
    const options: AnimationOptions = { element };

    const consoleErrorMock = jest.spyOn(console, "error");
    consoleErrorMock.mockImplementation(() => {}); // Mock console.error

    applyScrollAnim(element, animation, options);

    expect(consoleErrorMock).toHaveBeenCalledWith(
      `Unsupported animation: ${animation}`
    );
  });
});
