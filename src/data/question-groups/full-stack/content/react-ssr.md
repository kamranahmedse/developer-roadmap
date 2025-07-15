The easiest way is to use a framework like **Next.js** for built-in SSR support.

**Steps involved**:

1. Set up pages with `getServerSideProps` to fetch data at request time:  
```javascript
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com');
  return { props: { data } };
}
```

2. Render the page server-side and send it as HTML to the client.  
3. Hydrate the page on the client to make it interactive. 