# Pick

Select only specific properties from a type using `Pick<Type, Keys>`.

## Why Use This?

When you have a type with many properties but only need some of them, `Pick` lets you create a new type with just those properties. This is like taking a few fields from a larger object and creating a smaller version.

## How It Works

`Pick` creates a new type that includes only the properties you specify. Think of it like selecting columns from a spreadsheet—you keep only the ones you want.

## Examples

### Basic Example: Selecting Todo Properties

```typescript
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

// Create a type with only title and completed
type TodoPreview = Pick<Todo, 'title' | 'completed'>;

// Now TodoPreview only has these two properties
const preview: TodoPreview = {
  title: 'Buy groceries',
  completed: false
  // Note: id, description, and dueDate are NOT allowed here
};
```

### Practical Example: API Response Data

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;  // Secret! Don't send to client
  ssn: string;       // Private! Don't send to client
  role: string;
  createdAt: string;
}

// Create a type for what we send to the frontend
type PublicUser = Pick<User, 'id' | 'name' | 'email' | 'role' | 'createdAt'>;

function getUserForClient(userId: number): PublicUser {
  const user = getUserFromDatabase(userId);
  
  // Only return safe properties
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
    // password and ssn are NOT included - TypeScript prevents it!
  };
}
```

### Multiple Picks for Different Views

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  cost: number;      // Secret! Only for admins
  description: string;
  inStock: boolean;
}

// What customers see
type ProductForCustomer = Pick<Product, 'id' | 'name' | 'price' | 'description' | 'inStock'>;

// What admins see (includes cost)
type ProductForAdmin = Pick<Product, 'id' | 'name' | 'price' | 'cost' | 'description' | 'inStock'>;
```

## Common Mistakes to Avoid

- **Typo in property names**: Property names must match exactly

```typescript
interface User {
  name: string;
  email: string;
}

type UserPreview = Pick<User, 'name' | 'emial'>; // ✗ Error: 'emial' doesn't exist
type UserPreview = Pick<User, 'name' | 'email'>; // ✓ Correct
```

- **Picking properties that don't exist**: Pick validates that the properties you choose actually exist in the original type

## Learn More

- [@official@Pick<Type, Keys>](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)
