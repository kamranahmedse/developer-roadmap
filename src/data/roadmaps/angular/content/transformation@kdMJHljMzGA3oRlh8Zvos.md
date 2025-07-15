# Transformation

In RxJS, "transformation" refers to the process of modifying or manipulating the data emitted by an Observable. There are a variety of methods available in RxJS that can be used to transform the data emitted by an Observable, including:

- **map**: applies a function to each item emitted by the Observable and emits the resulting value
- **mergeMap**: applies a function to each item emitted by the Observable, and then merges the resulting Observables into a single Observable
- **switchMap**: applies a function to each item emitted by the Observable, and then switches to the latest resulting Observable
- **concatMap**: applies a function to each item emitted by the Observable, and then concatenates the resulting Observables into a single Observable
- **exhaustMap**: applies a function to each item emitted by the Observable, but ignores subsequent emissions until the current Observable completes

Visit the following resources to learn more:

- [@official@The RxJS Library](https://v17.angular.io/guide/rx-library)
- [@official@Merge](https://www.learnrxjs.io/learn-rxjs/operators/combination/merge)
- [@official@Concat](https://www.learnrxjs.io/learn-rxjs/operators/combination/concat)
- [@official@Zip](https://www.learnrxjs.io/learn-rxjs/operators/combination/zip)
- [@official@switchMap](https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap)
- [@official@concatMap](https://www.learnrxjs.io/learn-rxjs/operators/transformation/concatMap)
- [@official@exhaustMap](https://www.learnrxjs.io/learn-rxjs/operators/transformation/exhaustMap)
- [@video@switchMap vs mergeMap vs concatMap vs exhaustMap practical guide](https://youtu.be/40pC5wHowWw)
