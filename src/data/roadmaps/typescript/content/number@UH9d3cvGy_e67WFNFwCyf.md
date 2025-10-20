# number

## What is the Number Type?

The `number` type is a primitive data type in TypeScript that represents numeric values. Unlike many other programming languages, TypeScript treats **all numeric values the same way**—whether they're integers (whole numbers) or floating-point numbers (decimals), they all use the `number` type.

## Key Characteristics

- Represents both integers and decimals
- Can represent positive, negative, and special values (Infinity, -Infinity, NaN)
- Is the most flexible numeric type in TypeScript

## Basic Usage

```typescript
let intValue: number = 42; // Whole number
let floatValue: number = 3.14; // Decimal number
let negativeValue: number = -100; // Negative number
let special: number = Infinity; // Special value

// Real-world examples
let userAge: number = 25;
let productPrice: number = 19.99;
let score: number = 95;
```

## Practical Examples

**Example 1: E-commerce Pricing**

```typescript
const productPrice: number = 29.99;
const taxRate: number = 0.08;
const finalPrice: number = productPrice * (1 + taxRate);

console.log(`Total: $${finalPrice.toFixed(2)}`); // Total: $32.39
```

**Example 2: Temperature Calculations**

```typescript
function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

const tempInCelsius: number = 25;
const tempInFahrenheit: number = celsiusToFahrenheit(tempInCelsius);
console.log(`${tempInCelsius}°C = ${tempInFahrenheit}°F`);
```

**Example 3: Game Scoring**

```typescript
let playerScore: number = 1000;
let bonusMultiplier: number = 1.5;

function calculateFinalScore(score: number, multiplier: number): number {
  return score * multiplier;
}

const finalScore: number = calculateFinalScore(playerScore, bonusMultiplier);
```

## Common Numeric Operations

```typescript
const a: number = 10;
const b: number = 3;

console.log(a + b); // 13 (addition)
console.log(a - b); // 7 (subtraction)
console.log(a * b); // 30 (multiplication)
console.log(a / b); // 3.333... (division)
console.log(a % b); // 1 (modulo/remainder)
console.log(a ** b); // 1000 (exponentiation)
```

## Special Numeric Values

```typescript
const infinity: number = Infinity; // Represents infinity
const negInfinity: number = -Infinity; // Represents negative infinity
const notANumber: number = NaN; // "Not a Number" - result of invalid operations

// Checking for NaN (the only value that's not equal to itself!)
console.log(isNaN(notANumber)); // true
console.log(Number.isNaN(notANumber)); // true (safer method)
```

## Tips for Beginners

- Use descriptive variable names that hint at the value (like `playerScore`, `discount`, `temperature`)
- Be careful with floating-point arithmetic due to precision issues
- Use `Number.isInteger()` to check if a number is a whole number
- Remember: TypeScript doesn't distinguish between integers and decimals—they're both `number`

Learn more from the following links:

- [@official@Number, String, Boolean, Symbol and Object](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean)
