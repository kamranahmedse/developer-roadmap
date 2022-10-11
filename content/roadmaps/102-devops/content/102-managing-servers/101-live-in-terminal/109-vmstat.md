# Vmstat

`vmstat` (**V**irtual **M**emory **Stat**istics) is a performance monitoring command. It is used to obtain information about memory, system processes, paging, interrupts, block I/O, disk, and CPU scheduling. Users can observe system activity virtually in real time by specifying a sampling period.

The basic syntax of the command is like the following:
`vmstat [options][delay [count]]`

Here,
- **options** - various switches to customize the output.
- **delay** - defines the time elapsed between each output updates.
- **count** - the number of output updates after the specified delay interval. If count isn’t set, the default value is infinite.

Example usage:  `vmstat -t 2 4`

<ResourceGroupTitle>Useful Links</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Man page' href='https://man7.org/linux/man-pages/man8/vmstat.8.html'>vmstat man page</BadgeLink>
<BadgeLink colorScheme='blue' badgeText='Tutorial' href='https://phoenixnap.com/kb/vmstat-command'>vmstat tutorial</BadgeLink>
