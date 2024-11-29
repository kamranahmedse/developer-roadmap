# Memory Safety and Zero-Cost Abstractions

Rust is a system programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety. It is graced with the feature of "memory safety without garbage collection," an attribute that makes Rust one of a kind. "Memory safety" is ensuring that software is not causing any memory leaks or dangling pointers while accessing the system's memory. In Rust, memory safety is accomplished through a system called ownership, with a set of rules that the compiler checks at compile time. This ownership system eliminates the need for garbage collection or manual memory management, thus ensuring swift execution of software and a safer memory environment. Rust's memory management features even support concurrent programming, providing options for shared and mutable state access that ensure thread safety while reducing the risk of thread unsafety.

<!-- Adding content on Zero-cost Abstraction -->

Zero-cost abstraction is another key concept Rust implements. In general, abstractions in programming languages allow code to be written at a high level (like in Python), while being able to run at a low level (like in C). However, these abstractions often come with a runtime cost. In contrast, Rust aims to provide many useful abstractions, such as iterators and closures, that don't sacrifice runtime performance. This means you can write high-level code in Rust, and the Rust compiler will optimize it to run as fast as manually written low-level code.

Learn more from the following resources:

- [@video@This Is How Rust Stops Memory Leaks](https://www.youtube.com/watch?v=DJdUjjOmyx8)
