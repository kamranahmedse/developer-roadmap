# Union Types

Allow a variable to hold one of several types using the `|` (pipe) symbol.

## Why Use This?

Real-world data isn't always one type. A user ID might be a number or a string. A function might return a value or `null`. Union types let you handle these cases safely.

## How It Works

Think of unions as "either/or" types. When you write `string | number`, you're saying "this can be a string OR a number."

## Examples

### Basic Example

```typescript
// This variable can hold either a string or a number
let userId: string | number;

userId = 101; // ✅ Valid (number)
userId = 'user_101'; // ✅ Valid (string)
userId = true; // ❌ Error: boolean is not allowed
```

### Practical Example: Handling Multiple Input Types

```typescript
// A function that formats any ID into a string
function formatId(id: string | number): string {
  // TypeScript requires you to handle both types
  if (typeof id === 'string') {
    return id.toUpperCase(); // String methods work here
  } else {
    return `ID-${id}`; // Number operations work here
  }
}

console.log(formatId('abc')); // "ABC"
console.log(formatId(123)); // "ID-123"
```

### Common Use Case: Nullable Types

```typescript
// A function that might not find a user
function findUser(id: number): User | null {
  const user = database.find(id);
  return user || null;
}

const user = findUser(1);

// You must check for null before using the user
if (user !== null) {
  console.log(user.name); // Safe to access
}
```

## Narrowing Union Types

TypeScript is smart! When you check the type, it "narrows" the union:

```typescript
function printValue(value: string | number | boolean) {
  if (typeof value === 'string') {
    // TypeScript knows value is a string here
    console.log(value.toUpperCase());
  } else if (typeof value === 'number') {
    // TypeScript knows value is a number here
    console.log(value.toFixed(2));
  } else {
    // TypeScript knows value is a boolean here
    console.log(value ? 'Yes' : 'No');
  }
}
```

## Common Mistakes to Avoid

- **Forgetting to narrow**: You can only use methods common to all types in the union until you narrow it
- **Too many types**: If your union has many types, consider if a different approach (like generics) might be clearer

Learn more from the following links:

- [@official@Union Types in TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
