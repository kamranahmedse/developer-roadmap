# $type

The $type operator in MongoDB selects documents based on the BSON data type of a specified field. It accepts either BSON type numbers or string aliases like "string", "int", "array", "object". $type is useful for data validation, schema analysis, and filtering documents by field data types, especially when working with collections containing varied or dynamic schemas.