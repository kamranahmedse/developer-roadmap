# Forms and Validation

Forms are critical UI components where design and engineering intersect. Good form design reduces friction; good validation provides clear feedback.

**Form Design Principles**:
- Label every input clearly
- Group related fields logically
- Show required vs optional clearly
- Provide helpful placeholder text (not as labels)
- Size inputs appropriately for expected content

**Validation Strategies**:
- **On blur**: Validate when user leaves field (recommended)
- **On submit**: Validate all fields on form submission
- **Real-time**: Validate as user types (use sparingly)

**Error Handling**:
- Display errors inline, near the problematic field
- Use clear, actionable language
- Don't clear valid fields when showing errors
- Maintain focus management for screen readers

**React Form Libraries**:
- **React Hook Form**: Performant, minimal re-renders
- **Formik**: Feature-rich, good for complex forms
- **Zod**: Schema validation with TypeScript integration

**Accessibility**:
- Associate labels with `htmlFor`/`id`
- Use `aria-describedby` for error messages
- Mark required fields with `aria-required`
- Announce errors to screen readers

Visit the following resources to learn more:

- [@article@Form Design Patterns - Smashing](https://www.smashingmagazine.com/2018/08/best-practices-for-mobile-form-design/)
- [@article@Form Validation UX - Smashing](https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/)
- [@official@React Hook Form](https://react-hook-form.com/)
- [@video@Forms Tutorial](https://www.youtube.com/watch?v=oiNtnehlaTo)
