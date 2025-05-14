To compute the median in a stream of numbers, use two heaps:

- Max-heap for the lower half
- Min-heap for the upper half
- Keep both heaps balanced
- The median is either the top of one heap or the average of both tops

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max heap (negative values)
        self.large = []  # min heap
    
    def add_num(self, num):
        if len(self.small) == len(self.large):
            heapq.heappush(self.large, -heapq.heappushpop(self.small, -num))
        else:
            heapq.heappush(self.small, -heapq.heappushpop(self.large, num))
    
    def find_median(self):
        if len(self.small) == len(self.large):
            return (self.large[0] - self.small[0]) / 2.0
        else:
            return self.large[0]
``` 