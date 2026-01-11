# Empty State Design

Empty states occur when there's no data to display—new users, empty searches, cleared lists. They're opportunities to guide users and reduce confusion.

**Types of Empty States**:
- **First-use**: User hasn't added any data yet
- **No results**: Search or filter returned nothing
- **Cleared**: User removed all items
- **Error**: Data couldn't be loaded

**Design Principles**:

1. **Explain what happened**: "No projects yet" is better than a blank screen

2. **Guide next action**: Provide a clear CTA ("Create your first project")

3. **Use helpful illustrations**: Visual context makes empty states feel intentional

4. **Match the tone**: Empty states can add personality while being helpful

**Implementation Considerations**:
- Same layout structure as populated state (prevents layout shift)
- Accessible text for screen readers
- Loading states before showing empty (don't flash empty then content)

**Common Mistakes**:
- Just showing nothing
- Technical error messages ("null", "undefined")
- No guidance on what to do next
- Different visual treatment that feels broken

Visit the following resources to learn more:

- [@article@Empty States Design Guide - UX Collective](https://uxdesign.cc/empty-states-design-what-they-are-why-they-matter-79c989d3e57d)
- [@article@The Art of Empty States - Toptal](https://www.toptal.com/designers/ux/empty-state-ux-design)
- [@video@Empty State Design](https://www.youtube.com/watch?v=QI_CXQR5r4Q)
