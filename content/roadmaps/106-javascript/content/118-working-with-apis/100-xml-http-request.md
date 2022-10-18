# XMLHttpRequest
XMLHttpRequest is a built-in browser object that allows to make HTTP requests in JavaScript.

Despite having the word “XML” in its name, it can operate on any data, not only in XML format. We can upload/download files, track progress and much more.

In modern web-development XMLHttpRequest is used for three reasons:

1. Historical reasons: we need to support existing scripts with XMLHttpRequest.
2. We need to support old browsers, and don’t want polyfills (e.g. to keep scripts tiny).
3. We need something that fetch can’t do yet, e.g. to track upload progress.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink badgeText='Read' colorScheme='yellow' href='https://javascript.info/xmlhttprequest'>XMLHttpRequest</BadgeLink>