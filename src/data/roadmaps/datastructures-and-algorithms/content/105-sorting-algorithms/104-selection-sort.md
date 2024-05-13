# Selection Sort

Selection Sort is a simple and intuitive sorting algorithm. It works by dividing the array into two parts - sorted and unsorted. Initially, the sorted part is empty and the unsorted part contains all the elements. The algorithm repeatedly selects the smallest (or largest, if sorting in descending order) element from the unsorted part and moves that to the end of the sorted part. The process continues until the unsorted part becomes empty and the sorted part contains all the elements. Selection sort is not efficient on large lists, as its time complexity is O(n²) where n is the number of items.

### An implementation of selection sort:
```
private static void selSort(int[] arr, int n) {

        for (int i = 0; i < n - 2; i++) {
            int minimum = i;
            for (int j = i; j < n; j++) {
                if (arr[j] < arr[minimum])
                    minimum = j;
            }
            int temp = arr[i];
            arr[i] = arr[minimum];
            arr[minimum] = temp;
        }

        System.out.println("after selection sort:");
        for (int i : arr) {
            System.out.print(i + " ");
        }

        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'selSort'");
    }
```

### Explanation
Here we are searching for the minimum index first to which we can swap the ith element from the array and we are iterating till n-2 because we won't need to sort the last element as it'll already be in sorted place. We are performing simple swap operation using temp variable, and after the loop exits we are printing the array with the help of foreach loop. 
