---
title: Pack 662 Website
slug: pack662nyc
draft: true
status: shipped
started: "2026-09"
url: https://pack662nyc.com
repo: https://github.com/ajmarroquin/pack662nyc
summary: The public website for Cub Scout Pack 662 in New York City.
tags: [scouting, astro, community, privacy]
---
<!-- From the repo README, October 2026. You named nyc-swu and the Black Pug scraper; this is your other public repo. Delete this note if you'd rather leave it off. -->

## Why

<!-- TODO(AJ) -->

Ties into [[Scouting]].

## How it works

Astro and plain CSS, statically generated with no client-side JavaScript, deployed on Vercel.

The repo is public, so it's built around one hard rule: no roster data, ever. That means no family lists, phone numbers or addresses, in any format, not even temporarily, because a public repo's history outlives deleting a file. `.gitignore` blocks the common data file types, and a CI check fails the build if one gets committed anyway.

## Where it's at

Launched.
