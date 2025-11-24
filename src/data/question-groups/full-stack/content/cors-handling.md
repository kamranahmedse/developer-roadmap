**CORS** (Cross-Origin Resource Sharing) controls access to resources from a different origin (domain, protocol, or port).

**Handling CORS**:

**Backend**: Set headers to allow specific origins.  
Example in Express:  
```javascript
const cors = require('cors');
app.use(cors({ origin: 'https://example.com' }));
```

**Frontend**: Proxy API requests to avoid CORS issues during development. 