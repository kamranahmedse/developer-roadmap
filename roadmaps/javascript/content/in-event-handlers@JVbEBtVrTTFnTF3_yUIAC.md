# in event handlers
 
In an event handler attached to a DOM element, `this` refers to the element that received the event. For example, in a click handler, `this` is the button or element that was clicked. Arrow functions do not have their own `this`, so they inherit it from the surrounding scope instead.