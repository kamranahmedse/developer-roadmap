# Scopes

In JavaScript, scope refers to the visibility of a variable or how it can be used after it is declared. The scope of a variable depends on the keyword that was used to declare it.

The three types of Scope are Global Scope, Function Scope, and Block Scope. Before ES6 (2015), JavaScript had only Global Scope and Function Scope with the `var` keyword. ES6 introduced `let` and `const` which allow Block Scope in JavaScript.

Global Scope: Variables declared outside any function or curly braces '{}' have Global Scope, and can be accessed from anywhere within the same Javascript code. `var`, `let` and `const` all provide this Scope.

Function Scope: Variables declared within a function can only be used within that same function. Outside that function, they are undefined. `var`, `let` and `const` all provide this Scope.

Block Scope: A block is any part of JavaScript code bounded by '{}'. Variables declared within a block can not be accessed outside that block. This Scope is only provided by the `let` and `const` keywords. If you declare a variable within a block using the `var` keyword, it will NOT have Block Scope.

Local Scope: Local variables are only recognized inside their functions, variables with the same name can be used in different functions. Local variables are created when a function starts, and deleted when the function is completed. `var`, `let` and `const` all provide this Scope.

Visit the following resources to learn more:

- [@article@javascript scope](https://wesbos.com/javascript/03-the-tricky-bits/scope)
- [@video@Understanding Global Local Function Block Scope](https://www.youtube.com/watch?v=_E96W6ivHng)
