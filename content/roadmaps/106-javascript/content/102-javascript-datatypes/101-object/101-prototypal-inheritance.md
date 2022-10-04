# Prototypal inheritance

In JavaScript, objects have a special hidden property `[[Prototype]]`, that is either null or references another object. That object is called "a prototype".

When we read a property from object, and it's missing, JS automatically takes it from the prototype. This is called "protoypal inheritance".

Syntax:

`ChildObject.__proto__ = ParentObject`

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink badgeText='Official Website' colorScheme='blue' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain'>JavaScript MDN Docs</BadgeLink>
<BadgeLink badgeText='Official Website' colorScheme="blue" href='https://www.geeksforgeeks.org/prototypal-inheritance-using-__proto__-in-javascript/'>GeeksForGeeks – JavaScript Tutorial</BadgeLink>
<BadgeLink badgeText='Official Website' colorScheme="blue" href='https://javascript.info/prototype-inheritance'>The Modern JavaScript Tutorial</BadgeLink>
