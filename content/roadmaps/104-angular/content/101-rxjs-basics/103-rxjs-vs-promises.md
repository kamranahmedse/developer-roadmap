# Rxjs vs promises

<ResourceGroupTitle>Promise</ResourceGroupTitle>

A Promise handles a single event when an async operation completes or fails.

Note: There are Promise libraries out there that support cancellation, but ES6 Promise doesn't so far.

<ResourceGroupTitle>Observable</ResourceGroupTitle>

An Observable is like a Stream (in many languages) and allows to pass zero or more events where the callback is called for each event.

Often Observable is preferred over Promise because it provides the features of Promise and more. With Observable it doesn't matter if you want to handle 0, 1, or multiple events. You can utilize the same API in each case.

Observable also has the advantage over Promise to be cancellable. If the result of an HTTP request to a server or some other expensive async operation isn't needed anymore, the Subscription of an Observable allows to cancel the subscription, while a Promise will eventually call the success or failed callback even when you don't need the notification or the result it provides anymore.

While a Promise starts immediately, an Observable only starts if you subscribe to it. This is why Observables are called lazy.

Observable provides operators like map, forEach, reduce, ... similar to an array

There are also powerful operators like retry(), or replay(), ... that are often quite handy. A list of operators shipped with rxjs

Lazy execution allows to build up a chain of operators before the observable is executed by subscribing, to do a more declarative kind of programming.
