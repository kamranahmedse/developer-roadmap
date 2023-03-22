# Common commands

## Linux Commands

**Fundamendals:**
```
man		get information about a command
ls		listing all elements in dir
	-a	even hidden ones
	-lh	permission info
  
cd		change directory
sudo -l		list users with sudo access
sudo apt update		get update dependencies 
sudo apt upgrate	unpack and install updates
```

**Filesystem:**
```
cat		concatenate (output file content)
pwd		print working dir (full path)
rm		remove/delete
touch		create new file or change the timestamp if exists
cpy		copy a file or directory
file		show filetype
cat + >		create new file if file not exist

wc		count content 
		[-c, --bytes]
		[-m, --chars]
		[-l, --lines]
		[-L, --length of longest line]
		[-w, --words]
		example: ws -l file.log

grep		search for sth inside files (similiar to ctrl+f)

find		search for sth in directorys		
		example: find -name file.txt or *.txt (search for all files ending with .txt)

locate		more powerfull than find, search everywhere
```

**Misc:**
```
su		switch user
		example: su -l newuser (-l: we login on the 'newuser' hoom-dir
wget		download files
curl		download files
scp		remote copy files between 2 systems using ssh
		(Secure-copy format is use SOURCE -> DESTINATION)
http-server	use python3 e.g.> python3 -m http.server
```
`tmux`	terminal multiplexer [cheat-sheet](https://imgur.com/bL9Dn3U) + [walkthrough](https://acloudguru.com/blog/engineering/tmux-cheat-sheet?utm_source=legacyla&utm_medium=redirect&utm_campaign=one_platform)

**Operators:**
```
&		run command in background of terminal
&&		comine multiple commands in one line
>		redirect the output
>>		same as ">" but appends output to destination instead overwriting
```

## Common Directories

```
/etc		storage system files for os;
		example: sudoers file with user & groups and passwd file with encrypted pw
		
/var		service data from apps running on systems, e.g. log, backups
/root		/home directory foor "root" user
/tmp		temporary for once or twice, every user got access
```

## Processing

```
ps		view process (pid increments, time=cpu-usetime, cmd=actuall command)
	+ aux	to show process from other users + sessions
top		updating real-time system-statisticy
kill		terminate process > kill [pid]
	Below are some of the signals that we can send to a process when it is killed:
    		SIGTERM - Kill the process, but allow it to do some cleanup tasks beforehand
    		SIGKILL - Kill the process - doesn't do any cleanup after the fact
    		SIGSTOP - Stop/suspend a process
				
systemctl	set process to run on boot or startup (start,stop,enable,disable)
fg		run background scripts in foreground again
```

**Automation:**

```
cron		a process that uses crontabs to interact with, crontab-process is started during boot
	-min
	-hour
	-dom	(day of month)
	-mon	(month)
	-dow	(day of week)
	-cmd	(actual command to exec.)
	
crontab -e	edit crontabs
apt		/etc/apt is an sofware-repo source
add-apt-repository	add community repo where to install software from

GPG (Gnu Privacy Guard)key to download trusted software
```

**Logging:**

`/var/log/`	all logfiles\
*important: 	acces log + error log (access and authentication attempts)*

-----------------------------------------------------------------------------------------------------------------------
**Continue your learning in some other TryHackMe rooms that are dedicated to Linux tools or utilities:**

## Find-command:

Syntax: `find [where] [what] (find "*1.txt" or find "file*")`
```
find /		start from root to search for all or specifigc directory
	-type	(d=directories, f=files)
	-name	with wildcards(*) you need to enclosure in quotes "*.php"
	-iname	name as -name but case insensitive
	-user	fileowner
	-size	(-n, +n = bigger than n) c=bytes,k=KiB,M=MiB
		example: find / -size -30c -name "*small*"
	-perm	permission filter
	-time	(min=minutes, time=days)a=accessed,m=modified,c=changed
		e.g: find / -amin +30 |last access more than 20 mins ago

	-Bash Scripting - https://tryhackme.com/room/bashscripting
	-Regular Expressions - https://tryhackme.com/room/catregex
```
------------------------------------------------------------------------------------------------------------------------
