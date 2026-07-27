# Trampolines

Trampolines in Scala are used to avoid stack overflow errors in deep recursion by moving the computation from the stack to the heap. The TailRec class is part of the scala.util.control.TailCalls are used to implement trampolining.

Visit the following resources to learn more:

- [@article@Recursion and Trampolines in Scala · GitHub](https://gist.github.com/eamelink/4466932a11d8d92a6b76e80364062250)
- [@article@Tail calls, @tailrec and trampolines](https://rd.nz/2009/04/tail-calls-tailrec-and-trampolines.html)
- [@article@How Trampoline Works in Scala](https://free.cofree.io/2017/08/24/trampoline/)