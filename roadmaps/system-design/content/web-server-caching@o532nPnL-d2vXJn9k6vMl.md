# Web Server Caching
 
Web server caching stores responses at the web server level, such as full HTML pages or static resources, so the server can serve them directly without regenerating them for each request. Reverse proxies like Varnish or Nginx are commonly used for this purpose. It reduces the load on application servers for content that does not change on every request.