# nslookup

**Nslookup** is a network administration command-line tool designed for retrieving information about Domain Name System (DNS) records. DNS is responsible for translating domain names into IP addresses, allowing users to access websites and resources by using human-readable names (e.g., www.example.com) instead of numerical IP addresses.

## Uses

* Query DNS servers to verify the configuration of domain names
* Find the IP address of a specific domain name
* Troubleshoot DNS-related issues and errors
* Identify the authoritative DNS servers for a domain

## How to Use

- **Open Command Prompt or Terminal**: Press `Windows key + R`, type `cmd`, and press Enter to open Command Prompt on Windows. On macOS or Linux, open Terminal.

- **Running Nslookup**: To start using Nslookup, type `nslookup` and hit Enter. You'll now see the `>` prompt, indicating you are in Nslookup mode.

- **Query DNS Records**: In Nslookup mode, you can query different types of DNS records by typing the record type followed by the domain name. For instance, to find the A (address) record of www.example.com, type `A www.example.com`. To exit Nslookup mode, type `exit`.

## Commonly Used Record Types

Below are some of the most-commonly queried DNS record types:

* **A**: Stands for 'Address'; returns the IPv4 address associated with a domain name
* **AAAA**: Stands for 'Address', for IPv6; returns the IPv6 address associated with a domain name
* **NS**: Stands for 'Name Server'; returns the authoritative DNS servers for a specific domain
* **MX**: Stands for 'Mail Exchange'; returns the mail server(s) responsible for handling email for a specific domain
* **CNAME**: Stands for 'Canonical Name'; returns the domain name that an alias is pointing to
* **TXT**: Stands for 'Text'; returns additional text information that can be associated with a domain, like security policies (e.g., SPF)

## Example

If you want to find the A (IPv4) record for example.com, follow these steps:

- Open Command Prompt or Terminal
- Type `nslookup` and hit Enter
- Type `A example.com` and hit Enter

This will return the IPv4 address associated with the domain name example.com.