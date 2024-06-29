# Memory Management
Memory management is the process of allocating memory for objects and freeing it after use.

- Manual Retain-Release (MRR) is where you explicitly manage memory by keeping track of the objects you have. This is implemented using a model known as reference counting, which the Foundation class NSObject provides in conjunction with the runtime environment.

- In Automatic Reference Counting (ARC), the system uses the same reference counting as the MRR system, but it inserts the appropriate memory management method calls for you during compilation.

- In Garbage Collection (GC), the system automatically tracks which objects own other objects. It then automatically releases (or collects) objects that are no longer referenced. This method uses a different mechanism than those used in MRR and ARC, and is only supported in the runtime environment on Mac OS X, not iOS.
> Beginning May 1, 2015, new Mac apps and app updates submitted to the Mac App Store may no longer use garbage collection, which was deprecated in OS X Mountain Lion. Instead, migrate your apps to Automatic Reference Counting, using the migration assistant in Xcode to help with this transition. Apps may continue to use retain/release for manual memory management. For more information, read the [Transitioning to ARC Release Notes](https://developer.apple.com/library/ios/releasenotes/ObjectiveC/RN-TransitioningToARC/Introduction/Introduction.html).

# Stack and Heap 

 __Stack__

The stack is a region of memory which contains storage for local variables, as well as internal temporary values and housekeeping. On a modern system, there is one stack per thread of execution. When a function is called, a stack frame is pushed onto the stack, and function-local data is stored there. When the function returns, its stack frame is destroyed. All of this happens automatically, without the programmer taking any explicit action other than calling a function.

__Heap__

The heap is, essentially, everything else in memory. (Yes, there are things other than the stack and heap, but let's ignore that for this discussion.) Memory can be allocated on the heap at any time, and destroyed at any time. You have to explicitly request for memory to be allocated from the heap, and if you aren't using garbage collection, explicitly free it as well. This is where you store things that need to outlive the current function call. The heap is what you access when you call `malloc` and `free`.

__Stack vs Heap Objects__

Given that, what's a stack object, and what's a heap object?
First, we must understand what an object is in general. In Objective-C (and many other languages), an object is simply a contiguous blob of memory with a particular layout.
The precise location of that memory is less important. As long as you have some memory somewhere with the right contents, it's a working Objective-C object. In Objective-C, objects are usually created on the heap:
```objectivec
NSObject *obj = [[NSObject alloc] init];
```
The storage for the obj variable itself is on the stack, but the object it points to is in the heap. The `[NSObject alloc]` call allocates a chunk of heap memory, and fills it out to match the layout needed for an NSObject.

A stack object is just an object where the memory for that object is allocated on the stack. Objective-C doesn't have any support for this directly, but you can construct one manually without too much trouble:
```objectivec
struct {
	Class isa;
} fakeNSObject;

fakeNSObject.isa = [NSObject class];

NSObject *obj = (NSObject *)&fakeNSObject;
NSLog(@"%@", [obj description]);
```
This works fine, although you shouldn't depend on it, as it depends on replicating the internal layout of the class.

__Advantages of Stack Objects__

It's obviously possible to have stack objects in general. Aside from the above hack, real languages like C++ have language support for stack objects. In C++, you can create objects on the stack or the heap:
```c++
std::string stackString;
std::string *heapString = new std::string;
```
Stack objects have two compelling advantages:

* Speed: Allocating memory on the stack is really fast. All of the bookkeeping is done by the compiler when you build your program. At runtime, the function prolog just carves out the amount of space it needs for all local variables, and the code knows what goes where because it was all computed in advance. Stack allocations are essentially free, whereas heap allocations can be quite expensive.
* Simplicity: Stack objects have a defined lifetime. You can never leak one, because it always gets destroyed at the end of the scope where it was declared.

__Disadvantages of Stack Objects__

The strictly defined lifetime of a stack object is a disadvantage as well, and a major one. In Objective-C (and C++, and many other languages), it is impossible to move an object after it's created. The reason for this is because there may be many pointers to that object, and those pointers are not tracked. They would all need to be updated to track the move, but there's no way to accomplish this.
(Note: it's not an impossibility in general, and many languages move objects around as a matter of course, often as part of garbage collection schemes. However, this requires more runtime smarts and a stricter type system than you get in Objective-C.)
As used in Cocoa, Objective-C uses a reference counting system for memory management. The advantage of this system is that any single object can have multiple "owners", and the system won't allow the object to be destroyed until all owners have relinquished ownership.
Stack allocated objects inherently have a single owner, the function which created them. If Objective-C had stack objects, what would happen if you passed it to some other code which then tried to keep it around by retaining it? There's no way to prevent the object from being destroyed when the function which created it returns, so the retain can't work. The code which tries to keep the object around will fail, end up with a dangling reference, and will crash.
Another problem is that stack objects are not very flexible. It's not uncommon in Objective-C to implement an initializer which destroys the original object and returns a new one instead. How could you do that with a stack object? You really couldn't. Much of the runtime flexibility of Objective-C depends on having heap objects.

__Actual Stack Objects in Objective-C__

It turns out that Objective-C does have stack objects, truly and officially, as of 10.6!
Don't get too excited, though. It's only supported for a single kind of object: blocks. When you write a block inside a function using the `^{}` syntax, the result of that expression is a stack object!

## Manual Retain-Release(MRR)
Use access methods to make memory management easier. Consider an object counter, the quantity of which you want to set
```objectivec
@interface Counter : NSObject {
	NSNumber *_count;
}
@property (nonatomic, retain) NSNumber *count;
@end;
```
Two access methods are declared in the property. Typically, you should ask the compiler to synthesize the methods; however, it is instructive to see how they could be implemented. In the `get` method, you simply return the instance variable, so there is no need for `retain` or `release`:

```objectivec
- (NSNumber *)count {
	return _count;
}
```
In the `set` method, if everyone else follows the same rules, you should accept the new value of the counter, which can be removed at any time. Therefore, you must take responsibility for the object by sending it a `retain` message to ensure it is not deallocated. You should also relinquish ownership of the old object by sending it a `release` message. (Sending a message to `nil` is allowed in Objective-C, so the implementation will still work if `_count` has not been set yet.) You should send this after `[newCount retain]` in case two or more objects accidentally release it.
 
```objectivec
- (void)setCount:(NSNumber *)newCount {
	[newCount retain];
	[_count release];
	// Make the new assignment.
	_count = newCount;
}
```

__Using access methods to set property values__

Let's say you want to implement a method to reset a counter. You have several options. The first implementation creates an instance of NSNumber with alloc, which you balance with release.
```objectivec
- (void)reset {
	NSNumber *zero = [[NSNumber alloc] initWithInteger:0];
	[self setCount:zero];
	[zero release];
}
```
The second method uses the convenience of a constructor to create a new NSNumber object. Since it already exists, there's no need for retain or release.
```objectivec
- (void)reset {
	NSNumber *zero = [NSNumber numberWithInteger:0];
	[self setCount:zero];
}
```
Notice that both use the set accessor method. The following code almost certainly works correctly for simple cases, but as tempting as it may be to bypass the accessor methods, doing so will almost certainly lead to a bug at some point in the future (e.g., if you forget to retain or release, or if the memory management semantics for the instance variable change). 
```objectivec
- (void)reset {
	NSNumber *zero = [[NSNumber alloc] initWithInteger:0];
	[_count release];
	_count = zero;
}
```
Note also that if you are using Key-Value Observing (`KVO`), changing a variable in this manner is not compatible with `KVO`.
* Do not use accessors in initializer and `dealloc` methods.
The only places where you should not use accessors to set instance variables are in initializer and `dealloc` methods. To initialize an object counter with a value of zero, you can implement the initialization method as follows:
```objectivec
- init {
	self = [super init];
	if (self) {
		_count = [[NSNumber alloc] initWithInteger:0];
	}
	return self;
}
```
To allow the counter to initialize with a value other than zero, you can implement the initWithCount: method as follows:
```objectivec
- initWithCount:(NSNumber *)startingCount {
	self = [super init];
	if (self) {
		_count = [startingCount copy];
	}
	return self;
}
```
Since the counter variable of the class is an instance object, you should also implement the dealloc method. It should release ownership of any instance variables by sending them a release message, and ultimately, it should call the superclass implementation
```objectivec
- (void)dealloc {
	[_count release];
	[super dealloc];
}
```
* Use `weak` references to avoid retain cycles. Retaining an object creates a strong reference to it. An object cannot be deallocated until all its strong references are released. The issue known as retain cycle can occur if two objects have circular references, meaning they have strong references to each other (either directly or through a chain of other objects, each of which has a strong reference to the next, leading back to the first).
* Do not release objects that you use
* Do not use dealloc for managing limited resources

You should generally manage unlimited resources such as file descriptors, network connections, and buffers or caches in the dealloc method. In particular, you should not design classes so that dealloc is called when you think it will be called. Calling dealloc may be delayed or bypassed due to errors or application crashes.

__Collections of custom objects__

When adding an object to a collection (such as an array, dictionary, or set), the collection becomes its owner. The collection relinquishes ownership of the object when the object is removed from the collection or when the collection itself is deallocated. For example, if you want to create an array of numbers, you can do one of the following actions:
```objectivec
NSMutableArray *array = <#Getting a mutable array#>;
NSUInteger i;
// ...
for (i = 0; i < 10; i++) {
	NSNumber *convenienceNumber = [NSNumber numberWithInteger:i];
	[array addObject:convenienceNumber];
}
```
In this case, you're not calling `alloc`, so there's no need to call `release`. Therefore, there's also no need to call `retain` for the new numbers (`convenienceNumber`), as the array will take care of it.

The basic memory management model with reference counting is facilitated by a combination of methods defined in the `NSObject` protocol and standard naming conventions. The `NSObject` class also defines the `dealloc` method, which is automatically called when an object is deallocated.

You own any object you create:

- You can create an object using a method whose name starts with `alloc`, `new`, `copy`, or `mutableCopy`.
- You can take ownership of an object using `retain`: The obtained object is typically guaranteed to remain valid throughout the execution of the method that acquired it, and this method can safely return the object to its caller. You use `retain` in two cases:
  1. In the implementation of an accessor method or initialization method to take ownership of an object that needs to be stored as a property value.
  2. To prevent the object from being deallocated as a side effect of some other operations.

_If you no longer need an object, you should relinquish ownership of it:_
You relinquish ownership of an object by sending it a `release` or `autorelease` message. In Cocoa terminology, relinquishing ownership of an object typically results in "releasing" the object.

_You should not relinquish ownership of an object you do not own:_
This is simply a consequence of the previous ownership rules stated explicitly.

_Use `autorelease` for deferred `release`._
You use `autorelease` to schedule a deferred `release`.

_You are not the owner of objects returned by reference:_
Some methods in Cocoa indicate that an object is returned by reference (i.e., they do not have arguments of type `ClassName **` or `id *`). This pattern is seen in methods like `initWithContentsOfURL:options:error:` (`NSData`) and `initWithContentsOfFile:encoding:error:` (`NSString`), where `NSError` objects are used to report errors if they occur. In these cases, the same ownership rules apply as described earlier. When calling any of these methods, you do not create the `NSError` object, so you are not its owner.

_Implementing `dealloc` to relinquish ownership of objects:_
The `NSObject` class defines the `dealloc` method, which is automatically called when an object has no owners and its memory is reclaimed; in Cocoa terminology, this is called "deallocating" or "dealloc". The role of the `dealloc` method is to free the object's own memory and dispose of any resources it holds, including any instance variables of the object that it owns.

Important note:

* You should never directly invoke the `dealloc` method of another object.
* You should call the superclass implementation at the end of your own implementation.
* You should not tie management of system resources, such as file handles, to objects with controlled lifetimes.

## Automatic Reference Counting.
Automatic Reference Counting (ARC) is a compiler feature that provides automatic memory management for Objective-C objects. Instead of manually managing object retention and release, ARC allows you to focus on your application's code directly. ARC works by injecting code during compilation to ensure that an object's lifetime is exactly as long as necessary, but no longer. Conceptually, it operates similarly to manual reference counting (as described in practical memory management) by adding the necessary memory management code for you. ARC is supported starting from Xcode 4.2 for Mac OS X v10.6 and v10.7 (64-bit applications), as well as iOS 4 and iOS 5. Weak references (`weak`) are not supported in Mac OS X v10.6 and iOS 4 and earlier versions.
```objectivec
@property NSString *newString;
```
* You cannot use a read-only property without memory management attributes. If you are not using ARC, you can declare
```objectivec
@property (readonly) NSString *title;
```
But if you are using ARC, you must specify who manages memory, so simply inserting the keyword `unsafe_unretained` is enough, because by default the `assign` attribute is used.
ARC only works with retainable object pointers (ROPs). There are three kinds of retainable object pointers:

1. Block pointers
2. Objective-C object pointers
3. Typedefs marked with `__attribute__((NSObject))`

All other pointer types, such as `char *` and CF objects such as `CFStringRef`, are not ARC compatible. If you use pointers that aren’t handled by ARC, you’ll have to manage them yourself. That’s OK, because ARC interoperates with manually managed memory.

There are several limitations to using ARC:
- You cannot use a property whose name begins with the word `new`. For example, declaring

## Modifiers


`readwrite` (default) and `readonly`:
* `readwrite` generates both setters and getters simultaneously, while `readonly` generates only getters.

`assign` (default):
* `assign` simply assigns the passed value.
* `assign` is a property attribute that tells the compiler how to synthesize the property's setter implementation.
* I would use `assign` for C primitive properties and `weak` for weak references to Objective-C objects.

`retain`:
* `retain` sends a `release` message to the current value of the instance variable, then sends a `retain` message to the new object and assigns the new value to the instance variable.
* In the last two cases, you must send `release` (or assign `nil`) to the property in `dealloc`.
* `retain` is the same as `strong`.
* Apple says if you write `retain`, it will automatically work like `strong`.
* Methods like `alloc` include an implicit `retain`.

`copy`:
* `copy` sends a `release` message to the current value of the instance variable, then sends a `copy` message to the new object and assigns the new object to the instance variable. In the last two cases, you should send `release` (or assign `nil`) to the property in `dealloc`.
* The `copy` attribute creates a copy of the object and assigns a pointer to it. The `copy` attribute is often used with object types that have mutable subclasses. For example, `NSString` has a subclass named `NSMutableString`.

`assign`, `retain`, `copy` — are applied only to properties that can be safely cast to `id`.

`atomic` (default) and `nonatomic`:
* Properties with the `atomic` keyword are thread-safe, while those with `nonatomic` can cause problems with multithreaded access. Access to `nonatomic` properties is typically faster than to `atomic` ones, so they are often used in single-threaded applications.

`strong` (ARC):
* This is synonymous with `retain`.
* `Strong` indicates "keep this in the heap until I no longer point to it."
* In other words, "I am the owner; you cannot deallocate this until I say it's okay, same as `retain`."
* We generally use `strong` for `UIViewController` (parents of UI items).
* `Strong` is used with ARC and ensures you don't have to worry about the object's retain count. ARC automatically releases it when it's no longer needed. Using `strong` means you own the object.

`weak` (ARC):
* Synonymous with `assign`, but with one exception: a property with `weak` is automatically set to `nil` when the object is destroyed. Also, note that the `weak` keyword is available only starting from iOS 5 and Mac OS X 10.7 (Lion). If a variable pointer stores an object's address, the object is active and has an owner - a strong reference. If a variable doesn't take ownership of the object, it's a weak reference.
* We generally use `weak` for `IBOutlets` (child `UIViewController`s). This works because the child object only needs to exist as long as the parent object does.
* A weak reference does not protect the referenced object from being collected by a garbage collector.

`unsafe_unretained` (default):
* Always used for properties containing non-object values. What to do if you want to use the ARC mechanism in older operating systems where null-terminated weak references are unavailable? Apple suggests using the `__unsafe_unretained` keyword and `unsafe_unretained` attribute, which inform the ARC mechanism that the specified reference is weak.
 

Explanation of `Strong` & `Weak`:
Imagine our object is a dog, and that the dog wants to run away (be deallocated). Strong pointers are like a leash on the dog. As long as you have the leash attached to the dog, the dog will not run away. If five people attach their leash to one dog, (five strong pointers to one object), then the dog will not run away until all five leashes are detached. Weak pointers, on the other hand, are like little kids pointing at the dog and saying "Look! A dog!" As long as the dog is still on the leash, the little kids can still see the dog, and they'll still point to it. As soon as all the leashes are detached, though, the dog runs away no matter how many little kids are pointing to it. As soon as the last strong pointer (leash) no longer points to an object, the object will be deallocated, and all weak pointers will be zeroed out. When we use weak? The only time you would want to use weak, is if you wanted to avoid retain cycles (e.g. the parent retains the child and the child retains the parent so neither is ever released).
 

## `autorelease` vs `release`

An autorelease pool is a mechanism for deferred relinquishment of ownership. This means that you no longer want to own the object and you don't necessarily need it immediately removed from memory. Often, you don't need to create your own pool; instead, you use `NSAutoreleasePool`, sometimes indirectly. To place an object into the autorelease pool, you send it the `autorelease` message (an object can be added to the pool multiple times). During the next message cycle, the autorelease pool sends a `release` message to all these objects because it receives a `dealloc`, after which a new autorelease pool is created. Thus, Cocoa expects there to be at least one autorelease pool always present and automatically creates it in the main thread.

Autorelease pools are stacked; the most recently added pool is at the top of the stack of autorelease pools in the current thread. Creating a pool is done with standard `alloc` and `init`, and removing it is done with `drain`. If you send the `drain` message not to the topmost pool, all pools above it will also receive this message and accordingly release their contents. The official documentation provides an example of creating a custom pool like this:

```objectivec
NSArray *urls = <# An array of file URLs #>;
for (NSURL *url in urls) {
	NSAutoreleasePool *loopPool = [[NSAutoreleasePool alloc] init];
   	NSError *error = nil;
    NSString *fileContents = [[[NSString alloc] initWithContentsOfURL:url encoding:NSUTF8StringEncoding error:&error] autorelease];
    /* Process the string, creating and autoreleasing more objects. */
    [loopPool drain];
}
```

In modern Objective-C (using ARC), the `autorelease` keyword is generally not used because ARC manages memory automatically. However, understanding autorelease pools remains crucial for legacy codebases or situations where manual memory management is still required.

- [@official@ARC(Automatic Reference Counting)](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/automaticreferencecounting/)
- [@official@About Memory Management](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/MemoryMgmt.html)
- [@official@Mac Apps That Use Garbage Collection Must Move to ARC](https://developer.apple.com/news/?id=02202015a)
- [@official@MemoryLayout](https://developer.apple.com/documentation/swift/memorylayout)




