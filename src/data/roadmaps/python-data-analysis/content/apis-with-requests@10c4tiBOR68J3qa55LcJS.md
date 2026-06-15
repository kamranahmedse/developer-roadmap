# APIs with requests
 
The `requests` library is the standard Python tool for making HTTP requests. It is used to call REST APIs that return JSON or XML data. A typical workflow involves calling `requests.get(url, params=params)`, checking the response status, and parsing the JSON body with `.json()` before loading it into a DataFrame.