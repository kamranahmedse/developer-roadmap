Let's see how we can use the `alert`, `prompt` and `confirm` functions to interact with the user.

## alert()

The `alert()` method displays an alert box with a specified message and an OK button.

```js
alert('Hello World!');
```

## prompt()

The `prompt()` method displays a dialog box that prompts the visitor for input. A prompt box is often used if you want the user to input a value before entering a page. The `prompt()` method returns the input value if the user clicks OK. If the user clicks Cancel, the method returns `null`.

```js
const name = prompt('What is your name?');
console.log(name);
```

## confirm()

The `confirm()` method displays a dialog box with a specified message, along with an OK and a Cancel button. This is often used to confirm or verify something from the user.

```js
const result = confirm('Are you sure?');
console.log(result); // true/false
```
