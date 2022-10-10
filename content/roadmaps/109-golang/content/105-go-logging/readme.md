# Go logging

"In computing, a log file is a file that records either events that occur in an operating system or other software runs, or messages between different users of communication software. Logging is the act of keeping a log. In the simplest case, messages are written to a single log file." Wikipedia

Even though the definition above emphasizes log files, there are plenty of destinations you can write your events to, including database tables, cloud services, and more.

Logging is mainly used as a troubleshooting mechanism and it's an essential tool for all the applications; Go offers a standard logging package you can use straight away, but this library is quite limited hence to get advanced features like structured logging and levels we have to turn to a third party library like Zap, Zerolog or Apex.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Logging explanation' href='https://en.wikipedia.org/wiki/Logging_(software)'>Logging explanation</BadgeLink>