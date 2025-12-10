# Omit

Remove specific properties from a type using `Omit<Type, Keys>`.

## Why Use This?

`Omit` is the opposite of `Pick`. Instead of choosing which properties to keep, you choose which to remove. It's useful when you want most properties but need to exclude a few.

## How It Works

`Omit` takes all properties from a type and removes only the ones you specify. Think of it like removing columns from a spreadsheet—you keep everything except what you don't need.

## Examples

### Basic Example: Remove Description

```typescript
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

// Create a type without the description
type TodoSummary = Omit<Todo, 'description'>;

const summary: TodoSummary = {
  id: 1,
  title: 'Buy groceries',
  completed: false,
  dueDate: '2024-12-20'
  // description is NOT allowed here
};
```

### Practical Example: Hide Sensitive Data

```typescript
interface UserProfile {
  id: number;
  name: string;
  email: string;
  password: string;    // Don't send this to frontend
  createdAt: string;
  updatedAt: string;
}

// Create a type without password
type SafeUser = Omit<UserProfile, 'password'>;

function getUserProfile(userId: number): SafeUser {
  const user = getUserFromDatabase(userId);
  
  // We send everything except the password
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
    // password is excluded - TypeScript won't let us include it!
  };
}
```

### Removing Multiple Properties

```typescript
interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  internalNotes: string;    // Only for editors
  draftSaved: boolean;       // Only for editors
}

// Type for what readers see
type PublicPost = Omit<BlogPost, 'internalNotes' | 'draftSaved' | 'updatedAt'>;

const post: PublicPost = {
  id: 1,
  title: 'How to Learn TypeScript',
  content: 'TypeScript is a superset of JavaScript...',
  author: 'John Doe',
  createdAt: '2024-01-15'
};
```

### Combining Omit with Partial

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

// Type for updating a user (exclude id and password, make other fields optional)
type UserUpdate = Partial<Omit<User, 'id' | 'password'>>;

function updateUser(userId: number, updates: UserUpdate) {
  // Users can optionally update name, email, or role
  // But they can't change their id or password
}

// This works - provide some or all optional properties
updateUser(1, { name: 'Jane' });
updateUser(1, { email: 'jane@example.com', name: 'Jane' });

// This would NOT work - can't update id or password
// updateUser(1, { id: 2 }); // ✗ Error
// updateUser(1, { password: 'newpass' }); // ✗ Error
```

## Common Mistakes to Avoid

- **Omitting the wrong properties**: Double-check that you're removing only what you intend to remove
- **Unclear intent**: If you're removing many properties, consider using `Pick` instead—it's often clearer

```typescript
// Confusing: which 5 properties are we keeping?
type Unclear = Omit<User, 'a' | 'b' | 'c' | 'd' | 'e'>;

// Clearer: explicitly state what we're keeping
type Clear = Pick<User, 'name' | 'email'>;
```

## Omit vs Pick

Use **`Omit`** when removing a few properties is easier to express.
Use **`Pick`** when keeping a few properties is easier to express.

## Learn More

- [@official@Omit<Type, Keys>](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
