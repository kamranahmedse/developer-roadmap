# GDB: GNU Debugger

GDB, or the GNU Project Debugger, is a powerful command-line debugger used primarily for C, C++, and other languages. It can help you find runtime errors, examine the program's execution state, and manipulate the flow to detect and fix bugs easily.

## Getting started with GDB

To start using GDB, you first need to compile your code with the `-g` flag, which includes debugging information in the executable:

```sh
g++ -g myfile.cpp -o myfile
```

Now, you can load your compiled program into GDB:

```sh
gdb myfile
```

## Basic GDB Commands

Here are some common GDB commands you'll find useful when debugging:

- `run`: Start your program.
- `break [function/line number]`: Set a breakpoint at the specified function or line.
- `continue`: Continue the program execution after stopping on a breakpoint.
- `next`: Execute the next line of code, stepping over function calls.
- `step`: Execute the next line of code, entering function calls.
- `print [expression]`: Evaluate an expression in the current context and display its value.
- `backtrace`: Show the current call stack.
- `frame [frame-number]`: Switch to a different stack frame.
- `quit`: Exit GDB.

## Example Usage

Suppose you have a simple `cpp` file called `example.cpp`:

```cpp
#include <iostream>

void my_function(int i) {
  std::cout << "In my_function with i = " << i << std::endl;
}

int main() {
  for (int i = 0; i < 5; ++i) {
    my_function(i);
  }
  return 0;
}
```

First, compile the code with debugging symbols:

```sh
g++ -g example.cpp -o example
```

Start GDB and load the `example` program:

```sh
gdb example
```

Set a breakpoint in the `my_function` function and run the program:

```
(gdb) break my_function
(gdb) run
```

Once stopped at the breakpoint, use `next`, `print`, and `continue` to examine the program's state:

```
(gdb) next
(gdb) print i
(gdb) continue
```

Finally, exit GDB with the `quit` command.

This was just a brief summary of GDB; you can find more details in the [official GDB manual](https://sourceware.org/gdb/current/onlinedocs/gdb/).