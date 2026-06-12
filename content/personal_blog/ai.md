+++
date = '2026-06-11T22:07:04-07:00'
draft = false
title = 'AI'
+++


# AI

Yep, time for me to write another blog post about AI. I've written stuff on
threads and bluesky about this, but I don't think there is any way I can elucidate
my thoughts on the topic in a medium best suited for quick conversations. Anyway, here
goes a mostly AI-less stream of thoughts that totally elucidates how I feel about
the whole thing.

## What I use AI for

Honestly, as a developer, AI is that over-enthusiastic intern who got their hands on a
textbook of software paradigms, and in a caffeine-induced frenzy, decided to memorize the
whole thing. I see that every time I ask it to do something for me, it goes on this
amazing trajectory and makes changes I would have never thought of, only for me to look
at it later and realize it makes no sense and it might have been easier for me to simply
look at the code and do it all by myself. For the non-hard skills that are important in a
job though, AI can help augment your strengths and make your life a whole lot easier.

When I write interview or promotion feedback, all I do is jot down my points, feed them to
an AI, review the corpotalk that is spewed out, and write that. Interview feedback is
supposed to be anonymous anyway, so why give it that personality that defines you?

I also use it as a research / generation monkey. Think "tmux themes" or "config files" that
I don't want to spend an hour researching and understanding before wrongly building `.yaml`
or `.toml` files (Setting up `neovim`, anyone?). It does a honestly good job at this. At the
very least, it creates a foundation I can work on, which allows me to still use my brain a bit.

That last part is what I will talk about later in this article.


## What I want to use AI for

Since my childhood (or teens rather), I have always thought of AI as an augmentation of
human ability. Think Cortana or 343 Guilty Spark, to a certain extent. The goal of AI is to
assist humans (or forerunners in the context of Guilty Spark) by abstracting out complex tasks
while enabling humans to focus on doing human-like things (you know, fighting the Covenant). And
as far as I am concerned - operations, busywork, organizational bureaucracy, and anything related
to these are as far from fighting the covenant as possible. This becomes doubly so when you're
paged at 1AM for an issue that needs you to groggily parse hundreds of lines of logs before you can
even understand the domain the problem is in, or there's a support engineer acting like a presuure
conduit from the customer to you.

My ideal workflow is as follows: I get a pull request for review. An AI assistant looks at it, provides
a summary of what the commit message expects the PR to do, and what the code does. It checks code
quality, testing breadth, and basic linting stuff. I then take a look at the PR and comments in an
interactive mode, go back and forth with the AI to understand the wider context, and then comment on,
or approve the PR. The task of style correctness, naming, and low-hanging fruit is abstracted out
to the AI which probably runs while I am stuck on US 101 driving in to work.

Similarly, if I were to get paged for an issue in an ungodly hour, the AI does some initial triage, gets
the log files that are pertinent to the issue, comes up with a quick summary and possible steps forward
that I can use in a few minutes once I am just awake enough to handle the issue and (hopefully) go back
to sleep.

This might contrast with my claim of wanting to use my brain, but anyone who knows me knows that being
in a state where you gotta use your brains in an operations context is a red flag. Heroism should _not_
be expected at 2:45 AM. You shouldn't have to summon your inner Sherlock to triage (non-)issues.

I want AI to eliminate bureaucracy and drudgery for common folk. Help with governance. Increase transparency
and help with sifting through mountains of documentation and rules and what not. Improve society by making
things straightforward and comprehensible for the common person, while having the inherent intelligence to
recognize outliers in the data and help make decisions.

I want Cortana from Halo CE (or Halo 2) - witty, useful, and a supplement to human intelligence. I want
expert models that know when they're out of their depth. I don't want an AI that is equipped for
Shakespeare writing rust code.

## What is actually happening

Three of the last four interviews I took had candidates (badly) using AI. Like legit bad. Imagine seeing
someone blaze through implementing a question you asked them, only to see them fall flat on their face
when you ask them to walk you through their solution. Imagine seeing disco lights casted on someone's face
when they switch between tabs.

Being an interviewer is hard enough. Knowing where a candidate's answer is heading (or where they lost
the plot) is demanding in itself. Now having to see if the candidate offloaded their thinking to an LLM
that is hallucinating like Cortana in Halo 4 is a whole new level of hell. I only wonder what fresh hell
I'll have to endure when a candidate starts confidently serving slop in a system design interview. I might
want to start asking them to design an intentionally crappy system. _"Design a distributed database that
provides different results based on user latency, and no two operations are guaranteed to have the
same result"_.

Then you have this case where so much of slop is generated by means of a PR that if you're (un)fortunate
enough to be in a position to review them (as I am), you begin to wonder if you should just offload
the entire review to an AI. It's a vicious cycle. (I'm not even kidding, I've had this exact thought) This
leads to an interesting dichotomy - you have a sea of slop that requires deep context to understand, and
you have the issue of brain atrophy because when you offload a section of thinking to an AI,
getting into manual mode is really hard, which is inevitable when the AI messes up reading a large code base. 
Somehow, I swim through the slop (The final scene from Shawshank Redemption comes to mind) and finally I get
a ticket assigned to me (or worse - a page).

I see the ticket and I see a basic summary of the issue from the AI, which routed it somewhere. Then I see
a problem that is all-too-familiar. Tickets are treated like Victorian-era orphans - they're just
shunted around, never really getting the attention they need, until they're finally handed off to the one
person who is vaguely related to the issue at hand. Do they have the context? It does not matter. What I
am seeing is an increasingly AI-native foster workflow. The main AI routes it to a team. The team's AI
looks at it, and summarizes it. Then it decides if it is indeed the correct team. If not, it routes it
to another team's AI. Rinse and repeat.

## Then When I Get Home

Unfortunately, as a person who grew up in the 2000s, my formative teenage years were spent with the truth
that social media is a tool for post-school hangouts with your friends. Share holiday homework answers,
shitpost about the cringiest thing the strictest teachers did, and show off your (arguably bad) taste in
music. It was a tool for fun. The worst thing you could arguably do was send a farmville request to your
crush, and get rejected.

Now I open LinkedIn and see a sea of people peddling courses on "AI native life" and how your descendants
will curse at your name if you don't beg and grovel to be included in their self-aggrandizing influencer
programs. I open Instagram and see people with zero philosophical and poitical acumen discussing geopolitics
with the same authority as someone who's actually read a book. I open X and... I am sorry. My brain short-
circuited from the sheer amount of absolute horseshit I saw. And the worst part is - you know most of these
are bots and LLMs perpetuating the dead internet theory. The ones that are human, have offloaded their
opinions to one. And even though you know all of this, the engagement is still there. The likes and retweets
are still there. The comments are still there. And some of them are from actual humans. You end up believing it
for a while. And that is the scariest part.

I get a notification for an article. It is from the digital version of a newspaper I used to read in my childhood.
I open it. It quotes someone (or something) from reddit. It then makes a reference to a tweet from someone with
less than stellar intentions. I wonder how much of the article is a hallucination. I wonder how much of the article
came from the minds of a human. I know it is not enough. I know that many people don't. The notification for the
article is from reddit. Reddit reminding me of an article from a newspaper quoting someone from twitter who mis-read
something from reddit, who in turn has a generic username and no other posts. This post now has 20k upvotes
and comments from accounts (I didn't use the word people because I could not be sure) who pile on to the comment.

One of them is a racist, misinformed dogwhistle. I want to argue. I don't have the energy. So I scroll past. Rinse
and repeat.

I get a Whatsapp message in one of the million family groups I am in. It is election season in a state none of us
are in, were in, or are remotely associated with in any way. The message is slop. It is slop meant to elicit a
reaction. It is slop shared by people I sought blessings from during my wedding. And it tells me that I am wrong
for not believing in things I don't believe in. The group is muted anyway, but the message is in cyberspace.

There are many AI tools out there now. Our relationship with them is like our relationship with astrologers. I
recall a particular astrologer being preferred by our family because he always gave positive predictions. The
position of the planets did not change between astrologers, but the way they spoke to us did. And that is the same
thing with these tools. We switch not because of competence, but because of sycophancy. And that gives the AI a 
twisted reward function that rewards it for telling you what it believes you want to hear.

I wanted AI that would play Civilization better. Not one that was an existential threat to it. I play Civilization
again. The game's AI still does not know that Petra is the OP desert wonder.

## The Duality

I remember a line from Frank Herbert's Dune - "Once men turned their thinking over to machines in the
hope that this would set them free. But that only permitted other men with machines to enslave them." When
I first read Dune in a flight from BLR to SFO, a week after I had tasked ChatGPT with writing an intro email
for my father, I thought it was a cool line. I am not sure if it will age well given how I feel now.

Yet here I am, using AI to help me draft a blog post about it. I did my best to ensure I didn't take too much
help from it, but then again, I am writing this on a laptop, not with a quill and ink on parchment paper. 
Where do we draw the line? (The previous line was drafted by Gemini, and I liked it so I kept it). Do I use AI
to help me structure my thoughts? Or do I ask it to think them? Isn't structuring them thinking in itself?

Don't get me wrong. I am extremely excited about AI. But I feel like it has been hijacked by the exact folks who
would have laughed at you (and maybe beaten you up) for suggesting it twenty years ago. When I wrote my LinkedIn
intro eight years ago, I mentioned my interest in AI. For me, it was about deep learning, markov models, LSTMs,
and the prospect of sitting down and writing activation functions for my use cases. Not "ask claude", or "replace
me with AI while you have no idea what you're talking about".

All I know is that The Pandora's Box has been opened. AI is here to stay. How it stays, and how it shapes society,
is up to us. Absolute power corrupts absolutely. And absolute AI enables absolute power. But the knowledge of
absolute power, leads to absolute caution. And that might save us after all.

## Parting Thoughts

The doom that AI presents is good because it forces us to acknowledge that it exists. The sunshine it promises
is also good because it gives us hope that we can do better. All that matters is who has the upper hand in using it.
Is it Arasaka, Militech, or us? Does order stem from chaos, as happens when everyone has power, or does it stem from
control, as happens when only a select few have it? Whom would you trust with such power? Would the person you are
trusting with the power trust their spiritual clone with the same power?

All I know is, we are woefully unequipped for a second brain. Using it to play Civilization is a good start. Unleashing
it upon civilization as it stands right now, however, might not be.

