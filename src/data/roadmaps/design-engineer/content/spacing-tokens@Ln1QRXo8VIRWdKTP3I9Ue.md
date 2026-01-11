# Spacing Token Systems

Consistent spacing is fundamental to visual harmony. Spacing tokens constrain choices to a defined scale, making design decisions easier and ensuring consistent rhythm across interfaces.

**The 8pt Grid**: Industry-standard approach using multiples of 8: 8, 16, 24, 32, 40, 48, 64, 80, 96. Some systems include 4px for fine adjustments. This creates consistent proportions.

**Token Scale Example**:
- `space-1`: 4px (0.25rem)
- `space-2`: 8px (0.5rem)
- `space-3`: 12px (0.75rem)
- `space-4`: 16px (1rem)
- `space-6`: 24px (1.5rem)
- `space-8`: 32px (2rem)
- `space-12`: 48px (3rem)
- `space-16`: 64px (4rem)

**Usage Guidelines**:
- **Component internal spacing**: Smaller values (space-2 to space-4)
- **Between related elements**: Medium values (space-4 to space-6)
- **Section separation**: Larger values (space-8 to space-16)

**Tailwind Mapping**: Tailwind's spacing scale (p-1, p-2, m-4, gap-6) follows a similar pattern. Your tokens should align with your CSS framework.

Visit the following resources to learn more:

- [@article@Space in Design Systems - Nathan Curtis](https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62)
- [@article@8pt Grid System - Spec.fm](https://spec.fm/specifics/8-pt-grid)
- [@opensource@Utopia - Fluid Space Scale](https://utopia.fyi/space/)
- [@video@Design Systems Spacing](https://www.youtube.com/watch?v=UwLgpFrN_Lw)
