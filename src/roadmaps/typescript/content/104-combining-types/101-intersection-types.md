# Intersection Types

Intersection Types in TypeScript allow you to combine multiple types into a single type. An intersection type is written as an ampersand (&) separated list of types.

For example, consider an object that has both a name property and a email property:

    ```
    interface User {
    name: string;
    email: string;
    }

    const user: User = {
    name: 'John Doe',
    email: 'johndoe@example.com'
    };
    ```

Learn more from the following links:

- [Intersection Types](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types)
- [Implement Intersection Types in the Typescript](https://www.youtube.com/watch?v=adr7W5uyIMk)