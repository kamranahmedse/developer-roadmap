# Logs Information

> Store extra information in your logs.

Log lines normally have information like timestamp, pid, etc. You'll also probably want to add instance-id, region, availability-zone and environment (staging, production, etc), as these will help debugging considerably. You can get this information from the [instance metadata service](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AESDG-chapter-instancedata.html). The method I use is to grab this information as part of my bootstrap scripts, and store it in files on the filesystem (/env/az, /env/region, etc). This way I'm not constantly querying the metadata service for the information. You should make sure this information gets updated properly when your instances reboot, as you don't want to save an AMI and have the same data persist, as it will then be incorrect.
