# InstanceType

Get the type of an object created by a constructor using `InstanceType<Type>`.

## Why Use This?

When you have a class or constructor function, you might want to refer to the type of objects it creates. `InstanceType` lets you extract that type automatically instead of retyping the class name or creating a separate interface.

## How It Works

`InstanceType` looks at a constructor (like a class) and tells you what type of object it creates. It's like asking "what will I get when I call `new` on this?"

## Examples

### Basic Example: Class Constructor

```typescript
// Define a class
class User {
  id: number;
  name: string;
  email: string;
  
  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// Extract the instance type
type UserInstance = InstanceType<typeof User>;
// Result: User

// Now you can use it
const user: UserInstance = new User(1, 'John', 'john@example.com');
```

### Practical Example: Factory Function

```typescript
class Product {
  id: number;
  name: string;
  price: number;
  
  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
  
  getDiscountedPrice(discount: number): number {
    return this.price * (1 - discount);
  }
}

// Extract the instance type for use in a factory
type ProductInstance = InstanceType<typeof Product>;

function createProduct(id: number, name: string, price: number): ProductInstance {
  return new Product(id, name, price);
}

const item = createProduct(1, 'Laptop', 999);
// item is typed as Product
```

### Real-World Example: Generic Repository Pattern

```typescript
class User {
  id: number;
  name: string;
  
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Product {
  id: number;
  title: string;
  price: number;
  
  constructor(id: number, title: string, price: number) {
    this.id = id;
    this.title = title;
    this.price = price;
  }
}

// Generic repository that works with any class
class Repository<T extends new (...args: any[]) => any> {
  private items: InstanceType<T>[] = [];
  
  add(item: InstanceType<T>): void {
    this.items.push(item);
  }
  
  getAll(): InstanceType<T>[] {
    return this.items;
  }
  
  getById(id: number): InstanceType<T> | undefined {
    return this.items.find(item => item.id === id);
  }
}

// Create repositories for different classes
const userRepo = new Repository<typeof User>();
const productRepo = new Repository<typeof Product>();

userRepo.add(new User(1, 'Alice'));
const user = userRepo.getById(1); // Typed as User | undefined
```

### Example: Working with Constructor Arguments

```typescript
class Config {
  environment: string;
  debug: boolean;
  port: number;
  
  constructor(environment: string, debug: boolean, port: number) {
    this.environment = environment;
    this.debug = debug;
    this.port = port;
  }
}

// Get the instance type
type ConfigInstance = InstanceType<typeof Config>;

// Use in a function that works with Config objects
function updateConfig(config: ConfigInstance): void {
  console.log(`Updating config for ${config.environment}`);
}

const myConfig = new Config('production', false, 3000);
updateConfig(myConfig); // ✓ OK
```

### Example: Storing Class Instances

```typescript
class Cache<T extends new (...args: any[]) => any> {
  private storage: Map<string, InstanceType<T>> = new Map();
  
  set(key: string, value: InstanceType<T>): void {
    this.storage.set(key, value);
  }
  
  get(key: string): InstanceType<T> | undefined {
    return this.storage.get(key);
  }
}

class Session {
  userId: number;
  token: string;
  
  constructor(userId: number, token: string) {
    this.userId = userId;
    this.token = token;
  }
}

// Cache for Session instances
const sessionCache = new Cache<typeof Session>();
sessionCache.set('user123', new Session(123, 'token-abc'));
const session = sessionCache.get('user123');
// session is typed as Session | undefined
```

## Common Mistakes to Avoid

- **Using InstanceType with non-constructor types**: InstanceType only works with classes and constructor functions

```typescript
// ✗ Error: string is not a constructor
// type Instance = InstanceType<string>;

// ✓ Use with classes or constructor functions
class MyClass {}
type Instance = InstanceType<typeof MyClass>; // MyClass
```

- **Forgetting to use `typeof` with actual classes**: You need `typeof` to get the constructor type

```typescript
class MyClass {}

// ✗ Wrong: MyClass is a value, not a type
// type Instance = InstanceType<MyClass>;

// ✓ Correct: use typeof to get the constructor type
type Instance = InstanceType<typeof MyClass>; // MyClass
```

- **Confusing the class with its instance**: The class itself is a constructor, instances are the objects you create

```typescript
class User {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// InstanceType extracts the instance type (the object you get after new)
type UserInstance = InstanceType<typeof User>; // User

// When you use it:
const user = new User('John'); // This is an instance
const typedUser: UserInstance = user; // It matches the instance type
```

## InstanceType vs Interface

You can use `InstanceType` instead of creating a separate interface:

```typescript
// Without InstanceType - have to define interface separately
interface IUser {
  id: number;
  name: string;
}

class User implements IUser {
  id: number;
  name: string;
  
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

// With InstanceType - automatically get the instance type
type UserType = InstanceType<typeof User>; // Gets User class type
```

## Learn More

- [@official@InstanceType<Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)
