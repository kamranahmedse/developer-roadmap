**Responsive design** ensures a website looks good on all devices by adapting its layout to different screen sizes.

To help ensure this, you can use flexible grids (either `CSS Grid` or `Flexbox`).

You will also have to apply media queries which help set breakpoints where the different styles need to be applied based on the width of the window:  

```css
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
```

You can also use relative units (`%`, `em`, `rem`) instead of fixed units (`px`) to ensure the values automatically adapt to the size of the container.