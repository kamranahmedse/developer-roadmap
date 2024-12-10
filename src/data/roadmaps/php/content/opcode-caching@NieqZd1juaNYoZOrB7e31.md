# Opcode Caching

Opcode caching is a technique that can significantly enhance the PHP performance. It works by storing precompiled script bytecode in memory, thus eliminating the need for PHP to load and parse scripts on each request. For opcode caching, OPCache extension is often used in PHP. With this, the PHP script's compiled version is stored for subsequent requests, reducing the overhead of code parsing and compiling. As a result, your applications experience faster execution and lower CPU usage. An Example of a way to enable OPCache in your php.ini configuration file might look like, 
``` 
   opcache.enable=1 
   opcache.memory_consumption=128 
   opcache.max_accelerated_files=4000 
   opcache.revalidate_freq=60
``` 
Do check out the [PHP documentation](https://www.php.net/manual/en/book.opcache.php) for a detailed guide on using OPCache for opcode caching.