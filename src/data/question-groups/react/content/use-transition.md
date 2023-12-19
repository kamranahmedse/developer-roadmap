`useTransition` hook allows you to mark certain updates as **transitions** so they can be deprioritized, allowing other, more urgent updates to be processed first. This ensures that the UI remains responsive during updates that might take some time.

```js
import { useTransition, useState } from 'react';
import { Posts } from './Posts';
import { Home } from './Home';
import { Contact } from './Contact';

export function App() {
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState('home');

  function changePage(newPage: string) {
    startTransition(() => {
      setPage(newPage);
    });
  }

  return (
    <>
      <button onClick={() => changePage('home')}>Home</button>
      <button onClick={() => changePage('posts')}>Posts</button>
      <button onClick={() => changePage('contact')}>Contact</button>
      <hr />
      {isPending && <div>Loading...</div>}
      {page === 'home' && <Home />}
      {page === 'posts' && <Posts />}
      {page === 'contact' && <Contact />}
    </>
  );
}
```

```js
export function Home() {
  return <div>Home</div>;
}
```

```js
export function Contact() {
  return <div>Contact</div>;
}
```

Posts component is artificially delayed by 500ms to emulate extremely slow code.

```js
export function Posts() {
  const items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} />);
  }
  return <ul>{items}</ul>;
}

function SlowPost() {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li>Post</li>;
}
```

Now when you click on the `Posts` button, you'll notice that the UI remains responsive and you can still switch to other pages while the posts are loading. Try removing the `startTransition` wrapper around `setPage` in `changePage` to see the difference.
