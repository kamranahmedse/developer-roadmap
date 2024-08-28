Session 1: IEEE 802.11

To understand the content of this topic, we need to conduct a brief analysis of the security of Wireless Local Area Networks (WLANs). 
IEEE 802 is a major collection of network standards specified by the IEEE association, and within it, IEEE 802.11 refers to a set of standards for wireless local area networks. This standard provides protocols for the first and second layers of the OSI model. Its functions and features allow for network speeds ranging from 1 Mbps to 20 Mbps within a 20-meter range in indoor environments. The standard has now been updated to IEEE 802.11-2020, which includes many extensions compared to the original version, such as:
1. Various enhancements and extensions released by the IEEE 802.11 working group.
2. Support for 2.4GHz and 5GHz frequencies.
3. Compliance with specific wireless network requirements in some countries.

The updated standard includes changes such as support for 6GHz and new multiplexing mechanisms.
The 802.11 standard defines two types of device components:
The first component is the wireless station (STA): These are devices with a wireless network interface card (NIC), such as desktops, laptops, tablets, or smartphones. They are the end-user devices of the network used to connect to the wireless network and communicate.
The second component is the access point (AP): The AP acts as a bridge between the wireless network and the wired network, serving as the central node of the wireless network. An access point typically consists of multiple components, including but not limited to a radio (responsible for wireless communication and signal transmission), a wired network interface (usually an Ethernet interface for connecting the wireless network to the wired network), and bridging software (responsible for data exchange and bridging between the wireless and wired networks). The primary function of an AP is to aggregate access from multiple wireless stations onto the wired network, enabling connection between the wireless and wired networks.
The 802.11 standard also defines two main operating modes:
The first is Infrastructure Mode: Infrastructure mode includes a Basic Service Set (BSS) and an Extended Service Set (ESS). In a BSS, a single access point and its associated wireless terminal devices are controlled by an AP. In an ESS, there are two or more BSSs connected through a wired network, forming a single subnet. This mode is often adopted by enterprise WLANs to achieve wider coverage and better network connectivity.
The second mode is Ad-hoc Mode: This mode, also known as peer-to-peer mode, is an Independent Basic Service Set (IBSS), composed of a group of wireless terminal devices that communicate directly with each other without going through an access point. In this mode, each device can directly communicate with other devices, forming a self-organized wireless network.
For a basic BSS, when a client device enters the coverage area of an AP and wishes to connect, the following steps are generally involved:
1. The AP sends a beacon: When an 802.11 client device enters the coverage area of one or more APs, these APs periodically send beacon frames. The beacon frames contain information about the AP, such as the SSID (Service Set Identifier), data rates, encryption settings, etc.
2. The client selects an AP: The client device selects an AP to connect to based on the received beacon frames. Generally, the client chooses the best AP based on factors such as signal strength and observed error rates.
3. Connection establishment: Once the client device has chosen an AP, it attempts to send an association request to the AP. If the AP accepts the association request, the client device establishes a connection with the AP.
4. Channel adjustment: Once connected to the AP, the client device communicates on the same wireless channel as the AP. The client device may periodically scan other channels to search for an AP with a stronger or more reliable signal. If a better AP is found, the client device may re-associate with the new AP.

Through these steps, the client can effectively join a network that adheres to the 802.11 standard.

Session 2: Security of IEEE 802.11

The security of IEEE 802.11 Wireless LANs is achieved through a series of authentication and encryption mechanisms. One of the authentication methods is Open System Authentication, which has the following characteristics:
1. Dependence on Service Set Identifier (SSID): Open System Authentication relies on the network's SSID, which is the name used to identify the wireless network. When a station requests to associate with an access point (AP), it must specify the SSID of the network it wants to connect to.
2. Extended Service Set (ESS): Multiple APs with the same SSID can form an Extended Service Set (ESS). APs can broadcast their SSID through beacon frames, allowing nearby devices to discover and connect to the network.
3. Wildcard SSID: Some client devices allow the use of a wildcard (*) as the SSID, meaning they will associate with any network that has the same SSID, regardless of other security factors.
4. Association with the Strongest AP: In Open System Authentication, devices usually select the AP with the strongest signal to associate with, without considering whether the AP’s SSID matches the network the device intends to connect to.

Overall, this approach provides a simple authentication mechanism but has security vulnerabilities since it offers very limited basic security services. Next, I will introduce some common attack methods.
For BSS, when the owner of an AP wants to avoid being attacked, a common approach is to hide the SSID so that the AP cannot be discovered by unfamiliar devices. This is achieved by not inserting the SSID in the beacon frames. However, even if the AP does not broadcast the SSID, attackers can still attempt to attack the network. A mainstream attack method is to send deauthentication frames to clients. When clients receive these frames and attempt to re-authenticate, they send re-authentication frames containing the SSID, exposing the SSID on the network.
In wireless networks, data is transmitted via wireless signals. When a directional antenna is used to intercept the signal, it can focus the signal in a specific direction. Reports indicate that with a 4-meter diameter antenna, unamplified 802.11b signals can be intercepted from as far as 124 miles away.
WarDriving is a type of wireless access reconnaissance activity commonly used to detect nearby wireless access points. With specific software and hardware, attackers can easily detect an AP's MAC address, network name, SSID, manufacturer, channel, signal strength, noise, and more. During the last global WarDriving event in 2004, 228,537 APs were detected, with 82,755 using the default SSID.
Considering the points above, given that IEEE 802.11 does not provide encryption protection for communications, powerful attackers can widely locate existing APs, attempt to access them, or intercept traffic between APs and clients for further attacks.

Session 3: WEP

WEP (Wired Equivalent Privacy) is an encryption security service used in IEEE 802.11a, b, and g. It uses the RC4 algorithm for encryption, but this method has significant security flaws due to using the same key for all data encryption and weak key management, making it vulnerable to attacks. Additionally, these networks provide entity authentication using shared key authentication based on a challenge-response protocol. During this process, the access point (AP) sends a challenge to the client, and the client must respond using a pre-shared key. However, this shared key authentication also has security issues, as the key can be intercepted or eavesdropped on during transmission, leading to risks such as man-in-the-middle attacks.
WEP is an early WLAN (Wireless Local Area Network) encryption protocol designed to provide privacy protection equivalent to that of wired networks. Below are some important details about WEP:
1. Shared Key: WEP uses a shared key to encrypt wireless network traffic. This key must be shared between the access point and all devices connected to the network. All APs in the same Extended Service Set (ESS) use the same shared key.
2. Stream Cipher Encryption: WEP uses a stream cipher to encrypt WLAN traffic. A stream cipher encrypts plaintext bit by bit using an XOR operation with the keystream
3. Lack of Key Management: WEP lacks effective key management mechanisms. The key is manually input into the wireless devices and access points and never expires. This means the same key is used throughout the network, and it cannot be periodically changed, increasing the security risk.
4. Security Issues: WEP has severe security vulnerabilities that make it susceptible to various attacks, including intercepting and cracking the WEP key to eavesdrop on network traffic. Due to the ease of cracking WEP keys, attackers can easily access the network for unauthorized access and attacks.

WEP uses the RC4 stream cipher to encrypt WLAN traffic. Below are some important details about the RC4 stream cipher used in WEP:
1. RC4 Algorithm: RC4 is a stream cipher algorithm used to generate a pseudorandom bit stream. It takes a key and an Initialization Vector (IV) as inputs and generates a keystream (also known as the RC4 keystream).
2. Keystream Generation: The RC4 algorithm processes the key and IV to generate the keystream, which is a series of pseudorandom bits based on the RC4 algorithm.
3. XOR Operation: The keystream is XORed bit by bit with each bit of the data frame. This operation applies the keystream to the data frame, encrypting the data into ciphertext bit by bit.

By using the RC4 stream cipher and XOR operation, WEP mixes the keystream with the data frame to encrypt WLAN traffic. However, since the RC4 keystream in WEP can be predicted and cracked using certain attack methods, WEP's security is seriously threatened.
The process of sending data in WEP is as follows:
1. Calculating the Integrity Check Vector (ICV): The ICV is calculated using a 32-bit Cyclic Redundancy Check (CRC) algorithm, a keyless algorithm specified by the IEEE standard. The ICV is appended to the message to create the plaintext for encryption.
2. Encrypting Plaintext Using RC4 Stream Cipher: The RC4 stream cipher is used to encrypt the plaintext. RC4 initializes with the following parameters:
   - A 40-bit key
   - A 24-bit Initialization Vector (IV)
   - The RC4-generated keystream is a function of these 64 bits. The keystream is XORed with the plaintext to generate the ciphertext.
3. Transmitting Ciphertext and IV: The encrypted ciphertext is transmitted along with the IV. The IV ensures that each data packet's encryption is unique, preventing the analysis of multiple packets under the same key to derive the key.

The process of receiving data in the WEP protocol is as follows:
1. Receiving Ciphertext: The receiver receives the ciphertext, which includes the encrypted data and the IV.
2. Decrypting Ciphertext Using RC4 Stream Cipher: The receiver uses the same key and the IV extracted from the ciphertext to initialize the RC4 stream cipher. RC4 then generates the keystream, which is XORed bit by bit with the received ciphertext to recover the original plaintext data.
3. Checking ICV: The receiver separates the ICV and message content from the decrypted plaintext. The receiver then calculates the expected ICV value using the same algorithm. The received ICV value is compared to the expected ICV value to verify the message's integrity. If they match, the message has not been tampered with; otherwise, there is a risk that the data may have been altered or corrupted.

Shared Key Authentication is a mechanism used in IEEE 802.11 WLANs to authenticate client devices (stations). Below is how it works:
1. Station Requests Association: A client device sends an association request to the AP, seeking to join the wireless network. The AP sends a challenge: the AP sends a challenge, usually a randomly generated data block, to the client device.
2. Client Responds: Upon receiving the challenge, the client device encrypts it using the WEP algorithm, generating a response. The encryption process uses the RC4 algorithm along with the 40-bit key shared between the client and the AP, and a 24-bit IV chosen by the client.
3. AP Verifies Response: The AP receives the client’s response, decrypts it using the same key and IV, and compares the decrypted response to the initial challenge. If the response matches the challenge, the client is considered legitimate and allowed to join the wireless network.

Shared Key Authentication has severe security problems, mainly due to the following reasons:
1. Recording the Authentication Process: A malicious station can record data transmissions during authentication, including the challenge and response data.
2. Calculating the Keystream Portion: Using the known plaintext challenge, a malicious station can calculate part of the keystream under a specific IV. In WEP, the ciphertext \( C \) is the result of XORing the plaintext \( P \) with the keystream.
3. Future Spoofed Authentication: Once a malicious station has obtained a portion of the keystream under a specific IV, it can spoof a legitimate station and correctly respond to future authentication challenges.
4. IV Reuse Attack: Since the authentication protocol allows stations to choose the IV, a malicious station can choose to reuse the same IV. Even if the AP sends a new challenge, using the same IV and key will cause the RC4 algorithm to generate the same keystream, allowing the malicious station to use the old keystream portion to encrypt the response correctly.

In conclusion, the security of Shared Key Authentication depends on the secrecy of the keystream, but since the RC4 algorithm used by WEP is a stream cipher, it is vulnerable to IV reuse and other stream cipher attacks, compromising the security of the authentication process.
Brute-Force Key Attack is a method of attack with the following steps:
1. Capturing Ciphertext: The attacker first captures encrypted ciphertext packets in the wireless network.
2. Exhaustively Searching Possible Keys: The attacker tries all possible \( 2^{40} \) (i.e., \( 2^{40} \)) keys using brute force. Modern hardware can complete this search process in a relatively short time, possibly in hours, minutes, or even seconds, depending on the hardware used.
3. Selecting the Correct Key: Once the search is complete, the attacker uses each possible key to decrypt the captured ciphertext and checks whether the decrypted plaintext makes sense. Since WLAN Logical Link Control (LLC) layer frames have well-defined formats, such as the first two bytes always being AA, AA (hexadecimal), the attacker can automatically identify which key correctly decrypts the data.

The brute-force key attack demonstrates the inadequacy of 40-bit keys because modern computing power allows attackers to easily crack such keys in relatively short periods, making them insufficient for providing security.
128-bit WEP is an extension of WEP that uses longer key lengths to make brute-force attacks infeasible. Details include:
1. Key Length: 128-bit WEP uses a 104-bit key plus a 24-bit IV, totaling 128 bits.
2. Brute Force Attack: Due to the increased key length to 128 bits, brute-force searching all possible keys becomes infeasible. Even with modern hardware, searching all possible 128-bit keys would take an extremely long time.
3. Protection Effect: This extension effectively protects WEP from brute-force attacks.
Although 128-bit WEP increases the key length, making brute-force attacks infeasible, replay attacks are still possible due to the relatively short length of the IV.

FMS Attack is an attack method against the WEP encryption algorithm proposed by Fluhrer, Mantin, and Shamir in 2001. Key features include:
1. Statistical Attack: The FMS attack is a statistical attack that can recover WEP keys after capturing sufficient WLAN traffic. The attack only uses a portion of the traffic, known as "weak" Initialization Vectors (IVs).
2. Applicability: The FMS attack is practical for both 40-bit and 128-bit keys. The attack’s complexity grows linearly, making it feasible to attack longer keys compared to the exponential growth of key length.
3. Passive Attack: This attack is passive and does not require active intervention in the network. Attackers can carry out the attack without drawing attention because it is based on analyzing the statistical properties of traffic.

One of the main outcomes of the FMS attack is the presentation of an effective method to recover.

Session 4: WPA

To address the numerous security issues in WEP, the IEEE 802.11 community responded with solutions, one of which was an interim solution called Wi-Fi Protected Access (WPA), and a more long-term solution known as WPA2. WPA and WPA2 were developed during the standardization process of IEEE 802.11i, which was later integrated into the 802.11-2007 standard. These new security protocols were designed to address the vulnerabilities in WEP and improve the security of 802.11 networks. WPA and WPA2 employ stronger encryption algorithms, authentication mechanisms, and improved key management schemes, making the network harder to attack and compromise.
Wi-Fi Protected Access (WPA) is an interim solution for 802.11a, b, and g networks, designed to address the problems present in WEP. Compared to WEP, WPA introduced a new authentication protocol, improved integrity protection measures, and per-packet keying. The main features of WPA include:
1. Stronger Authentication Mechanism: WPA employs a more robust authentication protocol to provide stronger authentication than WEP. This helps prevent unauthorized users from accessing the network and enhances network security.
2. Integrity Protection Measures: WPA offers improved integrity protection mechanisms to prevent data from being tampered with or corrupted during transmission, helping to prevent attackers from compromising the network by altering data packets.
3. Per-Packet Keying: WPA uses a unique key for each data packet, unlike WEP, which uses the same key for all data packets. This method effectively prevents attacks like FMS-style attacks because attackers can no longer rely on collecting large numbers of packets to crack the key.

Overall, WPA provides stronger security for existing 802.11 networks and can be implemented through simple methods like firmware upgrades without requiring hardware replacement.
WPA introduced the Temporal Key Integrity Protocol (TKIP), which uses a 128-bit per-packet encryption key. This per-packet key is derived from a session key established through a new 802.11i authentication protocol (discussed in the next slide) and mixed with a 48-bit packet sequence number. The per-packet key is then used as the key for the RC4 algorithm.
TKIP also introduced a specialized MAC algorithm called "Michael" to enhance WEP’s CRC. Each packet is protected by a MAC value. When combined with the packet sequence number, this prevents packet replay attacks. The Michael algorithm produces an 8-byte output, and the key is also 8 bytes long. Although TKIP has some known security weaknesses, it significantly improves network security compared to WEP
WPA introduced a new authentication protocol from IEEE 802.11i to replace the protocol used in WEP. This new protocol is known as the Four-Way Handshake. The Four-Way Handshake allows for the negotiation of security capabilities (such as WEP, WPA, WPA2) and exchanges random numbers and MACs (Message Authentication Codes) for mutual authentication. The MAC is calculated using a key derived from a key known as the Pairwise Master Key (PMK). The PMK is fixed within a BSS/ESS and is typically used in home or small office environments or obtained during the 802.1X protocol run, preceding the Four-Way Handshake. This is common in enterprise deployments, where 802.1X allows for the reuse of existing authentication infrastructure.
Although WPA offers stronger security than WEP, there are still some practical attack methods. Two common WPA attack methods include:
1. Dictionary Attack in Pre-Shared Key Mode: This attack targets networks that use pre-shared keys (typically entered as passphrases by users) for authentication. Attackers attempt to crack the network's pre-shared key by trying many possible password combinations. If the pre-shared key has low entropy (i.e., the passphrase is not complex enough), this attack is more likely to succeed. CoWPAtty is a tool developed by Joshua Wright that implements this type of attack.
2. Denial of Service Attack: This attack aims to make the wireless network unavailable by sending specific malicious packets to the network. 

Specifically, if a WPA device detects two packets with invalid MAC values within one second, it will assume that an attacker is trying to crack the Michael algorithm. In such cases, the WPA device will disconnect all clients from the network and pause all network activity for one minute. Therefore, an attacker only needs to send two precisely timed packets per minute to bring down the wireless network.
In conclusion, WPA and WEP have been deprecated and should no longer be used.

Session 5: WPA2

WPA2 is a further improvement upon WPA, designed to fully resolve the security issues found in WEP. It introduces new hardware requirements and offers the following key features:
1. 128-bit AES-CCMP: WPA2 employs 128-bit AES-CCMP (Advanced Encryption Standard - Counter Mode with Cipher Block Chaining Message Authentication Code Protocol) to provide confidentiality and integrity of data. AES-CCMP is a more advanced encryption standard that uses a stronger algorithm, providing a higher level of protection than WEP and WPA.
2. Prevention of Replay Attacks: WPA2 protects the 48-bit packet sequence number to prevent replay attacks, a common type of network attack where an attacker deceives the network by repeatedly sending captured packets.
3. Key Distribution Using the Four-Way Handshake Protocol: WPA2 uses the Four-Way Handshake protocol to securely distribute keys used for encryption and authentication. This protocol ensures the secure exchange of keys, enhancing the overall security of the network.
4. Key Management: WPA2 supports key management through both pre-shared mode and 802.1X authentication mode, similar to WPA. The pre-shared mode still faces the same dictionary attack issue as WPA, as it relies on user-input passphrases as the pre-shared key.
However, WPA2 also has specific security issues.

KRACK (Key Reinstallation Attack) allows attackers to target the Four-Way Handshake process of the WPA2 protocol. The vulnerability details are:
1. Modification of the Protocol Handshake: The vulnerability enables attackers to manipulate the protocol's handshake process.
2. Consequences: 
   - Interception of traffic on the Wi-Fi network.
   - Injection and/or manipulation of data depending on the network configuration.
   - All of this can occur without the attacker possessing or cracking the network password security.
3. Attack Conditions:
   - The attack cannot be executed remotely; it can only be performed when the attacker is physically near the victim.
   - The vulnerability exists within the Wi-Fi standard itself, not within individual products or implementations.

The discovery of the KRACK vulnerability drew widespread attention and led to updates and fixes for the WPA2 protocol and related products.
During the Four-Way Handshake, a new encryption key is established. By manipulating this handshake, attackers can trick victims into reinstalling an already-in-use encryption key. This allows attackers to perform attacks on the protocol, such as replaying, decrypting, and/or forging data packets. Exploiting this attack, attackers can carry out man-in-the-middle attacks, intercepting and decrypting internet traffic without possessing credentials for the protected Wi-Fi network (thus, changing the Wi-Fi password does not help).
For more information, you can refer to the following links: 
- [Overview of the Wi-Fi WPA2 Vulnerability by the European Union Agency for Cybersecurity](https://www.enisa.europa.eu/publications/info-notes/an-overview-of-the-wi-fi-wpa2-vulnerability)
- [Official KRACK Attack Website](https://www.krackattacks.com/)

Session 6: WPA3

WPA3 was announced by the Wi-Fi Alliance in January 2018 as the next-generation Wi-Fi security protocol to replace WPA2. WPA3 certification began in June 2018, and since July 2020, it has been a mandatory requirement for devices to achieve "Wi-Fi Certified" status. WPA3 introduces new security features and improvements aimed at enhancing Wi-Fi network security and protecting user data privacy. These features include:
- Stronger Encryption Algorithms: WPA3 introduces stronger encryption standards, such as 256-bit encryption algorithms, providing a higher level of data protection.
- Personal and Enterprise-Level Encryption: WPA3 offers two modes, WPA3-Personal for individual users and WPA3-Enterprise for enterprise environments, providing tailored security options for different types of networks.
- Enhanced Cryptographic Techniques: WPA3 employs more secure cryptographic techniques to prevent threats such as password cracking and man-in-the-middle attacks.
- Protection Against Password Guessing Attacks: WPA3 introduces mechanisms to prevent password guessing attacks, thwarting attempts by malicious users to crack network passwords through brute force.
- Simplified Device Connectivity: WPA3 simplifies the device connection process through new connection mechanisms such as Easy Connect, improving the user experience.

Overall, WPA3 aims to provide a higher level of Wi-Fi security, protecting users’ personal data from network attacks and threats.
WPA3-Personal introduces a new exchange method called Simultaneous Authentication of Equals (SAE) to replace pre-shared key (PSK) exchanges. Some features of WPA3-Personal include:
- Ease of Use: WPA3-Personal offers enhanced protection without changing how users connect to the network.
- Forward Secrecy: Even if the password is compromised after data transmission, WPA3-Personal can still protect data traffic.
- Unique Key: A completely unique key is generated for each authentication, enhancing security.
Due to these characteristics, WPA3-Personal provides the following benefits:
- Prevention of Offline Attacks: Attackers cannot perform offline attacks on captured packets to overcome the target network's defenses.
- Isolation Among Network Members: Members of the same network cannot eavesdrop on other members' traffic.

In WPA3, more advanced encryption algorithms are frequently used, including HMAC-SHA256 and HMAC-SHA384 hash algorithms for key derivation, BIP-CMA128 and BIP-GMAC-256 algorithms for protecting frames, and Elliptic Curve Diffie-Hellman (ECDH) and Elliptic Curve Digital Signature Algorithm (ECDSA) as authentication methods.
Protected Management Frames (PMF) is a feature already available in WPA2 but has been incorporated into the Wi-Fi certification standard in WPA3. In wireless networks, management frames are used for sending authentication, deauthentication, probe requests and responses, and other management communications between APs and clients. Without PMF enabled, all management frame data is sent in plaintext.
When PMF is enabled, management frames are encrypted, preventing several types of attacks:
- Disconnection Attacks: (Forging network data to force clients to disconnect, potentially setting the stage for other attacks).
- Honey Pot and Evil Twin Attacks: (Redirecting client devices away from legitimate Wi-Fi access points, opening channels for other attacks).

Session 7: Summary

The security of wireless local area networks still requires improvement. Methods for improvement include, but are not limited to:
- Establishing stricter security policies that involve access control, data encryption, and malicious behavior detection.
- Using network monitoring and auditing tools to detect and identify unauthorized devices or user activity.
- Regularly auditing and inspecting wireless access points to ensure they meet security standards.
- Implementing measures to protect wireless devices from physical and network attacks, such as using firewalls and intrusion detection systems.
