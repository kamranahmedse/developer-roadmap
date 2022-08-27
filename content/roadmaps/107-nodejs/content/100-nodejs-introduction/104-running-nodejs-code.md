# Running nodejs code

Usually Node.js installs in a way that you can run it straight from the command line:

```batch
node script.js
```

Node.js won't actually give output to the console normally unless you use the [console interface] or an error occour.

## Node.js interactive console

By simply typing `node` you enter the REPL *(Read-evaluate-print-loop)* mode of node.js.
Here you can write javascript code directly and evaluate it inmediately. Repl while you are typing will try to evaluate the expression you just wrote by displaying it's value in the next line with a greyed version of the original color.
By default, all the default node packages are loaded in this mode without needing to `require` them.

REPL have some special commands, you can check them with `.help`. `.help` is one of these commands.

| Keyboard shorcuts |
| ----------- |
| Ctrl+c | This is a keyboard command that aborts evaluating every currently running syncronous commands and returns to the Repl session. |
| Ctrl+d or Ctrl+c twice | Exits Repl back to the command line |
| Up and down arrow | Navigates though the input history of the Repl |
