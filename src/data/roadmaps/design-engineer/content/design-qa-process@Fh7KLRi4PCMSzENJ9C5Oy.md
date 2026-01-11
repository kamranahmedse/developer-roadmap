# Design QA Process

Design QA ensures implementations match designs accurately. It's a collaborative process between designers and Design Engineers to catch discrepancies before shipping.

**What to Check**:
- **Spacing**: Margins, padding, gaps match specs
- **Typography**: Font size, weight, line-height, letter-spacing
- **Colors**: Exact color values, including hover/focus states
- **Alignment**: Elements align to grid and each other
- **Responsive**: Behavior at all breakpoints
- **States**: Hover, focus, active, disabled, loading, error
- **Edge Cases**: Long text, empty states, error states

**QA Workflow**:
1. Developer implements feature
2. Self-review against Figma specs
3. Designer reviews in staging/preview
4. Iterate on feedback
5. Final approval before merge

**Tools and Techniques**:
- **Overlay comparison**: Screenshot overlay on implementation
- **Figma Dev Mode**: Extract exact values
- **Browser DevTools**: Inspect computed styles
- **Design review in PR**: Include screenshots/videos

**Communication**:
- Be specific about discrepancies
- Discuss whether differences are bugs or improvements
- Document intentional deviations
- Create a shared language for feedback

Visit the following resources to learn more:

- [@article@Design QA Process - InVision](https://www.invisionapp.com/inside-design/design-qa/)
- [@article@Design Handoff Best Practices - Figma](https://www.figma.com/best-practices/tips-on-developer-handoff/)
- [@video@Design QA Workflow](https://www.youtube.com/watch?v=x5Rg1lQZT7M)
