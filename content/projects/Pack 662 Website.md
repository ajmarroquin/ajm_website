---
title: Pack 662 Website
slug: pack662nyc
draft: false
status: shipped
started: "2026-09"
url: https://pack662nyc.com
repo: https://github.com/ajmarroquin/pack662nyc
summary: The public website for Cub Scout Pack 662 in New York City.
tags: [scouting, astro, community, privacy]
---

## Why

As a Cub Scout unit, Pack 662 had no web presence. Parents didn't have a place to find documents and links, and prospects had nowhere to see how we ran. This was something we had discussed for many years but no one was willing to take the time to do it. After AI had advanced so far in 2026, I realized that what previously stopped us, time & effort, wasn't really the thing in the way anymore. A couple hours of some Sunday morning coffee time with Claude and we had a site. 

Related: my role as [[Cubmaster]].

## How it works

Astro and plain CSS, statically generated with no client-side JavaScript, deployed on Vercel.

The repo is public, so it's built around one hard rule: no roster data, ever. That means no family lists, phone numbers or addresses, in any format. `.gitignore` blocks the common data file types, and a CI check fails the build if one gets committed anyway.

## Where it's at

Live and in use.
