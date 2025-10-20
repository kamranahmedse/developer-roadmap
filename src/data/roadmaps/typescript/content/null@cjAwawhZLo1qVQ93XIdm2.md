# null

JavaScript has two primitive values used to signal absent or uninitialized value:

- **`null`** (explicitly set by developers to mean "no value" or "intentionally empty")
- **`undefined`** (used by JavaScript when something hasn't been initialized)

TypeScript has two corresponding _types_ by the same names. Understanding the difference is crucial for writing safe code.

## The Key Difference: null vs undefined

While they both represent "no value," they have different meanings:

| Aspect          | `null`                    | `undefined`               |
| --------------- | ------------------------- | ------------------------- |
| **Meaning**     | Intentional "no value"    | Not initialized / missing |
| **Who sets it** | Developer explicitly      | JavaScript automatically  |
| **Usage**       | "I chose not to set this" | "This was never set"      |
| **Example**     | `user.email = null`       | Missing function return   |

## How strictNullChecks Works

### With strictNullChecks OFF (less safe)

Without `strictNullChecks`, `null` and `undefined` can be assigned to any type:

```typescript
let email: string = null; // Allowed (but risky!)
let name: string = undefined; // Allowed (but risky!)
```

### With strictNullChecks ON (recommended, safer)

With `strictNullChecks` on, you must be explicit about allowing `null` or `undefined`:

```typescript
let email: string = null; // ❌ Error: null not assignable to string
let name: string | null = null; // ✓ Correct: explicitly allow null
let optional: string | undefined; // ✓ Correct: explicitly allow undefined
```

**Recommendation**: Enable `"strictNullChecks": true` in your `tsconfig.json`. This is a major TypeScript feature that catches bugs early!

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    console.log("Value is null (developer set it)");
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

## Practical Examples

**Example 1: Using null for Intentional Empty Values**

```typescript
interface User {
  name: string;
  email: string | null; // Explicitly allow null
  phone?: string; // Undefined if not provided
}

const user: User = {
  name: "Alice",
  email: null, // Developer chose: no email
  // phone is undefined (never provided)
};

// Check before using
if (user.email !== null) {
  console.log("Email:", user.email);
} else {
  console.log("No email on file");
}
```

**Example 2: Real-world User Deletion Scenario**

```typescript
// When a user deletes their profile photo, you might set it to null
interface UserProfile {
  username: string;
  profilePhoto: string | null; // null = user explicitly removed it
}

const profile: UserProfile = {
  username: "john_doe",
  profilePhoto: null, // User deleted their photo
};

// Safe usage
function displayPhoto(profile: UserProfile): void {
  if (profile.profilePhoto !== null) {
    console.log(`<img src="${profile.profilePhoto}" />`);
  } else {
    console.log('<img src="/default-avatar.png" />');
  }
}
```

**Example 3: API Data with Optional Null Fields**

```typescript
interface ApiUser {
  id: number;
  name: string;
  middleName: string | null; // Some users don't have a middle name
  suffix: string | null; // Some users don't have a suffix
}

function formatName(user: ApiUser): string {
  let fullName = user.name;

  if (user.middleName !== null) {
    fullName += ` ${user.middleName}`;
  }

  if (user.suffix !== null) {
    fullName += ` ${user.suffix}`;
  }

  return fullName;
}

const user: ApiUser = {
  id: 1,
  name: "John",
  middleName: "Michael",
  suffix: null,
};

console.log(formatName(user)); // John Michael
```

**Example 4: Clearing Data with null**

```typescript
interface SearchState {
  query: string | null;
  results: string[] | null;
}

let searchState: SearchState = {
  query: "typescript",
  results: ["type", "tips", "tutorial"],
};

// User clicks clear
searchState.query = null;
searchState.results = null;

// Safe display
function displayResults(state: SearchState): void {
  if (state.results === null) {
    console.log("No search results");
    return;
  }

  console.log(`Found ${state.results.length} results`);
}
```

**Example 5: Optional Chaining with Null Checks**

```typescript
interface Company {
  name: string;
  ceo: {
    name: string;
    email: string | null;
  } | null; // Company might not have a CEO yet
}

const company: Company = {
  name: "TechCorp",
  ceo: null, // Still looking for a CEO
};

// Safe nested access
const ceoEmail = company.ceo?.email ?? "No CEO email";
console.log(ceoEmail); // No CEO email
```

## Best Practices for Using null

1. **Be explicit**: Use `type | null` to show `null` is allowed
2. **Document your intent**: `null` means you intentionally chose to omit a value
3. **Always check**: Test for `null` before using the value
4. **Use optional chaining**: `?.` provides safe access to possibly-null values
5. **Provide defaults**: Use `??` to fall back when value is null

```typescript
// Good defensive programming
const email = user.email ?? "noemail@example.com";
const city = user.address?.city ?? "Unknown";
```

## Common Beginner Mistakes

**Mistake 1: Not checking for null**

```typescript
// ❌ Will crash if email is null
function sendEmail(user: User): void {
  console.log(user.email.toLowerCase());
}

// ✓ Safe - check first
function sendEmail(user: User): void {
  if (user.email !== null) {
    console.log(user.email.toLowerCase());
  }
}
```

**Mistake 2: Confusing null with undefined**

```typescript
// ❌ These are different!
const a: string | null = null; // intentional
const b: string | undefined = undefined; // uninitialized

// They need different checks
if (a !== null) {
} // checking null
if (b !== undefined) {
} // checking undefined
```

## Key Takeaway

**`null` means "I chose not to set this value."** It's different from `undefined`, which means "this was never set." Use `null` when you:

- Want to explicitly remove a value
- Need to represent "no value" intentionally
- Are clearing or resetting data
- Want type safety (with `strictNullChecks`)

Learn more from the following links:

- [@official@null and undefined](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined)
