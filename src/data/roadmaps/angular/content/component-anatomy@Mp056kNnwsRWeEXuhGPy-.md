# Component Anatomy

Angular components are the foundational building blocks of Angular applications, designed to encapsulate both the UI and
the business logic.

Every component must have:

- A TypeScript class with behaviors
- An HTML template
- A CSS selector

An example of valid Angular Component:

```typescript
@Component({
    selector: 'hello-world',
    template: `<span>Say Hello <b>{{ message }}</b></span>`,
})
export class HelloWorld {
    message = "World";
}
```

Visit the following resources to learn more:

- [@official@Anatomy of a component](https://angular.dev/guide/components)

