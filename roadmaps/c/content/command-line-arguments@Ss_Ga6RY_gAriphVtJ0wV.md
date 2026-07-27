# Command-Line Arguments

Command-line arguments let a program receive input when it starts, passed through `main`'s parameters: `argc`, the count of arguments, and `argv`, an array of strings containing the arguments themselves, with `argv[0]` typically being the program's own name. This is how command-line tools accept options and file paths without needing interactive input. Parsing `argv` manually or with a library like `getopt` is a common early step in building any command-line utility.

Visit the following resources to learn more:

- [@article@Command Line Arguments in C](https://www.tutorialspoint.com/cprogramming/c_command_line_arguments.htm)
- [@video@Command Line Arguments](https://www.youtube.com/watch?v=wa2AfzyOff0)