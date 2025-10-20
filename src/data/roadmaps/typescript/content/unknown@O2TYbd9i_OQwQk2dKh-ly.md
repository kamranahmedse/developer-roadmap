# Unknown

## What is the Unknown Type?

The `unknown` type is the **type-safe version of `any`**. It means "I don't know what type this is, but it could be anything."

The key difference from `any`:

- **`any`**: "This could be anything, and I don't care—do whatever you want!"
- **`unknown`**: "This could be anything, but be careful—check what it is before you use it!"

`unknown` is safer because TypeScript forces you to narrow the type before using it. This prevents bugs that might slip through with `any`.

## Basic Usage

```typescript
// anything can be assigned to unknown
const value: unknown = "hello"; // string
const value2: unknown = 42; // number
const value3: unknown = true; // boolean

// But you can't use it without checking the type first
// ❌ This causes an error
// console.log(value.toUpperCase());

// ✓ You must check the type first
if (typeof value === "string") {
  console.log(value.toUpperCase()); // Now it's safe!
}
```

## Comparing unknown vs any

```typescript
// With 'any' - dangerous, no checking needed
function processAny(value: any) {
  value.foo(); // ✓ No error, but might crash at runtime!
  value.bar.baz(); // ✓ No error, but might crash at runtime!
}

// With 'unknown' - safe, must check
function processUnknown(value: unknown) {
  // ❌ Error: must check type first
  // value.foo();

  // ✓ Check type, then use
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}
```

## Type Narrowing with Unknown

You must narrow `unknown` to a specific type before using it:

```typescript
function processValue(value: unknown): void {
  // Check if it's a string
  if (typeof value === "string") {
    console.log(`String: ${value.toUpperCase()}`);
  }
  // Check if it's a number
  else if (typeof value === "number") {
    console.log(`Number: ${value.toFixed(2)}`);
  }
  // Check if it's an object
  else if (typeof value === "object" && value !== null) {
    console.log(
      `Object with keys: ${Object.keys(value as Record<string, any>).join(
        ", "
      )}`
    );
  }
  // For anything else
  else {
    console.log(`Unknown type: ${typeof value}`);
  }
}

processValue("hello"); // String: HELLO
processValue(42); // Number: 42.00
processValue({ name: "John" }); // Object with keys: name
```

## Real-World Examples

**Example 1: Parsing JSON (Common Use)**

```typescript
// JSON could be anything
function parseJson(json: string): unknown {
  return JSON.parse(json);
}

// Now you must check what you got
const data = parseJson('{"name": "Alice"}');

// ❌ Direct access fails
// console.log(data.name);

// ✓ Check type first
if (typeof data === "object" && data !== null && "name" in data) {
  const typedData = data as { name: string };
  console.log(typedData.name); // Alice
}
```

**Example 2: Handling External Data**

```typescript
// Data from external API - we don't know what we'll get
function processApiData(response: unknown): void {
  if (typeof response !== "object" || response === null) {
    console.log("Invalid response");
    return;
  }

  const obj = response as Record<string, any>;

  if ("error" in obj) {
    console.log(`Error: ${obj.error}`);
  } else if ("data" in obj) {
    console.log(`Data: ${JSON.stringify(obj.data)}`);
  } else {
    console.log("Unknown response format");
  }
}

processApiData({ data: "success" }); // Data: "success"
processApiData({ error: "not found" }); // Error: not found
processApiData("invalid"); // Invalid response
```

**Example 3: User Input Validation**

```typescript
function processUserInput(input: unknown): string {
  // Must validate before use
  if (typeof input === "string" && input.length > 0) {
    return input.trim().toUpperCase();
  }

  if (typeof input === "number" && !isNaN(input)) {
    return `Number: ${input}`;
  }

  return "Invalid input";
}

console.log(processUserInput("hello world")); // HELLO WORLD
console.log(processUserInput(42)); // Number: 42
console.log(processUserInput(null)); // Invalid input
```

**Example 4: Type Guards Function**

```typescript
// Helper function to check types safely
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isObject(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Now use the helpers
function process(value: unknown): void {
  if (isString(value)) {
    console.log(`String: ${value.length} characters`);
  } else if (isNumber(value)) {
    console.log(`Number: ${value * 2}`);
  } else if (isObject(value)) {
    console.log(`Object: ${Object.keys(value).join(", ")}`);
  }
}

process("test"); // String: 4 characters
process(10); // Number: 20
process({ a: 1, b: 2 }); // Object: a, b
```

## Unknown in Collections

```typescript
// Array of unknown values
const mixed: unknown[] = [1, "string", true, { prop: "value" }];

for (const item of mixed) {
  // Must check each item
  if (typeof item === "string") {
    console.log(`String: ${item}`);
  } else if (typeof item === "number") {
    console.log(`Number: ${item}`);
  } else if (typeof item === "boolean") {
    console.log(`Boolean: ${item}`);
  } else {
    console.log(`Object: ${JSON.stringify(item)}`);
  }
}
```

## Unknown vs Any - Summary

| Feature             | unknown                | any                        |
| ------------------- | ---------------------- | -------------------------- |
| **Safety**          | Safe (forces checking) | Unsafe (bypasses checking) |
| **Type checking**   | Enforced               | Disabled                   |
| **Assignable from** | Anything               | Anything                   |
| **Assignable to**   | Only itself and any    | Anything                   |
| **Operations**      | Must narrow first      | Can use anything           |
| **When to use**     | Usually better         | Avoid if possible          |

```typescript
// ❌ Avoid this
function handleData(data: any) {
  return data.name.toUpperCase(); // Could crash!
}

// ✓ Prefer this
function handleData(data: unknown) {
  if (typeof data === "object" && data !== null && "name" in data) {
    const name = (data as any).name;
    if (typeof name === "string") {
      return name.toUpperCase();
    }
  }
  return "Invalid";
}
```

## When to Use Unknown

✓ **Use `unknown` for**:

- Parsing JSON or external data
- Handling user input
- Working with APIs
- Functions that receive dynamic data
- Safer alternative to `any`

✗ **Avoid using for**:

- When you know the exact type (use specific type instead)
- Simple functions that don't need flexibility
- When overhead of type checking isn't worth it

## Best Practices

1. **Prefer specific types**: Use `unknown` only when necessary
2. **Always narrow**: Before using `unknown`, check what it is
3. **Use type guards**: Create helper functions for complex checks
4. **Avoid casting to any**: If you must narrow, use specific types
5. **Document intent**: Comment why you're using `unknown`

```typescript
// Good: Clear intent and safe
function safeParse(input: unknown): { success: boolean; data: any } {
  if (typeof input === "string") {
    try {
      return { success: true, data: JSON.parse(input) };
    } catch {
      return { success: false, data: null };
    }
  }
  return { success: false, data: null };
}
```

## Key Takeaway

**`unknown` is `any`'s safer cousin.** Use it when you don't know the type and need to be defensive about type checking. Always narrow `unknown` to a specific type before using it. This prevents runtime errors that could sneak past with `any`.

Learn more from the following links:

- [@official@Unknown Type in TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)
