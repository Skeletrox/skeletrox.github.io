+++
date = '2025-03-09T11:46:24-07:00'
draft = false
title = 'Part 5: Config'
+++


## Introduction

This article is pretty straightforward. When we started with adding additional
functionality to our code, we began with invocation arguments. This approach,
however, is not scalable when you have to deal with more than three or four
such arguments. Imagine starting a program with 20 arguments!

To get around this, most projects use something called a "config" file. Using a
config file is pretty straightforward - you store the values in a file, read it,
parse the values in the file and trigger your program with those values. In this
article, we shall explore adding a config file for our project. Once we do that,
we shall use it as the source of truth for all configuration options we have.

## Choosing a format

For the config file format: We shall go with [toml](https://toml.io/en/), which
Rust itself seems to favor. Our config will use a simple "key = value" format.
Our code shall then read the file and use the config in it.

### `config.toml`

Let's call our config file `config.toml`. Let's create one below.

```toml
port = "9998"
target = "9999"
```

Create it wherever you want, just remember to invoke its correct path when you
start your program.


## Getting the ability to read the file

Now, the code needs to be able to read the file. `tokio` has the `fs` module
which will help us read and write to this file very easily. Let's implement this
by means of a `config` module. From the last article, you can create a config
module as follows:

```rust
use tokio::fs::File;
use tokio::io::AsyncReadExt;
use toml::Table;

pub struct ConfigParser {
    configs: Table
}

impl ConfigParser {
    pub async fn new(file_name: String) -> Self {
        let mut file = match File::open(
            file_name.as_str()).await {
            Ok(f) => f,
            Err(e) => {panic!("Error in opening config: {:?}", e);}
        };

        let mut contents = String::new();
        match file.read_to_string(&mut contents).await {
            Ok(_) => {},
            Err(e) => { panic!("Cannot read file: {:?}", e);
            }
        };

        let configs = contents.parse::<Table>().unwrap();

        return ConfigParser {
            configs
        };
    }

    pub fn get(&self, key: &str) -> Option<&str> {
        self.configs[key].as_str()
    }
}  
```

In order to read our `toml` file, we also use the `toml` package. Import it by
adding the following in your `Cargo.toml` file:

```toml
toml = "0.8.20"
serde = "1.0"
```

What does the code above do? We create a simple constructor, where we read the
file and store its contents in a `toml::Table` struct. This struct is just a
map between a String (which is the key) and a `toml::Value`. Any attempts to get
a certain key and a value is done through the `get()` method, which returns a
string representation of the value. It returns an `Option<>`, indicating that
the value might or might not be present. It is up to the caller to decide how
to handle this case.


## Using the config file

Our config file is all set to be used in the `main()` function. All we need to
do is tell our `main()` function to parse the config file and create our config
parser with it. We can do it as follows:

```rust
let args: Vec<String> = env::args().collect();
let mut opts = Options::new();
opts.optopt("c", "config_file", "config file to read from", "CONFIG");

let matches = match opts.parse(&args[1..]) {
    Ok(m) => m,
    Err(f) => {
        panic!("{:?}", f.to_string());
    }
};

let config_file_loc = matches.opt_str("c");

if config_file_loc.is_none() {
    panic!("No config file specified!");
}

let config_parser = config::config::ConfigParser::new(config_file_loc.unwrap()).await;

let port = config_parser.get("port");
let target = config_parser.get("target");

let addr = format!("127.0.0.1:{}", port.unwrap());
let target_addr = format!("127.0.0.1:{}", target.unwrap());

```

Now, our code can simply read the config file, passed through the `-c` argument, and get the
appropriate values from it!
