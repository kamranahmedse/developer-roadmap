# LOLBAS

**LoLBAS** stands for **Living off the Land Binaries and Scripts**. It is a collection of tools, utilities, and scripts, often built-in within an operating system, that attackers exploit for unintended purposes. These tools can assist the adversaries in achieving their objectives without the need to install any additional software, thus avoiding detection by many security solutions.

In this section, we will explore the concept and significance of LoLBAS, and the challenges they present in the context of cyber security.

## What is LoLBAS?

LoLBAS are legitimate tools, binaries, and scripts that are already present in a system. These may be default OS utilities, like PowerShell or Command Prompt, or commonly installed applications, such as Java or Python. Adversaries utilize these tools to perform malicious activities, as they blend into the environment and are less likely to raise any alarms.

Some examples of LoLBAS include:

- PowerShell: Used for executing commands and scripts for various administrative functions.
- Cscript and Wscript: Used for executing VBScript and JScript files.
- Certutil: Used for updating certificate store but can also be leveraged to download files from the internet.

## Why LoLBAS are popular among adversaries?

There are several reasons why adversaries choose to use LoLBAS for their malicious purposes:

- **No additional software required**: As these tools are already a part of the target system, there is no need to install new software that could potentially be detected.
- **Ease of use**: Many LoLBAS provide powerful capabilities without requiring complex coding. As a result, adversaries can swiftly implement and execute tasks using them.
- **Masquerading as legitimate actions**: Since LoLBAS are typically used for legitimate purposes, suspicious activities using these tools can blend in with regular traffic, making it difficult to identify and detect.

## Challenges posed by LoLBAS

Utilizing LoLBAS presents unique challenges in cyber security due to the following reasons:

- **Difficulty in detection**: Identifying and differentiating between malicious and legitimate uses of these tools is a challenging task.
- **False positives**: Blocking, limiting, or monitoring the usage of LoLBAS frequently leads to false positives, as legitimate users might also rely on these tools.

## Securing against LoLBAS attacks

To protect against LoLBAS-based attacks, organizations should consider taking the following steps:

- **Monitor behavior**: Establish baselines of normal system behavior and monitor for deviations, which could suggest malicious use of LoLBAS.
- **Least privilege principle**: Apply the principle of least privilege by limiting user permissions, reducing the potential attack surface.
- **Harden systems**: Remove or disable unnecessary tools and applications that could be exploited by adversaries.
- **Educate users**: Train users on the risks and signs of LoLBAS usage and encourage them to report suspicious activity.
- **Employ advanced security solutions**: Use technologies like Endpoint Detection and Response (EDR) and behavioral analytics to detect abnormal patterns that could be associated with LoLBAS abuse.

## Conclusion

LoLBAS present a significant challenge to cyber security, as they blend in with legitimate system activities. However, overcoming this challenge is possible through a combination of proactive monitoring, system hardening, and user education.

Ensure you are well prepared to identify and mitigate LoLBAS attacks by following the recommendations provided in this guide. Stay vigilant and stay secure!

- [@article@LOLBAS project](https://lolbas-project.github.io/#)