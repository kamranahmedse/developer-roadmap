For REST APIs you can take advantage of HTTP verbs and define your idempotent operations using inherently idempotent verbs, such as GET, PUT, and DELETE.

Or you can always manually implement a key-based logic to avoid repeating the same operation multiple times if the key provided by the client is always the same.