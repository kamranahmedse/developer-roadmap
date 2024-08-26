# Interface

TypeScript allows you to specifically type an object using an interface that can be reused by multiple objects.

```typescript
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return 'Hello ' + person.name;
}
```

Learn more from the following links:

- [@article@Object Types - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
