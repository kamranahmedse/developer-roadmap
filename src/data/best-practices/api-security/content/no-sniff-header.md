# X-Content-Type-Options: nosniff

> Send `X-Content-Type-Options: nosniff` header.

You should send the `X-Content-Type-Options: nosniff` header to prevent [MIME type sniffing attacks](https://www.keycdn.com/support/what-is-mime-sniffing) on your web application. This header tells the browser not to override the response content type even if it's not the expected type. For example, if an attacker manages to upload an HTML file with a disguised extension like .jpg, the server may still send the correct content type header for the HTML file. However, some browsers may ignore this header and try to "sniff" the content type based on the actual contents of the file, leading to a potential cross-site scripting (XSS) attack.

By sending the `X-Content-Type-Options: nosniff` header, you tell the browser to always trust the provided content type and not try to sniff the content type. This helps to mitigate the risk of attackers exploiting content type mismatches to deliver malicious content to unsuspecting users.
