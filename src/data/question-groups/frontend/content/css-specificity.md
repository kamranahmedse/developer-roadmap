CSS specificity is used to determine which set of styles to apply on any given element when there are overlapping styles (like several rules setting the font-size of the same element).

The way it works is by applying the following order of precedence:

1. First, any inline style will override any other style.
2. Second, any ID-based style will override anything but inline styles.
3. Third, class-based selectors will override anything but inline and ID-based styles.
4. Finally, type selectors can be overridden by any other type of selectors.
