# Using debugger
Debugging is a concept to identify and remove errors from software applications. In this article, we will learn about the technique to debug a Node.js application.

# Why not to use console.log()?
Using console.log to debug the code generally dives into an infinite loop of “stopping the app and adding a console.log, and start the app again” operations. Besides slowing down the development of the app, it also makes the writing dirty and creates unnecessary code. Finally, trying to log out variables alongside with the noise of other potential logging operations, may make the process of debugging difficult when attempting to find the values you are debugging.

# How to debug?
Mostly we used console.log() but as mentioned above, it is not always a good practice. We can use a V8 inspector for it.

# Steps for debugging:
1) Write the following code in the terminal window as shown below:
node --inspect-brk-filename.js
2) Open your Chrome browser and write inspect.
3) Now click on Open Dedicated DevTools for Node.
4) Now, click on the Node.js icon.
 # Other tools to help launch a DevTools window:

june07.com/nim
github.com/jaridmargolin/inspect-process
github.com/darcyclarke/rawkit

# Additional Debugging APIs:

1) Debugging an existing Node process:
process._debugProcess(pid);</pre
2) GDB-like CLI Debugger:
node inspect filename.js
3) Drive with DevTools Protocol via WS port:
const dp = require('chrome-remote-interface');

async function test() {
const client = await dp();
const {Profiler, Runtime} = client;

await Profiler.enable();
await Profiler.setSamplingInterval({interval: 500});

await Profiler.start();
await Runtime.evaluate({expression: 'startTest();'});
await sleep(800);

const data = await Profiler.stop();
require('fs').writeFileSync('data.cpuprofile',
				JSON.stringify(data.profile));
};

test().then((result)=>{
	console.log(result);
})
.catch((error)=>{
	console.log(error);
});
4) DevTools Protocol via require('inspector')

const inspector = require('inspector');
const fs = require('fs');
const session = new inspector.Session();

session.connect();
session.post('Profiler.enable');
session.post('Profiler.start');

setTimeout( function() {
	session.post('Profiler.stop',
			function(err, data) {
		fs.writeFileSync('data.cpuprofile',
			JSON.stringify(data.profile));
	});
}, 8000);

Another awesome thing in using Chrome as a debugging tool is that you can debug both your front-end and back-end JavaScript code with the same interface.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/node-js-debugging/'>Error Handling using Debugger</BadgeLink>

