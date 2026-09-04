# RAM Bundles + Inline Requires

Inline requires defer loading a module until it is first used instead of at startup, which trims the time to interactive for apps with many screens or rarely used features. Random Access Module (RAM) bundles are an older format that served the same purpose by loading modules on demand, but they are not supported with Hermes, whose bytecode gives the same or better startup performance. On current React Native versions, prefer Hermes, lazy-loading screen-level components, and inline requires, which the React Native CLI applies automatically.

Visit the following resources to learn more:

- [@official@Optimizing JavaScript loading](https://reactnative.dev/docs/optimizing-javascript-loading)
