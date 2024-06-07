# Hashset

`HashSet` in Rust is a collection of unique elements. It's a data structure which stores details in the form of key and value, and it uses `hashing` to store elements. It's implemented as a `hash table`, as it makes use of a hasher to make the structure more secure against collision attacks. A `HashSet` only contains keys, associating the value portion of the map with a dummy unit. The value of `HashSet` returns an iterator over the elements of the set and these elements are arbitrary and not in any specific order.

Learn more from the following links:

- [@article@Hashset](https://doc.rust-lang.org/rust-by-example/std/hash/hashset.html)