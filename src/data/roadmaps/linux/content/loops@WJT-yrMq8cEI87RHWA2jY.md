# Loops

Shell loops automate repetitive tasks by executing code blocks based on conditions. Three types exist: `for` (iterates over item lists), `while` (executes while condition is true), and `until` (runs until condition becomes true). Example: `for i in 1 2 3; do echo "$i"; done` outputs each number. Loops enhance script efficiency and enable effective automation.

In Linux, shell scripts commonly use three types of loops - for, while, and until. 

- `for` loop iterates over a list of items and performs actions on each of them.
- `while` loop executes commands as long as the control condition remains true.
- `until` loop runs commands until the control condition becomes true.

Here is a simple sample for loop in bash/shell:

```bash
for i in 1 2 3
do
   echo "$i"
done
```
This will output:
```
1
2
3
```

This is just the surface of looping in shell programming in Linux. These structures, when used wisely, can enhance your scripts and open up many areas for effective scripting and automation.
