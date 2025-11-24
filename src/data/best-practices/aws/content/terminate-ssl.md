# Terminate SSL

> Terminate SSL on the load balancer.

You'll need to add your SSL certificate information to the ELB, but this will take the overhead of SSL termination away from your servers which can speed things up. Additionally, if you upload your SSL certificate, you can pass through the HTTPS traffic and the load balancer will add some extra headers to your request (x-forwarded-for, etc), which are useful if you want to know who the end user is. If you just forward TCP, then those headers aren't added and you lose the information.
