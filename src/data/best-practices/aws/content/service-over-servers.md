# Service Over Servers

> Servers are ephemeral, you don't care about them. You only care about the service as a whole.

If a single server dies, it should be of no big concern to you. This is where the real benefit of AWS comes in compared to using physical servers yourself. Normally if a physical server dies, there's panic. With AWS, you don't care, because auto-scaling will give you a fresh new instance soon anyway. Netflix have taken this several steps further with their [simian army](http://techblog.netflix.com/2011/07/netflix-simian-army.html), where they have things like [Chaos Monkey](https://github.com/netflix/chaosmonkey), which will kill random instances in production (they also have Chaos Gorilla to kill AZs and I've heard rumour of a Chaos Kong to kill regions...). The point is that servers will fail, but this shouldn't matter in your application.
