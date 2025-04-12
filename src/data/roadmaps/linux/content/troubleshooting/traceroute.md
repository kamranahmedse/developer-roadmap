# Traceroute 

Traceroute is a network diagnostic tool used widely in Linux systems for troubleshooting. It is designed to display the path that packets take from the system where traceroute is run to a specified destination system or website. It's used to identify routing problems, offer latency measurement, and figure out the network structure as packets journey across the internet.

Each jump along the route is tested multiple times (the default is 3 but this can be changed), and the round-trip time for each packet is displayed. If certain packets are failing to reach their destination, traceroute can help diagnose where the failure is occurring.

Tracing route in Linux can be achieved by executing the `traceroute` command which allows you to discover the routes that internet protocol packets follow when traveling to their destination.
```bash
$ traceroute www.example.com
```