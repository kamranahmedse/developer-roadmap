# Ractors

Ractors are an actor-model concurrency abstraction in Ruby. They provide a way to achieve parallel execution by isolating state between different actors. Each Ractor has its own independent memory space, preventing data races and allowing for safer concurrent programming. Communication between Ractors happens through message passing, ensuring that data is explicitly transferred and not shared directly.

Visit the following resources to learn more:

- [@official@class Ractor](https://docs.ruby-lang.org/en/master/Ractor.html)
- [@article@An Introduction to Ractors in Ruby](https://blog.appsignal.com/2022/08/24/an-introduction-to-ractors-in-ruby.html)
- [@article@Ruby on Ractors: Parallel Execution Done Beautifully](https://medium.com/@dave_russell/ruby-on-ractors-parallel-execution-done-beautifully-c05a09d22102)
- [@video@Magesh, "Concurrency in Ruby: Threads, Fibers, and Ractors Demystified"](https://www.youtube.com/watch?v=LVHiq_SbQOE)