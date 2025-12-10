# Extract

Keep only specific types from a union using `Extract<Type, Union>`.

## Why Use This?

`Extract` is the opposite of `Exclude`. Instead of removing types from a union, you keep only the ones that match. It's useful when you want to filter a union down to just the types you need.

## How It Works

`Extract` looks at all the types in a union and keeps only the ones that match what you're looking for. Think of it like filtering a list to keep only the items you want.

## Examples

### Basic Example: Keep Only Strings

```typescript
// You have multiple types in a union
type Value = 'a' | 'b' | 'c' | number | boolean;

// Keep only the strings
type StringValues = Extract<Value, string>;
// Result: 'a' | 'b' | 'c'

const str: StringValues = 'a';  // ✓ OK
const num: StringValues = 42;    // ✗ Error: not a string
```

### Practical Example: Filter Event Types

```typescript
// You have different event types
type Event = 
  | { type: 'click'; button: number }
  | { type: 'scroll'; y: number }
  | { type: 'keypress'; key: string }
  | { type: 'resize'; width: number };

// Keep only pointer events (click and scroll)
type PointerEvent = Extract<Event, { type: 'click' | 'scroll' }>;
// Result: 
// | { type: 'click'; button: number }
// | { type: 'scroll'; y: number }

function handlePointerEvent(event: PointerEvent) {
  if (event.type === 'click') {
    console.log(event.button);
  } else if (event.type === 'scroll') {
    console.log(event.y);
  }
}
```

### Example: Extract Function Types

```typescript
type Mixed = string | number | (() => void) | boolean | ((x: string) => string);

// Keep only function types
type Functions = Extract<Mixed, Function>;
// Result: (() => void) | ((x: string) => string)
```

### Example: Extract Specific Literal Types

```typescript
type HttpStatus = 200 | 404 | 500 | 503;

// Keep only success and not found statuses
type CommonStatuses = Extract<HttpStatus, 200 | 404>;
// Result: 200 | 404

function handleCommonStatus(status: CommonStatuses) {
  if (status === 200) {
    console.log('Success!');
  } else {
    console.log('Not found');
  }
}
```

## Common Mistakes to Avoid

- **Type doesn't exist in the union**: If you try to extract a type that isn't in the union, you get `never`

```typescript
type Color = 'red' | 'blue' | 'green';

// ✗ 'yellow' doesn't exist in the union
type Result = Extract<Color, 'yellow'>; // never (empty type)

// ✓ Extract something that exists
type Result2 = Extract<Color, 'red' | 'blue'>; // 'red' | 'blue'
```

- **Confusion with Exclude**: Remember, `Extract` *keeps* types, while `Exclude` *removes* them

```typescript
type Status = 'pending' | 'success' | 'error';

// Extract: keep only these
type Good = Extract<Status, 'success'>; // 'success'

// Exclude: remove these
type NotError = Exclude<Status, 'error'>; // 'pending' | 'success'
```

## Extract vs Exclude

- Use **`Extract`** to keep only specific types from a union
- Use **`Exclude`** to remove specific types from a union

```typescript
type Response = 'loading' | 'success' | 'error' | 'timeout';

// Keep only final states (not loading)
type FinalState = Extract<Response, 'success' | 'error' | 'timeout'>;

// Or remove loading state
type AlsoFinal = Exclude<Response, 'loading'>; // Same result!
```

## Learn More

- [@official@Extract<Type, Union>](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union)
