# Structured Data

Structured data is a powerful tool for organizing information effectively, particularly in real-world applications like e-commerce, mobile, and search. It helps convert user inputs into structured formats such as JSON, Markdown tables, HTML, and YAML, enhancing data management and retrieval. Recent improvements in this field include Google's expanded product information types, the increasing use of AI to automate and enhance structured data processes, the continued preference for JSON-LD as a structured data format, and enhanced mobile experiences through rich media and detailed information in search results. 

## Examples

### Example: JSON Object

Consider a user searching for a "Birthday gift for my 18 months old daughter." Using prompts, you can generate structured data in various formats.

JSON Example:

```json
Print a JSON object containing:
-  `gender` ("male", "female"), 
-  `occasion` (one of "party", "birthday", "anniversary"),
-  `age_years` (numeric value) 
from the text delimited by triple quotes:
    """Birthday gift for my 18 months old daughter"""

```

**Output**
The model would generate the following JSON object:

```json
{
  "gender": "female",
  "occasion": "birthday",
  "age_years": 1.5
}

```

The following examples extend the original Print JSON prompt to convert one structured data into other formats, demonstrating another capability with structured data, data format interchange from a single source prompt.

### Example: Markdown Table

From JSON to Markdown table

```markdown
| Gender | Occasion | Age (years) |
|--------|----------|-------------|
| Female | Birthday | 1.5         |
```

### Example: HTML Table

From JSON to HTML table

<table>
  <tr>
    <th>Gender</th>
    <th>Occasion</th>
    <th>Age (years)</th>
  </tr>
  <tr>
    <td>Female</td>
    <td>Birthday</td>
    <td>1.5</td>
  </tr>
</table>

Learn more from the following resources:

- [@article@How to Use AI to Organize Data into Tables for Reports and Articles](https://learnprompting.org/docs/basic_applications/table_generation)