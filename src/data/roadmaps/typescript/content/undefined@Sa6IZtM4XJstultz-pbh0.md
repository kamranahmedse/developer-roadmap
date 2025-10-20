# undefined

JavaScript has two primitive values used to signal absent or uninitialized value:

- **`null`** (explicitly set by developers to mean "no value")
- **`undefined`** (used by JavaScript when something hasn't been initialized)

TypeScript has two corresponding _types_ by the same names. Understanding the difference is crucial for writing safe code.

## How strictNullChecks Works

### With strictNullChecks OFF (less safe)

Without `strictNullChecks`, values that might be `null` or `undefined` can still be accessed normally, and these values can be assigned to a property of any type. This is similar to how languages without `null` checks (e.g. C#, Java) behave.

```typescript
let name: string = null; // Allowed (but risky!)
let age: number = undefined; // Allowed (but risky!)
```

### With strictNullChecks ON (recommended, safer)

With `strictNullChecks` on, you must explicitly declare when `null` or `undefined` are allowed. You will need to test for those values before using methods or properties on that value.

```typescript
let name: string = null; // ❌ Error: null not assignable to string
let age: number | undefined = undefined; // ✓ Correct: explicitly allow undefined

let email: string | null = null; // ✓ Correct: explicitly allow null
```

The lack of checking for these values tends to be a major source of bugs; **TypeScript strongly recommends people turn `strictNullChecks` on if it's practical to do so in the codebase**.

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    console.log("Value is null");
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

## Practical Examples

**Example 1: User Profile with Optional Fields**

```typescript
interface User {
  name: string;
  phone?: string; // Could be undefined
  email: string | null; // Could be null
}

const user: User = {
  name: "Alice",
  // phone is undefined (not provided)
  email: null, // Explicitly no email
};

// Safe way: check before using
if (user.phone !== undefined) {
  console.log("Phone:", user.phone);
}

if (user.email !== null) {
  console.log("Email:", user.email.toLowerCase());
}
```

**Example 2: Handling API Responses**

```typescript
interface ApiResponse {
  data: string | null;
  error: string | undefined;
}

function handleResponse(response: ApiResponse): void {
  // Check for data
  if (response.data !== null) {
    console.log("Data:", response.data);
  }

  // Check for errors
  if (response.error !== undefined) {
    console.log("Error:", response.error);
  }
}
```

**Example 3: Optional Chaining (Modern Safe Access)**

```typescript
interface Person {
  name: string;
  address?: {
    street?: string;
    city?: string;
  };
}

const person: Person = { name: "Bob" };

// Safe navigation with ?. - doesn't crash even if address is undefined!
const city = person.address?.city;
console.log(city); // undefined (safe!)

// Provide a default with ??
const displayCity = person.address?.city ?? "Unknown";
```

**Example 4: Function Parameters**

```typescript
function processUserData(userData: string | null | undefined): void {
  // Check what we got
  if (userData === null) {
    console.log("No data (explicitly null)");
  } else if (userData === undefined) {
    console.log("No data (never provided)");
  } else {
    // Now safe to use userData as string
    console.log("Processing:", userData.length, "characters");
  }
}

processUserData("hello"); // Processing: 5 characters
processUserData(null); // No data (explicitly null)
processUserData(undefined); // No data (never provided)
processUserData(); // No data (never provided)
```

## Key Takeaways

- **Enable `strictNullChecks`**: Add `"strictNullChecks": true` to your `tsconfig.json`
- **Always check first**: If something could be `null` or `undefined`, test before using it
- **Use type unions**: `string | null` or `string | undefined` makes your intent clear
- **Use safe operators**: `?.` (optional chaining) and `??` (nullish coalescing) prevent crashes
- **Understand the difference**: `null` is intentional, `undefined` is uninitialized

Learn more from the following links:

- [@official@null and undefined](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)
