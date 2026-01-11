# Design Tokens

Design tokens are the atomic values of a design system—colors, typography, spacing, shadows—stored in a platform-agnostic format. They're the bridge between design decisions and code implementation.

**Token Hierarchy**:
- **Primitive tokens**: Raw values (blue-500: #3b82f6)
- **Semantic tokens**: Meaning-based (color-primary: blue-500)
- **Component tokens**: Specific use (button-background: color-primary)

This hierarchy enables theming—swap semantic token references, and the entire system updates.

**Token Types**:
- **Color**: Brand, semantic (success/error), neutrals
- **Typography**: Font families, sizes, weights, line-heights
- **Spacing**: Consistent scale (4, 8, 12, 16, 24, 32...)
- **Shadows**: Elevation levels
- **Border radius**: Consistent rounding
- **Breakpoints**: Responsive thresholds

**Implementation**: Store tokens as CSS custom properties for runtime theming, or in JSON for build-time transformation with tools like Style Dictionary.

Visit the following resources to learn more:

- [@article@Design Tokens Explained - Contentful](https://www.contentful.com/blog/design-token-system/)
- [@article@Design Tokens Format - W3C](https://design-tokens.github.io/community-group/format/)
- [@article@Naming Tokens - Nathan Curtis](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676)
- [@video@Design Tokens Explained](https://www.youtube.com/watch?v=Ka1I5TphDb0)
