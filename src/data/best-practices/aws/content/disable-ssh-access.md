# Disable SSH Access

> Disable SSH access to all servers.

This sounds crazy, I know, but port 22 should be disallowed for everyone in your security group. If there's one thing you take away from this post, this should be it: **If you have to SSH into your servers, then your automation has failed**. Disabling it at the firewall level (rather than on the servers themselves) will help the transition to this frame of thinking, as it will highlight any areas you need to automate, while still letting you easily re-instate access to solve immediate issues. It's incredibly freeing to know that you never need to SSH into an instance. This is both the most frightening and yet most useful thing I've learned.

Disabling inbound SSH has just been a way for me to stop myself cheating with automation (Oh, I'll just SSH in and fix this one thing). I can still re-enable it in the security group if I need to actively debug something on an instance, since sometimes there really is no other way to debug certain issues. It also depends on your application; If your application relies on you being able to push things to a server via SSH, then disabling it might be a bad idea. Blocking inbound SSH worked for me, and forced me to get my automation into a decent state, but it might not be for everyone.
