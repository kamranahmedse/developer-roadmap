# Environment Variables Under Shell Basics

In Linux, environment variables are dynamic named values that can affect the behavior of running processes in a shell. They exist in every shell session. A shell session's environment includes, but is not limited to, the user's home directory, command search path, terminal type, and program preferences.

Environment variables help to contribute to the fantastic and customizable flexibility you see in Unix systems. They provide a simple way to share configuration settings between multiple applications and processes in Linux.

You can use the 'env' command to list all the environment variables in a shell session. If you want to print a particular variable, such as the PATH variable, you can use the 'echo $PATH' command.

Here's an example of how you would do that:

```bash
# List all environment variables
$ env

# Print a particular variable like PATH
$ echo $PATH
```

Remember, every shell, such as Bourne shell, C shell, or Korn shell in Unix or Linux has different syntax and semantics to define and use environment variables.

Learn more from the following resources:

- [@article@Environment Variables in Linux](https://labex.io/tutorials/linux-environment-variables-in-linux-385274)