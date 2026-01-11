# Style Dictionary

Style Dictionary is a build system that transforms design tokens from a source format (JSON/YAML) into platform-specific outputs (CSS, SCSS, iOS, Android, JavaScript). It's the industry standard for design token management.

**Core Concept**: Define tokens once in JSON, generate outputs for every platform your design system supports.

**Token Definition**:
```json
{
  "color": {
    "primary": {
      "value": "#3b82f6",
      "type": "color"
    }
  },
  "spacing": {
    "sm": { "value": "8px" },
    "md": { "value": "16px" }
  }
}
```

**Output Examples**:
- CSS: `--color-primary: #3b82f6;`
- SCSS: `$color-primary: #3b82f6;`
- JS: `export const colorPrimary = '#3b82f6';`

**Configuration**: `config.json` defines source files, platforms, and transforms:
```json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [{ "destination": "variables.css", "format": "css/variables" }]
    }
  }
}
```

**Transforms**: Modify token values during build (color format conversion, px to rem, etc.).

Visit the following resources to learn more:

- [@official@Style Dictionary Documentation](https://styledictionary.com/)
- [@article@Design Tokens Explained - Contentful](https://www.contentful.com/blog/design-token-system/)
- [@video@Style Dictionary Tutorial](https://www.youtube.com/watch?v=1HREvonfqhY)
