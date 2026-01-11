# Component API Design

Component API design is the art of creating props, variants, and composition patterns that make components flexible without being complex. Good APIs make common cases easy and edge cases possible.

**Principles**:
- **Sensible defaults**: Components should work with minimal props
- **Composition over configuration**: Prefer composing components over mega-prop APIs
- **Consistent naming**: Same concepts use same names across components
- **Predictable behavior**: Props should do what developers expect

**Variants Strategy**:
Don't use boolean prop explosion (`isLarge`, `isSmall`, `isPrimary`). Use discriminated unions:
```tsx
variant: 'primary' | 'secondary' | 'ghost'
size: 'sm' | 'md' | 'lg'
```

**Composition Patterns**:
- **Children**: For flexible content (`<Card>{content}</Card>`)
- **Slots**: Named areas (`<Card header={...} footer={...}>`)
- **Compound components**: Related components that share state (`<Tabs><Tab /></Tabs>`)

**TypeScript Integration**: Type your props carefully. Good types are documentation. Use discriminated unions for conditional props.

Visit the following resources to learn more:

- [@article@Component API Design - Nathan Curtis](https://medium.com/eightshapes-llc/designing-your-systems-component-api-78f57217b0fc)
- [@article@Radix API Design](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [@article@CVA - Class Variance Authority](https://cva.style/docs)
- [@video@Component API Patterns](https://www.youtube.com/watch?v=T-Zv73yZ_QI)
