# Nodejs error handling
An error is an object with a description denoting that something went wrong. Whether you want to handle runtime or syntax errors, this tutorial will help you out.

The tutorial simplifies Node.js error handling in synchronous and asynchronous (callback and promised-based) code using Node.js process module, try-catch block, and then-catch block.
Lab setup to practice Node.js error handling
You can open the file using your preferred code editor in the examples section. I am using Visual Studio Code on Ubuntu.

Make the project directory and cd into it.

mkdir errorHandling && cd errorHandling
Next, create sync.js, callback.js, and promises.js for handling errors related to the synchronous, callback, and promise-based asynchronous code, respectively.

touch sync.js callback.js promises.js
code .
Example~1: Node.js error handling in synchronous code
A try-catch block is the most typical way for Node.js error handling in synchronous code. For example, assume we try reading a file that does not exist.
Input

const fs = require("fs")

try {
    const output = fs.readFileSync('index.html', 'utf-8')
    console.log(output)
} catch {
    console.log("There was an error reading the file.")
}
We import the fs module. In thetry block, we attempt to read the file using the fs.readFileSync() method. And console-log the output. If the process fails, it throws an error object. The catch block receives the error object through the given parameter. We could print the error object, but we printed a custom message, "There was an error reading the file."

Using the node command, run the file on the terminal.

node sync.js
Output

We get the expected error.

$ node sync.js
There was an error reading the file.
Now, let's print the error object.
const fs = require("fs")

try {
    const output = fs.readFileSync('index.html', 'utf-8')
    console.log(output)
} catch (error) {
    console.log(error)
}
Output

$ node sync.js
Error: ENOENT: no such file or directory, open 'index.html'
    at Object.openSync (node:fs:599:3)
    at Object.readFileSync (node:fs:467:35)
    at Object.<anonymous> (/home/user/errorHandling/sync.js:4:23)
    at Module._compile (node:internal/modules/cjs/loader:1119:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1173:10)
    at Module.load (node:internal/modules/cjs/loader:997:32)
    at Module._load (node:internal/modules/cjs/loader:838:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:18:47 {
  errno: -2,
  syscall: 'open',
  code: 'ENOENT',
  path: 'index.html'
}
  The following line tells us that the program caught an error object denoting that the requested file does not exist.

Error: ENOENT: no such file or directory, open 'index.html'
The program gives more hints about the error, like its code and the requested file path.
 
  
  # Example~2: Node.js error handling using a callback function + process module
Most Node.js native modules accommodate asynchronous programming through a callback function. The first parameter to the callback function is the error object.

Use a callback function + process module
Let's create the index.html\
  cat >> index.html
Add some content to it.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
Then, attempt to read its content asynchronously with a misspelled name.
  Input

const fs = require("fs")
fs.readFile('endix.html', 'utf-8', (error, data) => {
    if (error) throw error
    console.log(data)
})
Unless the error is handled, the throw keyword halts the execution of subsequent code portions. We can handle the error using the process module.

process.on("uncaughtException", error => error ? console.log(error) : console.log(""))
The process.on() method listens for the uncaughtException event. It then prints the error or an empty string.

# Output
  $ node callback.js 
[Error: ENOENT: no such file or directory, open 'endix.html'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'endix.html'
}
  
<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.tutorialspoint.com/understanding-the-different-error-types-and-handling-in-node-js'>Understanding the different error types and handling in Node.js</BadgeLink>


  
