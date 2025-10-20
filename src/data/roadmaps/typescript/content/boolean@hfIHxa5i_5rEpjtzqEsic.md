# boolean

## What is a Boolean Type?

A `boolean` is a primitive data type in TypeScript that represents one of two possible values: **true** or **false**. It's the simplest type for storing yes/no, on/off, or enable/disable decisions in your code.

Think of a boolean like a light switch—it's either ON (true) or OFF (false), with nothing in between.

## Why Booleans Matter

Booleans are fundamental to programming because they allow you to:

- Make decisions in your code (if this is true, do that)
- Control program flow (loops, conditions)
- Store simple yes/no states (is user logged in? Is email verified?)

## Basic Usage

```typescript
let isTrue: boolean = true;
let isFalse: boolean = false;

// Real-world example: checking if a user is logged in
let isUserLoggedIn: boolean = false;
let isEmailVerified: boolean = true;
```

## Practical Examples

**Example 1: User Authentication Status**

```typescript
const isAdmin: boolean = true;
const hasPermission: boolean = false;

if (isAdmin) {
  console.log("Welcome, Admin!");
}
```

**Example 2: Feature Flags (enabling/disabling features)**

```typescript
const isNewFeatureEnabled: boolean = true;
const isDarkModeOn: boolean = false;

if (isNewFeatureEnabled) {
  // Show new feature to users
}
```

**Example 3: Validation Results**

```typescript
function isValidEmail(email: string): boolean {
  return email.includes("@");
}

const emailCheck: boolean = isValidEmail("user@example.com"); // true
```

## Common Misconception

Beginners often think booleans can have other values like "maybe" or "partial". Remember: **a boolean is strictly true OR false, nothing else**. If you need more than two states, consider using other types like strings or enums.

Learn more from the following links:

- [@official@Number, String, Boolean, Symbol and Object](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean)
