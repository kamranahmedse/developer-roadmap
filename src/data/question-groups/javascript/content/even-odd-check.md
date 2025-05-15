One way to check if a number is even or odd is by creating a function using the modulus operator (`%`). It's a mathematical operation that helps find the remainder of a division problem.

In the example below, the number used for the division is "2", which is already an even number. If the remainder of dividing a number by "2" is "0", then it's an even number. But if the remainder is not "0", it's an odd number.

```javascript
function EvenOrOddNum(num) {

  if (num % 2 === 0) {
    return `${num} is even`;
  } else {
    return `${num} is odd`;
  }
}

console.log(EvenOrOddNum(30)); // 30 is even

console.log(EvenOrOddNum(31)); // 31 is odd
``` 