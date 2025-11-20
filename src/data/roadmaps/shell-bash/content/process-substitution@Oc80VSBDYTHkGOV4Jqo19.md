# Process Substitution

Process substitution allows you to treat the output of a process as if it were a file. It achieves this by creating a temporary file (or using a pipe in some systems) and connecting the standard output of a command to it. This temporary file's name is then substituted into the command line, allowing commands that expect file arguments to read the output of another command. This is particularly useful for commands that require multiple file inputs or when you want to compare the output of two different commands.

Visit the following resources to learn more:

- [@article@Process Substitution](https://tldp.org/LDP/abs/html/process-sub.html)
- [@article@Handy Bash feature: Process Substitution](https://medium.com/@joewalnes/handy-bash-feature-process-substitution-8eb6dce68133)
- [@video@Command vs. Process substitution in Bash - explaining the difference. You Suck at Programming #073](https://www.youtube.com/watch?v=f3eIK5xk4vg)