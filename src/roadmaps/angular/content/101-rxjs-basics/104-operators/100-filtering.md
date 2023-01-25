# Filtering

It provides a variety of filtering operators that you can use to filter and transform the data in a stream.

  - filter(): This operator filters out values from the stream that do not meet a certain condition.

  - distinctUntilChanged(): This operator filters out consecutive duplicate values in the stream.

  - take(): This operator takes a specified number of values from the beginning of the stream.

  - takeLast(): This operator takes a specified number of values from the end of the stream.

  - skip(): This operator skips a specified number of values from the beginning of the stream.

  - skipLast(): This operator skips a specified number of values from the end of the stream.

  - first(): This operator emits the first value from the stream and then completes.

  - last(): This operator emits the last value from the stream and then completes.

  - single(): This operator emits the only value from the stream and then completes.

  - throttle() : This operator emits a value from the source Observable, then ignores subsequent source values for a duration determined by another Observable, then repeats this process.

These are some of the most commonly used filtering operators in RxJS. You can use these operators in combination with other RxJS operators to create powerful and efficient data processing pipelines.

Visit the following resources to learn more:

- [Understanding RxJS Operators]( https://rxjs.dev/api/operators)
