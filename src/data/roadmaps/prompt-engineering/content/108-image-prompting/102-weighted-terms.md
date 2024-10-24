# Weighted Terms

Weighted terms in image prompting are a powerful tool for controlling the output of AI-generated images. This technique allows users to emphasize or de-emphasize certain words or phrases within a prompt, thereby influencing the model's focus and the resulting image..

### Application in Models

- **Stable Diffusion and Midjourney**: These models allow users to assign weights to terms, which can significantly alter the generated image. For instance, using (mountain:1.5) would emphasize the mountain aspect in an image prompt.
- **Prompt Weighting Techniques**:
    - _Positive Weights_: Increase emphasis on desired elements (e.g., (sunset:1.3)).
    - _Negative Weights_: De-emphasize or exclude elements (e.g., [tree:-1])

### Practical Examples

- **Emphasizing Elements**: If you want an image with a prominent sunset, you might use sunset (bright colors:1.2).
- **Excluding Elements**: To avoid trees in a landscape, you could use landscape | tree:-10, ensuring trees are not included in the generated image

### Considerations

- **Impact of Term Placement**: Words at the beginning of a prompt generally have more influence than those at the end.
- **Iterative Fine-tuning**: Adjusting weights is often an iterative process, requiring multiple attempts to achieve the desired result.
- **Limitations**: Overemphasis on certain terms may limit creativity and diversity in generated images.

---

- [@article@Weighted Terms](https://learnprompting.org/docs/image_prompting/weighted_terms)
- [@article@Complete Prompting Guide | SeaArt Guide](https://docs.seaart.ai/guide-1/4-parameters/4-6-complete-prompting-guide)
- [@article@Understanding the Use of Parentheses in Prompt Weighting for Stable Diffusion | Tensor.Art](https://tensor.art/articles/736115871065484219)