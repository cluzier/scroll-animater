
# scroll-animate.js

Enhance your web applications with seamless scroll-based animations using the scroll-animate library. This lightweight and versatile JavaScript library empowers developers to effortlessly create captivating and interactive scrolling effects, elevating the user experience to a new level.

## Key Features

- **Easy Integration:** Integrate scroll animations into your web project with minimal effort and no complex setups.

- **Customizable:** Tailor animations to your project's unique style and requirements, with customizable animation parameters and options.

- **Performance-Optimized:** scroll-animate is designed with performance in mind, ensuring smooth animations that won't slow down your website.

- **Responsive:** Create animations that adapt to different screen sizes and devices, delivering a consistent experience across platforms.

## Implementation

- Add the `scroll-animate.js` file to `resources/js` directory
- `import` the `scroll-animate.js` file into `main.js`
- Add class styles to `resources/scss/main.js`:

```bash
.reveal{
  opacity: 0;
  transition: 2s all ease;
}
.reveal.triggered{
  opacity: 1;
}
```

- add `.reveal` class to elements you want to add the animation to:
```bash
Example: `<div class="example reveal">`
```
