# Winston

winston is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs. Each winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file.

winston aims to decouple parts of the logging process to make it more flexible and extensible. Attention is given to supporting flexibility in log formatting & levels, and ensuring those APIs decoupled from the implementation of transport logging (i.e. how the logs are stored / indexed) to the API that they exposed to the programmer.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Website' href='https://github.com/winstonjs/winston'>winston Website</BadgeLink>
