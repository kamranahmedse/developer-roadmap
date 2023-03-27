# route

`route` is a command-line utility that allows you to view and manipulate the IP routing table in your computer. The primary function of the routing table is to determine the best path for sending IP packets to their destination. Properly managing this table is crucial for network administrators, as it plays a direct role in your computer's ability to communicate with other devices on the network effectively.

## Using the Route Command

The syntax for the route command is as follows:

```
route [COMMAND] [OPTIONS]
```

Here are some basic commands that you can use with `route`:

- **route add** - Adds a new route to the table
- **route delete** - Removes a route from the table
- **route change** - Modifies a specific route in the table
- **route get** - Retrieves information about a specific route
- **route show** - Displays the entire routing table

Please note that, to modify the routing table, administrative privileges may be needed.

## Examples of Route Usage

- **View the routing table**

```
route -n
```

This command will display the current routing table in a numerical format, which includes the destination, gateway, and interface.

- **Add a new route**

```
sudo route add -net 192.168.2.0 netmask 255.255.255.0 gw 192.168.1.1
```

This command adds a new route to the destination network 192.168.2.0 with a netmask of 255.255.255.0 and a gateway of 192.168.1.1.

- **Delete a route**

```
sudo route delete -net 192.168.2.0 netmask 255.255.255.0
```

This command removes the route to the destination network 192.168.2.0 with a netmask of 255.255.255.0.

- **Change an existing route**

```
sudo route change -net 192.168.2.0 netmask 255.255.255.0 gw 192.168.1.2
```

This command modifies the existing route to the destination network 192.168.2.0 with a new gateway of 192.168.1.2.

## Conclusion

The `route` command is an essential tool for network administrators and anyone involved in cyber security. Understanding and being able to manipulate the IP routing table can help ensure that your computer is able to communicate effectively with other devices on the network, thus contributing to a more secure and efficient network environment.