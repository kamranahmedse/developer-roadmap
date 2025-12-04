# As Const

Make TypeScript treat your values as literal, read-only constants using `as const`.

## Why Use This?

By default, TypeScript widens the types of values. For example, it sees `"hello"` as `string`, not literally `"hello"`. Using `as const` tells TypeScript: "This exact value will never change."

This is useful when you:

- Want TypeScript to know the exact values in an array or object
- Need to create a type from a list of specific values
- Want to prevent accidental modifications

## How It Works

### Without `as const`

```typescript
const colors = ["red", "green", "blue"];
// Type: string[] — TypeScript just sees "an array of strings"

const config = { theme: "dark", version: 1 };
// Type: { theme: string, version: number }
```

### With `as const`

```typescript
const colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"] — exact values, can't be changed

const config = { theme: "dark", version: 1 } as const;
// Type: { readonly theme: "dark", readonly version: 1 }
```

## Practical Examples

### Creating a Type from Values

```typescript
// Define your options once
const STATUS = ["pending", "approved", "rejected"] as const;

// Create a type from those values
type Status = (typeof STATUS)[number];
// Type: "pending" | "approved" | "rejected"

// Now use it with full type safety
function updateStatus(status: Status) {
  // Only "pending", "approved", or "rejected" allowed
}

updateStatus("approved"); // ✅ Works
updateStatus("unknown");  // ❌ Error: not a valid status
```

### Configuration Objects

```typescript
const API_ENDPOINTS = {
  users: "/api/users",
  posts: "/api/posts",
  comments: "/api/comments",
} as const;

// TypeScript knows the exact string values
type Endpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
// Type: "/api/users" | "/api/posts" | "/api/comments"
```

### Preventing Accidental Changes

```typescript
const SETTINGS = {
  maxRetries: 3,
  timeout: 5000,
} as const;

// This will cause a compile error
SETTINGS.maxRetries = 5; // ❌ Error: Cannot assign to 'maxRetries' because it is a read-only property
```

## Key Differences Summary

| Without `as const` | With `as const` |
|--------------------|------------------|
| `string` | `"exact-value"` |
| `number` | `42` (literal) |
| `string[]` | `readonly ["a", "b"]` |
| Properties are mutable | Properties are `readonly` |

## Learn More

- [@official@const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
