# awk - Text Processing

awk is a powerful text-processing language that is widely used in Unix-like operating systems, including Linux. Named after its three original developers - Alfred Aho, Peter Weinberger, and Brian Kernighan, awk is adept at performing operations upon text files, such as sorting, filtering, and report generation.

The language comprises a set of commands within a script that define pattern-action pairs. Essentially, awk reads an input file line by line, identifies patterns that match what is specified in the script, and consequently executes actions upon those matches.

Though a complete language with variables, expressions, and control structures, awk is most commonly used as a single-line command within bash shell scripts, leveraging its versatile text manipulation capabilities.

Here's an example of how to print first two fields of each line of a file using awk:

```awk
awk '{print $1,$2}' filename
```

This would display the first and second field (typically separated by spaces) of every line in 'filename'.

Visit the following resources to learn more:

- [@article@IBM.com: Awk by Example](https://developer.ibm.com/tutorials/l-awk1/)
- [@article@Linux Handbook: Awk](https://linuxhandbook.com/awk-command-tutorial/)
- [@video@YouTube](https://www.youtube.com/watch?v=9YOZmI-zWok)
- [@feed@Explore top posts about Bash](https://app.daily.dev/tags/bash?ref=roadmapsh)
- [@article@Linux awk Command: Text Processing](https://labex.io/tutorials/linux-linux-awk-command-text-processing-388493)