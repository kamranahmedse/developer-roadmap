# Pipe Commands

Pipes (`|`) are a powerful feature in Linux that allow you to connect multiple commands together. This mechanism enables the output of one command to be used as the input for another command. When it comes to text processing, using pipes is particularly helpful as it allows you to manipulate, analyze, and transform text data without the need to create intermediate files or programs.

Here's a simple example of using pipes to list all the text files in the current directory on a Ubuntu Linux system:

```bash
roadmap@ubuntu:~$ ls | grep .txt
example.txt
document.txt
```

In this example, the `ls` command lists all the files in the current directory, and the `grep .txt` command filters the output to only include files that end with `.txt`. The pipe `|` takes the output from `ls` and uses it as the input to `grep .txt`. The final output is the list of text files in the current directory.

To learn more about pipes and redirection in Linux, please refer to the following resource:

- [@article@Piping and Redirection](https://ryanstutorials.net/linuxtutorial/piping.php#piping)
