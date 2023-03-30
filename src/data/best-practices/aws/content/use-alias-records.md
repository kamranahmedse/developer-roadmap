# ALIAS Records

> Use ALIAS records.

An ALIAS record will link your record set to a particular AWS resource directly (i.e. you can map a domain to an S3 bucket), but the key is that you don't get charged for any ALIAS lookups. So whereas a CNAME entry would cost you money, an ALIAS record won't. Also, unlike a CNAME, you can use an ALIAS on your zone apex. You can read more about this on [the AWS page for creating alias resource record sets](http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/CreatingAliasRRSets.html).
