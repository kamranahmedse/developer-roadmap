```javascript
console.log(10 + 2 + "9"); // 129
```

JavaScript uses type coercion to convert values to the same type before operations. It'll first add both numbers 10 + 2 to get 12, and then try to add the number 12 to the string "9". Since you can't add a number and a string in JavaScript, it'll change the number 12 into a string "12," i.e., "12" + "9" = "129" 