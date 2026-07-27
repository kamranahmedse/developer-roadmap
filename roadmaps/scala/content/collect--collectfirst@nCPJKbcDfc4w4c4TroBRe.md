# collect / collectFirst

The collect and collectFirst methods are used to apply a partial function to elements of a collection. The collect method takes a partial function as its parameter and applies it to all the elements in the collection to create a new collection. The new collection contains only those elements that were successfully mapped by the partial function. The collectFirst method applies the partial function to the first element in the collection for which the function is defined and returns its result wrapped with Some, or None if the function is not defined for any element in the collection.

Visit the following resources to learn more:

- [@article@Scala Tutorial - Collect Function](https://allaboutscala.com/tutorials/chapter-8-beginner-tutorial-using-scala-collection-functions/scala-collect-function/)
- [@article@collect vs collectFirst - why the return values are of different type - Scala - Stack Overflow](https://stackoverflow.com/questions/40773529/collect-vs-collectfirst-why-the-return-values-are-of-different-type-scala)
- [@article@tech: Scala : collectFirst example](http://thushw.blogspot.com/2015/09/scala-collectfirst-example.html)