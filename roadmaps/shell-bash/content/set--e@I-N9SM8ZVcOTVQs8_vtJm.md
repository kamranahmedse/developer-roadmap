# set -e

`set -e` is a shell command that instructs the shell to exit immediately if a command exits with a non-zero status. This is a way to ensure that your script stops executing as soon as an error occurs, preventing subsequent commands from running based on potentially incorrect or incomplete results. It's a common practice to include `set -e` at the beginning of a script to enforce stricter error checking.

Visit the following resources to learn more:

- [@article@Executing Code after an Error Occurs with Bash When Using set e](https://nickjanetakis.com/blog/executing-code-after-an-error-occurs-with-bash-when-using-set-e)
- [@article@Allowing for Errors in Bash When You Have set -e Defined](https://nickjanetakis.com/blog/allowing-for-errors-in-bash-when-you-have-set-e-defined)
- [@video@Shell Script Error Handling: Master Bash Scripting for Robust Code](https://www.youtube.com/watch?v=uFJiDD1B5I4)