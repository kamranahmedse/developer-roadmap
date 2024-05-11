# Structured Output

When designing prompts for language models, it's often beneficial to request structured output formats such as JSON, XML, HTML, or similar formats. By asking for structured output, you can elicit specific and well-organized responses from the model, which can be particularly useful for tasks involving data processing, web scraping, or content generation.

Here's how you can request structured output from language models:

- **Specify the output format:** Clearly specify the output format you want the model to generate. For instance, you can ask the model to generate a JSON object, an HTML page, or an XML document.

- **Define the structure and fields**: Outline the structure of the desired output and specify the required fields. This helps guide the model to generate responses that adhere to the desired structure. You can provide examples or templates to illustrate the expected format.

- **Provide input context:** Include relevant information or data in the prompt that the model can utilize to generate the structured output. This context can assist the model in understanding the task or generating more accurate results.

Here is an example demonstrating the use of structured data.

```
Help me generate a JSON object with keys `product` (name of product), `isPositive` (boolean), `summary` (one sentence summary of review) from the text enclosed in <review> tag.

<review>Regrettably, the "XYZ ProTech 2000" product failed to meet even the most basic expectations. From its lackluster build quality and confusing user interface to its abysmal performance and disappointing customer support, this product left me deeply dissatisfied. If you're considering purchasing the "XYZ ProTech 2000," I strongly advise you to explore alternative options that offer superior quality and reliability.
</review>
```

Output from the above prompt:

```json
{
  "product": "XYZ ProTech 2000",
  "isPositive": false,
  "summary": "Failed to meet expectations due to lackluster build quality, confusing user interface, abysmal performance, and disappointing customer support."
}
```




