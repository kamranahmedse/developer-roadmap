# Terminal multiplexers

Terminal multiplexers are programs that allow us to [multiplex](https://en.wikipedia.org/wiki/Multiplexing) a terminal into several sub-processes or terminals inside a single terminal session, this means that we can have multiple open sessions using a single login session to a local or remote machine.

##Persistence
Similar to Virtual Network Computing, many terminal multiplexers allow the user to start applications from one computer, and then reconnect from a different computer and continue using the same application without having to restart it. This makes accessing the same session between different locations like work and home simple. These multiplexers generally provide terminal-agnostic functionality so that users can disconnect and reconnect using different terminal types, allowing applications to continue running without being aware of the change in terminals.
##Multiple windows
Multiple terminal sessions can be created, each of which usually runs a single application. The windows are numbered, and the user can use the keyboard to switch between them. Some GUI terminal emulators provide tabs or otherwise similar functionality to this. Each window has its own scroll-back buffer, so that output is captured even when the window isn't actively displayed, and that history can be saved even when migrating to another computer. Windows can be split-screened. While some text applications have this functionality built in, a terminal multiplexer allows any application to be split-screened alongside any number of other applications.
##Session Sharing
Terminal multiplexers allow multiple computers to connect to the same session at once, enabling collaboration between multiple users. The same computer can also be used to make multiple simultaneous connections, providing alternative functionality to screen-splitting, particularly for computers with multiple monitors.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://en.wikipedia.org/wiki/Terminal_multiplexer'>Terminal Multiplexer</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://linuxcommand.org/lc3_adv_termmux.php'>Terminal Multiplexers</BadgeLink>
