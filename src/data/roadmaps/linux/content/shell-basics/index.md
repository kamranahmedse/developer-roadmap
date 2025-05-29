# Linux Shell Basics

The **Linux shell** is a command-line interface used to interact with the operating system. It serves as an intermediary between the user and the system's kernel, allowing you to execute commands, manage files, automate tasks, and run programs.

Linux offers several types of shells, including:

- **Bourne Shell (`sh`)** – The original Unix shell.
- **Bourne-Again Shell (`bash`)** – The most commonly used shell in modern Linux distributions.
- **C Shell (`csh`)** – Uses C-like syntax and features.
- **Z Shell (`zsh`)** – An advanced shell with many features and customizations.

---

## Why Learn the Shell?

Understanding the Linux shell is essential for:

- Navigating the filesystem
- Managing files and directories
- Installing and configuring software
- Writing and executing shell scripts
- Automating system tasks and workflows
- Performing remote server administration

---

## Basic Shell Operations

Here are some key operations you'll use regularly in the shell:

| Task                      | Command Example                      |
|---------------------------|---------------------------------------|
| List files                | `ls`                                  |
| Change directory          | `cd Documents/`                       |
| Make a new directory      | `mkdir my_folder`                    |
| Create a file             | `touch myfile.txt`                   |
| View file content         | `cat myfile.txt`                     |
| Remove a file             | `rm myfile.txt`                      |
| Move or rename a file     | `mv old.txt new.txt`                 |
| Copy a file               | `cp file1.txt backup.txt`            |

---

## Your First Bash Script

Try creating and running a simple Bash script:

```bash
# Step 1: Create a new file
touch my_first_script.sh

# Step 2: Make it executable
chmod +x my_first_script.sh

# Step 3: Add a simple command to the script
echo "date" > my_first_script.sh

# Step 4: Run the script
./my_first_script.sh

