# Guards

https://angular.io/api/router

Angular route guards are interfaces provided by Angular which, when implemented, allow us to control the accessibility of a route based on conditions provided in class implementation of that interface.

Here are some types of Angular guards: CanActivate, CanActivateChild, CanLoad, CanDeactivate and Resolve.

### CanActivate
Interface that a class can implement to be a guard deciding if a route can be activated. If all guards return true, navigation continues. If any guard returns false, navigation is cancelled. If any guard returns a UrlTree, the current navigation is cancelled and a new navigation begins to the UrlTree returned from the guard.

https://angular.io/api/router/CanActivate

### CanActivateChild
Interface that a class can implement to be a guard deciding if a child route can be activated. If all guards return true, navigation continues. If any guard returns false, navigation is cancelled. If any guard returns a UrlTree, current navigation is cancelled and a new navigation begins to the UrlTree returned from the guard.

https://angular.io/api/router/CanActivateChild

### CanDeactivate
Interface that a class can implement to be a guard deciding if a route can be deactivated. If all guards return true, navigation continues. If any guard returns false, navigation is cancelled. If any guard returns a UrlTree, current navigation is cancelled and a new navigation begins to the UrlTree returned from the guard.

https://angular.io/api/router/CanDeactivate

### CanLoad
Interface that a class can implement to be a guard deciding if children can be loaded. If all guards return true, navigation continues. If any guard returns false, navigation is cancelled. If any guard returns a UrlTree, current navigation is cancelled and a new navigation starts to the UrlTree returned from the guard.

https://angular.io/api/router/CanLoad

### CanMatch
Interface that a class can implement to be a guard deciding if a Route can be matched. If all guards return true, navigation continues and the Router will use the Route during activation. If any guard returns false, the Route is skipped for matching and other Route configurations are processed instead.

https://angular.io/api/router/CanMatch


