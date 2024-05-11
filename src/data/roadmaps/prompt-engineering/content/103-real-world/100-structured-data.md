# Structured Data

Asking the model to generate structured data is a great way to utilize the power of LLMs. 

For example, you might have an e-commerce application where you want to generate the search query from the user's natural language input. You can instruct LLM to identify the JSON version from the natural language text given by the user. Let's say that the user searches for `Birthday gift for my 18 months old daughter`. We could have the following prompt to generate the JSON object:

```
Print a JSON object containing `gender` ("male", "female"), `occasion` (one of "party", "birthday", "anniversary"), `age_years` (numeric value) from the text delimited by tripple quotes.:
"""Birthday gift for my 18 months old daughter"""
```

The output from model would be:

```json
{
  "gender": "female",
  "occasion": "birthday",
  "age_years": 1.5
}
```
