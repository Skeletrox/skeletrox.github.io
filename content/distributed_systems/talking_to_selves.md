+++
date = '2025-02-20T22:02:35-08:00'
draft = false
title = 'Part 3: Talking to Selves'
+++

## Introduction

We've all been there. It's ten minutes before the debate competition. In every
corner of the waiting room stands a candidate, rehearsing their arguments and
making sure that their stance is believable to themselves. The more astute of
them however, would go forth and and debate themselves, trying to find those
miniscule improvements in semantics that could bolster their defenses against a
ruthless interjector.

Now imagine if they were all in the same coordinates (somehow). They would all
be talking over each other and not knowing whether they were listening to
themselves or another guy who was right there. Now imagine you have multiple
applications listening on the same source (port, if you want to be precise).
The issue is, you never know which application should parse which message!
Of course, the underlying infra in your computer will not allow you to set up
two servers (listeners) in the same location, unless you go with
[`SO_REUSEPORT`](https://stackoverflow.com/questions/14388706/how-do-so-reuseaddr-and-so-reuseport-differ),
which is a whole different ball game and lead to errors out of your control.

For now, you'll get the below error if you try running two instances of the
previous program parallely:

```bash
Error: Os { code: 98, kind: AddrInUse, message: "Address already in use" }
```


But you don't really want to have to compile each component separately,
especially if it's something complex that will need to be dynamically compiled
each time you run the component. "You want to have another process that does 
more listening? Please wait another minute while we compile it again with 4
characters changed and spin it up."

But wait, what if we could somehow tell the program at start that it should
begin listening at a certain port? That way, when we need to start something up,
we can just ask it to spin itself up at a certain port! This sort of behavior is
possible through invocation arguments, and this allows us to, as per part 1, let
the component know in what context it spawns.

## Invocation Arguments

Invocation arguments are additional data that you start your program with. For
example, in the following code:

```bash
$ ls -l
```

The `-l` is a flag that you send to `ls`. It's an option that tells you that the
`ls` program must list the files in a long listing format, with all the details
that you need. Consider the following example:

```bash
$ tail -f my_file.txt
```

This implies that `tail` should `-f` (follow) `my_file.txt`. Here, the `-f` part
is the optional argument, and `my_file.txt` is the value for it. We will write
something similar for our code.

Ideally what we want to do is provide a way for our program to choose a port to
listen in on when it comes up. Let's say something like

```bash
$ myprog -p 7777
```

ensures it listens on port 7777.

## Invocation Arguments for Rust

For a rich argument parser for our program, we shall use
[`getopts`](http://docs.rs/getopts/latest/getopts/). This works similar to C's
`getopt` function, but, IMHO, is a lot easier to work with. Add it to your
`cargo.toml`:

```
getopts = "0.2" 
```

Now we need to use it in our program. Import it as follows:

```rust
use getopts::Options;
```

So how do we define options? We can define them as follows:

```rust
let mut opts = Options::new();
opts.optopt("p", "port", "choose port to run on", "PORT");
```

This creates an `Options` struct that we can parse the options into. But in
order to parse the options, we must first find a way to read all the arguments
that we pass to the program. To do that, we shall use the `std::env` namespace.
We can collect the arguments as follows:

```rust
use std::env;
```

And then, within the main function:

```rust
let args: Vec<String> = env::args().collect();
```

Now we can parse our arguments as follows:
```rust
let matches = match opts.parse(&args[1..]) {
    Ok(m) => m,
    Err(f) => {
        panic!("{:?}", f.to_string());
    }
};
```

So why are we parsing our arguments from the second index? The `args` vector
always contains the program name as the first element. This helps write proper
usage messages, identify source of logs for the program, etc. However, we do
not want to parse the program name with our options, and so we take a slice of
the vector from the second element and try to parse the elements into the match
object, handling errors as necessary.

The below code lets us parse the port from the args:

```rust
// Check if there is a string parameter for the 'p' argument
let port = matches.opt_str("p");

// If none, panic and exit
if port.is_none() {
    panic!("No port specified!");
}

// Set the listening address as localhost:port.
let addr = format!("127.0.0.1:{}", port.unwrap());
```

Now all that is left is to replace all occurrences of `127.0.0.1:8080` with
`addr`, and we're done!

## Testing it out.

Let's test it out with the following on your shell. Run the following:

```bash
$ cargo build
```
Then run the program explicitly (the program/project name might be different in
your machine) as follows:

```bash
$ cd target/debug
$ ./simple_socket_comm -p 9999 & ./simple_socket_comm -p 9997
[1] 1207039
Server is listening on 127.0.0.1:9997
Server is listening on 127.0.0.1:9999
New connection from 127.0.0.1:47720
New connection from 127.0.0.1:35852
Wrote data: "Talking to myself"
Wrote data: "Talking to myself"
Received: "Returning: Talking to myself"
Received: "Returning: Talking to myself"
Connection closed by 127.0.0.1:35852
Connection closed by 127.0.0.1:47720
```

Here, we can see two instances of our simple listener talking to themselves by
sending the same data to themselves! Let's explore talking to each other, even
across machines, in the next article.