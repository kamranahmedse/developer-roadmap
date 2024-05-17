type PromiseInput<T> = Array<Promise<T> | (() => Promise<T>)>;

/**
 * Run promises in parallel with a variable batch size.
 *
 * @category Promise
 * @param promises Array of promises to run in parallel
 * @param batchSize Number of promises to run concurrently
 * @param ignoreErrors Whether to ignore errors and continue running promises even if some fail
 * @returns Promise that resolves when all promises are settled
 */
export async function runPromisesInBatchSequentially<T>(
  promises: PromiseInput<T>,
  batchSize: number,
  ignoreErrors = false,
): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < promises.length; i += batchSize) {
    const batch = promises.slice(i, i + batchSize);
    await Promise.all(
      batch.map((promise) => {
        if (promise instanceof Promise) {
          return promise
            .then((result) => results.push(result))
            .catch((error) => {
              if (!ignoreErrors) {
                throw error;
              }
              return null;
            });
        } else {
          return promise()
            .then((result) => results.push(result))
            .catch((error) => {
              if (!ignoreErrors) {
                throw error;
              }
              return null;
            });
        }
      }),
    );
  }

  return results;
}
