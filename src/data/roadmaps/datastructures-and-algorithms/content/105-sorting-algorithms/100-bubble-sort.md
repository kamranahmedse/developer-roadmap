# Bubble Sort

Bubble Sort is a simple sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. It gets its name because with each iteration the largest element "bubbles" up to its proper location. It continues this process of swapping until the entire list is sorted in ascending order. The main steps of the algorithm are: starting from the beginning of the list, compare every pair of adjacent items and swap them if they are in the wrong order, and then pass through the list until no more swaps are needed. However, despite being simple, Bubble Sort is not suited for large datasets as it has a worst-case and average time complexity of O(n²), where n is the number of items being sorted.

 public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
