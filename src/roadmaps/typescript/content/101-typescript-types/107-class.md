# Class

In TypeScript, a class is a blueprint for creating objects with specific properties and methods. Classes are a fundamental concept in object-oriented programming. Here is an example of a simple class in TypeScript:

    ```
    class Car {
    make: string;
    model: string;
    year: number;
    
    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    
    drive() {
        console.log(`Driving my ${this.year} ${this.make} ${this.model}`);
    }
    }
    ```

Learn more from the following links:

- [Classes](https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html#classes)