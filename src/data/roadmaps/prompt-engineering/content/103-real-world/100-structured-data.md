# Structured Data

Structured data helps in organizing information. It is especially useful in applications like e-commerce where you need to convert user input into a structured format.

### Example 1

Let's say a user searches for `Birthday gift for my 18 months old daughter`. You can use a prompt to generate a JSON object from this input:

```
Print a JSON object containing `gender` ("male", "female"), `occasion` (one of "party", "birthday", "anniversary"), `age_years` (numeric value) from the text delimited by triple quotes:
"""Birthday gift for my 18 months old daughter"""
```

### Output

The model would generate the following JSON object:

```json
{
  "gender": "female",
  "occasion": "birthday",
  "age_years": 1.5
}
```

### Example 2

Consider a user input `Anniversary gift for my husband`. You can use a prompt to generate a JSON object from this input:

```
Print a JSON object containing `gender` ("male", "female"), `occasion` (one of "party", "birthday", "anniversary"), `age_years` (numeric value) from the text delimited by triple quotes:
"""Anniversary gift for my husband"""
```

### Output

The model would generate the following JSON object:

```json
{
  "gender": "male",
  "occasion": "anniversary",
  "age_years": null
}
```
