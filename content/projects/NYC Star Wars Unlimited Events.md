---
title: NYC Star Wars Unlimited Events
slug: nyc-swu
draft: false
status: active
started: "2026-04"
url: https://ajmarroquin.github.io/nyc-swu/
repo: https://github.com/ajmarroquin/nyc-swu
summary: A single-page community hub for Star Wars Unlimited weekly events and tournaments in New York City.
tags: [star-wars-unlimited, community, nyc, github-pages]
---

## Why

As a new trading card gamer, it was very scary to go to my first weekly. I didn't know what to expect, I didn't know if my deck would work or if my cards were legal. The only way in was through a Discord community and taking a big leap. This site was developed to collect all of the weeklies, clearly communicate to new players about the NYC SWU community. 

## How it works

One static page on GitHub Pages, fed by two JSON files. Updating the schedule doesn't require touching the page itself:

- **Weeklies:** recurring store nights with day, time, fee and a map link. They handle bi-weekly events, plus one-off overrides and cancellations for a specific date, which show up in "Happening Today."
- **Events:** the bigger one-offs (prereleases, Planetary Qualifiers, Sectors, Regionals, Galactic), color-coded by tier, with format, dates and registration links.

Anyone can contribute: fork, edit the JSON, open a pull request. `main` is protected, so every change goes through review.

## Where it's at

Live, and tracking 7 stores' weekly nights and 16 bigger events as of the fall 2026 update. Future goal of adding a Discord bot that allows local tournament organizers to add directly from Discord.

See also [[Trading Card Games]].
