# Hashmap

The `HashMap` in Rust is part of the standard library's collections framework and it's a generic collection of key-value pairs. It allows for the quick lookup, insertion, and removal of items using hashing. A `HashMap<K, V>` holds a mapping of keys of type `K` to values of type `V`. The keys are unique and when a key gets inserted for the second time with a different value, the new value replaces the old value. Rust's `HashMap` uses a cryptographically strong hashing algorithm which can help avoid denial-of-service (DoS) attacks. It is however not ordered, so items may not be in the same order as they were inserted.

Learn more from the following links:

- [@official@HashMap in std::collections - Rust](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
- [@official@Storing Keys With Associated Values In Hash Maps](https://doc.rust-lang.org/book/ch08-03-hash-maps.html?highlight=hashmap#storing-keys-with-associated-values-in-hash-maps)
- [@article@Hash Table](https://en.wikipedia.org/wiki/Hash_table)
- [@video@HashMaps: key-value stores in Rust](https://www.youtube.com/watch?v=BfmSYuDdg8Q)
