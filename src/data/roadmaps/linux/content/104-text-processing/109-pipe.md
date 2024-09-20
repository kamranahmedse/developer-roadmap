# Pipe Commands 

The pipe (`|`) is a powerful feature in Linux used to connect two or more commands together. This mechanism allows output of one command to be "piped" as input to another. With regards to text processing, using pipe is especially helpful since it allows you to manipulate, analyze, and transform text data without the need to create intermediary files or programs.

Here is a simple example of piping two commands, `ls` and `grep`, to list all the text files in the current directory:

```bash
ls | grep .txt
```

In this example, `ls` lists the files in the current directory and `grep .txt` filters out any files that don't end with `.txt`. The pipe command, `|`, takes the output from `ls` and uses it as the input to `grep .txt`. The output of the entire command is the list of text files in the current directory.

Visit the following resources to learn more:

- [@article@Piping and Redirection](https://ryanstutorials.net/linuxtutorial/piping.php#piping)