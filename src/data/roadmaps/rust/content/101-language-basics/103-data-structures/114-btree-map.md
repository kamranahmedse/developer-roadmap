# BTreeMap

In Rust, `BTreeMap` is a generic collection that stores data in a sorted tree structure. More specifically, it uses a self-balancing binary search tree (a type of `B+-tree`). `BTreeMap`s implement the `Map` trait, including methods such as `get`, `insert`, `remove`, and many others. The data stored in a `BTreeMap` will be sorted by key, which allows efficient lookup, insertions, and removals. The keys of the `BTreeMap` must implement the `Ord` trait, which means they must be orderable. Because `BTreeMap`s store data in a sorted order, the iteration of keys and values will be in sorted order as well.

Learn more from the following links:

- [@article@BTreeMap](https://doc.rust-lang.org/std/collections/struct.BTreeMap.html)
- [@article@BTreeMap](https://cglab.ca/~abeinges/blah/rust-btree-case/)
