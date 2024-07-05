# Basics / Creating Animations

Creating animations with Core Animation involves manipulating `CALayer` properties over time. Developers can use `CABasicAnimation` for simple property changes, or `CAKeyframeAnimation` for more complex, multi-step animations. Animations are added to layers using the `addAnimation(_:forKey:)` method. Common properties animated include position, bounds, transform, and opacity. Core Animation provides timing functions to control the pace of animations, and allows for grouping multiple animations using `CAAnimationGroup`. For view-level animations, UIView's animate methods serve as a convenient wrapper around Core Animation.

Learn more from the following resources:

- [@official@CALayer Documentation](https://developer.apple.com/documentation/quartzcore/calayer)
- [@official@CABasicAnimation Documentation]
- [@official@]CAKeyframeAnimation Documentation](https://developer.apple.com/documentation/quartzcore/cakeyframeanimation)
(https://developer.apple.com/documentation/quartzcore/cabasicanimation)
- [@article@What is CALayer?](https://www.hackingwithswift.com/example-code/calayer/what-is-calayer)
