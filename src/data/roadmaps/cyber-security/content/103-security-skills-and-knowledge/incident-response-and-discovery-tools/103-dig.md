# dig

Dig, short for Domain Information Groper, is a command-line tool used to query Domain Name System (DNS) servers to obtain valuable information about DNS records. Dig is available on most Unix-based systems, including Linux and macOS, and can also be installed on Windows.

As part of your incident response toolkit, dig helps you to discover essential domain details such as domain's IP addresses, mail server details, name servers, and more. This can be crucial when tracking down a cyberattack or monitoring the DNS health of your own organization.

## Installation

For Linux and macOS systems, dig is usually pre-installed as part of the BIND (Berkeley Internet Name Domain) package. To check if dig is installed, execute the following command:

```
dig -v
```

If the command is not found, install it using your system's package manager:

- For Debian-based systems (Debian, Ubuntu, etc.):

  ```
  sudo apt-get install dnsutils
  ```

- For Red Hat-based systems (RHEL, CentOS, Fedora, etc.):

  ```
  sudo yum install bind-utils
  ```

- For macOS:

  ```
  brew install bind
  ```

- For Windows, download the BIND package from the [official website](https://www.isc.org/download/) and follow the installation instructions.

## Basic Usage

The basic syntax for using dig is:

```
dig [options] [name] [record type]
```

Where `options` can be various command-line flags, `name` is the domain name you want to query, and `record type` is the type of DNS record you want to fetch (e.g., A, MX, NS, TXT, etc.).

Here are a few examples:

- To query the IP addresses (A records) of example.com:

  ```
  dig example.com A
  ```

- To query the mail servers (MX records) of example.com:

  ```
  dig example.com MX
  ```

- To query the name servers (NS records) of example.com:

  ```
  dig example.com NS
  ```

By default, dig queries your system's configured DNS servers, but you can also specify a custom DNS server as follows:

```
dig @8.8.8.8 example.com A
```

Where `8.8.8.8` is the IP address of the custom DNS server (e.g., Google's Public DNS).

## Advanced Usage

Dig offers a variety of options for specifying query behavior, controlling output, and troubleshooting DNS issues.

- To display only the answer section of the response:

  ```
  dig example.com A +short
  ```

- To control the number of retries and timeout:

  ```
  dig example.com A +tries=2 +time=1
  ```

- To query a specific DNSSEC (DNS Security Extensions) record:

  ```
  dig example.com DNSKEY
  ```

- To show traceroute-like output for following the DNS delegation path:

  ```
  dig example.com A +trace
  ```

For a comprehensive list of options, consult the [dig man page](https://manpages.debian.org/stretch/dnsutils/dig.1.en.html) and the [official BIND documentation](https://bind9.readthedocs.io/en/latest/reference.html#dig).

## Conclusion

Dig is a powerful and flexible tool for querying DNS information, making it an essential part of any cyber security professional's toolkit. Whether you're investigating a breach, monitoring domain health, or troubleshooting DNS issues, dig can help you discover critical information about domain names and their associated records.