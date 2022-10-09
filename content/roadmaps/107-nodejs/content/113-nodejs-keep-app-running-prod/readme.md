# Nodejs keep app running prod
PM2 lets you run your nodejs scripts forever. In the event that your application crashes, PM2 will also restart it for you.
Install PM2 globally to manager your nodejs instances
npm install pm2 -g
Navigate to the directory in which your nodejs script resides and run the following command each time you want to start a nodejs instance to be monitored by pm2:
pm2 start server.js --name "app1"

Useful commands for monitoring the process
Stop a particular nodejs instance `pm2 stop `
Delete a particular nodejs instance `pm2 delete `
Restart a particular nodejs instance `pm2 restart `
Monitoring all nodejs instances `pm2 monit`
Stop pm2 `pm2 kill`
As opposed to restart, which kills and restarts the process, reload achieves a 0-second-downtime reload `pm2 reload `
View logs `pm2 logs `

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink badgeText='Website' colorScheme="yellow" href='https://devtut.github.io/nodejs/keep-a-node-application-constantly-running.html#use-pm2-as-a-process-manager'>Keep a node application constantly running</BadgeLink>
