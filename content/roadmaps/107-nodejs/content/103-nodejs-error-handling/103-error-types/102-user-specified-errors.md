# User Specified Errors

User specified errors can be created by extending the base Error object, a built-in error class. When creating errors in this manner, you should pass a message string that describes the error. This message can be accessed through the message property on the object. The Error object also contains a name and a stack property that indicate the name of the error and the point in the code at which it is created.

const userError = new TypeError("Something happened!");

console.log(userError.name); // TypeError

console.log(userError.message); // Something happened!

console.log(userError.stack);

/*TypeError: Something happened!
    at Object.<anonymous> (/main.js:2:19)
    <truncated for brevity>
    at node:internal/main/run_main_module:17:47 */

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.honeybadger.io/blog/errors-nodejs/'>A Comprehensive Guide To Error Handling In Node.js</BadgeLink>
