# process.stderr

The `process.stderr` property is an inbuilt application programming interface of the  process module that returns a stream connected to the Standard Error Stream (`stderr`). `console.error()` prints to `process.stderr.write()` with formatted output or a new line. This stream is connected to file descriptor 2 (fd `2`), which is conventionally used for error messages and diagnostics.

Visit the following resources to learn more:

- [@official@process.stderr](https://nodejs.org/api/process.html#processstderr)
