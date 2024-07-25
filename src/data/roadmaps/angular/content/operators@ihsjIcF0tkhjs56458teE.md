# RxJS Operators

RxJS is mostly useful for its operators, even though the Observable is the foundation. Operators are the essential pieces that allow complex asynchronous code to be easily composed in a declarative manner.

Operators are functions. There are two kinds of operators:

**Pipeable Operators** are the kind that can be piped to Observables using the syntax observableInstance.pipe(operator()). These include, filter(...), and mergeMap(...). When called, they do not change the existing Observable instance. Instead, they return a new Observable, whose subscription logic is based on the first Observable.

A Pipeable Operator is essentially a pure function which takes one Observable as input and generates another Observable as output. Subscribing to the output Observable will also subscribe to the input Observable.

**Creation Operators** are the other kind of operator, which can be called as standalone functions to create a new Observable. For example: of(1, 2, 3) creates an observable that will emit 1, 2, and 3, one right after another. Creation operators will be discussed in more detail in a later section.

## Piping

Pipeable operators are functions, so they could be used like ordinary functions: op()(obs) — but in practice, there tend to be many of them convolved together, and quickly become unreadable: op4()(op3()(op2()(op1()(obs)))). For that reason, Observables have a method called .pipe() that accomplishes the same thing while being much easier to read:

```bash
 obs.pipe(op1(), op2(), op3(), op4());
```

## Creation Operators

**What are creation operators?** Distinct from pipeable operators, creation operators are functions that can be used to create an Observable with some common predefined behavior or by joining other Observables.

A typical example of a creation operator would be the interval function. It takes a number (not an Observable) as input argument, and produces an Observable as output:

```bash
import { interval } from 'rxjs';

const observable = interval(1000 /* number of milliseconds */);
```

Visit the following resources to learn more:

- [@article@List of creation operators](https://rxjs.dev/guide/operators#creation-operators-list)
- [@article@Full RxJS Operators Documentation](https://rxjs.dev/guide/operators)
