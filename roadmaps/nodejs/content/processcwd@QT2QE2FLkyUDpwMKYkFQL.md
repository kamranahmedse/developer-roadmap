# process.cwd()
 
`process.cwd()` returns the current working directory of the Node.js process, which is the directory from which the script was launched. Unlike `__dirname`, it reflects the shell's working directory, not the file's location. It is useful when your application needs to resolve paths relative to where it was started.

Visit the following resources to learn more:

- [@official@process.cwd()](https://nodejs.org/api/process.html#processcwd)
- [@article@Whats the difference between process.cwd() vs __dirname?](https://stackoverflow.com/questions/9874382/whats-the-difference-between-process-cwd-vs-dirname)