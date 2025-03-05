+++
date = '2025-03-04T10:21:27-08:00'
draft = false
title = 'Part 4: Modularizing'
+++

Let's take a small detour from the distributed systems-focused workflow here to
focus on modularizing our code. Right now we have a mammoth `main()` function
that simply becomes [spaghetti](https://en.wikipedia.org/wiki/Spaghetti_code) if
we want to add more functionality. Some of the more "standards-enjoyer"-like of
y'all might actually prefer limiting your code to 80 characters wide (it's also
a goal that I have tried to maintain for the markdown files in this blog), which
you can already see might lead to funky indentations and nearly-unreadable code.

There is also another issue - having a single method (or entity for that matter)
leads to an anti-pattern. It starts handling everything, becoming something
called the [God Object](https://en.wikipedia.org/wiki/God_object). While it may
make sense to use a God Object when you want efficiency - it is generally bad
practice to have a single entity conquer every problem. You might unknowingly
introduce dependencies and undefined contracts between "stages" of your God
Object, you might end up with variables like `request_to_x`, `response_from_x`,
`request_to_y`, `response_from_y_at_first`, etc. Then you might hit a bug
because there is a certain variable that you're unintentionally reusing between
workflows. The issues can be endless!

## So how do we fix this?
What if we could neatly organize our code? We can simply have our main function
say "Hey component X, do your thing". Component X now spins off its workflow.
Component X is responsible for its workflow, and any issues with Component X are
limited to Component X.

This design helps parallelize a lot of development, at an (usually) acceptable
cost of performance and complexity. For those working on kernels, OSes and
high-performance code, the additional cost builds up over time, and it might not
make sense to sacrifice performance for readability. Fortunately, most code does
not require wringing every last nanosecond of performance at the cost of
readability and mantainability.

Segue aside, using components also allows us to test them in isolation, also
called "unit testing". This helps design and test the exact contract (expected
behavior) of that component. We shall explore this in a future article.

So, how do we define modules for our project?

## Creating a network module
Now we know that we don't necessarily want our main function to handle the nitty
-gritties of creating a connection, sending a message to the socket, etc., we
can move the code into its own module, possibly using a `struct` to encapsulate
related behavior. When we need to add functionality to our network module, we
simply add that functionality to the appropriate struct, test it out, and let
the caller defer the logic to an instance of the `struct`. You know, simple OOP
stuff (if you ignore inheritance, which Rust does not support).

Our code shall therefore look like this:

```
[ Project ] --contains--> [ Modules ] --contain--> [ Structs ]
```

You can create a module in `main.rs` if you wish, but that does not help in
making the file smaller, and is not scalable. Instead, we shall create a new
folder that holds this module, and access code from this module from `main.rs`.

## Structure
Let's design our module as follows. I renamed the speaker to transmitter, and I
renamed the listener to receiver. Just like a traditional duplex communication
system.

```
project_root
    ├── main.rs
    └── network module (nw)
               ├── transmitter.rs
               └── receiver.rs
```
This encapsulates our network module in its own folder, and keeps any changes we
need to make for the module within it. It also allows us to reuse file names (as
long as they stay in different folders) and avoid making our project root too
wide. With this approach, we will need to let the main function know what is
exported from these modules. To do that, we shall use a `mod.rs` file, which
tells rust that this folder is a module, and contains the submodules we wish to
export from here, acting as an entrypoint for this module.

### Exposing functionality
Rust has a "private" by default approach to members and modules. This means that
these entities are private and internal to their owner, unless explicitly marked
public. This behavior makes any exposure of internal data intentional, similar
to how rust has all variables immutable (const) unless explicitly specified to
be mutable by the programmer. Least permissive by default, explicitly enforce
permissibility if necessary.

So let's go bottom-up. We shall define the struct, define its methods, make it
visible to the module, and then make the module visible to the rest of the
program.

#### The receiver struct

We want to define a receiver which can listen on a specific address. Let's
define it as below, in `nw/receiver.rs`:

```rust
pub struct Receiver {
    listening_address: String,
}
```
The `pub` keyword means that this struct is visible to outside entities. Not
adding this keyword keeps the struct private to the module by default. Note how
`listening_address` is not `pub`. It's private to prevent unexpected access to
the data member. _If you have no need to access it directly, why should you risk
it being accessed?_

Let's move on to adding the methods for this. These will be defined using the
`impl` keyword. This includes the constructor(s) for this struct.

We can define the constructor as:

```rust
impl Receiver {
    pub fn new(address: String) -> Self {
        Receiver {
            listening_address: address,
        }
    }
}
```
This differs from traditional constructors we are familiar with in Java, Python
or C++ in that we cannot simply say `Receiver()`. Technically, you could name
the function `Receiver`, but the rust linter is going to complain as standards
require you to have it in lowercase. Plus, given how rust does not support
function overloading, an explicit constructor detailing its purpose is always
good practice.

This function does nothing complex: It takes a String input, creates a Receiver
struct entity with the `listening_address` set to the input and returns it. This
differs from traditional constructors where the constructor is a part of the
actual object. In this case - the constructor is a static method that returns a
new instance of the struct.

Let's define the actual behavior here, within `impl Receiver { ... }`:

> Remember to import the necessary entities!

```rust
pub async fn listen(&self) {
    let listener = match TcpListener::bind(
        self.listening_address.clone()).await {
            Ok(v) => v,
            Err(e) => {
                panic!("Error in setting up listener: {:?}", e);
            }
    };
    println!("Server is listening on {}", self.listening_address);

    loop {
        let (mut socket, inc_addr) = match listener.accept().await {
            Ok(stream_and_addr) => { stream_and_addr },
            Err(e) => {
                panic!("Cannot listen at address! Error: {:?}", e);
            }
        };
        println!("New connection from {}", inc_addr);

        // Spawn a new task to handle the connection
        tokio::spawn(async move {
            let mut buf = vec![0; 1024];
            loop {
                // Read data from the socket as long as it comes
                match socket.read(&mut buf).await {
                    Ok(0) => {
                        // Zero bytes implies closed connection
                        println!("Connection closed by {}", inc_addr);
                        return;
                    }
                    Ok(n) => {
                        // Echo the data back to the client with additional
                        // info
                        let clone = buf.clone();
                        let data = String::from_utf8_lossy(&clone[..n]);
                        println!("Received data: {}", data);
                        let returnable = format!("Returning: {}", data);
                        let return_size = returnable.len();
                        if let Err(e) = socket.write_all(
                            &returnable.as_bytes()[..return_size])
                                .await {
                            eprintln!(
                                "Failed to write to socket; error = {:?}",
                                e);
                            return;
                        }
                        // Clear the buffer
                        buf.fill(0);
                    }
                    Err(e) => {
                        // Could not read from socket
                        eprintln!(
                            "Failed to read from socket; error = {:?}", e);
                        return;
                    }
                }
            }
        });
    }

}
```

This functionality is very similar to how we handled it in `main()`. However,
the main difference here is that we do not want to use `await?` and may have to
define a `Result<>` to be returned. Instead, we explicitly process the `match`
arm and either gracefully handle the situation, or panic. (As we develop our
code, we shall focus on removing panics as well for better reliability.) We pass
`&self` as the first parameter because we want to make this method non-static,
tied to an instance of the struct.

We have also defined the function to be `async`, letting us know that this
function shall not block the main runtime from executing in case it is stuck on
a waiting task.

The entire functionality is now within the context of the receiver. If we want
another component to use the receiver, all it needs to do is create a new struct
using `Receiver::new()` and call `Receiver::listen()`. The caller does not need
to know, or worry about the internal implementational details.


#### The transmitter struct

The transmitter struct can also be created as follows, in `nw/transmitter.rs`:

```rust
pub struct Transmitter {
    destination: String,
    payload: Vec<u8>
}

impl Transmitter {
    pub fn new(destination: String, payload: Vec<u8>) -> Self {
        Self  { destination, payload}
    }

    pub async fn transmit(&self) {
        let mut write_stream = match TcpStream::connect(
            self.destination.as_str()).await {
            Ok(val) => val,
            Err(e) => {
                eprintln!("Could not connect: {:?}", e);
                return;
            }
        };

        match write_stream.write_all(self.payload.as_slice()).await {
            Ok(_) => {
                println!("Wrote data");
            }
            Err(e) => {
                eprintln!("Error in writing: {:?}", e);
                return;
            }
        }
    }
}
```

Again, we define a constructor and the necessary functionality, marking the
struct and the methods `pub` to make them accessible outside the module.


#### Adding them to the module exports file

`mod.rs`, our module exports file, will look like this:

```rust
pub mod receiver;
pub mod transmitter;
```

We are essentially telling anyone who scans this file that there are two public
modules, `receiver` and `transmitter`, available.


## Importing the module

Importing the module in main is straightforward, all you need to do is add the
following line:

```rust
mod nw;
```

This tells the compiler that there is a module `nw` that we want to use. Now all
we need to do to initialize our receiver is:

```rust
let receiver = nw::receiver::Receiver::new(addr);
```

We can then spawn our transmitter as follows:

```rust
tokio::spawn(async move {
    // Sleep first to let the server start up
    let two_s = time::Duration::from_secs(2);
    thread::sleep(two_s);
    let data = String::from_str("Talking to myself").expect(
        "Could not parse string").into_bytes();
    let transmitter = nw::transmitter::Transmitter::new(
        target_addr, data);
    transmitter.transmit().await;
});
```

And finally, we can listen on our receiver as follows:

```rust
receiver.listen().await;
```

Compile and run it, and you should see no changes in your functionality, but
now your `main()` function looks a lot cleaner, and it only contains code for
functionality specific to it.