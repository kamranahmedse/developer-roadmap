# Type Aliases

Give a custom name to any type using the `type` keyword, making your code more readable and reusable.

## Why Use This?

Type aliases help you:

- Avoid repeating complex type definitions
- Give meaningful names to types
- Make your code easier to read and maintain
- Create reusable type definitions

## How It Works

Think of type aliases as nicknames for types. Instead of writing a long type definition everywhere, you write it once and give it a name.

## Examples

### Basic Example

```typescript
// Create a simple alias
type UserId = string;
type Age = number;

// Use the aliases
let id: UserId = 'user_123';
let userAge: Age = 25;
```

### Object Type Alias

```typescript
// Define a complex type once
type User = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
};

// Reuse it anywhere
function createUser(data: User): User {
  return { ...data };
}

function displayUser(user: User): void {
  console.log(`${user.name} (${user.email})`);
}
```

### Practical Example: API Response Types

```typescript
// Define types for your API
type ApiError = {
  code: number;
  message: string;
};

type ApiSuccess<T> = {
  data: T;
  status: 'success';
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Use with any data type
type UserResponse = ApiResponse<User>;
type ProductResponse = ApiResponse<Product>;
```

### Function Type Alias

```typescript
// Define a function type
type ClickHandler = (event: MouseEvent) => void;
type Calculator = (a: number, b: number) => number;

// Use it for callbacks
function addClickListener(handler: ClickHandler) {
  document.addEventListener('click', handler);
}

// Use it for multiple functions
const add: Calculator = (a, b) => a + b;
const multiply: Calculator = (a, b) => a * b;
```

## Type Alias vs Interface

| Type Alias | Interface |
| ---------- | --------- |
| Can alias any type (primitives, unions, tuples) | Only for object shapes |
| Cannot be extended (use intersections) | Can be extended with `extends` |
| Cannot be merged | Can be merged (declaration merging) |

```typescript
// Only type alias can do this
type ID = string | number; // Union
type Coordinates = [number, number]; // Tuple
type Callback = () => void; // Function
```

## Common Mistakes to Avoid

- **Creating aliases for simple types unnecessarily**: `type Str = string` doesn't add much value
- **Confusing with interfaces**: Use interfaces for object shapes that might be extended; use type aliases for unions, tuples, and complex compositions

Learn more from the following links:

- [@official@Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
