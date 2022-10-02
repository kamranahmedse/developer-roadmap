# Dirname

The __dirname in a node script returns the path of the folder where the current JavaScript file resides. __filename and __dirname are used to get the filename and directory name of the currently executing file.

1. Gives absolute path of the directory that contains the currently executing file.	
2. Returns a pointer to a string i.e. the parent directory of currently executing file.	
3. Works similar to process.cwd() until the node is run from a directory which is different from the directory where the JavaScript file is stored.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Read' href='https://nodejs.org/docs/latest/api/modules.html#__dirname'>Official Website</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname'>Digital Ocean | how to use __dirname </BadgeLink>