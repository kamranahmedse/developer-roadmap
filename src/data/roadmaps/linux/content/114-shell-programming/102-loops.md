# Loops in Linux Shell Scripting

Loops are a fundamental concept in shell programming, allowing you to automate repetitive tasks and make your scripts more efficient. In Linux, the most commonly used loop structures are `for`, `while`, and `until`.

## `for` Loop

The `for` loop iterates over a list of items, performing actions on each of them. Here's an example in Ubuntu Linux:

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

You can also use the `for` loop to iterate over a range of numbers:

```bash
for i in {1..5}
do
   echo "$i"
done
```

This will output:

```
1
2
3
4
5
```

## `while` Loop

The `while` loop executes commands as long as the control condition remains true. Here's an example in Ubuntu Linux:

```bash
counter=1
while [ $counter -le 3 ]
do
   echo "$counter"
   ((counter++))
done
```

This will output:

```
1
2
3
```

## `until` Loop

The `until` loop runs commands until the control condition becomes true. Here's an example in Ubuntu Linux:

```bash
counter=1
until [ $counter -gt 3 ]
do
   echo "$counter"
   ((counter++))
done
```

This will output:

```
1
2
3
```
