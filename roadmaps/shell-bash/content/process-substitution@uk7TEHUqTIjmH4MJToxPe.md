# Process Substitution

Process substitution allows you to treat the output of a process as if it were a file. It provides a way to pass the output of one command as input to another command, without using temporary files or named pipes. This is achieved by creating a temporary file-like object (either a named pipe or a file in `/dev/fd`) that the command writes its output to, and then passing the name of this object to another command as an argument.

Visit the following resources to learn more:

- [@article@Process Substitution](https://tldp.org/LDP/abs/html/process-sub.html)
- [@article@Handy Bash feature: Process Substitution](https://medium.com/@joewalnes/handy-bash-feature-process-substitution-8eb6dce68133)
- [@video@Command vs. Process substitution in Bash - explaining the difference.](https://www.youtube.com/watch?v=f3eIK5xk4vg)
- [@video@Process Substitution in BASH - Commands for Linux](https://www.youtube.com/watch?v=dR0X0-B9ObA)