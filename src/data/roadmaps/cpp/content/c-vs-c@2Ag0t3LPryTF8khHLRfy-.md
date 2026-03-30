# C vs C++

C and C++ are two popular programming languages with some similarities, but they also have key differences. C++ is an extension of the C programming language, with added features such as object-oriented programming, classes, and exception handling. Although both languages are used for similar tasks, they have their own syntax and semantics, which makes them distinct from each other.

Syntax and Semantics
--------------------

### C

*   C is a procedural programming language.
*   Focuses on functions and structured programming.
*   Does not support objects or classes.
*   Memory management is manual, using functions like `malloc` and `free`.

Here's an example of manual memory management in C:

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[20];
    int score;
} Player;

int main() {
    // 1. Allocate: malloc needs the exact byte size
    Player* p = (Player*)malloc(sizeof(Player));
    
    if (p != NULL) {
        // 2. Initialize: You MUST do this manually
        strcpy(p->name, "AdrianMtzTrev");
        p->score = 0;
        
        printf("Player %s joined with score %d\n", p->name, p->score);
        
        // 3. Free: Just drops the memory
        free(p);
    }
    return 0;
}
```

### C++

*   C++ is both procedural and object-oriented.
*   Supports both functions and classes.
*   Incorporates different programming paradigms.
*   Memory management can be manual (like C) or rely on constructors/destructors and smart pointers.

Here's the equivalent example using C++ classes:

```cpp
#include <iostream>
#include <string>

class Player {
public:
    std::string name;
    int score;

    // Constructor: Runs automatically during 'new'
    Player(std::string n) : name(n), score(0) {
        std::cout << name << " enters the game!\n";
    }

    // Destructor: Runs automatically during 'delete'
    ~Player() {
        std::cout << name << " has left the game.\n";
    }
};

int main() {
    // 1. Create: Allocates AND initializes in one step
    Player* p = new Player("Elizabeth");

    std::cout << "Current score: " << p->score << std::endl;

    // 2. Destroy: Runs the destructor first, then releases memory
    delete p; 

    return 0;
}
```

With **smart pointers**

```cpp
int main() {
    // The "Modern" C++ way - no 'delete' required!
    auto p = std::make_unique<Player>("Ricardo");
    std::cout << "Current score: " << p->score << std::endl;
} // p is automatically destroyed here
```


Code Reusability and Modularity
-------------------------------

### C

*   Code reusability is achieved through functions and modular programming.
*   High cohesion and low coupling are achieved via structured design.
*   Function libraries can be created and included through headers.

### C++

*   Offers better code reusability with classes, inheritance, and polymorphism.
*   Code modularity is enhanced through namespaces and well-designed object-oriented hierarchy.

Error Handling
--------------

### C

*   Error handling in C is done primarily through return codes.
*   Lacks support for exceptions or any built-in error handling mechanism.

### C++

*   Offers exception handling, which can be used to handle errors that may occur during program execution.
*   Enables catching and handling exceptions with `try`, `catch`, and `throw` keywords, providing more control over error handling.

Conclusion
----------

Both C and C++ are powerful languages with unique features and capabilities. While C is simpler and focuses on procedural programming, C++ offers the versatility of using different programming paradigms and improved code organization. Understanding the differences between these two languages can help you decide which one is more suitable for your specific needs and programming style.