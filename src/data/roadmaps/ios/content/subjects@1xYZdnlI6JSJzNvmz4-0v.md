# Subjects
 
Subjects in RxSwift act as both Observables and Observers, making them useful for bridging non-reactive code into reactive streams. PublishSubject emits only new items to subscribers; BehaviorSubject replays the last value to new subscribers; and ReplaySubject replays a configurable number of past values. Subjects are commonly used as input channels in MVVM ViewModels.

Visit the following resources to learn more:

- [@official@ReactiveX Subject Documentation](https://reactivex.io/documentation/subject.html)
- [@article@RxSwift Subjects Reference](https://docs.rxswift.org/rxswift/subjects)
- [@article@RxSwift Subjects](https://medium.com/@jhalekhnish/rxswift-subjects-45f65649aee6)