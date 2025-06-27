# $exists

The $exists operator in MongoDB matches documents based on the presence or absence of a specified field. When set to true, it finds documents containing the field regardless of value (including null), and when false, it finds documents missing the field entirely. $exists is useful for schema validation, data quality checks, and filtering documents with optional fields.