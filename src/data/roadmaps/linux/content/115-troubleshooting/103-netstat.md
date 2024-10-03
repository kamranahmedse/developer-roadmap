# Netstat

Netstat is a powerful command-line tool in Linux systems that provides valuable insights into network activity and troubleshooting. It offers a comprehensive view of network statistics, including open ports, active connections, and routing table information.

As a system administrator or developer, you can leverage Netstat to investigate network issues and understand how your system communicates with others. The tool's versatility is enhanced by the various command-line options it supports, allowing you to fine-tune the output and focus on specific aspects of the network.

Here's an example of how you can use Netstat on an Ubuntu Linux system:

```bash
# List all active network connections with numerical addresses
netstat -an

# Display listening ports and the processes associated with them
netstat -lntp

# Monitor network activity in real-time
netstat -c

# Show connections based on a specific protocol (TCP or UDP)
netstat -t  # TCP connections
netstat -u  # UDP connections
```

By using these Netstat commands, you can quickly gather valuable information about your system's network configuration and troubleshoot any connectivity or performance-related issues. The numerical addresses (`-n`) option is particularly useful when you need to analyze the network without relying on DNS resolution.
