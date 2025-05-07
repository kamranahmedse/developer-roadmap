# Control Flow & Statements

Introduction to Control Flow Statements in C++
Control flow statements are critical components of programming that allow developers to dictate the order in which instructions are executed in a program. In C++, control flow helps to create dynamic and efficient programs that can respond to different inputs or conditions. There are three main categories of control flow statements in C++:

Conditional Statements: These allow a program to make decisions based on conditions. Common examples are if, else, and else if.
Example:
cpp
Run Code
Copy code
if (x > 0) {
    cout << "Positive number";
} else {
    cout << "Non-positive number";
}
Iteration (Looping) Statements: Loops are used to perform repetitive tasks. Examples include for, while, and do while.
Example:
cpp
Run Code
Copy code
for (int i = 0; i < 5; i++) {
    cout << i << " ";
}
Branching Statements: These modify the normal flow of execution. Examples include switch, break, continue, and goto.
Example:
cpp
Run Code
Copy code
switch (day) {
    case 1:
        cout << "Monday";
        break;
    case 2:
        cout << "Tuesday";
        break;
    default:
        cout << "Other";
}
Understanding control flow is important because it allows your program to be flexible and adaptive, making it capable of solving real-world problems more effectively.

Video on the topic is useful:
https://www.youtube.com/watch?v=a3IZ8WaIFAA
