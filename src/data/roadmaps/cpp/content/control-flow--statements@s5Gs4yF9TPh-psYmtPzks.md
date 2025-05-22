# Control Flow & Statements

## 1. Main Purpose

* **Control flow** allows a program to decide which statements to execute next based on conditions and program logic.
* It helps to selectively execute, repeat, jump to different parts, or exit functions/loops.

---

## 2. Main Components

| Type                      | Statement / Structure                        | Main Purpose                                                            |
| ------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| **Branching (Condition)** | `if`, `if-else`, `if-else if-else`, `switch` | Execute code blocks depending on true/false conditions                  |
| **Loops**                 | `for`, `while`, `do-while`                   | Repeat a block of code multiple times based on conditions               |
| **Jump**                  | `break`, `continue`, `return`                | Change execution flow: exit loop, skip current iteration, exit function |

---

## 3. Brief Description of Each Type

### 3.1 Branching

* `if`: Execute the block if condition is true.
* `else`: Execute block if condition is false.
* `else if`: Check multiple conditions in sequence.
* `switch`: Compare a variable with multiple values and run the matching case.

### 3.2 Loops

* `for`: Loop a fixed number of times (counter-controlled).
* `while`: Loop while the condition is true; check before each iteration.
* `do-while`: Loop while the condition is true; check after each iteration, runs at least once.

### 3.3 Jump

* `break`: Immediately exit a loop or `switch`.
* `continue`: Skip the rest of the current loop iteration and start the next iteration.
* `return`: Exit a function and optionally return a value.

---

## 4. Typical Execution Flow

```plaintext
- Start executing statements from top to bottom.
- When encountering a branching statement, choose the path based on conditions.
- When encountering a loop, repeat the block until the condition becomes false.
- When encountering a jump statement, alter the execution flow accordingly.
- End program or function when reaching return or after all statements run.
```

---

## 5. In Summary

* Control flow helps the program **make decisions** and **repeat actions**.
* Branching is to select between different paths.
* Loops are to repeat operations.
* Jump statements alter or exit the execution flow.
