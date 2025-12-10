# Template Literal Types

Template literal types let you create patterns for strings using templates (just like string templates in JavaScript). You can match and validate strings that follow specific patterns.

## Why Use Template Literal Types?

Sometimes you need to validate that a string follows a specific format:
- Email addresses should match a pattern
- CSS classes might follow a naming convention
- Event names might be `"on" + ActionName`

Template literal types let you enforce these patterns at the type level.

## How It Works

Use backticks with `${}` placeholders, just like JavaScript string templates:

```typescript
type Pattern = `prefix_${string}`;
```

This type matches any string that starts with `"prefix_"` followed by any characters.

## Examples

### Simple Pattern: Greeting

```typescript
type Greeting = `Hello, ${string}`;

let a: Greeting = "Hello, World"; // OK
let b: Greeting = "Hi, World"; // Error: doesn't start with "Hello, "
```

### Event Handler Names

```typescript
type EventHandler = `on${string}`;

let clickHandler: EventHandler = "onClick"; // OK
let changeHandler: EventHandler = "onChange"; // OK
let myCustomEvent: EventHandler = "myCustomEvent"; // Error: doesn't start with "on"
```

### Database Column Names

```typescript
type ColumnName = `col_${string}`;

let userCol: ColumnName = "col_user_id"; // OK
let nameCol: ColumnName = "col_first_name"; // OK
let invalidCol: ColumnName = "user_id"; // Error: missing "col_" prefix
```

### Combining with Unions: CSS State Classes

```typescript
type CSSClass = `btn-${"primary" | "secondary" | "danger"}`;

let button1: CSSClass = "btn-primary"; // OK
let button2: CSSClass = "btn-secondary"; // OK
let button3: CSSClass = "btn-warning"; // Error: "warning" not allowed
```

### Real-World: API Route Names

```typescript
type ApiRoute = `/api/${string}`;

function fetchData(route: ApiRoute) {
  console.log(`Fetching from ${route}`);
}

fetchData("/api/users"); // OK
fetchData("/api/posts"); // OK
fetchData("/users"); // Error: missing "/api" prefix
```

## Advanced: Union of Patterns

```typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiEndpoint = `${HTTPMethod} /api/${string}`;

let endpoint1: ApiEndpoint = "GET /api/users"; // OK
let endpoint2: ApiEndpoint = "POST /api/users"; // OK
let endpoint3: ApiEndpoint = "PATCH /api/users"; // Error: PATCH not in union
```

## Tips

- **Use for validation**: Patterns help catch mistakes early
- **Combine with unions**: Mix literal types and unions for flexibility
- **Keep patterns simple**: Complex patterns can become hard to read
- **Document the pattern**: Add comments explaining what the pattern means

## Common Mistakes

- **Too strict patterns**: If your pattern is too specific, it becomes hard to use
- **Using in runtime**: Template literal types only exist at compile time—they're erased in JavaScript

Learn more from the following links:

- [@official@Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#handbook-content)
