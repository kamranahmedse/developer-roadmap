# renv
 
renv manages package versions on a per-project basis instead of one shared library for your whole machine. It records the exact package versions a project uses in a lockfile, so anyone who opens that project later can restore the exact same environment. This solves the common problem where a script that worked months ago breaks because a package updated in a way that changed its behavior.