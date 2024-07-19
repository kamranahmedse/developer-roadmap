# REST

REST (Representational State Transfer) is an architectural style for designing networked applications, widely adopted in iOS development for creating and consuming web services. RESTful APIs use standard HTTP methods to perform operations on resources, typically represented as URLs. In iOS, developers interact with REST APIs using URLSession or higher-level networking libraries. These APIs usually exchange data in JSON format, which integrates well with Swift's Codable protocol for easy serialization and deserialization. REST's stateless nature and use of standard HTTP methods (GET for retrieval, POST for creation, PUT for updates, DELETE for removal) make it intuitive and scalable. When implementing RESTful services in iOS apps, developers focus on endpoint design, proper use of HTTP status codes, and efficient data mapping between API responses and Swift objects. Understanding REST principles helps in creating more maintainable, scalable, and interoperable iOS applications that effectively communicate with backend services.

Learn more from the following resources:

- [@article@REST API Calls in Swift: iOS Networking Architecture](https://matteomanferdini.com/swift-rest-api/)
- [@article@Sending and recieving Codable data with URLSession and SwiftUI](https://www.hackingwithswift.com/books/ios-swiftui/sending-and-receiving-codable-data-with-urlsession-and-swiftui)