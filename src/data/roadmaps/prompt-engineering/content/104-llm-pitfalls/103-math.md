# Math

When working with language models, it's essential to understand the challenges and limitations when incorporating mathematics. In this section, we'll discuss some common pitfalls related to math in the context of prompt engineering and provide suggestions for addressing them.

## Numerical Reasoning Limitations

Language models like GPT-3 have limitations when it comes to numerical reasoning, especially with large numbers or complex calculations. They might not always provide accurate answers or interpret the numerical context correctly.

**Recommendation:** For tasks that require precise numerical answers or involve complex calculations, consider using specialized math software or verifying the model's output using other means.

## Ambiguous Math Questions

Ambiguous or ill-defined math questions are likely to receive incorrect or nonsensical answers. Vague inputs make it challenging for the model to understand the context and provide sensible responses.

**Recommendation**: Try to make math questions as clear and specific as possible. Provide sufficient context and use precise language to minimize ambiguities.

## Units and Conversion

Language models might not automatically take units into account or perform the necessary unit conversions when working with mathematical problems, which could result in incorrect answers.

**Recommendation**: Explicitly mention the desired units and, when needed, ask the model to perform unit conversions to ensure the output aligns with the expected format or measure.

## Incorrect Interpretation of Notation

Mathematics often uses specialized notation or symbols that the language model might misinterpret. Especially when inputting symbols or notation that differ from the standard plain text, the risk of misunderstanding increases.

**Recommendation**: Make sure to use clear and common notation when presenting math problems to the model. If necessary, explain the notation or provide alternative representations to minimize confusion.

## Building on Incorrect Responses

If a sequence of math problems depends on previous answers, the model might not correct its course after providing an incorrect response. This could cascade and result in multiple subsequent errors.

**Recommendation**: Be cautious when using the model's output as the basis for subsequent calculations or questions. Verify the correctness of the intermediate steps before proceeding.

By being aware of these math-related pitfalls and applying the recommendations, you can improve the effectiveness and accuracy of your prompts when engaging language models with mathematical tasks.