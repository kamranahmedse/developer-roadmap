# Broad Phase

**Broad Phase Collision Detection** is the first step in the collision detection process. Its primary function is to identify which pairs of objects might potentially collide. Rather than examining the entire body of every object for possible collision, it wraps up each one in a simpler shape like a bounding box or sphere, aiming to reduce the number of calculations. The output of this phase is a list of 'candidate pairs' which are passed onto the next phase, often referred to as the narrow phase, for in-depth overlap checks.

Visit the following resources to learn more:

- [@article@Broad Phase Collision Detection](http://buildnewgames.com/broad-phase-collision-detection/)
