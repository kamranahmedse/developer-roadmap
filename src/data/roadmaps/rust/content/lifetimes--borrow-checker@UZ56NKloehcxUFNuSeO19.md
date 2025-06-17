# Lifetimes and Borrow Checker

Lifetimes define how long references remain valid, preventing dangling references and memory safety issues. The borrow checker enforces these rules at compile time. Lifetime annotations use syntax like `'a` to specify relationships between references in function signatures when the compiler can't infer them automatically.