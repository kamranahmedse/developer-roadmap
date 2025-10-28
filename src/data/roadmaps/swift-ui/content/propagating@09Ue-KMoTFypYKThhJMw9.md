# Error Propagation

Error propagation in Swift is the process of passing an error up the call stack until it's handled by a `catch` block. When a function encounters an error it can't resolve, it `throws` the error. The calling function then has the responsibility to either handle the error using a `do-catch` block or to propagate the error further up the chain by also declaring that it `throws`. This continues until the error is caught and handled, preventing the program from crashing and allowing for graceful error recovery.

Visit the following resources to learn more:

- [@official@Propagating Errors Using Throwing Functions](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling/#Propagating-Errors-Using-Throwing-Functions)
- [@article@Propagate Swift Errors Using Throwing Functions](https://www.kodeco.com/books/swift-cookbook/v1.0/chapters/2-propagate-swift-errors-using-throwing-functions)