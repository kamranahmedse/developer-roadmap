# Saving figures

Figures are saved to disk with `plt.savefig('filename.png', dpi=300, bbox_inches='tight')`. Supported formats include PNG, PDF, SVG, and JPEG. Saving high-resolution figures is important when embedding charts in reports or publications. The `bbox_inches='tight'` parameter prevents axis labels from being cut off.

Visit the following resources to learn more:

- [@article@matplotlib.pyplot.savefig](https://matplotlib.org/stable/api/_as_gen/matplotlib.pyplot.savefig.html)
- [@video@How to save a matplotlib figure and fix text cutting off || Matplotlib Tips](https://www.youtube.com/watch?v=C8MT-A7Mvk4)