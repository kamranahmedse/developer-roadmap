# Slow Computations

On every change detection cycle, Angular synchronously evaluates all template expressions in components based on their detection strategy and executes the `ngDoCheck`, `ngAfterContentChecked`, `ngAfterViewChecked`, and `ngOnChanges` lifecycle hooks. To remove slow computations, you can optimize algorithms, cache data with pure pipes or memoization, and limit lifecycle hook usage.

Visit the following resources to learn more:

- [@official@Slow Computations](https://angular.dev/best-practices/slow-computations)
- [@article@Angular Performance Optimization](https://davembush.medium.com/angular-performance-optimization-5ec630d2b8f1)