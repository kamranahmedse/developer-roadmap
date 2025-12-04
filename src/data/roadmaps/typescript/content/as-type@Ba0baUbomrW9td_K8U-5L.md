# As Type (Type Assertion)

Tell TypeScript "trust me, I know what type this is" using the `as` keyword.

## Why Use This?

Sometimes TypeScript can't figure out the exact type of a value. This happens when:

- You're working with values of type `any` or `unknown`
- You're selecting DOM elements
- You're receiving data from an external source (like an API)

The `as` keyword lets you tell TypeScript what type to treat a value as.

## How It Works

Think of `as` like putting a label on a box. The box contents don't change, but you're telling TypeScript what's inside. This is purely a compile-time hint—it doesn't convert or change the actual value at runtime.

## Examples

### Basic Example

```typescript
// TypeScript doesn't know what type this is
let userInput: unknown = "Hello, TypeScript!";

// Tell TypeScript: "This is a string, trust me"
let message = userInput as string;

// Now we can use string methods
console.log(message.length); // 18
console.log(message.toUpperCase()); // "HELLO, TYPESCRIPT!"
```

### Practical Example

```typescript
// Getting an element from the page
// TypeScript only knows it's "Element | null"
const button = document.querySelector("#submit-btn");

// We know it's a button, so we tell TypeScript
const submitButton = button as HTMLButtonElement;

// Now we can access button-specific properties
submitButton.disabled = true;
submitButton.textContent = "Submitting...";
```

### Working with API Data

```typescript
// Data coming from an API
const response = await fetch("/api/user");
const data = await response.json(); // type is 'any'

// We know the shape of our data
interface User {
  id: number;
  name: string;
  email: string;
}

// Assert the type so we get autocomplete and type checking
const user = data as User;
console.log(user.name); // TypeScript now knows this is a string
```

## Common Mistakes to Avoid

- **Don't lie to TypeScript**: Only use `as` when you're sure about the type. Wrong assertions can cause runtime errors.
- **Prefer type guards**: When possible, use `typeof` or `instanceof` checks instead—they're safer because they check at runtime.
- **Avoid `as any`**: Using `as any` defeats the purpose of TypeScript. Find the correct type instead.

## Learn More

- [@official@Type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
