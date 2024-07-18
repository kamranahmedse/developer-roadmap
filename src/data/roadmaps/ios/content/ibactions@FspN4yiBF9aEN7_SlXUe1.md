# IBActions

The @IBAction attribute functions similarly to @IBOutlet. It serves as a hint, prompting Xcode to make the associated method available in the Interface Builder. If you inspect the Interface Builder, you'll notice that it recognizes the method: edit Main.storyboard, select the View Controller object, and switch to the Connections inspector. There, under Received Actions, you’ll see buttonPressed: listed, which is the Objective-C representation of our action method.


- [@official@Target-Action](https://developer.apple.com/library/archive/documentation/General/Conceptual/CocoaEncyclopedia/Target-Action/Target-Action.html)
- [@article@From outlets to actions: creating an IBAction](https://www.hackingwithswift.com/read/2/5/from-outlets-to-actions-creating-an-ibaction)


