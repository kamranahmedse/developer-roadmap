# Swift Basics
Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch. It's designed to give developers more freedom than ever before. Swift is easy to use and open-source, making it a great language for both beginners and experienced developers.

### Key Concepts

1. **Variables and Constants**:
    
    - Variables are declared with `var` and can change their value.
    - Constants are declared with `let` and cannot change their value once set.
```swift
var variableName = "Hello"
let constantName = "World"
``` 

2. **Data Types**:

	- Common data types include `Int`, `Double`, `String`, and `Bool`.
```swift
var age: Int = 25
var pi: Double = 3.14
var name: String = "Matt"
var isSwiftAwesome: Bool = true
```

3. **Operators**:
	
	- Arithmetic operators: `+`, `-`, `*`, `/`
	- Comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`
	- Logical operators: `&&`, `||`, `!`

4. **Control Flow**:
	
	- Conditional statements: `if`, `else if`, `else`
	- Loops: `for-in`, `while`, `repeat-while`
```swift
if age > 18 {
    print("Adult")
} else {
    print("Minor")
}

for i in 1...5 {
    print(i)
}
```

5. **Functions**:
	
	- Functions are defined using the `func` keyword.
	- They can accept parameters and return values.
```swift
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

let greeting = greet(name: "Taylor")
print(greeting) // Output: Hello, Taylor!
```

6. **Optionals**:
	
	- Optionals are used to handle the absence of a value.
	- Declared with a `?` after the type.
```swift
var optionalString: String? = "Hello"
optionalString = nil
```

Visit the following resources to learn more:

- [@article@The Basics](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/)
- [@article@Swift Basics - Hacking with Swift](https://www.hackingwithswift.com/read/0/overview)
- [@article@The Swift Handbook](https://www.freecodecamp.org/news/the-swift-handbook/)
- [@course@iOS & Swift - The Complete iOS App Development Bootcamp](https://www.udemy.com/share/101WsW3@26pCYPCpNEWWEDxu2nNvOfnbcFGTcdgYawzvwQThekT_rrWlDfhmkV3rzDC0LSHuTA==/)
