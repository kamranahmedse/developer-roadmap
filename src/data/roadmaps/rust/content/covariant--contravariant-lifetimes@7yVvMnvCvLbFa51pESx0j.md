# Covariant and Contravariant Lifetimes

Variance describes how subtyping relationships change when types are nested. Covariant types preserve ordering (`&'long T` is subtype of `&'short T`), contravariant reverses it, invariant requires exact matches. Affects how lifetimes work with references, boxes, and function parameters.