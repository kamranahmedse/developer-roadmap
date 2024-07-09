# Subjects

RxSwift Subjects are a special type of Observable that act as both an observer and an observable. They can receive and emit values, serving as a bridge between the imperative and reactive programming paradigms. Subjects allow multiple observers to react to the same source of emitted items. RxSwift provides several types of Subjects, including PublishSubject (emits only new elements), BehaviorSubject (emits the latest element to new subscribers), ReplaySubject (buffers and re-emits a specified number of elements), and Variable (a deprecated wrapper around BehaviorSubject).

Learn more from the following resources:

- [@article@RxSwift Subjects Reference](https://docs.rxswift.org/rxswift/subjects)
- [@article@RxSwift Subjects](https://medium.com/@jhalekhnish/rxswift-subjects-45f65649aee6)
- [@official@ReactiveX Subject Documentation](https://reactivex.io/documentation/subject.html)