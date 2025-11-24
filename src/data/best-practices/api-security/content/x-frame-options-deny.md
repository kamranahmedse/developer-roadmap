# X-Frame-Options: Deny

> Send `X-Frame-Options: deny` header.

The `X-Frame-Options` header prevents the page from being displayed in an iframe, which is commonly used in clickjacking attacks. By setting the value of this header to `deny`, you are telling the browser not to display the page in any iframe. This helps prevent the page from being embedded within an attacker's website and reduces the risk of clickjacking attacks.

- [@video@Tutorial - X-Frame-Options HTTP Header and Click-Jacking](https://www.youtube.com/watch?v=Els0GRj0CQM)