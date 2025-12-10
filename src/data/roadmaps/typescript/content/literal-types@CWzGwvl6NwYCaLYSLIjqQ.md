# Literal Types

Literal types let you specify exact values instead of just types. Instead of "this is a number," you say "this must be exactly 42."

## Why Use Literal Types?

Imagine a function that accepts directions: `"up"`, `"down"`, `"left"`, or `"right"`. You could say "any string," but what if someone passes `"diagonal"`? Literal types let you be precise:

```typescript
// Without literal types (less safe)
function move(direction: string) { }
move("diagonal"); // Oops, accepted an invalid direction!

// With literal types (safe)
function move(direction: "up" | "down" | "left" | "right") { }
move("diagonal"); // Error! Only valid directions allowed
```

## How It Works

Use the actual value as a type:

```typescript
type Exact42 = 42; // This variable must be exactly 42
let x: Exact42 = 42; // OK
let y: Exact42 = 43; // Error
```

## Examples

### Number Literals

```typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function roll(result: DiceRoll) {
  console.log(`You rolled: ${result}`);
}

roll(3); // OK
roll(7); // Error: 7 is not in 1-6
```

### String Literals

```typescript
type Status = "pending" | "approved" | "rejected";

function updateStatus(status: Status) {
  console.log(`Application is ${status}`);
}

updateStatus("approved"); // OK
updateStatus("waiting"); // Error: "waiting" is not a valid status
```

### Boolean Literals

```typescript
type OnlyTrue = true;

let feature: OnlyTrue = true; // OK
let disabled: OnlyTrue = false; // Error
```

### Practical Example: API Response Handler

```typescript
type HttpStatus = 200 | 404 | 500;

function handleResponse(status: HttpStatus, data: any) {
  if (status === 200) {
    console.log("Success:", data);
  } else if (status === 404) {
    console.log("Not found");
  } else if (status === 500) {
    console.log("Server error");
  }
}

handleResponse(200, { id: 1 }); // OK
handleResponse(201, { id: 1 }); // Error: 201 is not allowed
```

## Literal Types vs Regular Types

| Regular Type | Literal Type |
|---|---|
| `let x: string` | `let x: "hello"` |
| Accepts any string | Accepts only "hello" |
| `let x: number` | `let x: 42` |
| Accepts any number | Accepts only 42 |

## Tips

- **Combine with Union Types**: Use `|` to list valid values: `"yes" | "no"`
- **Use for constants**: Literal types are great for fixed values
- **Better error messages**: TypeScript will tell you exactly which values are allowed
- **Prevents typos**: String literal types catch spelling mistakes at compile time

Learn more from the following links:

- [@official@Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
