# What is Deuth attack?
A **Deauthentication (Deauth) Attack** is a type of Denial of Service (DoS) attack targeting wireless networks, specifically Wi-Fi. The attack disrupts the connection between a user’s device and a Wi-Fi access point by exploiting the deauthentication frames in the 802.11 protocol, which governs Wi-Fi communication.

## How the Deauthentication Attack Works?

- **Wi-Fi Authentication Process:** When a device connects to a Wi-Fi network, it must authenticate with the access point (AP). Part of the management of this connection involves the use of "deauthentication frames." These frames are used by either the client or the access point to terminate the connection.
- **Exploiting the Protocol:** Deauth frames are not encrypted, even in secured networks using WPA/WPA2. An attacker can forge these frames, making it appear as if they are coming from either the client or the access point. By sending a large number of deauth frames, the attacker can force the target device to disconnect repeatedly.
- **Resulting Impact:** The victim’s device gets kicked off the network, disrupting any ongoing communications (e.g., streaming, browsing, online gaming). The device may automatically try to reconnect, but the attacker can continue sending deauth frames to maintain the disruption.

## Common Tools for Deauth Attacks

- [@website@Aircrack-ng](https://github.com/aircrack-ng/aircrack-ng) **Aircrack-ng Suite:** Specifically, the aireplay-ng tool can send deauth frames.
- [@website@mdk3](https://www.kali.org/tools/mdk3/) A command-line tool for testing and performing various Wi-Fi attacks, including deauth.
- [@website@ESP8266 Deauther](https://github.com/SpacehuhnTech/esp8266_deauther) A microcontroller-based device that can perform deauth attacks on Wi-Fi networks.
