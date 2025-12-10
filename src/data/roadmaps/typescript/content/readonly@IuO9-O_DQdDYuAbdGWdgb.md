# Readonly

Make all properties of a type unchangeable using `Readonly<Type>`.

## Why Use This?

Sometimes you want to create objects that can't be modified after creation. This helps prevent accidental changes and makes your code more predictable and safer. For example, configuration objects or constants should never be changed.

## How It Works

`Readonly` prevents you from reassigning any properties of an object. TypeScript will give you an error if you try to change them. It's like putting a protective cover on a box—you can look inside, but you can't modify the contents.

## Examples

### Basic Example: Read-Only Object

```typescript
interface Config {
  apiUrl: string;
  timeout: number;
  debug: boolean;
}

const config: Readonly<Config> = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  debug: false
};

// ✗ Error: Cannot assign to 'apiUrl' because it is read-only
// config.apiUrl = 'https://other.com';

// ✓ This is fine - reading is allowed
console.log(config.apiUrl);
```

### Practical Example: App Configuration

```typescript
interface AppConfig {
  appName: string;
  version: string;
  environment: 'development' | 'production';
  port: number;
}

// Create an immutable config object
const appConfig: Readonly<AppConfig> = {
  appName: 'My App',
  version: '1.0.0',
  environment: 'production',
  port: 3000
};

function startServer() {
  console.log(`Starting ${appConfig.appName}...`); // ✓ Reading is fine
  
  // ✗ This would cause an error:
  // appConfig.port = 8000; // Error: port is read-only
}
```

### Real-World Example: User Permissions

```typescript
interface UserPermissions {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canAdmin: boolean;
}

// Set permissions once when user logs in
function grantPermissions(user: User): Readonly<UserPermissions> {
  return {
    canRead: true,
    canWrite: user.role === 'editor',
    canDelete: user.role === 'admin',
    canAdmin: user.role === 'admin'
  };
}

const myPermissions = grantPermissions(currentUser);

// Later, accidentally trying to grant yourself admin access won't work:
// ✗ Error: Cannot assign to 'canAdmin' because it is read-only
// myPermissions.canAdmin = true;

// ✓ Reading permissions is fine
if (myPermissions.canAdmin) {
  showAdminPanel();
}
```

### Readonly Arrays

```typescript
interface Settings {
  themes: readonly string[]; // Array that can't be modified
}

const settings: Readonly<Settings> = {
  themes: ['light', 'dark', 'auto']
};

// ✗ Error: Cannot push - array is read-only
// settings.themes.push('high-contrast');

// ✓ Reading the array is fine
console.log(settings.themes[0]); // 'light'
```

## Common Mistakes to Avoid

- **Readonly doesn't prevent nested changes**: If your object contains another object, the nested object can still be modified

```typescript
interface User {
  name: string;
  address: { city: string; country: string };
}

const user: Readonly<User> = {
  name: 'John',
  address: { city: 'NYC', country: 'USA' }
};

// ✗ Error: Can't reassign the property
// user.name = 'Jane';

// ⚠️ But this WORKS - we're changing the nested object
user.address.city = 'LA'; // No error!

// For deep immutability, you need to apply Readonly recursively
```

- **Runtime behavior is unchanged**: `Readonly` is only a TypeScript feature. At runtime (JavaScript), the object is still mutable if you bypass TypeScript

```typescript
const config: Readonly<AppConfig> = { /* ... */ };

// TypeScript prevents this:
// config.port = 8000; // ✗ Error

// But JavaScript can still do this (which TypeScript doesn't catch):
(config as any).port = 8000; // ⚠️ Works at runtime, but don't do this!
```

## Deep Readonly Objects

For nested immutability, use recursive readonly types:

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

interface User {
  name: string;
  address: { city: string; country: string };
}

const user: DeepReadonly<User> = {
  name: 'John',
  address: { city: 'NYC', country: 'USA' }
};

// ✗ Both of these now give errors
// user.name = 'Jane';
// user.address.city = 'LA';
```

## Learn More

- [@official@Readonly<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)
