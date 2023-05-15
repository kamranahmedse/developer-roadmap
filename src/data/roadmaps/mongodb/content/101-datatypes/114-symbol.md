# Symbol

The `Symbol` datatype is a legacy data type in MongoDB. It was primarily used to store textual data with some additional metadata but is now **deprecated** and advised not to be used for new projects.

The `Symbol` datatype is functionally equivalent to the `String` datatype. The BSON encoding of both Symbol and String is identical, but the Symbol datatype was used to differentiate these two and provide a more powerful and flexible way to extend the MongoDB system for application-specific needs.

It's also worth mentioning that most MongoDB drivers, including the official driver, do not support the Symbol data type as a separate type. They simply map it to their string representations.

Although you might encounter Symbols in older databases, it's recommended to use the `String` datatype for new projects or migrate existing symbols to strings, as they don't provide any advantage over the `String` datatype.

Below is a simple example of how a `Symbol` was stored in MongoDB (note that this is not recommended for new projects):

```javascript
{
  "_id" : ObjectId("6190e2d973f6e571b47537a0"),
  "title" : Symbol("Hello World"),
  "description" : "A simple example of the Symbol datatype"
}
```

In conclusion, the `Symbol` datatype is a deprecated legacy datatype in MongoDB that served to store textual data with additional metadata. For new projects, it's highly recommended to use the `String` datatype instead.
