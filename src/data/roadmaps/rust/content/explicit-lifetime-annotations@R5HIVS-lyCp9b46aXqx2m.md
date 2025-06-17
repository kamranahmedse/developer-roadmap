# Explicit Lifetime Annotations

Explicit lifetime annotations use syntax like `'a` to specify relationships between reference lifetimes in function signatures. Required when the compiler can't infer lifetimes automatically. Example: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str` ensures all references live equally long.