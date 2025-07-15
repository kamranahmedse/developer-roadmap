# Array to Slice Conversion

Convert arrays to slices using expressions like `array[:]` or `array[start:end]`. Creates slice header pointing to array memory - no data copying. Modifications through slice affect original array. Efficient way to use arrays with slice-based APIs.