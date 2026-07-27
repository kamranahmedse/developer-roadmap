# Intervals

Interval problems appear frequently in scheduling, calendar, and range-based questions. The dominant technique is sorting by start or end time, which turns an otherwise quadratic overlap-checking problem into a linear scan. Once sorted, you can merge overlaps, count simultaneous events, or find gaps with a single pass. The harder problems in this stage combine interval sorting with a heap to answer queries efficiently. The key mindset shift is thinking of intervals as objects with a start and end, and reasoning about what it means for two intervals to overlap, contain, or be adjacent.

Visit the following resources to learn more:

- [@article@DSA Fundamentals: Intervals - From Theory to LeetCode Practice](https://www.jaykye.dev/blog/dsa-intervals-fundamentals)