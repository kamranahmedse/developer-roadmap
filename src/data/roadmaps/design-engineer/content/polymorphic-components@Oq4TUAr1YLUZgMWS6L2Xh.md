# Polymorphic Components

Polymorphic components render as different HTML elements via an "as" prop while sharing styles and behavior. This pattern enables semantic HTML without duplicating component code.

**The Problem**: A Button component styled beautifully, but sometimes you need a link that looks like a button. Without polymorphism, you'd duplicate styling or compromise semantics.

**The Solution**:
```tsx
<Button>Click me</Button>           // renders <button>
<Button as="a" href="/page">Go</Button>  // renders <a>
<Button as={Link} to="/page">Go</Button> // renders Router Link
```

**Implementation Approaches**:
- Simple: Accept `as` prop, spread props to rendered element
- Type-safe: Use generics to infer correct props for rendered element
- Radix Slot: Use Radix's `Slot` component to merge with children

**Type Safety Challenge**: When `as="a"`, props should include `href`. When `as="button"`, `href` shouldn't exist. This requires advanced TypeScript generics.

**Common Use Cases**:
- Buttons that can be links
- Headings (h1-h6) with shared styles
- List items as links

Visit the following resources to learn more:

- [@article@Polymorphic Components - Radix Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
- [@article@Building Polymorphic Components with TypeScript](https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/)
- [@video@Polymorphic Components Tutorial](https://www.youtube.com/watch?v=uZ8GZm5KEXY)
