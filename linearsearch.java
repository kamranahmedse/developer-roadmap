// Java program to implement Linear Search

class GFG {

	// Function for linear search
	public static int search(int arr[], int x)
	{
		int n = arr.length;

		// Traverse array arr[]
		for (int i = 0; i < n; i++) {

			// If element found then
			// return that index
			if (arr[i] == x)
				return i;
		}
		return -1;
	}

	// Driver Code
	public static void main(String args[])
	{
		// Given arr[]
		int arr[] = { 2, 3, 4, 10, 40 };

		// Element to search
		int x = 10;

		// Function Call
		int result = search(arr, x);
		if (result == -1)
			System.out.print(
				"Element is not present in array");
		else
			System.out.print("Element is present"
							+ " at index "
							+ result);
	}
}
