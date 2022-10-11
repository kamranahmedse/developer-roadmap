# Process argv

`process.argv` is an array of parameters that are sent when you run a Node.js file or Node.js process.

For example, if you run the following command in your CLI: 

`node server.js 3000 development`

The `argv` array would contain:

`[ 'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Documents\\server.js',
  '3000',
  'development'
]`

As you can see, the paramteres are as follows:

*The first parameter, is the location of Node.js installation in your computer
*The second parameter, is the location of the file you're running
*The rest of the parameters are the ones you pass when you run the command

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://nodejs.org/docs/latest/api/process.html'>Node.js Docs on process.argv</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/node-js-process-argv-property/'>Node.js process.argv Property
</BadgeLink>
