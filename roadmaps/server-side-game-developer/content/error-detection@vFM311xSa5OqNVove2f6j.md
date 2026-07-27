# Error Detection  

**Error detection** ensures data integrity in `TCP-based` communication, preventing corrupted 
or altered packets from disrupting server-side game interactions. `TCP` uses checksums to verify
data integrity, detecting bit errors during transmission. If an error is found, the corrupted 
packet is discarded, and retransmission is requested via acknowledgments (ACKs). Additional 
mechanisms such as cyclic redundancy check (CRC) and parity checks may be used in lower 
network layers to enhance reliability. Effective error detection minimizes data corruption 
in multiplayer games, ensuring smooth gameplay and synchronization across players.

Visit the following resources to learn more:

- [@article@Checksum - Wikipedia](https://en.wikipedia.org/wiki/Checksum)
- [@article@Error Control in TCP](https://www.cisco.com/c/en/us/support/docs/ip/tcp/13733-40.html)
- [@article@What is Error Detection? - IBM](https://www.ibm.com/think/topics/error-detection)
- [@article@Cyclic Redundancy Check - Wikipedia](https://en.wikipedia.org/wiki/Cyclic_redundancy_check)
- [@article@Detecting and Correcting Bit Errors - Princeton University](https://www.cs.princeton.edu/courses/archive/spring19/cos463/lectures/L08-error-control.pdf)
