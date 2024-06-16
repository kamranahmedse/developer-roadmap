There are several ways in which you can handle API versioning, but the most common ones are:

- **Keeping the version in the URL:** Either as a URL attribute (i.e /your-api/users?v=1) or as part of the URL (i.e /v1/your-api/users). In both situations the version is clearly visible to the developer using the API.
- **Using a custom header:** Another option is to have a custom header (such as api-version) where the developer must specify the version of your API they intend to use.