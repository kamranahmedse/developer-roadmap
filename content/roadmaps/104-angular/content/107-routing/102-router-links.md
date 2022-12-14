# Router links

In Angular, routerLink when applied to an element in a template, makes that element a link that initiates navigation to a route. Navigation opens one or more routed components in one or more <router-outlet> locations on the page.

A typical link in HTML looks like this:

`<a href="/example">
  Example HTML link.
</a>`

This example link will direct the user to the /example page.

However, a single page application (SPA) does not have different pages to link to. Instead, it has different views to display to the user. To allow a user to navigate and change the view, you will want to use the RouterLink directive instead of href:

`<a routerLink="/users/sammy">
  Link that uses a string.
</a>`

This RouterLink example will direct the user to the component at /users/sammy.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='' href='https://angular.io/api/router/RouterLink'>Understanding Router Links</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.digitalocean.com/community/tutorials/angular-navigation-routerlink-navigate-navigatebyurl'>Angular Router: Navigation Using RouterLink, Navigate, or NavigateByUrl</BadgeLink>
