# Channels

Channels in Rust allow communication between threads. They are a programming paradigm that is part of the message passing concurrency model. Channels are used to send and receive values between threads, ensuring thread safety by avoiding shared state. Rust channels have two parts - `Sender` and `Receiver`. `Sender` is used for sending data, and `Receiver` is used to read the data. This model follows the 'multiple producer, single consumer' rule, meaning it can have multiple sending ends but only one receiving end. Channels in Rust are provided by the `std::sync::mpsc` module, where mpsc stands for Multiple Producer, Single Consumer.

Learn more from the following links:

- [@article@Channels](https://doc.rust-lang.org/rust-by-example/std_misc/channels.html)