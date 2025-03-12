# Schema Management

Managing the structure of your database in Cloudflare D1 involves defining tables, columns, data types, primary keys, foreign keys, and indexes using standard SQL Data Definition Language (DDL) statements. Since D1 is based on SQLite, you'll use SQLite-compatible syntax. Tools like `wrangler` provide commands to execute SQL scripts, allowing you to create and modify your database schema. You'll typically start by designing your schema based on your application's data requirements and then translate that design into SQL DDL statements. Careful consideration should be given to data types to ensure data integrity and efficiency.

Visit the following resources to learn more:

- [@official@Schema Validation · Cloudflare API Shield](https://developers.cloudflare.com/api-shield/security/schema-validation/)
- [@official@Configure Schema Validation · Cloudflare API Shield](https://developers.cloudflare.com/api-shield/security/schema-validation/configure/)