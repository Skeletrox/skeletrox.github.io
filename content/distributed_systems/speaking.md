+++
date = '2025-02-01T19:08:06-08:00'
draft = false
title = 'Part 2: Speaking'
+++


## Speaking?

In the previous article, we touched upon "listening" - the ability in your
distributed system component to accept information from elsewhere on the fly.
However, "speaking" - the ability for your distributed system component to send
data to other components - is essential if you want to enable complex automation
without having to hardcode every scenario. Wihout it, everything is reactive,
and you may end up holding connections to too many components, leading to
callback hell and extreme resource usage.

## Getting started with Speaking

We shall continue our previous project, and give our system the ability to send
data to itself, for now. We shall spawn another asynchronous task which handles
the "speaking" task, and we shall print out what the "listener" sent back.

### Step 1: Getting the ability to speak

`tokio` uses `TcpStream` as a way for us to "speak" to a socket. Consider this
your larynx's ability to send soundwaves through your mouth. The functionality
we shall code here does not necessarily provide it the ability to makes sense,
it simply gives it the ability to send the data to a certain location. The
process of making sense will be explored in a later article.

Create a `TcpStream` as follows:

```rust
let mut write_stream = match TcpStream::connect("127.0.0.1:8080").await {
            Ok(val) => { val }
            Err(e) => { 
                eprintln!("Could not connect: {:?}", e);
                return;
            }
};
```

I did not add the `?` operator, and decided to handle the errors explicitly.
This allows us to use the functionality without requiring that the calling
function also return a `Result<...>`. You will need to import the `TcpStream` as
well:

```rust
use tokio::net::TcpStream;
```

### Step 2: Speaking

Similar to how the listener sends back data it received, we shall build our
sending logic as follows:

```rust
let data = "Talking to myself";
match write_stream.write_all(data.as_bytes()).await {
    Ok(_) => {
        println!("Wrote data: {:?}", data);
    }
    Err(e) => {
        eprintln!("Error in writing: {:?}", e);
        return;
    }
}
```

We define a `&str` reference, convert it to binary data and write it to the
stream. We again explicitly handle the `match` for maximum usability.

### Step 3: Dealing with the consequences

Well, we spoke. Now we need to be able to handle the response we get from the
listener. We shall handle this here by simply printing the response. We will
need to define a _mutable_ buffer to hold the response, which we shall then
convert to a string for our result, printing it.


```rust
let mut rec_buffer = vec![0; 1024];
match write_stream.read(&mut rec_buffer).await {
    Ok(0) => {
        println!("Connection closed by the server!");
    }
    Ok(n) => {
        println!(
            "Received: {:?}", String::from_utf8_lossy(&rec_buffer[..n]));
    }
    Err(e) => {
        eprintln!("Failed to get data back! Error: {:?}", e);
    }
}
```

This looks pretty similar to what we did in the listening section, but there
is a difference. I am now passing an explicit `slice` instead of a `Vec`. This
is because our buffer is 1024 bytes, and we should not try to convert all the
1024 bytes that we get from the listener. At best, we get `nulls`. At worst, it
is a data leak if residual data from one reply in the listener is visible in the
next. We have replaced `String::from_utf8` to `String::from_utf8_lossy` to
handle the change as well, and we only read the `n` bytes returned to limit the
number of bytes we read from the buffer as well.

> You might be wondering: _shouldn't we do this for the listener as well_? Yes,
but I'll leave it up to you to implement that feature.

### Step 4: Are we ready yet?

If you're building this feature on top of the previous article, you might be
wondering, where does all this code fit in? Consider the following workflow:

```
Start -> Speak -> Listen
```
This is a problem as we won't be able to listen by the time we are done
speaking. We call out to the void, and listen for something we never say. What
if we do it the other way?

```
Start -> Listen -> Speak
```

The more astute of you would have already realized that because we listen to
data in an infinite loop, we will never hit the "speak" section! Even if we
were able to somehow have a way to exit the loop, doing so will close the
listening aspect of the component - which means we are again screaming into the
void.

So what is the answer? _**Concurrency.**_

To start off with this - we shall `tokio::spawn` an asynchronous task for the
speaker at the start of our main function. All this logic goes within it, so you will end up writing something
like:

```rust
tokio::spawn(async move {
    // Step 1
    // Step 2
    // Step 3
});
```

So what does this do? It concurrently spins off this task and makes the logic
within it "non-blocking". Non-blocking sections of code allow other tasks to
execute in parallel to them so that code section can wait on other dependencies
and not jeopardize the functioning of the other ones. Concurrency is in action
when we also accept multiple clients when building our listener.

With this, your code workflow will look like this:

```
Start -┰-> Speak
       ┗-> Listen
```

Now another bunch of you might think: If they are truly parallel - how can we be
sure that the listener is truly ready when we start? We can ensure that by
enforcing our speaker "sleeps" for two seconds before it speaks. You can do that
as follows, before step 1:


```rust
let two_s = time::Duration::from_secs(2);
thread::sleep(two_s);

```

Import the prerequisites:

```rust
use std::{thread, time};
```

### Step 5: Actually running

```bash
$ cargo run
   Compiling simple_socket_comm v0.1.0 (/home/skeletrox/Programming/Rust/simple_socket_comm)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.68s
     Running `target/debug/simple_socket_comm`
Server is listening on 127.0.0.1:8080
New connection from 127.0.0.1:60668
Wrote data: "Talking to myself"
Received: "Returning: Talking to myself"
Connection closed by 127.0.0.1:60668
^C

```

If everything was built properly - you should see a result like above.

## Next Steps

Now that we have an entity that can speak to itself - our next steps will be
finding a way to have multiple entities speak to themselves. Stay tuned!