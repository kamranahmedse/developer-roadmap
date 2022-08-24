# Synchronous Frameworks

Synchronous frameworks in python handle the flow of data in a synchronous manner. On a s̲y̲n̲c̲h̲r̲o̲n̲o̲u̲s̲ request, you make the request and stop executing your program until you get a response from the HTTP server (or an error if the server can't be reached, or a timeout if the sever is taking way, way too long to reply) The interpreter is blocked until the request is completed (until you got a definitive answer of what happened with the request: did it go well? was there an error? a timeout?... ).

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://blog.miguelgrinberg.com/post/sync-vs-async-python-what-is-the-difference'>Sync vs. Async Python: What is the Difference?</BadgeLink>
