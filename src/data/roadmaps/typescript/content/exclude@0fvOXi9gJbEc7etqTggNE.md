# Exclude

Remove specific types from a union using `Exclude<UnionType, ExcludedMembers>`.

## Why Use This?

When you have a union type with multiple options, you sometimes want to remove some of them. For example, if you have a union of all HTTP methods but only want to allow `GET` and `POST`, you can exclude the others. `Exclude` lets you create a new type by removing specific members from a union.

## How It Works

`Exclude` removes specified types from a union. Think of it like filtering a list—you keep everything except the items you remove.

## Examples

### Basic Example: Remove Specific Strings

```typescript
// Define a union of colors
type Color = 'red' | 'blue' | 'green' | 'yellow';

// Create a type without red
type PrimaryColors = Exclude<Color, 'yellow'>; // 'red' | 'blue' | 'green'

const primary: PrimaryColors = 'red';   // ✓ OK
const primary2: PrimaryColors = 'blue'; // ✓ OK
// const primary3: PrimaryColors = 'yellow'; // ✗ Error: not in union
```

### Practical Example: Exclude Function Types

```typescript
// A union of different types that can be stored
type StorableData = string | number | boolean | object | (() => void);

// We want to exclude functions (they can't be stored in localStorage)
type SerializableData = Exclude<StorableData, Function>;
// Result: string | number | boolean | object

function saveData(key: string, value: SerializableData) {
  localStorage.setItem(key, JSON.stringify(value));
}

saveData('theme', 'dark');     // ✓ OK
saveData('count', 42);         // ✓ OK
saveData('active', true);      // ✓ OK
// saveData('callback', () => {}); // ✗ Error: functions can't be stored
```

### Real-World Example: HTTP Methods

```typescript
// All possible HTTP methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';

// Safe methods that don't change data (read-only)
type SafeMethod = Exclude<HttpMethod, 'POST' | 'PUT' | 'DELETE' | 'PATCH'>;
// Result: 'GET' | 'HEAD'

// Methods that can modify data (write)
type ModifyingMethod = Exclude<HttpMethod, 'GET' | 'HEAD'>;
// Result: 'POST' | 'PUT' | 'DELETE' | 'PATCH'

function makeRequest(method: SafeMethod, url: string) {
  // Safe to cache and retry
  return fetch(url, { method });
}

makeRequest('GET', 'https://api.example.com'); // ✓ OK
// makeRequest('POST', 'https://api.example.com'); // ✗ Error: POST is not safe
```

### Example: Exclude Multiple Types

```typescript
type Response = 
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: string }
  | { status: 'idle' };

// Type for when the response is complete (either success or error)
type CompletedResponse = Exclude<Response, { status: 'loading' | 'idle' }>;
// Result: 
// | { status: 'success'; data: string }
// | { status: 'error'; error: string }

function handleResult(response: CompletedResponse) {
  if (response.status === 'success') {
    console.log(response.data);
  } else if (response.status === 'error') {
    console.error(response.error);
  }
}
```

### Example: Exclude with Union Literals

```typescript
type Status = 'draft' | 'published' | 'archived' | 'deleted';

// Types that users can see
type VisibleStatus = Exclude<Status, 'archived' | 'deleted'>;
// Result: 'draft' | 'published'

function displayPost(status: VisibleStatus) {
  // Only draft and published posts are shown
}

// Types available to admin
type AdminStatus = Exclude<Status, 'deleted'>;
// Result: 'draft' | 'published' | 'archived'

function managePost(status: AdminStatus) {
  // Admins can see everything except deleted
}
```

## Common Mistakes to Avoid

- **Using the wrong type to exclude**: Make sure the type you're excluding is actually in the union

```typescript
type Color = 'red' | 'blue' | 'green';

// ✗ 'yellow' is not in the union, so this doesn't change anything
type Result = Exclude<Color, 'yellow'>; // Still 'red' | 'blue' | 'green'

// ✓ Removing a type that exists
type Result2 = Exclude<Color, 'red'>; // 'blue' | 'green'
```

- **Confusion with Omit**: `Exclude` removes types from a union. `Omit` removes properties from an object type. Don't mix them up!

```typescript
// Use Exclude with unions (not objects)
type T = Exclude<'a' | 'b' | 'c', 'a'>;

// Use Omit with object types (not unions)
interface User { name: string; age: number; }
type UserWithoutAge = Omit<User, 'age'>;
```

## Exclude vs Pick for Unions

- Use **`Exclude`** to remove specific types from a union
- Use **`Extract`** to keep only specific types from a union (opposite of Exclude)

```typescript
type Status = 'pending' | 'success' | 'error';

// Remove error status
type GoodStatus = Exclude<Status, 'error'>; // 'pending' | 'success'

// Keep only error status (using Extract instead)
type BadStatus = Extract<Status, 'error'>; // 'error'
```

## Learn More

- [@official@Exclude<UnionType, ExcludedMembers>](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)
