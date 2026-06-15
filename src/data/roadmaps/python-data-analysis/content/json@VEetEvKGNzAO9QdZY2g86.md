# JSON
 
JSON (JavaScript Object Notation) is a text format for structured data commonly returned by APIs. `pd.read_json()` converts JSON into a DataFrame, though nested structures often require normalization with `pd.json_normalize()`. JSON is flexible but can be irregular in structure, requiring careful handling of missing fields.