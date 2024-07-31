# Creating Components

The Angular CLI is a command-line interface tool which allows you to scaffold, develop, test, deploy, and maintain
Angular applications directly from a command shell.

We also use Angular CLI to generate components via: 

```shell
ng generate component [name] [options]
```

or the shorthand

```shell
ng g c [name] [options]
```

To use the above command, we must meet the following conditions:
- Installed the correct version of `node.js`
- Installed the latest version of Angular via `npm install -g @angular/cli`

The CLI generates the following files: 
- `*name*.component.html` - the template file
- `*name*.component.css` - the styles file
- `*name*.component.ts` - the TypeScript file containing the component class
- `*name*.component.spec.ts` - the unit test file

Visit the following resources to learn more:

- [@official@Build your first Angular app](https://angular.dev/tutorials/first-app)
- [@official@Components](https://angular.dev/essentials/components)
- [@official@Angular CLI - ng generate components](https://angular.dev/guide/components)
