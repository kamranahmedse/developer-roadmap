---
title: 'File Integrity Checker'  
description: 'Verify the integrity of system or application log files to detect tampering.'  
isNew: false  
sort: 1
difficulty: 'beginner'  
nature: 'Security'  
skills:  
  - 'Bash'  
  - 'Python'  
  - 'Linux'  
  - 'Cyber Security'  
seo:  
  title: 'Build A File Integrity Checking Tool'  
  description: 'Learn how to build a CLI tool that validates the integrity of a file using hashes.'  
  keywords:  
    - 'integrity'
    - 'hash'
    - 'cyber security'  
roadmapIds:  
  - 'cyber-security'
---

In this project, you will develop a tool that verifies the integrity of log files to detect tampering. This project will help you understand file integrity monitoring, hashing techniques, and log analysis.

## Requirements

The tool should:

- Accept a directory of log files as input.
- Calculate cryptographic hashes (e.g., SHA-256) for each log file.
- Compare the hashes with previously stored hashes to check for tampering.
- Report any discrepancies in file integrity

## Example

```bash
> ./integrity-check -file /var/log/syslog
> Status: Modified (Hash mismatch)

> ./integrity-check -file /var/log/auth.log
> Status: Unmodified
```
