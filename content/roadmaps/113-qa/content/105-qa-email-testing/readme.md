# Qa email testing
## Before you start QAing an email
Take a break first.  I make more mistakes when I build an email and then immediately QA.  I end up looking for what I meant to say, instead of objectively reviewing if my meaning/grammar are clear.  Just take a break first.  Forget your intentions.  And you’ll be much more clear-eyed while testing.
Budget 30 uninterrupted minutes.  Another cause of mistakes?  Assuming this will take 3 minutes.  When I rush, I end up cutting corners, and things like UTMs, image hyperlinks, and mobile views get shafted.  Give yourself a realistic amount of time to do the job thoroughly.
Use/share a checklist.  There’s a reason pilots and surgeons use checklists.  When you’re doing something detailed and painstaking, it’s liberating to just focus on the work instead of trying to remember if you “did everything.”  Standardize the process and put all your energy into testing and optimizing your email. 


## Email QA checklist
# Render the email many different ways:
  Preview the email in your marketing automation platform
  Use Litmus to see what your email looks like in other email clients
  Send a test email to your work email and a personal email
  Review both test emails on your desktop and your phone
# Check your subject line, “from” address and name, and preheader
# Click every link and image in the email
  All the links work
  All the links have UTMs
  The opt-out link goes to the opt out page
  Phone numbers work – yes, call the phone numbers! 
# Spell check
# Ensure days/dates match
# Grammar check
# Brand:
  The right logos (hyperlinked with UTMs of course)
  The right colors and fonts
# Variable/dynamic/tokenized content:
  If variables are used, test message with default values
  Review default values and confirm they make sense
  Personalized content populates correctly
# Send to a second person for a sanity check once you’ve made your updates
# Review your audience, including exclusions
# Send/schedule the email!
### That's it!!
