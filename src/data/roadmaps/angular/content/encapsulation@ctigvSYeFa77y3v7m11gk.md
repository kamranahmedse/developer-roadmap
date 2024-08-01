# Encapsulation

An encapsulation policy for the component's styling. Possible values:

- `ViewEncapsulation.Emulated`: Apply modified component styles in order to emulate a native Shadow DOM CSS
  encapsulation behavior.
- `ViewEncapsulation.None`: Apply component styles globally without any sort of encapsulation.
- `ViewEncapsulation.ShadowDom`: Use the browser's native Shadow DOM API to encapsulate styles.

If not supplied, the value is taken from the CompilerOptions which defaults to `ViewEncapsulation.Emulated`.

If the policy is `ViewEncapsulation.Emulated` and the component has no styles nor {@link Component#styleUrls styleUrls},
the policy is automatically switched to `ViewEncapsulation.None`.

Visit the following resources to learn more:

- [@official@Style scoping](https://angular.dev/guide/components/styling#style-scoping)
- [@official@Component - API](https://angular.dev/api/core/Component#encapsulation)

