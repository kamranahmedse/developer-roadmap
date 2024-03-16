# Cookie count

> If you want to support most browsers, then don't exceed 30 cookies per domain.

Cookies are exchanged in the HTTP headers between web servers and browsers. It's important to keep the size of cookies as low as possible to minimize the impact on the user's response time.

The table below illustrates cookie count limitations based on the browser:

| Browser    | count limit per domain |
|:----------:|:----------------------:|
| Chrome     | 180                    |
| Firefox    | 150                    |
| Opera      | 60                     |
| Safari     | 600                    |


- [Cookie specification: RFC 6265](https://tools.ietf.org/html/rfc6265)
- [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [Google's Web Performance Best Practices #3: Minimize Request Overhead - GlobalDots Blog](https://www.globaldots.com/googles-web-performance-best-practices-3-minimize-request-overhead/)
- [How Many Cookies Can You Use on One Website?](https://www.thoughtco.com/cookie-limit-per-domain-3466809)
- [cookieStatus](https://www.cookiestatus.com/)