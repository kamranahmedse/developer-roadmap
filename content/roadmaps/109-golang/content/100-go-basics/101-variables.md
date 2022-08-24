# Variables in Go

Go provide multiple ways to declare and use variables :

- The standard way to declare varibales in go is to use `var` keyword then provide the variable name and its type next to it , 
- Go provide **type inference** so you dont have to expilicitly provide variable types unless you have to 
- You can create and asign varibales in a compact syntax
- varibales can be created in different ways
    - single 
    - compound 
    - in a block


```go
// Single variable creation :
var a = 3 
var a int = 3  
var a int 
a = 3


// Compound variables creation :
var a, b, c, = 1, 3, "Hello"

// Block variables creation :
var ( 
	a int = 1
   	b string = "Hello"
)

// Create and asign variables :
a := 3
a, b := 3, "Hello"

```



<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://gobyexample.com/variables'>Go by Example: Variables</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.w3schools.com/go/go_variables.php'>w3schools Go variables</BadgeLink>
