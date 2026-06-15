# Saving figures
 
Figures are saved to disk with `plt.savefig('filename.png', dpi=300, bbox_inches='tight')`. Supported formats include PNG, PDF, SVG, and JPEG. Saving high-resolution figures is important when embedding charts in reports or publications. The `bbox_inches='tight'` parameter prevents axis labels from being cut off.