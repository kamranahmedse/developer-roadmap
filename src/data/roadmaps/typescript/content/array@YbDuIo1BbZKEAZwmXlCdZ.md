# Array

## What is an Array?

An **array** is a collection of values of the same type stored in a single variable. Arrays are ordered lists where you access items by their position (index).

In TypeScript, you specify what type of items the array can hold. This ensures type safety—you can't accidentally put the wrong type of data in the array.

## Basic Array Syntax

There are two ways to declare an array in TypeScript:

```typescript
// Syntax 1: Type followed by []
const numbers: number[] = [1, 2, 3, 4, 5];
const names: string[] = ["Alice", "Bob", "Charlie"];

// Syntax 2: Generic Array<Type> (less common)
const ages: Array<number> = [25, 30, 35];
```

Both styles are equivalent—choose whichever you prefer!

## Common Array Operations

```typescript
const fruits: string[] = ["apple", "banana", "orange"];

// Access an element by index (starts at 0)
console.log(fruits[0]); // 'apple'
console.log(fruits[1]); // 'banana'

// Get array length
console.log(fruits.length); // 3

// Add elements
fruits.push("grape"); // Adds to end
fruits.unshift("mango"); // Adds to beginning

// Remove elements
fruits.pop(); // Removes last item
fruits.shift(); // Removes first item

// Find elements
const hasOrange = fruits.includes("orange"); // true

// Check index
const index = fruits.indexOf("banana"); // 1
```

## Different Array Types

```typescript
// Array of strings
const colors: string[] = ["red", "blue", "green"];

// Array of numbers
const scores: number[] = [85, 90, 78];

// Array of booleans
const flags: boolean[] = [true, false, true];

// Array of objects
interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 35 },
];
```

## Real-World Examples

**Example 1: Todo List**

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 1, title: "Learn TypeScript", completed: true },
  { id: 2, title: "Build a project", completed: false },
  { id: 3, title: "Deploy to production", completed: false },
];

// Add a new todo
todos.push({
  id: 4,
  title: "Write documentation",
  completed: false,
});

// Find a todo
const firstTodo = todos[0];
console.log(firstTodo.title); // Learn TypeScript

// Count completed todos
const completedCount = todos.filter((todo) => todo.completed).length;
console.log(`Completed: ${completedCount}`); // Completed: 1
```

**Example 2: Student Grades**

```typescript
const studentGrades: number[] = [85, 92, 78, 95, 88];

// Calculate average
const average =
  studentGrades.reduce((sum, grade) => sum + grade, 0) / studentGrades.length;
console.log(`Average: ${average}`); // Average: 87.6

// Find highest grade
const highest = Math.max(...studentGrades);
console.log(`Highest: ${highest}`); // Highest: 95

// Sort grades
const sorted = [...studentGrades].sort((a, b) => b - a);
console.log(sorted); // [95, 92, 88, 85, 78]
```

**Example 3: Array Methods (Transforming Data)**

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];

// Map: transform each element
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter: keep only elements that match a condition
const evenNumbers = numbers.filter((n) => n % 2 === 0);
console.log(evenNumbers); // [2, 4]

// Find: get first element matching a condition
const firstEven = numbers.find((n) => n % 2 === 0);
console.log(firstEven); // 2

// Some: check if any element matches
const hasEven = numbers.some((n) => n % 2 === 0);
console.log(hasEven); // true
```

**Example 4: Shopping Cart**

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const cart: Product[] = [
  { id: 1, name: "Laptop", price: 1000, quantity: 1 },
  { id: 2, name: "Mouse", price: 25, quantity: 2 },
  { id: 3, name: "Keyboard", price: 75, quantity: 1 },
];

// Calculate total
const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
console.log(`Total: $${total}`); // Total: $1125

// Remove an item
const filteredCart = cart.filter((item) => item.id !== 2);
console.log(filteredCart.length); // 2
```

## Looping Through Arrays

```typescript
const colors: string[] = ["red", "green", "blue"];

// for...of loop (modern, easiest)
for (const color of colors) {
  console.log(color);
}

// forEach method
colors.forEach((color, index) => {
  console.log(`${index}: ${color}`);
});

// Traditional for loop
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

// map method (when you need to transform)
const upperCaseColors = colors.map((color) => color.toUpperCase());
```

## Arrays with Multiple Types (Union Types)

```typescript
// Array can contain either strings or numbers
const mixed: (string | number)[] = ["hello", 42, "world", 100];

// Array of different object types
interface Car {
  type: "car";
  doors: number;
}

interface Bike {
  type: "bike";
  hasBasket: boolean;
}

const vehicles: (Car | Bike)[] = [
  { type: "car", doors: 4 },
  { type: "bike", hasBasket: true },
];
```

## Empty Arrays and Type Inference

```typescript
// TypeScript infers the type from the first element
const numbers = [1, 2, 3]; // number[]
const strings = ["a", "b"]; // string[]

// You can also explicitly type an empty array
const empty: string[] = [];
empty.push("hello"); // ✓ OK
// empty.push(123);   // ❌ Error: number not assignable to string
```

## Common Array Methods

| Method       | Purpose             | Example                   |
| ------------ | ------------------- | ------------------------- |
| `push()`     | Add to end          | `arr.push(5)`             |
| `pop()`      | Remove from end     | `arr.pop()`               |
| `shift()`    | Remove from start   | `arr.shift()`             |
| `unshift()`  | Add to start        | `arr.unshift(0)`          |
| `map()`      | Transform each item | `arr.map(x => x * 2)`     |
| `filter()`   | Keep matching items | `arr.filter(x => x > 5)`  |
| `find()`     | Get first match     | `arr.find(x => x > 5)`    |
| `includes()` | Check if exists     | `arr.includes(5)`         |
| `join()`     | Convert to string   | `arr.join(', ')`          |
| `slice()`    | Get a portion       | `arr.slice(0, 2)`         |
| `splice()`   | Add/remove items    | `arr.splice(1, 2, 'new')` |

## Tips for Beginners

1. **Arrays are ordered**: Index 0 is the first element
2. **Type safety**: TypeScript enforces type matching
3. **Length property**: Always available to check array size
4. **Immutability**: Consider methods like `filter()` and `map()` that return new arrays
5. **Empty arrays**: Must specify type explicitly or TypeScript uses `any`

## Real-World Pattern: Handling API Results

```typescript
interface ApiResponse {
  data: User[];
  success: boolean;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  const data: ApiResponse = await response.json();

  if (data.success && data.data.length > 0) {
    return data.data;
  }

  return [];
}
```

## Key Takeaways

- **Arrays hold collections**: Multiple items of the same type
- **Type checking**: Prevent wrong data types from entering
- **Methods are powerful**: `map`, `filter`, `find` transform data cleanly
- **Common in real code**: Lists of users, products, posts, messages
- **Flexible iteration**: `for...of`, `forEach`, `map` each have uses

Learn more from the following links:

- [@official@Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)
