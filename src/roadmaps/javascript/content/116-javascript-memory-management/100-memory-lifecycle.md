# Memory lifecycle

Regardless of the programming language, the memory life cycle is pretty much always the same:

 - Allocate the memory you need
 - Use the allocated memory (read, write)
 - Release the allocated memory when it is not needed anymore

The second part is explicit in all languages. The first and last parts are explicit in low-level languages but are mostly implicit in high-level languages like JavaScript.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management'>MDN docs - Memory Management</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://medium.com/swlh/the-lifecycle-of-memory-in-javascript-5b5bffc5ff4c'>Lifecycle in Memory Management</BadgeLink>
