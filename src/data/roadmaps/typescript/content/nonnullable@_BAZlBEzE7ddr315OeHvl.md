# NonNullable

Remove `null` and `undefined` from a type using `NonNullable<Type>`.

## Why Use This?

Often you have a type that might be `null` or `undefined`, but in certain situations you know it's guaranteed to have a value. `NonNullable` removes those empty possibilities and gives you a type that's guaranteed to have something.

## How It Works

`NonNullable` takes a type and removes `null` and `undefined` from it. It's like saying "I know this value exists, it won't be empty."

## Examples

### Basic Example: Remove null and undefined

```typescript
// You have a type that might be null or undefined
type MaybeString = string | null | undefined;

// Remove the null and undefined
type DefinitelyString = NonNullable<MaybeString>;
// Result: string

const value: DefinitelyString = 'Hello'; // ✓ OK
// const empty: DefinitelyString = null; // ✗ Error: can't be null
```

### Practical Example: API Response Data

```typescript
interface ApiResponse<T> {
  data: T | null;  // API might not have data
  error: string | null;
}

// When we know the API succeeded, we want the actual data
type SuccessfulData<T> = NonNullable<T>;

function handleResponse<T>(response: ApiResponse<T>) {
  if (response.data !== null) {
    // Now TypeScript knows data is not null
    const safeData: SuccessfulData<typeof response.data> = response.data;
  }
}
```

### Real-World Example: Filtering Optional Values

```typescript
interface User {
  id: number;
  name: string;
  phone?: string | null;  // Might be missing or null
  email: string;
}

// Type for users that definitely have a phone
type UserWithPhone = User & {
  phone: NonNullable<User['phone']>;
};

function sendSms(user: UserWithPhone) {
  // user.phone is guaranteed to be a string, not null or undefined
  console.log(`Sending SMS to ${user.phone}`);
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  phone: null
};

// This would error - phone is null
// sendSms(user);

const userWithPhone: UserWithPhone = {
  id: 2,
  name: 'Jane',
  email: 'jane@example.com',
  phone: '555-1234'
};

sendSms(userWithPhone); // ✓ OK
```

### Example: Union Types

```typescript
type MixedValues = string | number | null | undefined | boolean;

// Remove null and undefined, keep the rest
type OnlyRealValues = NonNullable<MixedValues>;
// Result: string | number | boolean

const value1: OnlyRealValues = 'hello'; // ✓ OK
const value2: OnlyRealValues = 42;      // ✓ OK
const value3: OnlyRealValues = true;    // ✓ OK
// const value4: OnlyRealValues = null; // ✗ Error
```

### Example: Generic Types

```typescript
function getValue<T>(value: T | null | undefined): NonNullable<T> {
  if (value !== null && value !== undefined) {
    return value; // TypeScript knows it's safe
  }
  throw new Error('Value is null or undefined');
}

const result = getValue('hello');
// result is typed as string (not string | null | undefined)
```

## Common Mistakes to Avoid

- **Using NonNullable when you need to check first**: NonNullable is for type definitions, not runtime safety

```typescript
function processValue(value: string | null) {
  // ✗ Don't assume it's safe just because you defined NonNullable
  // const safe: NonNullable<typeof value> = value; // Still might be null!
  
  // ✓ Check first, then use it
  if (value !== null) {
    const safe: NonNullable<typeof value> = value; // Now it's truly safe
  }
}
```

- **Not understanding what NonNullable removes**: It only removes `null` and `undefined`, not other falsy values

```typescript
type FalsyValue = 0 | false | '' | null | undefined;

// NonNullable only removes null and undefined
type Almost = NonNullable<FalsyValue>;
// Result: 0 | false | '' (still has other falsy values!)
```

## NonNullable vs Optional Chaining

Don't confuse `NonNullable` with optional chaining (`?.`):

```typescript
type Value = string | null;

// NonNullable: a type that can't be null
type Guaranteed = NonNullable<Value>; // string

// Optional chaining: safely access a property that might be null
const obj: { prop: Value } | null = null;
const safe = obj?.prop; // safely accesses or returns undefined
```

## Learn More

- [@official@NonNullable<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)
