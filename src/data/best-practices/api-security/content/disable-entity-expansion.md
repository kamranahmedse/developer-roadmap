# Disable Entity Expansion

> Disable entity expansion if using XML, YML or any other language

Disabling entity expansion is important when using XML, YAML, or any other language that allows entities because it helps prevent XXE (XML External Entity) or YAML tag injection attacks. In these attacks, attacker normally injects some sort of custom code in the input to perform attacks against the application.. By disabling entity expansion, the input cannot be manipulated in this way, reducing the risk of such attacks.