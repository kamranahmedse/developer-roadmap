# Tell, Don’t Ask

The Tell, Don’t Ask principle emphasizes that objects should be told what to do rather than being queried for their state and having decisions made externally. This promotes encapsulation and reduces coupling by keeping logic within the objects that own the data.

Key Concepts
------------

*   Instead of pulling data out of objects to make decisions, push the behavior into the object itself.
*   Objects should be responsible for their own logic and state management.

Asking style (bad):

    if (user.profile.isComplete()) {
        // allow checkout
    }
    

Telling style (good):

    if (user.canCheckout()) {
        // allow checkout
    }

Visit the following resources to learn more:

- [@article@Tell, Don't Ask](https://martinfowler.com/bliki/TellDontAsk.html)