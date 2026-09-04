# Back Pressure
 
Back pressure is a mechanism for controlling the flow of data or requests when a system component cannot keep up with incoming volume. Instead of letting a queue or buffer grow unbounded, the system slows down or rejects new work until the backlog clears. This protects downstream components from being overwhelmed and crashing.