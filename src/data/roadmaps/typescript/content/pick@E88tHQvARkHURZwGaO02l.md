# Pick

Pick constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

Learn more from the following links:

- [@official@Pick<Type, Keys>](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)
