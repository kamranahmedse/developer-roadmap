**Code splitting** breaks a large application into smaller bundles that are loaded only when needed.

**Benefits**:
* Reduces initial load time by loading only essential code and downloading the rest when needed.
* Improves performance for slower networks by allowing webapp use much sooner.

**Example using React's `lazy` and `Suspense`**:
```javascript
const LazyComponent = React.lazy(() => import('./Component'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
} 