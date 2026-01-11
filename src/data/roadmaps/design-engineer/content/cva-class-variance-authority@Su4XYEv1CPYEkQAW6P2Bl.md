# CVA (Class Variance Authority)

CVA (Class Variance Authority) is a utility for managing component variants in Tailwind CSS. It's the standard approach used by shadcn/ui and many professional design systems.

**Why CVA**:
- Clean variant definitions
- Type-safe variant props
- Composable with other class utilities
- No runtime CSS-in-JS overhead

**Basic Usage**:
```tsx
import { cva } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Usage
<button className={button({ variant: "primary", size: "lg" })}>
```

**With TypeScript**: CVA generates types for your variants automatically, ensuring type-safe component APIs.

**Companion Libraries**: `tailwind-merge` prevents class conflicts; `clsx` handles conditional classes.

Visit the following resources to learn more:

- [@official@CVA Documentation](https://cva.style/docs)
- [@article@Building Variants - shadcn/ui](https://ui.shadcn.com/docs/components/button)
- [@video@CVA Tutorial](https://www.youtube.com/watch?v=T-Zv73yZ_QI)
