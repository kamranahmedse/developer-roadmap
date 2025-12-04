# Non Null Assertion

Tell TypeScript "I promise this value isn't null or undefined" using the `!` operator.

## Why Use This?

Sometimes you know a value exists, but TypeScript isn't sure. The non-null assertion operator (`!`) tells TypeScript: "Trust me, this won't be `null` or `undefined`."

Common scenarios:

- Accessing DOM elements you know exist
- Working with values after you've already checked them elsewhere
- Using APIs where you're certain about the return value

## How It Works

Add `!` after any expression to remove `null` and `undefined` from its type.

```typescript
// Without assertion: TypeScript sees 'string | null'
let name: string | null = getName();

// With assertion: TypeScript treats it as 'string'
let nameLength = name!.length;
```

## Examples

### DOM Elements

```typescript
// TypeScript doesn't know if this element exists
const button = document.getElementById("submit-btn");
// Type: HTMLElement | null

// You KNOW this button exists in your HTML
const buttonWidth = button!.offsetWidth;
// TypeScript now treats button as HTMLElement
```

### After External Validation

```typescript
interface User {
  name: string;
  email?: string;  // email might be undefined
}

function sendEmail(user: User) {
  // We only call this function after checking email exists
  // So we can safely assert it's not undefined
  console.log(`Sending to: ${user.email!.toLowerCase()}`);
}

// Called like this:
if (user.email) {
  sendEmail(user);  // We've already verified email exists
}
```

### Map with Known Keys

```typescript
const userScores = new Map<string, number>();
userScores.set("alice", 100);
userScores.set("bob", 85);

// We just set "alice", so we know it exists
const aliceScore = userScores.get("alice")!;
console.log(aliceScore * 2);  // 200
```

## ⚠️ Warning: Use with Caution

The `!` operator is essentially telling TypeScript to skip a safety check. If you're wrong, you'll get a **runtime error**.

```typescript
let name: string | null = null;

// TypeScript allows this...
let length = name!.length;
// ...but it crashes at runtime: "Cannot read property 'length' of null"
```

## Safer Alternatives

| Instead of `!` | Use | When |
|----------------|-----|------|
| Optional chaining | `value?.property` | When you want `undefined` if null |
| Nullish coalescing | `value ?? default` | When you have a fallback value |
| Type guard | `if (value) { ... }` | When you can check first |

```typescript
// ✅ Safer: Optional chaining
const length = name?.length;  // Returns undefined if name is null

// ✅ Safer: Nullish coalescing
const length = name?.length ?? 0;  // Returns 0 if name is null

// ✅ Safest: Check first
if (name !== null) {
  const length = name.length;  // TypeScript knows it's safe
}
```

## Learn More

- [@official@Non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)
