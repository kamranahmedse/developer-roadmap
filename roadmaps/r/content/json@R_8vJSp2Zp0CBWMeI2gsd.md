# JSON
 
JSON is a structured text format built around nested key-value pairs, commonly returned by web APIs. Parsing it in R usually means using a package like jsonlite to convert the response into R data structures. Because JSON's nested structure often doesn't map directly onto a flat data frame, some restructuring is usually needed afterward to get it into a usable tabular shape.