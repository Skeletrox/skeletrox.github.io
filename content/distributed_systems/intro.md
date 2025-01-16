+++
date = '2025-01-15T21:41:59-08:00'
draft = false
title = 'Intro'
+++


I decided to start writing about a field I am pretty passionate about. I have
always liked building autonomous, distributed machines that could do a lot of
the grunt work that goes into our life. This means having multiple processes
be able to interact with each other, handle race conditions, failures, leader
election and byzantine generals, as well as the myriad of possibilities and
theories that arise here.

## Why?

I realized that the easiest way to learn is to teach. I never knew about the IPC
commands in my work until I had to teach an intern. I never knew a lot of things
until I had to get my hands dirty. So, as a way to motivate me to learn, and to
motivate me to write, I decided to begin this series of posts.

## What is General Tech then?

General tech is something I want to keep for more, well, general tech posts.
These won't be focused on a specific topic, but would instead be standalone
articles in their own right. I might categorize them in the future too, but as
of now, I do not have any plans to do so.

CS Theory? Another config post? The possibilities are endless!

## How are you going to go about it?

I want to go from simple to complex, essentially starting with:

> What does a distributed system entail?

To:

> Given I have context A about distributed systems, what next?

To:

> Given I know context A, how do I implement solutions for it?

I've also made it a point to start learning Rust. And for that, I kept looking
for a way to implement my learnings. I first decided to create a simple DB with
rust, making all components as independent from each other as possible, but
that seemed to go nowhere.

Instead, I shall try to create a simple story for how my distributed system is
going to work, gradually adding complexity as and when I see fit. You know,
scope creep and all.
