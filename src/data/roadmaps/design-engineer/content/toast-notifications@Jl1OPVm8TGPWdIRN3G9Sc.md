# Toast Notifications

Toasts are brief, non-blocking messages that provide feedback about actions. They appear temporarily and disappear automatically, making them ideal for confirmations and status updates.

**When to Use Toasts**:
- Confirm successful actions ("Message sent")
- Report errors that don't block the flow
- System status updates
- NOT for critical information requiring action

**Design Considerations**:
- **Position**: Usually bottom-right or top-right
- **Duration**: 3-5 seconds for simple messages
- **Stacking**: How multiple toasts arrange
- **Dismissal**: Auto-dismiss + manual close option
- **Variants**: Success, error, warning, info

**Accessibility**:
- Use `role="status"` for non-critical updates
- Use `role="alert"` for errors
- Don't auto-dismiss error messages
- Ensure sufficient contrast and size

**Animation Pattern**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 50, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ type: "spring", stiffness: 500, damping: 30 }}
>
```

**Libraries**: Sonner (by Emil Kowalski), react-hot-toast, and shadcn/ui toast component provide polished implementations.

Visit the following resources to learn more:

- [@official@Sonner - Toast Library](https://sonner.emilkowal.ski/)
- [@article@Toast Component - shadcn/ui](https://ui.shadcn.com/docs/components/toast)
- [@article@Toast Guidelines - Material Design](https://m3.material.io/components/snackbar/overview)
- [@video@Toast Notifications](https://www.youtube.com/watch?v=eDLBGDPDkbU)
