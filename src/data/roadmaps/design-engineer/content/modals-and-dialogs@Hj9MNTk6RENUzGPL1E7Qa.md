# Modals and Dialogs

Modals are overlay interfaces that require user attention. They're complex to implement correctly—focus management, keyboard handling, and accessibility all need careful attention.

**When to Use Modals**:
- Confirm destructive actions
- Collect focused input (login, settings)
- Display important information requiring acknowledgment
- NOT for large amounts of content or complex flows

**Accessibility Requirements**:
- **Focus trap**: Tab cycles within modal only
- **Focus restoration**: Return focus to trigger on close
- **Escape to close**: Standard keyboard expectation
- **Backdrop click**: Optional close on overlay click
- **ARIA**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

**Animation Patterns**:
```tsx
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        {/* Modal content */}
      </motion.div>
    </>
  )}
</AnimatePresence>
```

**Use Radix Dialog**: Don't build from scratch—Radix handles all accessibility concerns.

Visit the following resources to learn more:

- [@official@Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
- [@article@Modal Dialog - ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [@video@Accessible Modals](https://www.youtube.com/watch?v=JS68faEUduk)
