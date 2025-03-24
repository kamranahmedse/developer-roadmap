# Control Statements in C++

Control statements direct the flow of your C++ program. Here's a concise overview:

---

## If-Else Statement
Executes a code block if a condition is true; otherwise, it executes an alternative block.
```cpp
if (condition) {
    // executed when condition is true
} else {
    // executed when condition is false
}
```

---

## Switch Statement
Selects and executes a block of code based on the value of an expression.
```cpp
switch (expression) {
    case value1:
        // executed for value1
        break;
    case value2:
        // executed for value2
        break;
    default:
        // executed if no case matches
}
```

---

## Goto Statement
Unconditionally jumps to a labeled statement within the same function (use sparingly).
```cpp
goto label;
// ...
label:
    // code to execute after jump
```

---

## For Loop
Repeats a block of code a specific number of times.
```cpp
for (initialization; condition; increment) {
    // repeated code block
}
```

---

## While Loop
Executes a block of code repeatedly as long as a condition remains true.
```cpp
while (condition) {
    // repeated code block
}
```

---

## Do-While Loop
Executes a block of code at least once, then repeats it while the condition remains true.
```cpp
do {
    // code block executed at least once
} while (condition);
```

---

These statements form the foundation of controlling program flow in C++.
