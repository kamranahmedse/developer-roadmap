# Installing Rust and Cargo

To install Rust, navigate to the official website at [https://www.rust-lang.org](https://www.rust-lang.org) and download the appropriate installation file (or run the appropriate terminal command) for your operating system. You'll be installing `rustup`, which is the preferred tool for installing, updating, and managing your core Rust tooling. For UNIX systems like Linux and MacOS, installation is as easy as running a single command in the terminal. For Windows, you'll be provided with an '.exe' installer which you need to execute. Further instructions can be found on the download page of the website.

Keep in mind that for the compiler to create executables, you'll also need a linker on your operating system, such as 'GCC'. Otherwise, you'll encounter errors when you try to run `rustc` or `cargo`. This is one necessary thing that `rustup` doesn't install for you. Such linker components are part of the C standard library, so they may or may not be partially or fully preinstalled on your system. For example, a common error when running `rustc` for the first time in a 64-bit Linux environment is that your system is missing 32-bit support for GCC, which can be solved by installing `gcc-multilib`.

You can update your Rust version at any time by running `rustup update` in the terminal.
