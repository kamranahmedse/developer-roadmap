# Variables in Shell Programming on Linux

In the context of Shell Programming on Linux, a variable is a symbolic name that represents a storage location in memory. It can store system data or user-defined data, and its value can change during the execution of the program. Variables play a crucial role in shell scripting, allowing you to store and manipulate data dynamically.

There are two main types of variables in Linux shell programming:

1. **System Variables**: These are predefined variables created and maintained by the Linux system itself. Examples include `PATH`, `HOME`, and `PWD`.
2. **User-Defined Variables**: These are variables created and controlled by the user. You can define your own variables to store and use custom data in your shell scripts.

To define a user-defined variable in a Bash script, you can use the '=' (equals) operator. To access the value of a variable, you need to prefix the variable name with a '$' (dollar) sign.

Here's an example using Ubuntu Linux:

```bash
# Define a User-Defined Variable
ROADMAP_USER="roadmap"
ROADMAP_HOME="/home/$ROADMAP_USER"

# Print the value of the Variables
echo "User: $ROADMAP_USER"      # Output: User: roadmap
echo "Home: $ROADMAP_HOME"     # Output: Home: /home/roadmap
```

In this example, we define two user-defined variables: `ROADMAP_USER` and `ROADMAP_HOME`. We then print the values of these variables using the `echo` command.
