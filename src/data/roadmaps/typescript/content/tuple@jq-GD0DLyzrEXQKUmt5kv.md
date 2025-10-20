# Tuple

## What is a Tuple?

A **tuple** is a special kind of array where:

- The length is **fixed** (you know exactly how many elements)
- The type of each position is **known** (each element has a specific type)

Think of a tuple as a labeled box with specific slots: slot 1 holds a string, slot 2 holds a number, slot 3 holds a boolean—you know exactly what goes where.

Tuples are perfect when you have a specific structure that never changes, like GPS coordinates (latitude, number) (longitude, number) or a person's name and age.

## Basic Tuple Syntax

```typescript
// A tuple with fixed length and specific types at each position
type StringNumberPair = [string, number];

const pair: StringNumberPair = ["hello", 42];

// Access elements
const first = pair[0]; // "hello" (string type)
const second = pair[1]; // 42 (number type)

// This is an error - wrong type at position 1
// const invalid: StringNumberPair = ['hello', 'world'];  // ❌ Error
```

## Why Tuples Matter

**Array**: Can have any number of elements, all the same type

```typescript
const numbers: number[] = [1, 2, 3, 4, 5, 100]; // Could be any length
```

**Tuple**: Fixed length, specific types at each position

```typescript
type Coordinates = [number, number]; // Always [latitude, longitude]
const location: Coordinates = [40.7128, -74.006]; // NYC coordinates
```

## Practical Examples

**Example 1: Returning Multiple Values**

```typescript
// Instead of confusing what each position means:
function getUserData(): [string, number, boolean] {
  return ["Alice", 28, true];
}

const [name, age, isActive] = getUserData();
console.log(`${name} is ${age} years old`); // Alice is 28 years old
```

**Example 2: GPS Coordinates**

```typescript
type Coordinate = [number, number]; // [latitude, longitude]

const newyork: Coordinate = [40.7128, -74.006];
const london: Coordinate = [51.5074, -0.1278];
const tokyo: Coordinate = [35.6762, 139.6503];

function displayLocation(name: string, coord: Coordinate): void {
  const [lat, lon] = coord;
  console.log(`${name}: ${lat}, ${lon}`);
}

displayLocation("New York", newyork); // New York: 40.7128, -74.006
displayLocation("London", london); // London: 51.5074, -0.1278
```

**Example 3: RGB Color**

```typescript
type RGBColor = [number, number, number]; // [red, green, blue]

const red: RGBColor = [255, 0, 0];
const green: RGBColor = [0, 255, 0];
const blue: RGBColor = [0, 0, 255];
const white: RGBColor = [255, 255, 255];

function rgbToHex(color: RGBColor): string {
  const [r, g, b] = color;
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

console.log(rgbToHex(red)); // #ff0000
console.log(rgbToHex(white)); // #ffffff
```

**Example 4: API Responses**

```typescript
// Return value or error
type ApiResult = [boolean, string]; // [success, message]

function fetchData(id: number): ApiResult {
  if (id > 0) {
    return [true, "Data fetched successfully"];
  } else {
    return [false, "Invalid ID"];
  }
}

const [success, message] = fetchData(1);
console.log(success, message); // true Data fetched successfully
```

**Example 5: Destructuring with Tuples**

```typescript
type PersonInfo = [string, number, string]; // [name, age, city]

function formatPerson(info: PersonInfo): string {
  const [name, age, city] = info;
  return `${name} is ${age} years old and lives in ${city}`;
}

const person: PersonInfo = ["Bob", 35, "San Francisco"];
console.log(formatPerson(person));
// Bob is 35 years old and lives in San Francisco
```

## Optional Elements (Using ?)

```typescript
// Tuple where last element is optional
type OptionalTuple = [string, number?];

const tuple1: OptionalTuple = ["hello", 42]; // ✓ OK
const tuple2: OptionalTuple = ["hello"]; // ✓ OK (no number)
```

## Rest Elements (...) - Variable Length

```typescript
// A tuple that starts with a string, then has any number of numbers
type StringAndNumbers = [string, ...number[]];

const tuple1: StringAndNumbers = ["count", 1, 2, 3];
const tuple2: StringAndNumbers = ["values", 10, 20, 30, 40, 50];
```

## Labeled Tuple Elements (More Readable)

Make tuples self-documenting with labels:

```typescript
// Without labels - unclear what each position is
type BadTuple = [string, number, boolean];

// With labels - much clearer!
type GoodTuple = [name: string, age: number, isActive: boolean];

function createUser(user: GoodTuple): void {
  const [name, age, isActive] = user;
  console.log(`${name}, ${age}, ${isActive}`);
}

createUser(["Alice", 28, true]);
```

## Readonly Tuples (Cannot Modify)

```typescript
type ReadonlyCoordinate = readonly [number, number];

const location: ReadonlyCoordinate = [40.7128, -74.006];

// ✓ Reading is OK
console.log(location[0]);

// ❌ Modifying is not allowed
// location[0] = 51.5074;  // Error!
```

## Tuples vs Arrays vs Objects

| Type       | Use Case                   | Example                                  |
| ---------- | -------------------------- | ---------------------------------------- |
| **Tuple**  | Fixed structure, ordered   | `[string, number]` for coordinate        |
| **Array**  | Variable length, same type | `number[]` for list of scores            |
| **Object** | Named fields, varies       | `{name: string, age: number}` for person |

```typescript
// Tuple - position matters, fixed structure
type Result = [success: boolean, data: string];

// Array - any number of same type
type Scores = number[];

// Object - named fields
interface User {
  name: string;
  age: number;
}
```

## When to Use Tuples

✓ **Use tuples for**:

- Returning multiple values from functions
- Fixed-size ordered data (coordinates, colors, pairs)
- Self-documenting code with labeled elements
- Performance-critical code (tuples compile more efficiently)

✗ **Don't use tuples for**:

- Collections of unknown length
- When you need to access elements by name
- When the structure changes frequently

## Real-World Pattern: Function Return Values

```typescript
// Instead of returning an object (more overhead):
function getUserData(): { success: boolean; data: string; error?: string } {
  // ...
}

// Use a tuple (cleaner, more efficient):
function getUserData(): [boolean, string] {
  return [true, "userData"];
}

const [success, data] = getUserData();
```

## Key Takeaways

- **Tuples have fixed length**: You know exactly how many elements
- **Each position has a type**: Different types allowed at different positions
- **Perfect for pairs and triples**: Coordinates, return values, RGB colors
- **More specific than arrays**: Arrays are flexible, tuples are precise
- **Use destructuring**: `const [a, b] = tuple` for clean code
- **Labels improve readability**: `[name: string, age: number]` documents itself

Learn more from the following links:

- [@official@Tuple Types](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
