# void

## What is the Void Type?

The `void` type represents the absence of a return value. It's used as the return type annotation for functions that don't return anything—they just perform an action or side effect.

Think of `void` like a function that only "does something" but doesn't "give you something back." For example, printing to the console or saving data to a file.

## Understanding Void vs Undefined

This can be confusing for beginners, so let's clarify:

- **`void` (the type)**: Means "this function doesn't return a value"
- **`undefined` (the value)**: Is what JavaScript actually returns when a function doesn't explicitly return something

In TypeScript, when a function has a return type of `void`, it tells TypeScript: "expect nothing back from this function." The actual value returned by JavaScript is `undefined`, but TypeScript won't let you _use_ that undefined value.

## Basic Examples

```typescript
// Function without explicit return - return type is inferred as void
function greetUser() {
  console.log("Hello!");
}

// Function with explicit void return type
function sayGoodbye(): void {
  console.log("Goodbye!");
}

// Both functions work the same way - they do something but return nothing useful
greetUser(); // prints: Hello!
sayGoodbye(); // prints: Goodbye!
```

## Practical Examples

**Example 1: User Interface Updates**

```typescript
function updateUserProfile(name: string, email: string): void {
  // Update the DOM or send data to server
  console.log(`Updated profile: ${name} (${email})`);
  // This function doesn't return a value, it just performs an action
}

updateUserProfile("Alice", "alice@example.com");
```

**Example 2: Event Handlers**

```typescript
function handleButtonClick(event: any): void {
  console.log("Button was clicked!");
  // Show a modal, update the page, etc.
  // No need to return anything
}

// In real applications:
// const button = document.querySelector('button');
// button?.addEventListener('click', handleButtonClick);
```

**Example 3: Data Processing Functions**

```typescript
function logMessage(level: string, message: string): void {
  const timestamp: string = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`);
  // Function just logs data, doesn't return anything
}

logMessage("INFO", "User logged in");
logMessage("ERROR", "Database connection failed");
```

**Example 4: Array Operations**

```typescript
const numbers: number[] = [1, 2, 3];

// The forEach callback returns void (no return needed)
numbers.forEach((num: number): void => {
  console.log(num * 2);
});
```

## When to Use Void

Use `void` when your function:

- **Performs an action** (logging, saving, updating UI)
- **Has side effects** (modifies external state)
- **Doesn't need to return data** to the caller
- **Sends data elsewhere** (API call, database, console)

## When NOT to Use Void

Don't use `void` when your function:

- **Calculates a value** and needs to return it
- **Transforms data** and passes it to the next step
- **Makes a decision** that affects program flow

```typescript
// BAD: Using void for a function that should return a value
function calculateTotal(price: number): void {
  return price * 1.08; // ❌ Error: can't return in void function
}

// GOOD: Use the correct return type
function calculateTotal(price: number): number {
  return price * 1.08; // ✓ Correct
}
```

## Common Beginner Mistakes

**Mistake 1: Trying to capture return value from void function**

```typescript
function printName(name: string): void {
  console.log(name);
}

// This won't work as expected
const result = printName("John"); // result is undefined
console.log(result); // undefined
```

**Mistake 2: Using return in void function with a value**

```typescript
// ❌ Wrong
function validate(email: string): void {
  return email.includes("@"); // Error!
}

// ✓ Correct
function validate(email: string): boolean {
  return email.includes("@");
}
```

## Key Takeaway

`void` is TypeScript's way of saying "this function does something but doesn't give you back a value to use." It's commonly used for:

- Event handlers
- Logger functions
- Functions that modify state
- Setup or cleanup functions

Learn more from the following links:

- [@official@void - TypeScript Docs](https://www.typescriptlang.org/docs/handbook/2/functions.html#void)
