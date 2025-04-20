+++
date = '2025-04-19T16:44:59-07:00'
draft = false
title = 'Part 6: Errors'
+++

Errors, errors, errors. Errors are everywhere. I recall a joke I had made on
social media a few years ago where I said

> I am a good enough programmer, don't expect errors in every program I write B)

This was a remark on the (in)famous practical record books I had during my
undergrad, where I had to code a simple program that would probably exemplify
linked lists, arrays, and what not, and there I'd have to write an answer or
provide an example of an output. It also had sections for "errors encountered".

Except, writing "no errors" on nearly every topic was sub-optimal. Especially
when all you had to do was copy the program that they had written for you, and
just run it.

Fast forward a few years, and the concept of errors now is more of a design
question than an implementational one. When you deal with many moving parts, you
realize that wrangling them all is a pain, especially when the errors you see
will most probably be some synchronization issues or race conditions, which will
resolve by themselves _if you just let them try again!_

A system's ability to handle such errors is called resiliency. In such systems,
if something goes wrong, all the system needs to do is potentially make a few
changes and try again. Of course, we can have manual intervention necessary to
handle these errors when they cross a threshold, but that should be a case of
last resort.

## Errors? In our program??

Whenever we work with external blackboxes in our code, we cannot always be sure
that these external entities will work the way we intend to. Fault tolerance is
one of the backbones of a good computing system, and fault tolerance in a
distributed system involves a lot of allowances for entities beyond our control.
There may be a communication issue between computers, or a third party API might
be failing. Should we block out the entire system for it? Or should we let the
malfunctioning component recover by itself?

This leads to two classes of errors:
1. Retriable errors - these are errors that (should) eventually go away with
minimal to no change in the system. Your system ideally has a fixed number of
retries for this error, and fails once the threshold is hit.

2. Fatal errors - these are errors that are fundamental to your component. If
your component hits this error, it has no option but to fail. For example, if
your receiver cannot come up, it is a fatal error. If your receiver cannot send
a message back to a transmitter, then it is not necessarily a fatal error. Of
course, in this case, your transmitter might consider the error fatal.

In order to work with errors, we will need to be able to:
1. Define errors
2. Classify them as fatal / non-fatal
3. Retry


## Diving in

An `Error` in rust needs to be able to implement the `Display`, `Debug` and the
`Clone` traits. While we can use a simple `#[derive(Clone)]` for our code, we
shall add more complex implementations for `Display` and `Debug`.

Let's define a `NwError` object (since we only have network errors as of yet)
as follows:

```rust
#[derive(Clone)]
pub struct NwError {
    pub kind: ErrorKind,
    pub context: String,
}
```

`ErrorKind` is an enum, which we shall define as follows:

```rust
pub enum ErrorKind {
    ErrorNone,
    TransmitterConnectError,
    TransmitterTransmitError,
    ReceiverListenError,
    ReceiverAcceptError,
    ReceiverWriteBackError,
    ReceiverReadFromSocketError,
}
```

If you've worked with enums before, you'll know that more often than not, enums
are simple integers where each integer defines what the enum stands for. They
improve readability, but don't really do much for print access. If something
says, "ErrorKind 3 was enountered", it doesn't really make sense as an end user.

Let's build a way for us to display the kind of error when we `Display` it:


```rust
fn error_kind_to_str(ek: ErrorKind) -> String {
    let returnable: &str;
    match ek {
        ErrorKind::ErrorNone => {
            returnable = "Default: No Error";
        }
        ErrorKind::TransmitterConnectError => {
            returnable = "Transmitter: Connect Error";
        }
        ErrorKind::TransmitterTransmitError => {
            returnable = "Transmitter: Transmit Error";
        }
        ErrorKind::ReceiverListenError => {
            returnable = "Receiver: Listen Error";
        }
        ErrorKind::ReceiverAcceptError => {
            returnable = "Receiver: Accept Error";
        }
        ErrorKind::ReceiverWriteBackError => {
            returnable = "Receiver: Write Back Error";
        }
        ErrorKind::ReceiverReadFromSocketError => {
            returnable = "Receiver: Read From Socket Error";
        }
    };
    return String::from_str(returnable).expect("Error in printing error");
}
```

This function matches the error kind and returns a `String` for the caller to
use.

Now let's implement the display and debug logic for our error:

```rust
impl fmt::Display for NwError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match write!(
            f,
            "{}, context: {}",
            error_kind_to_str(self.kind),
            self.context
        ) {
            Ok(_) => {},
            Err(e) => { panic!("{}", e)}
        };

        Ok(())
    }
}

impl fmt::Debug for NwError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match write!(
            f,
            "Error! {{ kind: {}, context: {} }}",
            error_kind_to_str(self.kind),
            self.context
        ) {
            Ok(_) => {},
            Err(e) => { panic!("{}", e)}
        };

        Ok(())
    }
}
```
These functions print the errors on the screen when called through `println!()`.

Now let's import this ability to our transmitter and receiver.

For our receiver, we shall:

1. Capture any error we see in our listening process (instead of panicking or
swallowing all the time)
2. Once a `tokio::spawn` ends for a request, check for the error
3. Panic for certain errors, swallow the rest.

### Capturing errors

We shall capture the error and return it as follows:
```rust
pub async fn listen(&mut self) -> Result<(), NwError> {}
```

Now let's return this error in our code as follows:

```rust

// In the listener instantiation
let listener = match TcpListener::bind(self.listening_address.clone()).await {
    Ok(v) => v,
    Err(e) => {
        return Err(NwError {
            kind: ErrorKind::ReceiverListenError,
            context: e.to_string(),
        });
    }
};

// In the socket acceptance
match listener.accept().await {
    Ok(stream_and_addr) => stream_and_addr,
    Err(e) => {
        let err = NwError {
            kind: ErrorKind::ReceiverAcceptError,
            context: e.to_string(),
        };
        println!("Accept error, swallowing : {}", err);
        continue;
    }
};
```

Note that this becomes a bit more complicated when we have to deal with errors
that we encounter inside the `tokio` runtime, as it is an additional layer of
abstraction within our logic. `tokio::spawn` returns a `Result`, which contains
either the value we wish to return, or a `JoinError` for internal errors.

```rust
// In the socket read functions:
// No error if connection was gracefully closed
match socket.read(&mut buf).await {
    Ok(0) => {
        // Zero bytes implies closed connection
        println!("Connection closed by {}", inc_addr);
        return NwError {
            kind: ErrorKind::ErrorNone,
            context: String::from("connection closed")
        };
    }
    Ok(n) => {
        // code to read the data...

        if let Err(e) = socket
            .write_all(&returnable.as_bytes()[..return_size])
            .await
        {
            return NwError {
                kind: ErrorKind::ReceiverWriteBackError,
                context: e.to_string(),
            };
        }
    }
    Err(e) => {
        // Could not read from socket
        return NwError {
            kind: ErrorKind::ReceiverReadFromSocketError,
            context: e.to_string(),
        };
    }
}
```

Let's break this down. Since our outer function returns a `Result`, in case of
unrecoverable errors, we wrap the `NwError` inside the `Err()` and return it.
Inside the `tokio::spawn` call, however, we shall simply return the `NwError`
error as a standalone struct and handle it. Your code will now look as follows:
```rust
match tokio::spawn(async move {
    // Logic goes here
}).await {
    Ok(val) => {
        if val.kind != ErrorKind::ErrorNone {
            println!("Swallowing error: {}", val);
        }
    }
    Err(e) => {
        panic!("{}", e);
    }
}
```

What happens if it's `ErrorNone`? We simply rerun the loop without printing
anything! When we hit an error in the `tokio::spawn` function, we can be sure
that it is pertaining to that connection only, and so the error can be
swallowed and the loop can continue. We do something similar in the listener
accept error before we spawn the task as well.

With this design, we know that if any error is thrown to the `main()` function,
it is panic-inducing, as recoverable errors would have been swallowed already.

> For comparing two items in rust, make sure they derive the `PartialEq` and
`Eq` traits!

### Within main

Change your `listener` call in `main` as follows:

```rust
if let Err(e) =  receiver.listen().await {
    // Any unrecoverable error will cause a panic
    panic!("{}", e);
}
```


### In the transmitter

The receiver isn't the only thing that will hit an error. The transmitter might
hit one too, if, for example, the receiver isn't ready yet. Let's add some
error handling in the transmitter as well.

For the transmitter, we shall explore moving the retry logic outside the actual
transmitter struct. Rewrite your function in the transmitter as follows:

```rust
pub async fn transmit(&self) -> Result<(), NwError> {
    let mut write_stream = match TcpStream::connect(self.destination.as_str()).await {
        Ok(val) => val,
        Err(e) => {
            return Err(NwError {
                kind: ErrorKind::TransmitterConnectError,
                context: e.to_string(),
            });
        }
    };

    match write_stream.write_all(self.payload.as_slice()).await {
        Ok(_) => {
            println!("Wrote data");
        }
        Err(e) => {
            return Err(NwError {
                kind: ErrorKind::TransmitterTransmitError,
                context: e.to_string(),
            });
        }
    };

    Ok(())
}
```

This makes the caller decide on whether to retry or panic. We can do so in
`main`:

```rust
let transmitter = nw::transmitter::Transmitter::new(target_addr, data);
let mut transmitted = false;
while !transmitted {
    match transmitter.transmit().await {
        Ok(_) => {
            transmitted = true;
        }
        Err(e) => {
            println!("Recoverable error: {}", e);
            // Retry after a timeout
            let two_s = time::Duration::from_secs(2);
            thread::sleep(two_s);
        }
    };
}
```

Until the data is transmitted, we shall infinitely retry (very bad practice in
real life).

### Testing this out

Once you do a `cargo build`, try the following:

```bash
$ ./simple_socket_comm -c one.toml & sleep 5 && ./simple_socket_comm -c two.toml
[1] 680552
Server is listening on 127.0.0.1:9998
Recoverable error: Transmitter: Connect Error, context: Connection refused (os error 111)
Recoverable error: Transmitter: Connect Error, context: Connection refused (os error 111)
Recoverable error: Transmitter: Connect Error, context: Connection refused (os error 111)
Server is listening on 127.0.0.1:9999
Wrote data
New connection from 127.0.0.1:45070
New connection from 127.0.0.1:42442
Wrote data
Received data: Talking to myself
Received data: Talking to myself
Connection closed by 127.0.0.1:45070
Connection closed by 127.0.0.1:42442

```

Above, you can see how there is a connection refused error when the second
listener isn't up yet. The transmitter keeps retrying after a delay. Next, let
us trigger a "panic"-able error (two servers trying to listen on the same port
for example)


```bash
./simple_socket_comm -c one.toml & sleep 5 && ./simple_socket_comm -c one.toml
[1] 688624
Server is listening on 127.0.0.1:9998
Recoverable error: Transmitter: Connect Error, context: Connection refused (os error 111)
Recoverable error: Transmitter: Connect Error, context: Connection refused (os error 111)
Recoverable error: Transmitter: Connect Error, context: Connection refused (os error 111)
thread 'main' panicked at src/main.rs:62:9:
Receiver: Listen Error, context: Address already in use (os error 98)
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

There you go! As your program evolves, so will your errors. The transmit error,
for example, might have a `n_retries` limit, after which it might want to panic.
If the listener panics on the address, you might have a way for randomly
choosing the newer port for the listener to listen to, and so on.