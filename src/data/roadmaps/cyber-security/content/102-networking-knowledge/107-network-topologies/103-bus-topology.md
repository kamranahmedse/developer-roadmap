# Bus

A **bus topology** is a type of network configuration where all the devices or nodes in the network are connected to a single, central cable known as the bus, backbone or trunk. This common shared path serves as the medium for data transmission and communication amongst the nodes. 

## How Bus Topology Works

In a bus topology, every node has a unique address that identifies it on the network. When a node wants to communicate with another node in the network, it broadcasts a message containing the destination node's address as well as its own address. All the nodes connected to the bus receive the message, but only the intended recipient with the matching address responds.

## Advantages of Bus Topology

- **Easy to set up**: Bus topology is relatively simple in terms of installation, as it requires less cable and minimal hardware.
- **Cost-effective**: Due to its simplicity and reduced cabling requirements, it's typically more affordable to implement than other topologies.
- **Expandable**: New nodes can be easily added to the network by connecting them to the bus.

## Disadvantages of Bus Topology

- **Limited Scalability**: As the number of nodes increases, network performance may decrease due to increased collisions and data transmission time.
- **Single point of failure**: If the central cable (bus) fails or gets damaged, the entire network will be affected and may result in a complete breakdown.
- **Maintenance difficulty**: Troubleshooting and identifying issues within the network can be challenging due to the shared path for data transmission.

Bus topology can be an effective solution for small networks with minimal devices. However, as network size and complexity increase, other topologies such as star, ring, or mesh may be more suitable for maintaining efficiency and reliability.