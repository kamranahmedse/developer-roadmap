# Cross-site Script Inclusion

Cross-site script inclusion, also known as JSON vulnerability, can allow an attacker's website to read data from a JSON API. The attack works on older browsers by overriding built-in JavaScript object constructors, and then including an API URL using a `<script>` tag. Angular's HttpClient library recognizes this convention and automatically strips the string ")]}',\n" from all responses before further parsing.

Visit the following resources to learn more:

- [@official@Cross Site Script Inclusion](https://angular.dev/best-practices/security#cross-site-script-inclusion-xssi)
- [@article@XSSI Cross Site Script Inclusion](https://book.hacktricks.xyz/pentesting-web/xssi-cross-site-script-inclusion)
- [@article@Testing for Cross Site Script Inclusion](https://owasp.org/www-project-web-security-testing-guide/v41/4-Web_Application_Security_Testing/11-Client_Side_Testing/13-Testing_for_Cross_Site_Script_Inclusion)