# Parallel Computing

Parallel computing splits a computational task across multiple processor cores at once, rather than running everything sequentially, cutting the total time for tasks that can be broken into independent pieces. R provides tools like the parallel package's `parLapply()` for distributing work across a cluster of R processes. Not every task benefits from this, since the overhead of splitting work and combining results can outweigh the benefit for small or fast tasks.

Visit the following resources to learn more:

- [@article@Parallel Computation](https://bookdown.org/rdpeng/rprogdatascience/parallel-computation.html)
- [@article@Quick Intro to Parallel Computing in R](https://nceas.github.io/oss-lessons/parallel-computing-in-r/parallel-computing-in-r.html)
- [@video@Parallel Computing in R](https://www.youtube.com/watch?v=_5hXQPTW-wU)