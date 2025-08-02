# var vs :=

In Go (Golang), both var and := are used to declare variables, but they differ in **syntax**, **scope**, and **usage**.

🔹 var Keyword
--------------

Syntax:
-------
`var variableName type = value `

Features:
---------

*   Can be used **outside and inside** functions.
    
*   Type can be **explicit** or **inferred**.
    
*   Allows **zero-value initialization** when no value is assigned.
    

Examples:
---------
```
// Explicit type and value  
var x int = 42  
// Type inference  
var y = "hello"  
// Zero-value initialization  
var z int // z is 0
 ```

Use Case:
---------

*   When you need to declare a **package-level (global)** variable.
    
*   When you want to **specify type explicitly**.
    
*   When you want to assign the **zero value** to a variable.
    

🔸 := Short Variable Declaration
--------------------------------

Syntax:
-------
`variableName := value `

Features:
---------

*   Used **only inside functions**.
    
*   Type is **inferred automatically**.
    
*   Cannot be used for **redeclaration** in the same scope.
    

Example:
--------
```
a := 100     // Type is int      
b := "world" // Type is string      
c := true    // Type is bool
```

Use Case:
---------

*   When declaring variables **locally inside functions**.
    
*   When you want **quick variable declaration** with automatic type inference.
