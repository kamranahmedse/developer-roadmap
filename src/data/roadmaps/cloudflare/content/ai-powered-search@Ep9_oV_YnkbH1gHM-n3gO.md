# AI-powered Search

You can build AI-powered search using Cloudflare Workers, Workers AI, and Vectorize.

1. **Embed Data:** Use Workers AI to create vector embeddings of your data (e.g., text, images).
2. **Store Embeddings:** Store these embeddings in Vectorize.
3. **Search:** When a user searches, embed the search query using Workers AI and then use Vectorize to find the most similar embeddings in your database.
4. **Return Results:** Return the corresponding data items as search results.

Visit the following resources to learn more:

- [@official@Cloudflare + AI](https://ai.cloudflare.com/)
- [@official@Cloudflare Agents](https://developers.cloudflare.com/agents/)
- [@article@How to use Cloudflare Workers AI for building an AI-powered Search](https://dev.to/charlestehio/how-to-use-cloudflare-workers-ai-for-building-an-ai-powered-search-bar-51jn)