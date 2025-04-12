# Avatar

Avatars are used to show a thumbnail of a user photo or a visual representation of any other type of content.

- **Image:** Avatars should mask an image into their shape and work with any image size since they may get this image from unknown data sources.
- **Image Fallback:** There should be fallbacks when there’s no image available. This can be done with placeholder images or initials.
- **Accessibility:** Always provide a description for screen readers describing what’s displayed on the avatar image instead of just naming its role.
- **Sizes:** There are many contexts to use avatars and they all require different sizes for the component. For average projects use at least 2-3 different sizes and make sure there’s at least a small size available.
- **Icon:** Avatars can be used with an icon instead of an image to emphasize areas that don’t necessarily have (or need) an image associated with it.
- **Background Colors:** When used with icons or text, there has to be a background colour from the design system colour tokens applied to the avatar shape. Make sure that icons and text have enough contrast ratio with the background according to the WCAG AA standard.
