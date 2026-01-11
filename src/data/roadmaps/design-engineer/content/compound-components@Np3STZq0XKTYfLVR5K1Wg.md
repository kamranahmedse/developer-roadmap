# Compound Components

Compound components are related components that work together, sharing implicit state through React Context. Think of `<select>` and `<option>`—they're meaningless alone but powerful together.

**Pattern Example**:
```tsx
<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content here</AccordionContent>
  </AccordionItem>
</Accordion>
```

**Why Use Compound Components**:
- Flexible composition—users control structure
- No prop drilling through intermediate components
- Clear API boundaries
- Easy to extend without changing parent component

**Implementation**:
1. Parent component creates and provides Context
2. Child components consume Context via useContext
3. Parent manages shared state (open items, selected value)
4. Children read/update state through Context

**Use Cases**: Tabs, Accordions, Menus, Select boxes, Form field groups, Card sections

Radix UI primitives extensively use this pattern, providing excellent API ergonomics while handling complex accessibility requirements.

Visit the following resources to learn more:

- [@article@Compound Components - Kent C. Dodds](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [@article@Compound Pattern - Patterns.dev](https://www.patterns.dev/react/compound-pattern)
- [@article@Radix UI Primitives](https://www.radix-ui.com/primitives)
- [@video@Compound Components Tutorial](https://www.youtube.com/watch?v=vPRdY87_SH0)
