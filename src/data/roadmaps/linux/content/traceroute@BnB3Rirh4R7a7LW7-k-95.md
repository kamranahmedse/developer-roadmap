# Traceroute

Traceroute is a Linux network diagnostic tool that displays the path packets take from your system to a destination. It identifies routing problems, measures latency, and reveals network structure as packets traverse the internet. Each hop is tested multiple times with round-trip times displayed. Use `traceroute www.example.com` to discover packet routes and diagnose failures.

Each jump along the route is tested multiple times (the default is 3 but this can be changed), and the round-trip time for each packet is displayed. If certain packets are failing to reach their destination, traceroute can help diagnose where the failure is occurring.

Tracing route in Linux can be achieved by executing the `traceroute` command which allows you to discover the routes that internet protocol packets follow when traveling to their destination.
```bash
$ traceroute www.example.com
```