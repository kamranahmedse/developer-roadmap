# Debugging memory leaks

A memory leak happens when a process or the programmer creates a reference to a memory in the heap, but then does not delete it once it is no longer needed. This results in less memory being available to the application, reducing performance.

Unlike languages like C, in which the developer has to take full responsibility of memory management using functions such as `malloc()`, JavaScript has inbuilt garbage collection which does a lot of work for you. However, it is not perfect. Give a read to the article below for a rundown of common causes of unresolved memory leaks and how to solve them using dev tools.

<BadgeLink colorScheme='yellow' badgeText='Read' href='https://medium.com/coding-blocks/catching-memory-leaks-with-chrome-devtools-57b03acb6bb9'>Catching memory leaks with Chrome DevTools</BadgeLink>
