# Record

Record constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.

```typescript
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
};
```

Learn more from the following links:

- [@article@Record<Keys, Type>](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)
