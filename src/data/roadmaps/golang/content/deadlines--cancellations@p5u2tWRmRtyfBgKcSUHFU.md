# Deadlines & Cancellations

Context package mechanisms for controlling operation lifetime and propagating cancellation signals. Supports deadlines (absolute time) or timeouts (duration). Functions should check `ctx.Done()` and return early when cancelled. Essential for robust concurrent applications.