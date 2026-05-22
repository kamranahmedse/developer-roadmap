# Windows

In the context of server-side game development, Windows operating system offers an API for Thread Local Storage (TLS). This refers to a mechanism by which variables are allocated that are unique for each thread in a program. When a thread reads from or writes to a TLS index, it is actually referencing a thread-specific memory block. This memory block is dynamically allocated from the system heap when the thread is created and subsequently freed up when the thread is terminated. This management of memory is done implicitly by the system which can reduce complexity for developers.
Visit the following resources to learn more:

- [@article@Windows Game Development Guide - Microsoft Learn](https://learn.microsoft.com/en-us/windows/uwp/gaming/e2e)
- [@article@How to Set Up a Dedicated Game Server - Intel](https://www.intel.com/content/www/us/en/gaming/resources/game-server.html)
- [@article@Game Development Kit (GDK) Documentation - Microsoft Learn](https://learn.microsoft.com/en-us/gaming/gdk/)
