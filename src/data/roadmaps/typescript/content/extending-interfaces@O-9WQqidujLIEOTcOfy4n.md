# Extending Interfaces

In TypeScript, you can extend an interface by creating a new interface that inherits from the original interface using the "extends" keyword. The new interface can include additional properties, methods, or redefine the members of the original interface.

```typescript
interface Shape {
  width: number;
  height: number;
}

interface Square extends Shape {
  sideLength: number;
}

let square: Square = {
  width: 10,
  height: 10,
  sideLength: 10,
};
```

In this example, the `Square` interface extends the `Shape` interface and adds an additional property `sideLength`. A variable of type `Square` must have all the properties defined in both `Shape` and `Square` interfaces.

Learn more from the following links:

- [@article@Extending Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
