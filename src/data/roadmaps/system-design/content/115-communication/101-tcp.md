# TCP

TCP is a connection-oriented protocol over an [IP network](https://en.wikipedia.org/wiki/Internet_Protocol). Connection is established and terminated using a [handshake](https://en.wikipedia.org/wiki/Handshaking). All packets sent are guaranteed to reach the destination in the original order and without corruption through:

- Sequence numbers and [checksum fields](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Checksum_computation) for each packet
- [@article@Acknowledgement](https://en.wikipedia.org/wiki/Acknowledgement_(data_networks)) packets and automatic retransmission

If the sender does not receive a correct response, it will resend the packets. If there are multiple timeouts, the connection is dropped. TCP also implements [flow control](<https://en.wikipedia.org/wiki/Flow_control_(data)>) and congestion control. These guarantees cause delays and generally result in less efficient transmission than UDP.

To ensure high throughput, web servers can keep a large number of TCP connections open, resulting in high memory usage. It can be expensive to have a large number of open connections between web server threads and say, a [memcached server](https://memcached.org/). [Connection pooling](https://en.wikipedia.org/wiki/Connection_pool) can help in addition to switching to UDP where applicable.

TCP is useful for applications that require high reliability but are less time critical. Some examples include web servers, database info, SMTP, FTP, and SSH.

Use TCP over UDP when:

- You need all of the data to arrive intact
- You want to automatically make a best estimate use of the network throughput

To learn more, visit the following links:

- [@opensource@What Is TCP?](https://github.com/donnemartin/system-design-primer#transmission-control-protocol-tcp)
- [@article@What is the difference between HTTP protocol and TCP protocol?](https://www.quora.com/What-is-the-difference-between-HTTP-protocol-and-TCP-protocol)
- [@article@Networking for game programming](http://gafferongames.com/networking-for-game-programmers/udp-vs-tcp/)
- [@article@Key differences between TCP and UDP protocols](http://www.cyberciti.biz/faq/key-differences-between-tcp-and-udp-protocols/)
- [@article@Difference between TCP and UDP](http://stackoverflow.com/questions/5970383/difference-between-tcp-and-udp)
- [@article@Transmission control protocol](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)
- [@article@User datagram protocol](https://en.wikipedia.org/wiki/User_Datagram_Protocol)
- [@article@Scaling memcache at Facebook](http://www.cs.bu.edu/~jappavoo/jappavoo.github.com/451/papers/memcache-fb.pdf)
