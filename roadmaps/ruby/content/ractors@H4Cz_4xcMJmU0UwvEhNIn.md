# Ractors

Ractors are an actor-model-based concurrency abstraction in Ruby, designed to allow for parallel execution. They provide a way to isolate data and execution between different parts of a program, minimizing shared mutable state and thus simplifying concurrent programming by preventing common issues like race conditions. Each Ractor runs in its own thread and has its own isolated heap, communicating with other Ractors through message passing.

Visit the following resources to learn more:

- [@official@Ractor](https://docs.ruby-lang.org/en/3.4/ractor_md.html)
- [@article@An Introduction to Ractors in Ruby](https://blog.appsignal.com/2022/08/24/an-introduction-to-ractors-in-ruby.html)