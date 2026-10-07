---
title: NYC Star Wars Unlimited Events
slug: nyc-swu
draft: true
status: active
started: "2026-04"
url: https://ajmarroquin.github.io/nyc-swu/
repo: https://github.com/ajmarroquin/nyc-swu
summary: A single-page community hub for Star Wars Unlimited weekly events and tournaments in New York City.
tags: [star-wars-unlimited, community, nyc, github-pages]
---
<!-- From the repo README and data, October 2026. -->

## Why

<!-- TODO(AJ): why you built it, and who uses it. -->

## How it works

One static page on GitHub Pages, fed by two JSON files. Updating the schedule never means touching the page itself:

- **Weeklies:** recurring store nights with day, time, fee and a map link. They handle bi-weekly events, plus one-off overrides and cancellations for a specific date, which show up in "Happening Today."
- **Events:** the bigger one-offs (prereleases, Planetary Qualifiers, Sectors, Regionals, Galactic), color-coded by tier, with format, dates and registration links.

Anyone can contribute: fork, edit the JSON, open a pull request. `main` is protected, so every change goes through review.

## Where it's at

Live, and tracking 7 stores' weekly nights and 16 bigger events as of the fall 2026 update.

See also [[Trading Card Games]].
