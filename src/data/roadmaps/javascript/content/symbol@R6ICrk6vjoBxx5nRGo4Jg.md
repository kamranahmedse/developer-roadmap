# Symbol

/* In JavaScript, a Symbol is a primitive data type introduced in ECMAScript 2015 (ES6). Symbols are unique and immutable identifiers. They are often used to add unique property keys to objects that won't collide with keys from other code. */

/*
Explanation
Uniqueness: Each Symbol value is unique. Even if you create two symbols with the same description, they are distinct and not equal.
Immutability: Once a Symbol is created, its value cannot be changed.
Usage: Symbols are typically used to add properties to objects that should not conflict with any other property keys. They can be useful in situations where you want to ensure that a property key is unique and does not accidentally overwrite another property. 
*/

Example in a Simple Coding Project below
Let's create a simple example where we use Symbols to define unique keys for an object in a small project that manages a library system.

// Define symbols for unique property keys
const TITLE = Symbol('title');
const AUTHOR = Symbol('author');
const ISBN = Symbol('isbn');

// Create a book object using the symbols as property keys
let book = {
    [TITLE]: 'JavaScript: The Good Parts',
    [AUTHOR]: 'Douglas Crockford',
    [ISBN]: '978-0596517748'
};

// Function to display book details
function displayBookDetails(book) {
    console.log('Title:', book[TITLE]);
    console.log('Author:', book[AUTHOR]);
    console.log('ISBN:', book[ISBN]);
}

// Add a new property using a symbol to the book object
const RATING = Symbol('rating');
book[RATING] = 4.5;

// Display book details
displayBookDetails(book);

// Show that symbols are unique
const TITLE2 = Symbol('title');
console.log(TITLE === TITLE2); // false
console.log(book[TITLE2]); // undefined


