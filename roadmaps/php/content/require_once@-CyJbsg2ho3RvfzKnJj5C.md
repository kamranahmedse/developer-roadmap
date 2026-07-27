# require_once

PHP uses the 'require\_once' statement as an efficient way to include a PHP file into another one. There's an interesting quirk to this function: PHP checks if the file was previously included, and if so, it doesn't include the file again. This helps avoid problems with redundant function declarations, variable value reassignments, or coding loops. However, do remember that 'require\_once' is distinct from 'include\_once'. The key difference lies in error handling: if the file specified in 'require\_once' cannot be found, PHP will emit a fatal error and halt script execution. Whereas, 'include\_once', will only generate a warning.

Here's how you can utilize 'require\_once':

    <?php
    require_once('somefile.php');
    ?>
    

This code fetches all the functions and codes from 'somefile.php' and includes them in the current file.

Visit the following resources to learn more:

- [@official@require_once](https://www.php.net/manual/en/function.require-once.php)