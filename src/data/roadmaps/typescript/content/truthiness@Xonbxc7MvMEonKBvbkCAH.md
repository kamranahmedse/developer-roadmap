# Truthiness Narrowing

**Use truthiness checks to narrow types by checking if a value is "truthy" or "falsy".**

## Why Use Truthiness Checks?

In JavaScript, values can be evaluated as true or false in conditionals. This lets you check for `null`, `undefined`, or empty values at the same time as checking the type.

## How It Works

Every JavaScript value is either "truthy" (treated as true) or "falsy" (treated as false):

**Falsy values**: `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`

**Truthy values**: Everything else (non-empty strings, non-zero numbers, objects, arrays, etc.)

When you use a variable in an `if` statement, TypeScript narrows the type based on truthiness.

## Basic Example

```typescript
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    // If we get here, numUsersOnline is truthy (a non-zero number)
    return `There are ${numUsersOnline} online now!`;
  }

  // If we get here, numUsersOnline is falsy (0)
  return "Nobody's here. :(";
}

console.log(getUsersOnlineMessage(5));   // "There are 5 online now!"
console.log(getUsersOnlineMessage(0));   // "Nobody's here. :("
```

## Practical Example: Checking for null/undefined

```typescript
function processUser(user: string | null) {
  if (user) {
    // user is definitely a string here (not null)
    console.log('Hello', user.toUpperCase());
  } else {
    // user is null here
    console.log('No user provided');
  }
}

processUser('john');  // "Hello JOHN"
processUser(null);    // "No user provided"
```

## Another Example: Checking for empty arrays/strings

```typescript
function describeArray(arr: string[] | null) {
  if (arr && arr.length > 0) {
    // arr is definitely not null and not empty
    console.log(`Array has ${arr.length} items`);
  } else {
    console.log('Array is null or empty');
  }
}

describeArray(['a', 'b']);  // "Array has 2 items"
describeArray([]);          // "Array is null or empty"
describeArray(null);        // "Array is null or empty"
```

## Common Patterns

- `if (value)` — Check if value is truthy
- `if (!value)` — Check if value is falsy
- `if (value && value.property)` — Check if value and its property exist
- `if (value ?? defaultValue)` — Use nullish coalescing (null/undefined only)

Learn more from the following links:

- [@official@Truthiness Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing)
