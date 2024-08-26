# Lazy Loading Modules

By default, NgModules are eagerly loaded. This means that as soon as the application loads, so do all the NgModules, whether they are immediately necessary or not. For large applications with lots of routes, consider lazy loading —a design pattern that loads NgModules as needed. Lazy loading helps keep initial bundle sizes smaller, which in turn helps decrease load times.

Visit the following resources to learn more:

- [@official@Angular Official Docs - Lazy Loading](https://angular.dev/guide/ngmodules/lazy-loading)
- [@article@Angular Lazy Loading](https://www.bairesdev.com/blog/angular-lazy-loading/)
- [@video@Lazy Loading in Angular: Improving Performance and User Experience](https://www.youtube.com/watch?v=mjhi27YfV8Y)