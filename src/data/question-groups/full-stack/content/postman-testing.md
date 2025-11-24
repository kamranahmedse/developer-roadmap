1. **Create a Request**: Enter the API endpoint, method (GET, POST, etc.), and headers.  
2. **Send Data**:  
   * Add query params, body (JSON, form data), or headers.  
3. **Send Request**: Click "Send" to view the response.

**Assertions**: Use the **Tests** tab to write scripts (JavaScript) for automated validation of responses.  
Example:  
```javascript
pm.test("Status is 200", () => {
  pm.response.to.have.status(200);
});
```

4. **Collections**: Group requests for testing workflows or environments. 