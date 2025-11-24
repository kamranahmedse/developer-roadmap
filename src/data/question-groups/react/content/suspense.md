Suspense is a component in React that lets you specify the fallback content to display while waiting for a component to load. It is used in conjunction with `lazy()` to lazily load components.

```js
import { lazy, Suspense } from 'react';

const LazyRoadmapRender = lazy(() => import('./RoadmapRender'));

export function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Show</button>
      {show && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyRoadmapRender />
        </Suspense>
      )}
    </>
  );
}
```

Until the `RoadmapRender` component is loaded, the `Suspense` component will display the `Loading...` fallback content.
