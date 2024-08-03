# Loops

Loops are control structures that change the flow of your program by repeating a sequence of actions described inside the block of the loop while a certain condition is not achieved.

In python we have two kinds of loops: while and for loops.

# For

A for loop is a loop that runs through an iterator or iterable object and runs the code defined inside of its block until it completes the iteration.
e.g.:
iterable = (1, 2, 3, 4)
for num in iterable:
  print(num)

iterator = range(1, 5)
for num in iterator:
  print(num)

Both for loops will have the same result that is the following:
result:
1
2
3
4

# While
While loops are loops that work in a similar way, but instead of an iterator, they take a boolean expression, and while the expression is True it continues the loop.

e.g.:
c = 1
while c < 5:
  print(c)
  c -= 1

c = 1
nums = (1, 2, 3, 4)
while c in nums:
  print(c)

Both while loops will have the same result as the for loops shown earlier

# continue and break
There are two keys that can be used for special effect in for or while loops that can change their flow: continue and break.
The contiue keyword is used to stop the loop and proceed to the next iteration.
The break keyword is used to stop the loop and get out it.
To examplify their uses, the examples bellow show the same results as the ones above:

iterator = range(-1, 7)

for num in iterator:
  if num <= 0:
    continue
  elif num >= 4:
    break
  print(num)
print(num)

num = - 1
while num < 6:
  if num <= 0:
    continue
  print(num)
  if num >= 4:
    break


Aditional content:
<a href="https://youtu.be/cL4YDtFnCt4?si=CUKeBlc61OK8w7FC">For loops<a>
<a href="https://youtu.be/LH6OIn2lBaI?si=OaYTqfstku3kHNUR">While loops<a>
<a href="https://youtu.be/1OFp_-R2B2A?si=JTh1Ke8xKZzmtplE">Interrupting while loops<a>
