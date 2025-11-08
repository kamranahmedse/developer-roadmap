# If-Else / Switch / Goto

C++ provides you with tools which helps you to control the way your program behaves (logic flows) based on how the user interact with your program. Here we will discuss about `if-else`, `switch` and `goto` are three common ways to guide the flow of logic in your code.

### if-else

Use if-else when you want your program to choose between two possible actions.

```cpp
#include <iostream>
using namespace std;

int main() {
    int age = 18;

    if (age >= 18) {
        cout << "You can vote!" << endl;
    } else {
        cout << "Too young to vote." << endl;
    }

    return 0;
}
```

Explanation:
The program checks the condition inside if.
If it’s true, the first block runs.
If it’s false, the else block runs.


### switch

Use switch when you have multiple possible outcomes for one variable.
It’s often cleaner than using many if-else statements.

```cpp
#include <iostream>
using namespace std;

int main() {
    int day = 3;

    switch (day) {
        case 1: cout << "Monday"; break;
        case 2: cout << "Tuesday"; break;
        case 3: cout << "Wednesday"; break;
        default: cout << "Invalid day";
    }

    return 0;
}
```

    
Explanation:

- The value of "day" is compared with each "case".
- When a match is found, that block runs.
- "break" stops further checking.
- "default" runs if no case matches.


### goto

The goto statement allows you to jump directly to another part of your code.
Although it works, it is not recommended because it makes programs harder to understand and maintain.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 5;

    if (x == 5)
        goto label;

    cout << "This line will be skipped." << endl;

label:
    cout << "Jumped to label!" << endl;

    return 0;
}
```
Explaination:
- The keyword goto tells the program to jump to a specific place marked by a label (for example, label:).
- When the program reaches goto label;, it skips everything in between and continues execution from the label.

---

Visit the following resources to learn more:

- [@video@The 'if-else' Statement in C++](https://www.youtube.com/watch?v=9-BjXs1vMSc)
- [@video@Learn C++ With Me - Switch Statement](https://www.youtube.com/watch?v=uOlLs1OYSSI)
- [@video@Why is it illegal to use "goto"?](https://youtu.be/AKJhThyTmQw?si=gjEqAsDZVMDGVAT2)
