# Error Detection  

**Error detection** ensures data integrity in `TCP-based` communication, preventing corrupted 
or altered packets from disrupting server-side game interactions. `TCP` uses checksums to verify
data integrity, detecting bit errors during transmission. If an error is found, the corrupted 
packet is discarded, and retransmission is requested via acknowledgments (ACKs). Additional 
mechanisms such as cyclic redundancy check (CRC) and parity checks may be used in lower 
network layers to enhance reliability. Effective error detection minimizes data corruption 
in multiplayer games, ensuring smooth gameplay and synchronization across players.

Visit the following resources to learn more:

- [@article@Error Detection Code – Checksum](https://www.geeksforgeeks.org/error-detection-code-checksum/)  
- [@article@Error Control in TCP](https://www.cisco.com/c/en/us/support/docs/ip/tcp/13733-40.html)