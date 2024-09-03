# Hybrid Types

In TypeScript, a hybrid type is a type that combines multiple types into a single type. The resulting type is considered a union of those types. This allows you to specify that a value can have multiple types, rather than just one.

For example, you can create a hybrid type that can accept either a string or a number:

```typescript
type StringOrNumber = string | number;
```

You can also use hybrid types to create more complex types that can represent a combination of several different types of values. For example:

```typescript
type Education = {
  degree: string;
  school: string;
  year: number;
};

type User = {
  name: string;
  age: number;
  email: string;
  education: Education;
};
```

Learn more from the following links:

- [@official@Geeksforgeeks.org - Hybrid Types](https://www.geeksforgeeks.org/what-are-hybrid-types-in-typescript/#:~:text=Hybrid%20types%20are%20a%20combination,properties%20like%20a%20regular%20object.)
