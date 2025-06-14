# Creating Files

Creating files in Linux is about making new blank or filled files on your computer. You can use commands like `touch` to create an empty file, `echo` to make a file with some text inside, or `cat` to type directly into a new file. These commands help you set up and save your documents or data.

Here's an example of file creation with the `touch` command:

```bash
touch newfile.txt
```

and with `cat` command:

```bash
cat > newfile.txt
```

Both these commands create a new "newfile.txt" if it does not already exist.

# Deleting Files

Deleting files in Linux means getting rid of unwanted or unnecessary files from your computer. You use the `rm` command to delete a file, and it's permanent, so be careful. You can also use `rm -i` (interactive) to ask for confirmation before deleting, which helps prevent accidental loss of important files.

```bash
# Deletes the file named example.txt
rm example.txt
```

```bash
# Ask for confirmation
rm -i [filename]
```

```bash
# Removes an empty directory
rmdir [directory] 
```

Learn more from the following resources:

- [@article@Linux rm Command: File Removing](https://labex.io/tutorials/linux-linux-rm-command-file-removing-209741)
