# Enum

## What is an Enum?

An **enum** (enumeration) allows you to define a set of named constants. Instead of using random numbers or strings scattered throughout your code, enums let you create a group of related, meaningful values that make your code clearer and easier to maintain.

Think of an enum like a list of choices. For example, instead of using `0`, `1`, `2` for directions, you can use `Up`, `Down`, `Left`, `Right`—much more readable!

## Why Use Enums?

Enums help you:

- **Make code readable**: Use meaningful names instead of numbers/strings
- **Prevent typos**: TypeScript catches invalid values
- **Document intent**: Clear what values are valid
- **Reduce bugs**: No more guessing what 1, 2, 3, 4 mean
- **Enable IDE autocomplete**: Suggestions when you type

## Numeric Enums

The simplest enum type. Members automatically number themselves:

```typescript
enum Direction {
  Up = 1,
  Down, // 2
  Left, // 3
  Right, // 4
}

console.log(Direction.Up); // 1
console.log(Direction.Down); // 2

// You can also use the numeric value to get the name
console.log(Direction[1]); // "Up"
```

**Auto-incrementing from 0** (most common):

```typescript
enum Status {
  Inactive = 0,
  Active = 1,
  Pending = 2,
}

// Or let them auto-increment:
enum Priority {
  Low, // 0
  Medium, // 1
  High, // 2
}
```

## String Enums

Use readable string values instead of numbers:

```typescript
enum UserRole {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

const userRole: UserRole = UserRole.Admin;
console.log(userRole); // "admin"
```

## Real-World Examples

**Example 1: Game Status**

```typescript
enum GameStatus {
  Waiting = "waiting",
  Playing = "playing",
  Paused = "paused",
  Finished = "finished",
}

interface Game {
  id: number;
  status: GameStatus;
}

function updateGameStatus(game: Game, newStatus: GameStatus): void {
  game.status = newStatus;
  console.log(`Game status updated to: ${game.status}`);
}

const myGame: Game = { id: 1, status: GameStatus.Waiting };
updateGameStatus(myGame, GameStatus.Playing); // Game status updated to: playing
```

**Example 2: HTTP Response Codes**

```typescript
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500,
}

function handleResponse(statusCode: HttpStatus): void {
  switch (statusCode) {
    case HttpStatus.OK:
      console.log("Request successful");
      break;
    case HttpStatus.NotFound:
      console.log("Resource not found");
      break;
    case HttpStatus.ServerError:
      console.log("Server encountered an error");
      break;
    default:
      console.log("Unknown status");
  }
}

handleResponse(HttpStatus.OK); // Request successful
handleResponse(HttpStatus.NotFound); // Resource not found
```

**Example 3: User Permissions**

```typescript
enum Permission {
  Read = "read",
  Write = "write",
  Delete = "delete",
  Admin = "admin",
}

interface User {
  name: string;
  permissions: Permission[];
}

function canDeletePost(user: User): boolean {
  return (
    user.permissions.includes(Permission.Delete) ||
    user.permissions.includes(Permission.Admin)
  );
}

const john: User = {
  name: "John",
  permissions: [Permission.Read, Permission.Write],
};

const admin: User = {
  name: "Admin",
  permissions: [Permission.Admin],
};

console.log(canDeletePost(john)); // false
console.log(canDeletePost(admin)); // true
```

**Example 4: Application Modes**

```typescript
enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production",
}

interface Config {
  environment: Environment;
  debugMode: boolean;
  apiUrl: string;
}

function getConfig(env: Environment): Config {
  switch (env) {
    case Environment.Development:
      return {
        environment: env,
        debugMode: true,
        apiUrl: "http://localhost:3000",
      };
    case Environment.Production:
      return {
        environment: env,
        debugMode: false,
        apiUrl: "https://api.example.com",
      };
    default:
      return {
        environment: env,
        debugMode: false,
        apiUrl: "https://staging.example.com",
      };
  }
}

const config = getConfig(Environment.Development);
console.log(config); // { environment: 'development', debugMode: true, ... }
```

## Heterogeneous Enums (Mixing Strings and Numbers)

```typescript
enum Mixed {
  No = 0,
  Yes = "YES",
  Maybe = 1,
  Unknown = "UNKNOWN",
}

// Generally not recommended - stick to one type for clarity
```

## Const Enums (Performance Optimization)

`const` enums are compiled away completely, making your code more efficient:

```typescript
const enum Season {
  Spring = "spring",
  Summer = "summer",
  Fall = "fall",
  Winter = "winter",
}

const current: Season = Season.Spring;
// The compiled JavaScript directly uses 'spring' instead of looking up the enum
```

## When to Use Enums

✓ **Use enums for**:

- Fixed set of related values
- Values that won't change
- Status/state tracking
- Permissions and roles
- Modes and settings

✗ **Don't use enums for**:

- Dynamic lists (use `string | number` instead)
- Large numbers of options
- Values from a database (consider storing strings)

## Enums vs Union Types

Sometimes you have a choice:

```typescript
// Using enum
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

const color: Color = Color.Red;

// Using union type
type Color = "red" | "green" | "blue";
const color: Color = "red";
```

**Enum advantages**: Organized, can have methods, easier to group
**Union type advantages**: Simpler, more flexible, no extra JavaScript

## Key Takeaways

- **Enums create named constants**: Much clearer than magic numbers
- **Two main types**: Numeric and string-based
- **Use for fixed sets**: Status, roles, directions, priorities
- **Make code readable**: Meaningful names instead of numbers
- **Enable type checking**: TypeScript catches invalid enum values
- **Document intent**: Future developers understand what values are valid

Learn more from the following links:

- [@official@TypeScript - Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
