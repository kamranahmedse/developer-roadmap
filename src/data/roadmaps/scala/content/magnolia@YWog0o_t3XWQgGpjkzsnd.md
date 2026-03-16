# Magnolia

Magnolia is a generic macro for automatic materialization of typeclasses for datatypes composed from case classes (products) and sealed traits (coproducts). It supports recursively-defined datatypes out-of-the-box and incurs no significant time penalty during compilation. Magnolia provides a simple interface for handling products and coproducts, which is then used by the Magnolia macro to derive typeclasses automatically.

Visit the following resources to learn more:

- [@article@Blending Magnolia with Circe's trick for automatic derivation](https://stackoverflow.com/questions/50544041/blending-magnolia-with-circes-trick-for-automatic-derivation)
- [@article@Intermediate's guide to derivations in Scala: Magnolia](https://blog.michal.pawlik.dev/posts/scala/scala-derivations-show/)