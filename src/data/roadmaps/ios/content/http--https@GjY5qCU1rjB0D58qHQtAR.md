# HTTP / HTTPs

HTTP (Hypertext Transfer Protocol) and HTTPS (HTTP Secure) are fundamental protocols for data communication on the internet, extensively used in iOS app networking. HTTP facilitates request-response interactions between clients and servers, defining how messages are formatted and transmitted. HTTPS extends HTTP by encrypting the data exchange using SSL/TLS protocols, ensuring secure communication. In iOS development, URLSession handles both HTTP and HTTPS requests seamlessly, automatically managing the encryption for HTTPS connections. Developers typically use HTTPS for all network communications to protect user data and maintain privacy. iOS enforces App Transport Security (ATS) by default, requiring secure connections for network requests. When working with web APIs, iOS apps use these protocols to fetch data, submit forms, upload files, and perform various other network operations. Understanding HTTP methods (GET, POST, PUT, DELETE, etc.), status codes, and headers is crucial for effective API integration and troubleshooting in iOS app development.

Learn more from the following resources:

- [@official@URLSession](https://developer.apple.com/documentation/foundation/urlsession)
- [@article@Mastering URLSession in Swift](https://elamir.medium.com/mastering-urlsession-in-swift-a-comprehensive-guide-d3a3aa740f6e)