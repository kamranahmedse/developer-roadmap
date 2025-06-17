# Rate limiting

Rate limiting in RxJS refers to the practice of restricting the rate at which events or data can be emitted from an observable. This can be useful in situations where the rate of incoming data is higher than the rate at which it can be processed, or where there are limits on the number of requests that can be made to a server. There are a few different operators in RxJS that can be used for rate limiting, such as throttleTime and sampleTime. These operators can be used to limit the rate of emissions from an observable by discarding emissions that occur too frequently. Another operator is auditTime it emits the last value from the source Observable during periodic time windows.

Visit the following resources to learn more:

- [@article@throttleTime](https://www.learnrxjs.io/learn-rxjs/operators/filtering/throttletime)
- [@article@auditTime](https://www.learnrxjs.io/learn-rxjs/operators/filtering/audittime)
- [@article@Blogs and Tutorials on RxJS](https://blog.angular-university.io/functional-reactive-programming-for-angular-2-developers-rxjs-and-observables/)
