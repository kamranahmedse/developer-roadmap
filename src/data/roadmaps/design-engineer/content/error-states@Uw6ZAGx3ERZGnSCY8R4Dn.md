# Error State Design

Error states communicate problems and guide users toward resolution. Well-designed errors reduce frustration and maintain trust.

**Types of Errors**:
- **Form validation**: Inline errors near the problematic field
- **API/Network errors**: Failed requests, timeouts
- **Permission errors**: Unauthorized actions
- **Not found**: Missing resources (404)
- **System errors**: Unexpected failures (500)

**Design Principles**:

1. **Clear language**: "Email address is invalid" not "Validation error: field_email"

2. **Actionable guidance**: Tell users what to do next

3. **Appropriate tone**: Apologetic for system failures, instructive for user errors

4. **Visual hierarchy**: Errors should be noticeable but not alarming

**Form Validation Best Practices**:
- Validate on blur, not on every keystroke
- Show errors inline, near the field
- Use aria-describedby to connect error to input
- Don't clear valid fields when showing errors

**Implementation**:
```tsx
<div role="alert" className="text-red-600 text-sm">
  <span className="sr-only">Error: </span>
  Please enter a valid email address
</div>
```

**Error Boundaries**: Catch React rendering errors and show fallback UI instead of crashing.

Visit the following resources to learn more:

- [@article@Error Message Guidelines - Nielsen Norman](https://www.nngroup.com/articles/error-message-guidelines/)
- [@article@Form Validation UX - Smashing](https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/)
- [@video@Error Handling UX](https://www.youtube.com/watch?v=kY9GxPZBJDE)
