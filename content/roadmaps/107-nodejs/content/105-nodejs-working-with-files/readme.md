# Nodejs working with files
 
 Working with files is as common for development purposes as it is for non-development purposes. In daily computer use, a user would likely read and write data to files in various directories in order to accomplish tasks like saving a downloaded file or accessing data to be used in another application. In the same way, a back-end program or command line interface (CLI) tool might need to write downloaded data to a file in order to save it, or a data-intensive application may need to export to JSON, CSV, or Excel formats. These programs would need to communicate with the filesystem of the operating system on which they are running.

With Node.js, you can programmatically manipulate files with the built-in fs module. The name is short for “file system,” and the module contains all the functions you need to read, write, and delete files on the local machine. This unique aspect of Node.js makes JavaScript a useful language for back-end and CLI tool programming.

In this article, you will use the fs module to read a file created via the command line, create and write to a new file, delete the file that you created, and move the first file into a different folder. The fs module supports interacting with files synchronously, asynchronously, or via streams; this tutorial will focus on how to use the asynchronous, Promise-based API, the most commonly used method for Node.js developers.

# Prerequisites
You must have Node.js installed on your computer to access the fs module and follow the tutorial. Here we are using Node.js version 10.22.0. 

Here we are using JavaScript Promises to work with files, particularly with the async/await syntax. If you’re not familiar with Promises, async/await syntax, or asynchronous programming, learn How To Write Asynchronous Code in Node.js.

Step 1 — Reading Files with readFile()
In this step, you’ll write a program to read files in Node.js. To do this, you’ll need to import the fs module, a standard Node.js module for working with files, and then use the module’s readFile() function. Your program will read the file, store its contents in a variable, then log its contents to the console.

The first step will be to set up the coding environment for this activity and the ones in the later sections.

Create a folder to store your code. In your terminal, make a folder called node-files:
$ mkdir node-files
Change your working directory to the newly created folder with the cd command:

$ cd node-files
In this folder, you’ll create two files. The first file will be a new file with content that your program will read later. The second file will be the Node.js module that reads the file.

Create the file greetings.txt with the following command:
$ echo "hello, hola, bonjour, hallo" > greetings.txt
The echo command prints its string argument to the terminal. You use > to redirect echo’s output to a new file, greetings.txt.

Now, create and open readFile.js in your text editor of choice. This tutorial uses nano, a terminal text editor. You can open this file with nano like this:

$ nano readFile.js
The code for this file can be broken up into three sections. First, you need to import the Node.js module that allows your program to work with files. In your text editor, type this code:
const fs = require('fs').promises;
As mentioned earlier, you use the fs module to interact with the filesystem. Notice, though, that you are importing the .promises part of the module.

When the fs module was first created, the primary way to write asynchronous code in Node.js was through callbacks. As promises grew in popularity, the Node.js team worked to support them in the fs module out of the box. In Node.js version 10, they created a promises object in the fs module that uses promises, while the main fs module continues to expose functions that use callbacks. In this program, you are importing the promise version of the module.
Once the module is imported, you can create an asynchronous function to read the file. Asynchronous functions begin with the async keyword. With an asynchronous function, you can resolve promises using the await keyword, instead of chaining the promise with the .then() method.

Create a new function readFile() that accepts one argument, a string called filePath. Your readFile() function will use the fs module to load the file into a variable using async/await syntax.

# Enter the following highlighted code:
const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}
You define the function with the async keyword so you can later use the accompanying await keyword. To capture errors in your asynchronous file reading operation, you enclose the call to fs.readFile() with a try...catch block. Within the try section, you load a file to a data variable with the fs.readFile() function. The only required argument for that function is the file path, which is given as a string.

The fs.readFile() returns a buffer object by default. A buffer object can store any kind of file type. When you log the contents of the file, you convert those bytes into text by using the toString() method of the buffer object.

If an error is caught, typically if the file is not found or the program does not have permission to read the file, you log the error you received in the console.

Finally, call the function on the greetings.txt file with the following highlighted line:
const fs = require('fs').promises;

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

readFile('greetings.txt');
Be sure to save your contents. With nano, you can save and exit by pressing CTRL+X.
Your program will now read the greetings.txt file you created earlier and log its contents to the terminal. Confirm this by executing your module with node:

$ node readFile.js
You will receive the following output:

Output
hello, hola, bonjour, hallo
You’ve now read a file with the fs module’s readFile() function using the async/await syntax.

Now that you’ve read a file with the fs module, you will next create a file and write text to it.
Step 2 — Writing Files with writeFile()
In this step, you will write files with the writeFile() function of the fs module. You will create a CSV file in Node.js that keeps track of a grocery bill. The first time you write the file, you will create the file and add the headers. The second time, you will append data to the file.

Open a new file in your text editor:

nano writeFile.js
Begin your code by importing the fs module:

node-files/writeFile.js
const fs = require('fs').promises;
You will continue to use async/await syntax as you create two functions. The first function will be to make the CSV file. The second function will be to add data to the CSV file.

In your text editor, enter the following highlighted code:

node-files/writeFile.js
const fs = require('fs').promises;

async function openFile() {
  try {
    const csvHeaders = 'name,quantity,price'
    await fs.writeFile('groceries.csv', csvHeaders);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}
This asynchronous function first creates a csvHeaders variable that contains the column headings of your CSV file. You then use the writeFile() function of the fs module to create a file and write data to it. The first argument is the file path. As you provided just the file name, Node.js will create the file in the same directory that you’re executing the code in. The second argument is the data you are writing, in this case the csvHeaders variable.

Next, create a new function to add items to your grocery list. Add the following highlighted function in your text editor:

node-files/writeFile.js
const fs = require('fs').promises;

async function openFile() {
  try {
    const csvHeaders = 'name,quantity,price'
    await fs.writeFile('groceries.csv', csvHeaders);
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

async function addGroceryItem(name, quantity, price) {
  try {
    const csvLine = `\n${name},${quantity},${price}`
    await fs.writeFile('groceries.csv', csvLine, { flag: 'a' });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}
The asynchronous addGroceryItem() function accepts three arguments: the name of the grocery item, the amount you are buying, and the price per unit. These arguments are used with template literal syntax to form the csvLine variable, which is the data you are writing to the file.

You then use the writeFile() method as you did in the openFile() function. However, this time you have a third argument: a JavaScript object. This object has a flag key with the value a. Flags tell Node.js how to interact with the file on the system. By using the flag a, you are telling Node.js to append to the file, not overwrite it. If you don’t specify a flag, it defaults to w, which creates a new file if none exists or overwrites a file if it already exists. You can learn more about filesystem flags in the Node.js documentation.

To complete your script, use these functions. Add the following highlighted lines at the end of the file:

node-files/writeFile.js
...
async function addGroceryItem(name, quantity, price) {
  try {
    const csvLine = `\n${name},${quantity},${price}`
    await fs.writeFile('groceries.csv', csvLine, { flag: 'a' });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }
}

(async function () {
  await openFile();
  await addGroceryItem('eggs', 12, 1.50);
  await addGroceryItem('nutella', 1, 4);
})();
To call the functions, you first create a wrapper function with async function. Since the await keyword can not be used from the global scope as of the writing of this tutorial, you must wrap the asynchronous functions in an async function. Notice that this function is anonymous, meaning it has no name to identify it.

Your openFile() and addGroceryItem() functions are asynchronous functions. Without enclosing these calls in another function, you cannot guarantee the order of the content. The wrapper you created is defined with the async keyword. Within that function you order the function calls using the await keyword.

Finally, the async function definition is enclosed in parentheses. These tell JavaScript that the code inside them is a function expression. The parentheses at the end of the function and before the semicolon are used to invoke the function immediately. This is called an Immediately-Invoked Function Expression (IIFE). By using an IIFE with an anonymous function, you can test that your code produces a CSV file with three lines: the column headers, a line for eggs, and the last line for nutella.

Save and exit nano with CTRL+X.

Now, run your code with the node command:

node writeFile.js
There will be no output. However, a new file will exist in your current directory.

Use the cat command to display the contents of groceries.csv:

cat groceries.csv
You will receive the following output:

node-files/groceries.csv
name,quantity,price
eggs,12,1.5
nutella,1,4
Your call to openFile() created a new file and added the column headings for your CSV. The subsequent calls to addGroceryItem() then added your two lines of data.

With the writeFile() function, you can create and edit files. Next, you will delete files, a common operation when you have temporary files or need to make space on a hard drive.

Step 3 — Deleting Files with unlink()
In this step, you will delete files with the unlink() function in the fs module. You will write a Node.js script to delete the groceries.csv file that you created in the last section.

In your terminal, create a new file for this Node.js module:

nano deleteFile.js
Now you will write code that creates an asynchronous deleteFile() function. That function will accept a file path as an argument, passing it to the unlink() function to remove it from your filesystem.

In your text editor, write the following code:

node-files/deleteFile.js
const fs = require('fs').promises;

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted ${filePath}`);
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
  }
}

deleteFile('groceries.csv');
The unlink() function accepts one argument: the file path of the file you want to be deleted.

Warning: When you delete the file with the unlink() function, it is not sent to your recycle bin or trash can but permanently removed from your filesystem. This action is not reversible, so please be certain that you want to remove the file before executing your code.

Exit nano, ensuring that you save the contents of the file by entering CTRL+X.

Now, execute the program. Run the following command in your terminal:

node deleteFile.js
You will receive the following output:

Output
Deleted groceries.csv
To confirm that the file no longer exists, use the ls command in your current directory:

ls
This command will display these files:

Output
deleteFile.js   greetings.txt   readFile.js     writeFile.js
You’ve now confirmed that your file was deleted with the unlink() function.

So far you’ve learned how to read, write, edit, and delete files. The following section uses a function to move files to different folders. After learning that function, you will be able to do the most critical file management tasks in Node.js.

Step 4 — Moving Files with rename()
Folders are used to organize files, so being able to programmatically move files from one folder to another makes file management easier. You can move files in Node.js with the rename() function. In this step, you’ll move a copy of the greetings.txt file into a new folder.

Before you can code your Node.js module, you need to set a few things up. Begin by creating a folder that you’ll be moving your file into. In your terminal, create a test-data folder in your current directory:

mkdir test-data
Now, copy the greetings.txt file that was used in the first step using the cp command:

cp greetings.txt greetings-2.txt
Finish the setup by opening a JavaScript file to contain your code:

nano moveFile.js
In your Node.js module, you’ll create a function called moveFile() that calls the rename() function. When using the rename() function, you need to provide the file path of the original file and the path of the destination location. For this example, you’ll use a moveFile() function to move the greetings-2.txt file into the test-data folder. You’ll also change its name to salutations.txt.

Enter the following code in your open text editor:

node-files/moveFile.js
const fs = require('fs').promises;

async function moveFile(source, destination) {
  try {
    await fs.rename(source, destination);
    console.log(`Moved file from ${source} to ${destination}`);
  } catch (error) {
    console.error(`Got an error trying to move the file: ${error.message}`);
  }
}

moveFile('greetings-2.txt', 'test-data/salutations.txt');
As mentioned earlier, the rename() function takes two arguments: the source and destination file paths. This function can move files to other folders, rename a file in its current directory, or move and rename at the same time. In your code, you are moving and renaming your file.

Save and exit nano by pressing CTRL+X.

Next, execute this program with node. Enter this command to run the program:

node moveFile.js
You will receive this output:

Output
Moved file from greetings-2.txt to test-data/salutations.txt
To confirm that the file no longer exists in your current directory, you can use the ls command:

ls
This command will display these files and folder:

Output
deleteFile.js   greetings.txt   moveFile.js     readFile.js     test-data       writeFile.js
You can now use ls to list the files in the test-data subfolder:

ls test-data
Your moved file will appear in the output:

Output
salutations.txt
You have now used the rename() function to move a file from your current directory into a subfolder. You also renamed the file with the same function call.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.digitalocean.com/community/tutorials/how-to-work-with-files-using-the-fs-module-in-node-js'>How To Work with Files using the fs Module in Node.js</BadgeLink>
