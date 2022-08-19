
# scroll-animate.js

Triggers CSS animations while scrolling to `<div> ` with `.reveal` added in the class


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


## Demo

Example: htttps://...

