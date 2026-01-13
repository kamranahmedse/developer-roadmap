# method_missing

`method_missing` is a Ruby method that gets called when you try to invoke a method on an object that doesn't exist. Instead of raising a `NoMethodError`, Ruby gives you a chance to handle the missing method call yourself. This allows you to dynamically respond to method calls based on the method name and arguments provided, enabling flexible and expressive code.