# Scopes
 
Scoping determines which variables a function can see and use while it runs. R uses lexical scoping, meaning a function looks first inside itself, then in the environment where it was defined, not the environment where it was called from. Understanding scoping becomes especially important once you write nested functions or functions that return other functions.