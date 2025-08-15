# Control Flow & Statements
Here’s your complete content as a **single, ready-to-submit Markdown file** for roadmap.sh:


##### Control flow in C++ determines the order in which instructions are executed in a program. By default, code runs top-to-bottom — like reading a recipe — but with control flow statements, you can make decisions, repeat actions, or jump to specific sections. These statements help you handle logic, loops, and branching efficiently.


The main types of control flow statements are:

- **Conditional Statements**: `if`, `if...else`, `if...else if...else`, `switch...case`  
  *(e.g., "If it’s raining, take an umbrella. Else, take sunglasses.")*

```cpp
  bool raining = true;
  if (raining) {
      cout << "Take an umbrella!" << endl;
  } else {
      cout << "Take sunglasses!" << endl;
  }
```

* **Looping Statements**: `for` loop, `while` loop, `do...while` loop, range-based `for` loop (C++11+)
  *(e.g., "While there’s pizza left, keep eating. Stop when the box is empty.")*

  ```cpp
  int pizzaSlices = 3;
  while (pizzaSlices > 0) {
      cout << "Eat a slice of pizza!" << endl;
      pizzaSlices--;
  }
  ```

* **Jump Statements**: `break` (exit loop/switch early), `continue` (skip current iteration), `return` (exit a function), `goto` (jump to a labeled statement — generally discouraged)
  *(e.g., "Return home immediately if you forgot your wallet.")*

  ```cpp
  for (int i = 1; i <= 5; i++) {
      if (i == 3) continue; // skip 3
      if (i == 5) break;    // stop at 5
      cout << "Step " << i << endl;
  }

  void goHome(bool walletForgotten) {
      if (walletForgotten) return;
      cout << "Leaving for party!" << endl;
  }
  ```

* [@video@C++ Control Flow Statements – ProgrammingKnowledge](https://youtu.be/a3IZ8WaIFAA?si=XRjNMilgGJxYoYIL)
* [@article@C++ Jump Statements – GeeksforGeeks](https://www.geeksforgeeks.org/cpp/jump-statements-in-c/)


