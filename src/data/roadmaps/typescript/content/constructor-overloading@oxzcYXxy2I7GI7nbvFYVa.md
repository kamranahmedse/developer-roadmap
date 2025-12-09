# Constructor Overloading

Let a class accept different types or numbers of parameters when creating an instance.

## Why Use This?

Sometimes you want to create an object in multiple ways. For example:
- Create a `Point` with both x and y coordinates: `new Point(10, 20)`
- Create a `Point` from a string: `new Point("10,20")`

Constructor overloading lets you support all these different ways in one class.

## How It Works

You provide multiple **signatures** (blueprints) showing different ways to call the constructor. Then you write one **implementation** that handles all the cases.

```
Signature 1: accepts (x: number, y: number)
Signature 2: accepts (s: string)
    ↓
    One implementation that handles both
```

## Simple Example

```typescript
class Point {
  x: number;
  y: number;

  // Overload signatures - different ways to create a Point
  constructor(x: number, y: number);
  constructor(s: string);
  
  // Implementation - handles both cases
  constructor(xs: any, y?: any) {
    if (typeof xs === 'string') {
      // If first parameter is a string, parse it
      const [x, yCoord] = xs.split(',').map(Number);
      this.x = x;
      this.y = yCoord;
    } else {
      // If parameters are numbers, use them directly
      this.x = xs;
      this.y = y;
    }
  }
}

// Way 1: Create with two numbers
const point1 = new Point(10, 20);
console.log(point1); // { x: 10, y: 20 }

// Way 2: Create with a string
const point2 = new Point('30,40');
console.log(point2); // { x: 30, y: 40 }
```

## Practical Example

A Date-like class that accepts different formats:

```typescript
class DateParser {
  month: number;
  day: number;
  year: number;

  // Overload signatures
  constructor(month: number, day: number, year: number);
  constructor(dateString: string);  // e.g., "12/25/2024"
  constructor(timestamp: number);   // e.g., 1703510400000

  // Implementation
  constructor(monthOrDate: any, day?: number, year?: number) {
    if (typeof monthOrDate === 'string') {
      // Handle "12/25/2024" format
      const [m, d, y] = monthOrDate.split('/').map(Number);
      this.month = m;
      this.day = d;
      this.year = y;
    } else if (typeof monthOrDate === 'number' && day === undefined) {
      // Handle timestamp - just parse the year for simplicity
      const date = new Date(monthOrDate);
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.year = date.getFullYear();
    } else {
      // Handle three numbers
      this.month = monthOrDate;
      this.day = day!;
      this.year = year!;
    }
  }

  display(): string {
    return `${this.month}/${this.day}/${this.year}`;
  }
}

// Three different ways to create the same date
const date1 = new DateParser(12, 25, 2024);
console.log(date1.display()); // 12/25/2024

const date2 = new DateParser('12/25/2024');
console.log(date2.display()); // 12/25/2024

const date3 = new DateParser(1703520000000);
console.log(date3.display()); // 12/25/2024
```

## Common Mistakes to Avoid

- **Implementation signature doesn't match** — The implementation must accept all parameter combinations from the overload signatures

```typescript
// ❌ Wrong - implementation doesn't match the second signature
class Point {
  constructor(x: number, y: number);
  constructor(s: string);
  
  constructor(x: number, y: number) { // Missing the string case!
    // ...
  }
}

// ✅ Correct - implementation accepts both
class Point {
  constructor(x: number, y: number);
  constructor(s: string);
  
  constructor(xs: any, y?: any) { // Handles both cases
    // ...
  }
}
```

- **Type checking inside implementation** — Always check the types inside the implementation to know which signature was used

```typescript
// ✅ Good - checks type
if (typeof xs === 'string') {
  // Handle string case
} else {
  // Handle number case
}
```

Learn more from the following resources:

- [@official@Constructors - TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html#constructors)
