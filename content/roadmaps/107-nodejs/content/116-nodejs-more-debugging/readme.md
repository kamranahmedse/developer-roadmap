# More Debugging

Debugging is a concept to identify and remove errors from software applications. Here, we will learn about the technique to debug a Node.js application.

## Why not to use console.log() for debugging?
Using `console.log` to debug the code generally dives into an infinite loop of “stopping the app and adding a console.log, and start the app again” operations. Besides slowing down the development of the app, it also makes the writing dirty and creates unnecessary code. Finally, trying to log out variables alongside with the noise of other potential logging operations, may make the process of debugging difficult when attempting to find the values you are debugging.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink badgeText='Website' colorScheme="yellow" href='https://www.geeksforgeeks.org/node-js-debugging/'>Node.js Debugging</BadgeLink>
