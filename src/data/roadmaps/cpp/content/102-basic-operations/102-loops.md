# Loops in C++

Loops are an essential concept in programming that allow you to execute a block of code repeatedly until a specific condition is met. In C++, there are three main types of loops: `for`, `while`, and `do-while`.

## For Loop

A `for` loop is used when you know the number of times you want to traverse through a block of code. It consists of an initialization statement, a condition, and an increment/decrement operation.

Here's the syntax for a `for` loop:

```cpp
for (initialization; condition; increment/decrement) {
    // block of code to execute
}
```

For example:

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        cout << "Iteration: " << i << endl;
    }
    return 0;
}
```

## While Loop

A `while` loop runs as long as a specified condition is `true`. The loop checks for the condition before entering the body of the loop.

Here's the syntax for a `while` loop:

```cpp
while (condition) {
    // block of code to execute
}
```

For example:

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 0;
    while (i < 5) {
        cout << "Iteration: " << i << endl;
        i++;
    }
    return 0;
}
```

## Do-While Loop

A `do-while` loop is similar to a `while` loop, with the key difference being that the loop body is executed at least once, even when the condition is `false`.

Here's the syntax for a `do-while` loop:

```cpp
do {
    // block of code to execute
} while (condition);
```

For example:

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 0;
    do {
        cout << "Iteration: " << i << endl;
        i++;
    } while (i < 5);
    return 0;
}
```

## Range-for loop

A `range-for` loop is used when you want to iterate over a whole sequence, without the need to specify the container type and without the explicitly declaration of an iterator and it's incrementation/decrementation, the automatically managed iterator will start at the beginning of the sequence and keep executing the loop body statements, incrementing at the end, until it reachs the last element of the sequence.

Here's the syntax for a `range-for` loop:

```cpp
for (element : sequence) {
    // block of code to execute
}
```

For example:

```cpp
#include <iostream>
using namespace std;

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    for (auto number : numbers) {
        cout << number << " ";
    }
    // Here, the sequence numbers has the values {1, 2, 3, 4, 5}, with indexes 0, 1, 2, 3, 4, the range-for loop will start at index 0 {1} until it reachs index 4 {5}, printing 1 2 3 4 5 to the screen.
    return 0;
}
```

In summary, loops are an integral part of C++ programming that allow you to execute a block of code multiple times. The four types of loops in C++ are `for`, `while`, `do-while` and `range-for`. Each type has its own specific use case and can be chosen depending on the desired behavior.
