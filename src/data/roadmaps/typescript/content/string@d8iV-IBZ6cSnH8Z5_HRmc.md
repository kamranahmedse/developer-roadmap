# string

## What is the String Type?

The `string` type is a primitive data type in TypeScript that represents textual data. A string is a sequence of characters—letters, numbers, symbols, or spaces. It's one of the most commonly used types because most applications need to display or process text.

Think of a string as a piece of text that can contain anything from a single character to an entire novel.

## Basic Usage

```typescript
let greeting: string = "Hello World";
let name: string = "John Doe";
let message: string = `Welcome to TypeScript`;

// Strings are used everywhere
let email: string = "user@example.com";
let address: string = "123 Main Street";
let username: string = "john_doe";
```

## Different Ways to Create Strings

```typescript
// Single quotes
const single: string = "Hello";

// Double quotes
const double: string = "Hello";

// Backticks (template literals) - allows interpolation
const template: string = `Hello`;
```

## Practical Examples

**Example 1: Building User Messages**

```typescript
const firstName: string = "Alice";
const lastName: string = "Johnson";
const email: string = "alice@example.com";

// Using template literals to create personalized messages
const greeting: string = `Welcome, ${firstName} ${lastName}!`;
const confirmationEmail: string = `A verification link has been sent to ${email}`;

console.log(greeting); // Welcome, Alice Johnson!
console.log(confirmationEmail); // A verification link has been sent to alice@example.com
```

**Example 2: String Manipulation**

```typescript
const userInput: string = "  hello world  ";

// Common string operations
const trimmed: string = userInput.trim(); // "hello world"
const uppercase: string = userInput.toUpperCase(); // "  HELLO WORLD  "
const lowercase: string = userInput.toLowerCase(); // "  hello world  "
const length: number = userInput.length; // 14

// Check if string contains certain text
const hasWorld: boolean = userInput.includes("world"); // true
```

**Example 3: Extracting Parts of Strings**

```typescript
const fullName: string = "John Doe";
const email: string = "user@example.com";

// Getting parts of a string
const firstName: string = fullName.substring(0, 4); // "John"
const domain: string = email.split("@")[1]; // "example.com"
```

**Example 4: Validating User Input**

```typescript
function validateUsername(username: string): boolean {
  // Username must be at least 3 characters
  return username.length >= 3 && username.length <= 20;
}

const user1: string = "ab"; // Too short
const user2: string = "alice_2024"; // Valid

console.log(validateUsername(user1)); // false
console.log(validateUsername(user2)); // true
```

## Template Literals: A Powerful Feature

Template literals (using backticks) allow you to embed expressions directly in strings, which is great for readability:

```typescript
const age: number = 25;
const hobby: string = "coding";

// Without template literals (harder to read)
const message1: string = "I am " + age + " years old and I love " + hobby;

// With template literals (much clearer)
const message2: string = `I am ${age} years old and I love ${hobby}`;

// Even supports multi-line strings
const poem: string = `
  Roses are red,
  Violets are blue,
  TypeScript is great,
  And strings are too!
`;
```

## Tips for Beginners

- **Strings are immutable**: Once created, you can't change them directly. Operations like `toUpperCase()` return a new string
- **Use template literals**: They make your code much more readable, especially when combining multiple values
- **Escape special characters**: Use backslash for quotes: `"He said \"Hi\""` or use different quote types
- **Choose appropriate variable names**: Names like `email`, `message`, `username` are clearer than `s` or `text`

## Real-World Use Cases

- **User input**: Forms, search boxes, login fields
- **Display content**: Messages, alerts, labels
- **Configuration**: File paths, API endpoints, settings
- **Data formatting**: Dates, phone numbers, addresses
- **Communication**: Email bodies, text notifications, chat messages

Learn more from the following links:

- [@official@Number, String, Boolean, Symbol and Object](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean)
