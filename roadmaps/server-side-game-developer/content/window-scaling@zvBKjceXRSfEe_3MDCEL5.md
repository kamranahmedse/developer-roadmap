# Window Scaling

Window Scaling is a mechanism in the Transmission Control Protocol (TCP) that provides support for larger receiver window sizes beyond the maximum limit of 65,535 bytes. This TCP feature is essential when dealing with high latency or high bandwidth networks (common in server-side game development), where frames might be significantly delayed or rapidly transmitted. The window size initially specified in the TCP header is augmented via a scale factor (defined during the connection setup), allowing the receiver window size to be as large as 1 gigabyte. However, keep in mind that Window Scaling can only be employed at the connection setup stage; once the connection is established, the scaling factor cannot be changed.
Visit the following resources to learn more:

- [@article@TCP Window Size Scaling - NetworkLessons](https://networklessons.com/network-fundamentals/tcp-window-size-scaling)
- [@article@TCP Window Scale Option - Wikipedia](https://en.wikipedia.org/wiki/TCP_window_scale_option)
- [@article@RFC 7323 - TCP Extensions for High Performance - IETF](https://datatracker.ietf.org/doc/html/rfc7323)
