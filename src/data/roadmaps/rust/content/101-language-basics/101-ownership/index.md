# Ownership System

In Rust, the concept of **ownership** is a key feature that governs how memory management works. Each value in Rust has its own designated "owner," and there can be only one owner for a value at a time. When the owner goes out of scope, whatever value it owns is automatically _dropped_ from memory. The three main facets of ownership include ownership rules, borrowing, and slices.

- **Ownership rules** play a key role in system performance and prevention of issues, such as null or dangling references.
- **Borrowing** is a mechanism where we allow something to _reference_ a value without taking _ownership_.
- **Slices** are a data type that does _not_ have ownership. Specifically, slices help in making a reference to a portion of a collection data type, like a `String`, `Array`, or `Vec`.
