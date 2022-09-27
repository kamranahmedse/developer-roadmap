
# Strace

`Strace` is an useful diagnsotic,debugging tool for unix based operating systems. It traces the system calls and signals a processs uses during its lifetime.And usually returns the name of the each system calls , its arguments and what it returned.

    ❯ strace ls
    execve("/usr/bin/ls", ["ls"], 0x7fffd65d8360 /* 52 vars */) = 0
    brk(NULL)                               = 0x563660e0d000
    arch_prctl(0x3001 /* ARCH_??? */, 0x7ffe02927540) = -1 EINVAL (Invalid argument)
    mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f33103d3000
    access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
    . . .
    . . .
    write(1, "Desktop    Downloads  Pictures\tP"..., 48Desktop    Downloads  Pictures	Public	Templates
    ) = 48
    write(1, "Documents  Music      Postman\tsn"..., 42Documents  Music      Postmansnap	Videos
    ) = 42
    
from above example of calling `strace ls` , all the outputs are system calls.
`execve - executes the program referred to by pathname`
`brk - ets the end of the data segment to the value specified by addr`
`mmap - reates a new mapping in the virtual address space`
`write - writes data from a buffer declared by the user`

so the `strace` traced down all system calls during the lifetime of the process `ls`

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Official Page' href='https://man7.org/linux/man-pages/man1/strace.1.html'># Strace — Linux manual page</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://strace.io/'>Strace Officaial Website</BadgeLink>
