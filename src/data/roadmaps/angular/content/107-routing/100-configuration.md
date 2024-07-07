# Configuration

The configuration of routes in an Angular application involves defining route mappings in an array and providing these routes to the Angular router.

### Example routes:
```typescript
const appRoutes: Routes = [
  { path: 'custom-path', component: CustomComponet },
  { path: 'custom-path/:id', component: CustomDetailComponet, data: { title: 'Details component' } },
  { path: '', redirectTo: '/heroes', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];
```

- `'custom-path'`: defining a new url route.
- `'custom-path/:id'` defining _**id**_ parameter.
- `''` (empty path): instantiate a component without the need for defining a new url route.
- `'**'`: for undefined paths.
- The `data` property in the second route is a place to store arbitrary data associated with this specific route.

Visit the following resources to learn more:

- [@official@Router reference - Configuration](https://angular.dev/guide/routing/router-reference#configuration)
