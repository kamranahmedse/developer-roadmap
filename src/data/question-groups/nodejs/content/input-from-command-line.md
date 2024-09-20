In order to take user input from the command line, you can use the `readline` module. It provides an interface for reading data from a Readable stream (such as `process.stdin`) one line at a time.

```js
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

rl.question('What do you think of Node.js? ', (answer) => {
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
});

rl.on('close', () => {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});
```
