Remove the CSS rules from the CSS files and inline them into the main “&lt;head&gt;” element of your website.

By doing it like this, you remove the loading time of that code, as it loads immediately once the main file loads. The rest, the non-critical rules, can be loaded once the main resource loads (the main CSS file).
