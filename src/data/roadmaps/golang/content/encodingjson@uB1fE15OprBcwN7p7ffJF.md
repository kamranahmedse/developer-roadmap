# encoding/json

Standard library package for **JSON encoding and decoding**.  
Handles converting Go values to JSON (marshalling) and parsing JSON into Go values (unmarshalling).  
Key functions: `Marshal`, `Unmarshal`, `MarshalIndent`.  
Supports struct tags, arrays, maps, and interface types. Essential for APIs, config files, and data interchange.

---

## **Key Functions**
- **`json.Marshal(v)`** – Convert Go value `v` into JSON (`[]byte`).
- **`json.Unmarshal(data, &v)`** – Parse JSON data into Go value `v`.
- **`json.MarshalIndent(v, prefix, indent)`** – Pretty-print JSON with indentation.
