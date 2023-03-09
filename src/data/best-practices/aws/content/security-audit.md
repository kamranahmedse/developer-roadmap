# Security Audit

> Set up automated security auditing.

It's important to keep track of changes in your infrastructure's security settings. One way to do this is to first set up a security auditer role ([JSON template](https://gist.github.com/bigsnarfdude/d0758b4fd335085623be)), which will give anyone assigned that role read-only access to any security related settings on your account. You can then use this rather [fantastic Python script](https://gist.github.com/jlevy/cce1b44fc24f94599d0a4b3e613cc15d), which will go over all the items in your account and produce a canonical output showing your configuration. You set up a cronjob somewhere to run this script, and compare its output to the output from the previous run. Any differences will show you exactly what has been changed in your security configuration. It's useful to set this up and just have it email you the diff of any changes. (Source: Intrusion Detection in the Cloud - [Presentation](http://awsmedia.s3.amazonaws.com/SEC402.pdf))


