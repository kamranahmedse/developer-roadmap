# Non-Executable Stacks

> Use non-executable stacks to prevent attackers from executing code on your server.

A stack usually refers to the call stack or execution stack. It is a data structure used by the computer program to manage and keep track of the sequence of function calls, local variables, and other related data during the execution of the program.

A non-executable stack is a security mechanism that prevents malicious code from being executed by preventing the stack memory from being executed as code. This helps to prevent attacks such as buffer overflow attacks, where an attacker tries to overwrite the return address on the stack to redirect the program to execute malicious code. By using non-executable stacks, the program can keep the stack separate from executable code and help prevent these types of attacks.