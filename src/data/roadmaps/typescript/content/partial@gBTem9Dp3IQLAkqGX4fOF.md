# Partial

Make all properties of a type optional using `Partial<Type>`.

## Why Use This?

Often you want to allow objects where not all properties are required. For example, when updating a user's profile, they might only change their email, not their name. `Partial` lets you create a version of a type where everything is optional.

## How It Works

`Partial` takes all the properties from a type and makes them optional (with the `?` operator). It's like saying "you can provide some or all of these properties—whatever you want."

## Examples

### Basic Example: Optional User Properties

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

// Without Partial - all properties are required
const user1: User = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

// With Partial - all properties are optional
const user2: Partial<User> = {
  name: 'Jane'  // Only provide what you want
};

const user3: Partial<User> = {
  email: 'bob@example.com'
};
```

### Practical Example: User Update Function

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

function updateUser(id: number, updates: Partial<User>): User {
  // Get current user from database
  let user = getUserById(id);
  
  // Apply only the properties that were provided
  return { ...user, ...updates };
}

// Users can update just their email
updateUser(1, { email: 'newemail@example.com' });

// Or update multiple fields at once
updateUser(1, { name: 'Jane', email: 'jane@example.com' });

// This would NOT work - if not using Partial:
// updateUser(1, { email: 'test@example.com' });
// Error: property 'id', 'name', 'age' are required
```

## Common Mistakes to Avoid

- **Using Partial for everything**: Only use it when properties are truly optional. Don't avoid proper type design.
- **Forgetting to handle missing properties**: When a property might be undefined, make sure your code handles it.

```typescript
interface User {
  name: string;
  age: number;
}

function greetUser(user: Partial<User>) {
  // This could fail if name is undefined!
  // console.log(user.name.toUpperCase());
  
  // Better: check if it exists first
  if (user.name) {
    console.log(user.name.toUpperCase());
  }
}
```

## Learn More

- [@official@Partial<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)
