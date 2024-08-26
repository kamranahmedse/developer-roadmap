# Combination

Combination operators in RxJS are used to combine multiple observables into a single observable. There are several types of combination operators, including:

- Merge: merges multiple observables into a single observable that emits items from each source observable in a sequence.

- Concat: concatenates multiple observables into a single observable that emits the items from each source observable in sequence, one after the other.

- Zip: combines the items from multiple observables into a single observable by combining the items from each observable at a corresponding index.

- CombineLatest: combines the latest values from multiple observables into a single observable by emitting an item whenever any of the source observables emit an item.

- WithLatestFrom: combines the latest value from one observable with the latest values from multiple other observables.

- ForkJoin: combines the items from multiple observables into a single observable by emitting an item only after all of the source observables have emitted an item.

Further documentation can be found in the official RxJS documentation:

- Merge: https://rxjs.dev/api/operators/merge

- Concat: https://rxjs.dev/api/operators/concat

- Zip: https://rxjs.dev/api/operators/zip

- CombineLatest: https://rxjs.dev/api/operators/combineLatest

- WithLatestFrom: https://rxjs.dev/api/operators/withLatestFrom

- ForkJoin: https://rxjs.dev/api/index/function/forkJoin
