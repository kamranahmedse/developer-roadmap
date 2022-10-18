# Fetch

The Fetch API provides a JavaScript interface for accessing and manipulating parts of the protocol, such as requests and responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.
This kind of functionality was previously achieved using XMLHttpRequest. Fetch provides a better alternative that can be easily used by other technologies such as Service Workers. Fetch also provides a single logical place to define other HTTP-related concepts such as CORS and extensions to HTTP.

The Promise returned from fetch() won't reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, as soon as the server responds with headers, the Promise will resolve normally (with the ok property of the response set to false if the response isn't in the range 200–299), and it will only reject on network failure or if anything prevented the request from completing.
Unless fetch() is called with the credentials option set to include, fetch():
won't send cookies in cross-origin requests
won't set any cookies sent back in cross-origin responses
As of August 2018, the default credentials policy changed to same-origin. Firefox was also modified in version 61.0b13)

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink badgeText='Read' colorScheme='yellow' href='https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'>JavaScript API Docs</BadgeLink>
<BadgeLink badgeText='Read' colorScheme="yellow" href='https://www.w3schools.com/js/'>W3Schools – JavaScript Tutorial</BadgeLink>
<BadgeLink badgeText='Read' colorScheme="yellow" href='https://javascript.info/'>The Modern JavaScript Tutorial</BadgeLink>
<BadgeLink badgeText='Read' colorScheme="yellow" href='https://www.codeguage.com/courses/js/'>A Comprehensive Course on JavaScript with Quizzes and Exercises - CodeGuage</BadgeLink>