# $*

`$*` is a special variable in shell scripting that expands to all the positional parameters (arguments) passed to a script or function. It represents all the arguments as a single string, with each argument separated by the first character of the `IFS` (Internal Field Separator) variable, which defaults to a space, tab, and newline. This allows you to easily access and iterate over all the arguments provided to your script.

Visit the following resources to learn more:

- [@article@Understanding Special Parameters in Linux Shell Scripting](https://medium.com/@tradingcontentdrive/understanding-special-parameters-in-linux-shell-scripting-0-62768f49fb34)