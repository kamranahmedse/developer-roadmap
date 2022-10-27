# Debugging Memory Leaks

In JavaScript, memory leaks commonly occur within heap allocated memory, where short lived objects are attached to long lived ones and the Garbage Collector cannot safely de-allocate that memory as it is still referenced from the root set (the global object).

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://medium.com/coding-blocks/catching-memory-leaks-with-chrome-devtools-57b03acb6bb9'>Catching memory leaks with Chrome DevTools</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://medium.com/swlh/effective-javascript-debugging-memory-leaks-75059b2436f6'>Effective Javascript Debugging </BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.debugbear.com/blog/debugging-javascript-memory-leaks'>Debugging JavaScript memory leaks</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.jackhoy.com/web-applications/2020/10/21/debugging-memory-leaks-in-nodejs.html'>Debugging Memory Leaks In Production JavaScript Applications</BadgeLink>