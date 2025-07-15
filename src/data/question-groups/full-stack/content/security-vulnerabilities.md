##### SQL Injection:

To avoid SQL injection attacks, use parameterized queries or prepared statements to prevent malicious SQL code from being executed:
```javascript
db.query('SELECT * FROM users WHERE id = ?', [userId]);
```

Also validate and sanitize user inputs to ensure it doesn't contain characters that might interfere with SQL statements.

##### Cross-Site Scripting (XSS):

To avoid allowing scripts or dynamic content to affect your page:

1. Escape content before rendering in the browser:
```javascript
<div>{sanitize(userInput)}</div>
```

2. Use libraries like DOMPurify to sanitize HTML.

3. Set `Content-Security-Policy` headers to restrict allowed sources for scripts to trusted sources. 