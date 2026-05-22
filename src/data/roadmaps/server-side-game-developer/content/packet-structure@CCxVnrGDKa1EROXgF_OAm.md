# Packet Structure

UDP or User Datagram Protocol is designed to send messages known as datagrams over the network. The packet structure of UDP is relatively simple compared to other protocol types. Each UDP header consists of 4 fields, each of 2 bytes. These 4 fields are namely: Source Port, Destination Port, Length, and Checksum. The `Source Port` is for tracking responses and `Destination Port` is for delivering the datagram on the receiving end. The `Length` specifies the entire datagram size including the header and data while the `Checksum` is used to verify the integrity of the data and header.
Visit the following resources to learn more:

- [@article@User Datagram Protocol (UDP) - Imperva](https://www.imperva.com/learn/ddos/udp-user-datagram-protocol/)
- [@official@UDP Packet Format - Huawei Support](https://support.huawei.com/enterprise/en/doc/EDOC1100174721/23023485/udp-packet-format)
- [@article@User Datagram Protocol - RFC 768](https://datatracker.ietf.org/doc/html/rfc768)
