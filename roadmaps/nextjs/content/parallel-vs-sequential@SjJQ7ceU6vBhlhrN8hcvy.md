# Parallel vs Sequential

When fetching data inside React components, you need to be aware of two data fetching patterns: parallel and sequential.

## Sequential Data Fetching

With sequential data fetching, requests depend on each other and create a waterfall.

For example:

```tsx
const artist = await getArtist();
const albums = await getAlbums(artist.id);
The second request cannot start until the first request has finished. This pattern is useful when the second request depends on the result of the first request.

However, unnecessary sequential requests can increase the total loading time of a page.

Parallel Data Fetching

With parallel data fetching, independent requests can be started at the same time.

For example:

const artistPromise = getArtist();
const albumsPromise = getAlbums();

const [artist, albums] = await Promise.all([
  artistPromise,
  albumsPromise,
]);

Because the requests run concurrently, this can reduce the time required to load independent data.

Choosing Between Parallel and Sequential Fetching

Use sequential fetching when there is a dependency between requests:

Request A → Request B → Result

Use parallel fetching when requests are independent:

Request A ──┐
            ├──→ Result
Request B ──┘

Avoid creating sequential request waterfalls when the requests do not depend on each other.

Visit the following resources to learn more:

@official@Parallel and sequential data fetching
