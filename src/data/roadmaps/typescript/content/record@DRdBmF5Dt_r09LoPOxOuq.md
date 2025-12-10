# Record

Create an object type with specific keys and values using `Record<Keys, Type>`.

## Why Use This?

Often you need an object where the keys and their value types are known upfront. For example, a mapping of user IDs to user data, or a mapping of status codes to messages. `Record` ensures all required keys exist and have the correct value type.

## How It Works

`Record` creates an object type where:
- The first parameter defines the possible keys
- The second parameter defines the type of all values

Think of it like creating a lookup table where you know all the keys and what type of value each one should have.

## Examples

### Basic Example: Cat Information

```typescript
interface CatInfo {
  age: number;
  breed: string;
}

// Define which cat names are valid
type CatName = 'miffy' | 'boris' | 'mordred';

// Create a lookup table
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' }
};

// Access data by cat name
console.log(cats.miffy); // { age: 10, breed: 'Persian' }
console.log(cats['boris']); // { age: 5, breed: 'Maine Coon' }

// ✗ Error: 'fluffy' is not a valid key
// console.log(cats.fluffy);
```

### Practical Example: Status Code Messages

```typescript
// Define status codes
type HttpStatus = 200 | 404 | 500 | 503;

// Map each status to a message
const statusMessages: Record<HttpStatus, string> = {
  200: 'Success',
  404: 'Not Found',
  500: 'Internal Server Error',
  503: 'Service Unavailable'
};

function handleResponse(status: HttpStatus) {
  console.log(statusMessages[status]);
}

handleResponse(200); // 'Success'
handleResponse(404); // 'Not Found'

// ✗ Error: 201 is not a valid HttpStatus
// handleResponse(201);
```

### Real-World Example: Color Palette

```typescript
interface Color {
  hex: string;
  rgb: string;
  name: string;
}

type ColorName = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

const palette: Record<ColorName, Color> = {
  primary: {
    hex: '#3498db',
    rgb: 'rgb(52, 152, 219)',
    name: 'Blue'
  },
  secondary: {
    hex: '#95a5a6',
    rgb: 'rgb(149, 165, 166)',
    name: 'Gray'
  },
  success: {
    hex: '#27ae60',
    rgb: 'rgb(39, 174, 96)',
    name: 'Green'
  },
  danger: {
    hex: '#e74c3c',
    rgb: 'rgb(231, 76, 60)',
    name: 'Red'
  },
  warning: {
    hex: '#f39c12',
    rgb: 'rgb(243, 156, 18)',
    name: 'Orange'
  }
};

function getButtonColor(type: ColorName): Color {
  return palette[type];
}
```

### Dynamic Keys with String/Number

```typescript
// Sometimes you want keys to be any string or number
type UserRoles = 'admin' | 'user' | 'guest';

const permissions: Record<UserRoles, string[]> = {
  admin: ['read', 'write', 'delete', 'manage-users'],
  user: ['read', 'write'],
  guest: ['read']
};

function checkPermission(role: UserRoles, action: string): boolean {
  return permissions[role].includes(action);
}

checkPermission('admin', 'manage-users'); // true
checkPermission('user', 'delete'); // false
```

### Record with Union Types

```typescript
type Environment = 'development' | 'staging' | 'production';

interface ApiConfig {
  baseUrl: string;
  timeout: number;
  logging: boolean;
}

const apiConfigs: Record<Environment, ApiConfig> = {
  development: {
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
    logging: true
  },
  staging: {
    baseUrl: 'https://staging.example.com',
    timeout: 10000,
    logging: true
  },
  production: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    logging: false
  }
};

const currentEnv: Environment = 'production';
const config = apiConfigs[currentEnv];
```

## Common Mistakes to Avoid

- **Missing required keys**: Every key in your union type must be provided

```typescript
type Status = 'pending' | 'completed' | 'failed';

// ✗ Error: missing 'failed' key
const statusLabels: Record<Status, string> = {
  pending: 'Waiting...',
  completed: 'Done!'
  // 'failed' is missing!
};

// ✓ Correct: all keys are present
const statusLabels: Record<Status, string> = {
  pending: 'Waiting...',
  completed: 'Done!',
  failed: 'Error occurred'
};
```

- **Using Record for optional properties**: If some keys are optional, use an object type instead

```typescript
// ✗ Wrong: Record requires all keys
// const sometimes: Record<'a' | 'b', string> = { a: 'hello' };

// ✓ Better: use an object type for optional keys
const sometimes: Partial<Record<'a' | 'b', string>> = { a: 'hello' };
```

## Record vs Object Literal Type

Use **`Record`** when creating a mapping of known keys to values.
Use **`{ [key: string]: Type }`** when the keys are unknown/dynamic.

```typescript
// Use Record - keys are known
type Environment = 'dev' | 'prod';
const configs: Record<Environment, Config> = { /* ... */ };

// Use dynamic object type - keys are unknown
const data: { [key: string]: any } = fetchUnknownData();
```

## Learn More

- [@official@Record<Keys, Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)
