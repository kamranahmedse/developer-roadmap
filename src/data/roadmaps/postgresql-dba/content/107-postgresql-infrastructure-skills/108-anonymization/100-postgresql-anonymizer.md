# PostgreSQL Anonymizer

PostgreSQL Anonymizer is an extension that helps you protect sensitive data by anonymizing and obfuscating it. It is essential for meeting privacy regulations and ensuring the security of personal information contained in your databases.

## Key Features

- **Dynamic Masking**: With dynamic masking, you can create specific views that display anonymized data. Therefore, you can have the real data in the underlying tables but only reveal necessary masked data to users or applications.

```sql
CREATE MASKED VIEW masked_clients AS SELECT * FROM clients;
SELECT anon.mask_data('clients', 'masked_clients');
```
- **In-Place Anonymization**: You can also anonymize data in place, making the change permanent. This method is useful when you need to share databases between environments, such as testing and development, but want to ensure privacy.

```sql
SELECT anon.anonymize('clients');
```
- **Extensible and Customizable Functions**: You can define your own anonymization functions, providing great flexibility in how you anonymize data. These custom functions can then be applied to specific columns or tables.

```sql
CREATE FUNCTION anon_ssn(text) RETURNS text AS
$$
  DECLARE
    ssn text := anon.pseudonymize_DISTRIBUTED($1);
  BEGIN
    RETURN substring(ssn for 2) || '-' || substring(ssn from 5 for 2) || '-' || substring(ssn from 8);
  END;
$$ LANGUAGE plpgsql;
SELECT anon.set_anonymous_function('clients', 'ssn', 'anon_ssn(text)');
```

## Getting Started

1. Install the PostgreSQL Anonymizer extension:
```sql
CREATE EXTENSION IF NOT EXISTS anon CASCADE;
```
2. Define the anonymization methods for each sensitive field in your tables. You can use the built-in functions or create your own.
```sql
SELECT anon.set_anonymous_function('clients', 'email', 'anon.email(text)');
```
3. Apply anonymization using either dynamic masking or in-place methods, depending on your requirements.

## Additional Resources

For further details on PostgreSQL Anonymizer, consult the following resources:

- [Official PostgreSQL Anonymizer Documentation](https://postgresql-anonymizer.readthedocs.io/)
- [GitHub Repository](https://gitlab.com/dalibo/postgresql_anonymizer)