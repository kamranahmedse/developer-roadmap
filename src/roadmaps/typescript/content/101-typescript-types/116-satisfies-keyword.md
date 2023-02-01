# Satisfies Keyword

TypeScript developers are often faced with a dilemma: we want to ensure that some expression matches some type, but also want to keep the most specific type of that expression for inference purposes.

For example:

    ```
    // Each property can be a string or an RGB tuple.
    const palette = {
        red: [255, 0, 0],
        green: "#00ff00",
        bleu: [0, 0, 255]
    //  ^^^^ sacrebleu - we've made a typo!
    };
    // We want to be able to use array methods on 'red'...
    const redComponent = palette.red.at(0);
    // or string methods on 'green'...
    const greenNormalized = palette.green.toUpperCase();
    ```

Learn more from the following links:

- [Satisfies Keyword](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator)