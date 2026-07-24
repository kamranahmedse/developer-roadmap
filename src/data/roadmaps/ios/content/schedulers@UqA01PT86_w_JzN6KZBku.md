# Schedulers
 
Schedulers in RxSwift control on which thread or queue Observable work executes. MainScheduler runs work on the main thread for UI updates, while ConcurrentDispatchQueueScheduler and SerialDispatchQueueScheduler run work on background queues. The observeOn and subscribeOn operators specify which scheduler handles observation and subscription respectively.

Visit the following resources to learn more:

- [@official@ReactiveX Scheduler Documentation](https://reactivex.io/documentation/scheduler.html)
- [@opensource@RxSwift Scheduler Documentation](https://github.com/ReactiveX/RxSwift/blob/main/Documentation/Schedulers.md)
- [@article@RxSwift Schedulers](https://docs.rxswift.org/rxswift/schedulers)