# satisfies Keyword

Validate that a value matches a type while keeping its specific inferred type—get the best of both worlds.

## Why Use This?

Sometimes you want TypeScript to:
1. **Check** that your value matches a certain shape (catch typos and mistakes)
2. **Keep** the specific type information (not widen it)

The `satisfies` operator does exactly this. It's like a type-check that doesn't change how TypeScript sees your value.

## The Problem It Solves

### Using a Type Annotation (loses specificity)

```typescript
type Colors = Record<string, string | number[]>;

// With type annotation
const palette: Colors = {
  red: "#ff0000",
  green: "#00ff00",
  blue: [0, 0, 255],
};

// ❌ Problem: TypeScript forgot the specific values
palette.red.toUpperCase();  // Error! TypeScript thinks it might be number[]
```

### Using `satisfies` (keeps specificity)

```typescript
type Colors = Record<string, string | number[]>;

// With satisfies
const palette = {
  red: "#ff0000",
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Colors;

// ✅ TypeScript knows red is specifically a string
palette.red.toUpperCase();  // Works!

// ✅ TypeScript knows blue is specifically number[]
palette.blue.map(n => n * 2);  // Works!
```

## Examples

### Configuration Objects

```typescript
type Route = {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
};

// satisfies ensures we have valid routes while keeping literal types
const routes = {
  home: { path: "/", method: "GET" },
  createUser: { path: "/users", method: "POST" },
  // typo: { path: "/oops", method: "PATCH" },  // ❌ Would error - "PATCH" not allowed
} satisfies Record<string, Route>;

// TypeScript knows exactly which routes exist
routes.home.path;      // ✅ Autocomplete works
routes.unknown.path;   // ❌ Error: 'unknown' doesn't exist
```

### Ensuring All Cases Are Covered

```typescript
type Status = "pending" | "approved" | "rejected";

// Ensure we have a message for every status
const statusMessages = {
  pending: "Waiting for review",
  approved: "Your request was approved!",
  rejected: "Sorry, your request was denied",
  // If you forget one, TypeScript will error
} satisfies Record<Status, string>;
```

### Form Validation Rules

```typescript
type ValidationRule = {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
};

const formRules = {
  username: { required: true, minLength: 3 },
  email: { required: true, pattern: /^[^@]+@[^@]+$/ },
  bio: { minLength: 10 },
} satisfies Record<string, ValidationRule>;

// TypeScript knows exactly which fields have rules
formRules.username.minLength;  // ✅ number
formRules.email.pattern;       // ✅ RegExp
formRules.bio.required;        // ✅ undefined (not set)
```

## `satisfies` vs Type Annotation

| Feature | `: Type` | `satisfies Type` |
|---------|----------|------------------|
| Validates shape | ✅ | ✅ |
| Keeps literal types | ❌ | ✅ |
| Keeps specific property types | ❌ | ✅ |
| Autocomplete for known keys | ❌ | ✅ |

## When to Use

- ✅ Configuration objects where you want both validation and specific types
- ✅ Lookup tables where keys matter
- ✅ When you need to ensure exhaustive coverage
- ❌ When you intentionally want to widen the type

## Learn More

- [@official@satisfies Keyword](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)
