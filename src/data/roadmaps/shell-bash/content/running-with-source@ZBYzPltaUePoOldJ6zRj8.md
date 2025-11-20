# Running Shell Scripts with Source

Sourcing a shell script executes the commands within the script in the *current* shell environment, rather than in a subshell. This means that any variables, functions, or aliases defined or modified within the script will directly affect the shell you're currently working in. This is in contrast to simply executing a script, which creates a new process and any changes are isolated to that process.

Visit the following resources to learn more:

- [@article@https://dillionmegida.com/p/sourcing-vs-executing-script-directly/](https://dillionmegida.com/p/sourcing-vs-executing-script-directly/)
- [@video@Source Shell Script vs Executing Shell Script - The Real Difference](https://www.youtube.com/watch?v=ZIqRmp-XBRY)