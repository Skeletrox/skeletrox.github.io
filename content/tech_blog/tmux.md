+++
date = '2025-01-06T23:29:31-08:00'
draft = false
title = 'tmux'
+++


## tmux?

It was my first job. A small, bootstrapped startup in Bengaluru, with about 7 of us
in total. That was where I heard my company's CTO use the word "tmux". I didn't
really care for it - all that mattered to me was the ability to run multiple shell
sessions at once - and [Terminator](https://gnome-terminator.org/) was doing its
job really well. I could split tabs, rearrange them, and then post a screenshot in
my instagram and generate quite a buzz among my twenty followers. And this worked for
me for quite a long time. I would simply have multiple tabs open in my laptop and
simply let them run in the background if necessary. If I closed a tab, I killed its
process.

Then one fine day I found myself running hour-long builds on cloud development
servers. Makes sense, you cannot hope to build & run a petabyte-scale data warehouse
in a 2019 Macbook Pro, and this led to a unique challenge. You see - the easiest way
I could run these builds in the server was through an SSH session, and if I left my
laptop idle / locked it, the VPN would disconnect, which meant that the SSH session
would disconnect, which meant that my build process would get aborted, and I'd end
up with lost work for something as trivial as getting a cup of coffee!

I decided to search for ways to persist my SSH session in the background in case of
such disconnects. The first option that came to me was the star of this article, our
good old friend, [tmux](https://github.com/tmux/tmux/wiki).

So me, being the FOSS-fan that I claim to be, tried it out on my laptop. And the
fundamental problem wasn't going to solve itself there. Because a broken SSH session
in the terminal would simply translate to a broken SSH session in `tmux`. However,
what if I ran it on the servers that built my code?

What `tmux` does is - it triggers a daemon server process that spawns sessions when
requested. Shells can then connect to these sessions when necessary, keeping them
alive even if the shell disconnects due to a network change or process exit. The only
way to terminate a session is to do so explicitly. This worked perfectly for my use
case. All I had to do was (re)use a session, trigger a long-running process, and then
either get my coffee, go to lunch, drive home, or sleep for the night. When I was
back, if the SSH session was terminated, who cares? I could start up a new one and
connect to the `tmux` session. I could compare logs next to each other, and I could
move them around if I saw fit.

This was amazing. And soon I moved to `tmux` everywhere. I had it installed on all my
development servers, my personal machines, and I keep preaching the gospel to
whomever is unlucky enough to open their VSCode terminal in front of me.
As it turns out, `tmux` is highly customizable, and getting bitten by the
customization bug, I scoured the internet (did a google search) and found a few
customization tutorials for my use case. I needed a way to persist it (in case I end
up using a new development server, or wipe my Linux distro clean). I also needed
a good starting point for my first tech blog post. And so, here we are. My `tmux`
configuration, subject to change.


## Step 1: Installation

`tmux` can be installed by following the installation guide
[here](https://github.com/tmux/tmux/wiki/Installing). I prefer package manager builds
as I don't have an urgent need to build from source, but don't let my choices stop
you!

## Step 2: Getting the hang of it

First off, you'll realize that `tmux` does not have any support for the mouse. A lot
of the senior engineers I work with are okay with that, but I strongly believe that
the independence from the mouse should be learned, not forced upon. But wait, how
do I do all the things I wanted to do?

### Experiment

Let's run the following:

```
$ tmux list-sessions
```

You should see something like 

```
no server running on /tmp/tmux-1000/default
```

Makes sense. we have not started our `tmux` server yet. Now run:

```
$ tmux
```

You should now see the same terminal, but now within the tmux context. Look for a
status bar at the bottom. It shows the session name (0 in this case), along with the
command that is running. Let us try to split the window into two.

`tmux` (and `vim` as well) has the concept of a command prefix. The default is
`Ctrl+b` for `tmux`. In this post, I use `<prefix>`, and it is `Ctrl+b`,
unless you wish to change it to something else.

So in order to perform an action, you first press the keys to enter the command
prefix, and then press the next key. Let me explain with an example. To split the
window horizontally, press `<prefix>` and then press `%` (don't forget the shift!)

{{< image src="/res/tmux/split_screen.png" alt="split window" position="center" style="border-radius: 8px;" >}}

You can do the same, vertically, using `<prefix>` and `"`. Again, don't forget the shift.

Did your screen split in half, albeit horizontally this time?

Now, let's detach from the session. This happens automatically if you close your
terminal (remember what I said about the session needing to be explicitly closed).
Type the following: `<prefix> d`. You should now be out of the `tmux` session, and
back into the shell where you triggered your tmux session. Run the following now:

```bash
$ tmux list-sessions
0: 1 windows (created Mon Jan  6 22:57:22 2025)
```

Wait, this is new! `tmux` is telling you that the old session is still open, and now
you can connect to it. Simply run:

```bash
$ tmux attach -d
```

The `-d` flag tells all other clients attached to this session to detach themselves.
It helps enforce a 1:1 mapping of session to client, lest someone else make changes
to a window you have open, making you wonder if AI has really taken over.

### Shortcuts to know

Run the following to get a quick idea about a few more shortcuts.

```
<prefix> + q -> List panes in order
<prefix> + { -> Swap with previous pane
<prefix> + } -> Swap with next pane
<prefix> + z -> zoom pane in/out
<prefix> + Space -> rearrange panes
<prefix> + c -> new window
<prefix> + w -> preview windows
<prefix> + , -> Rename window
<prefix> + n -> next window
<prefix> + p -> previous window
<prefix> + ! -> Detach pane to its own window
<prefix> + l -> Last window
<prefix> + arrow keys -> Focus on the pane to the appropraite direction

```


## Making it truly yours

Now `tmux` does look pretty low-key. Yet, with customizations, we can supercharge
how we use it, and make our workflows a lot easier, and a lot better to look at.

The config file for `tmux` is `tmux.conf`. Let's create one, in `~/.tmux.conf`

```bash
$ vim ~/.tmux.conf
```

### Mouse support

Remember when I said I prefer mouse support? Enable it with the following line:

```
set -g mouse on
```

### History limit

When dealing with a lot of logs - I prefer having a lot of lines that I can scroll
up to. The default for `tmux` is 2000 lines, but I'd like to keep it a nice, round
8000.


```
set-option -g history-limit 8000
```

### Renumbering windows

When you close all panes in a window (the hierarchy of `tmux` is session -> window
-> pane), you may end up with gaps. For example, having windows 0, 1 and 2, and
closing window 1, will only leave you with windows 0 and 2. It can mess with your
flow, and so you can set `tmux` to automatically renumber windows if necessary.

```
set -g renumber-windows on
```

### Jump back and forth between panes

`<prefix> + m` "marks" a pane. Consider it to be like a single-entry cache. You can
revisit this pane quickly using `<prefix> + backtick` as follows:

```
bind \` switch-client -t'{marked}'
```

I had to escape the "\`" character as it is a quotation mark. What we are
doing here is binding a character to a command, which is `switch-client -t'{marked}'`
in this case. If it was not evident, `{marked}` is internal to `tmux` and stores the
pane we are interested in.

Binding a character allows you to use it as `<prefix> + <character>`.

### Reloading configs

Most of the time, you'd want live results for your config changes. Make tmux reload
with `<prefix> + r` using the setting below:

```
bind r source-file ~/.tmux.conf \; display "Reloaded!"
```

This function "sources" (imports) the config file. It then prints "Reloaded!"on your
status bar on loading the config file, letting you know the work is done.

### Maintaining path and fixing pane creation

You might have observed two things.

1. Creating a new pane / window always opens it in the same directory as the original
home directory. If you went on an adventure, you have to do it again to keep your
panes or windows in the same path.

2. It can be hard to remember `%` and `"` as vertical and horizontal split. We may
need to use keys that look like them.

This is how we can do this:

```
bind c new-window -c "#{pane_current_path}"
bind \\ split-window -hc "#{pane_current_path}"
bind - split-window -vc "#{pane_current_path}"
```

I used the `\` and `-` keys because every keyboard I have has the `|` symbol with the
`\` symbol, and we can avoid pressing an unnecessary `shift` key. The
`#{pane_current_path}` parameter implies that each one of them will use the same path
as the current pane. `-h` stands for horizontal split (vertical line) and `-v` stands
for vertical split (horizontal line). Yeah, it is evident that the new keys are
better.

### Joining panes from other windows

I've seen cases where logs from window A might make a lot more sense in window B.
In that scenario, I find myself wanting to move a pane to another window. For that,
I simply use the following command:

```
bind j choose-window 'join-pane -h -s "%%"'
bind J choose-window 'join-pane -v -s "%%"'
```
Small `j` allows me to load it horizontally after the current pane, while a capital
`J` allows me to load it vertically.

### Swapping windows

You might want to change the order of your windows. For example, you might have
opened your workspaces as `Frontend -> Backend -> Middleware` but need to change
it to `Frontend-> Middleware -> Backend`. In this case, we can swap the windows as
follows:

```
bind > swap-window -d -t +1 # move window right
bind < swap-window -d -t -1 # move window left
```

### Scratchpad

Sometimes there is a chunk of code that I need to store somewhere while I investigate
another component. In such a case, a quick scratchpad always helps, where I store
my observations, some logs, and some additional info that I might forget soon. I
can quickly access my scratchpad as follows:

```
bind-key h split-window -h "vim ~/scratch/notes.md"
bind-key H split-window -v "vim ~/scratch/notes.md"
```

It opens a new pane, with the `vim` command running on startup.

## More customizations

To customize some more - I suggest you try out `tpm` - The `tmux` plugin manager.
You can check it out [here](https://github.com/tmux-plugins/tpm). My favorite is
the Dracula statusline one - it is customizable, easy to install, and adds more
life to your `tmux` sessions.

I'll update this page (or create a new one) as and when my `tmux` config evolves.
Happy hacking!

## Notes

Another trick I use in my work is to **always** attempt to detach from a session
before creating a new one. This prevents multiple sessions when I do not expect
them. So, I might run something like:

```bash
$ tmux attach -d || tmux
```

The `tmux attach -d` call will fail if there is no session running, making the
shell execute the `tmux` section of the command. For custom sessions, I use

```bash
$ tmux attach -dt shell || tmux new -s shell
```

where `shell` is the name of the session

A lot of my configs came from these sources:

* https://hamvocke.com/blog/a-guide-to-customizing-your-tmux-conf/
* https://builtin.com/articles/tmux-config

Check them out!
