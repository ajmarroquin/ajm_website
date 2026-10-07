---
title: Blackpug Activity Scraper
slug: blackpug-activity-scraper
draft: true
status: shipped
started: "2025-04"
url: https://ajmarroquin.github.io/blackpug-activity-scraper/
repo: https://github.com/ajmarroquin/blackpug-activity-scraper
summary: Turns Black Pug event registrations into a clean Excel workbook for Scouting units, from a bookmark, with nothing to install.
tags: [scouting, automation, javascript, python, privacy]
---
<!-- From the repo README, October 2026. -->

## Why

Black Pug Software runs event registration for Scouting America councils. Built for Greater New York Council units, it pulls a unit's registrations into a workbook with a tab per event, so leaders can see who's booked and who started registering but never finished. That second list is for follow-up.

<!-- TODO(AJ): the backstory. What were you doing by hand before this? -->

Related: my role as [[Cubmaster]].

## How it works

It started as a Python script driving Chrome with Selenium, then became a browser bookmark so other leaders could use it without installing anything:

- Drag a button to your bookmarks bar, log in to Black Pug, pick your Pack or Troop, and click it.
- The bookmark reads your activity list and hands the rows to an export page, which builds the Excel file right in your browser.
- **Nothing gets uploaded.** The site has no server code, and its Content-Security-Policy blocks it from making any network requests at all.

Both versions do the same cleanup: group by event, filter by date (upcoming, this year, last year), drop anyone from "not booked" who also appears in "booked", and add sortable tables with totals.

The browser version has unit tests and a Playwright end-to-end test that runs against a fake Black Pug page full of made-up people.

## Where it's at

Shipped and in use. It depends on Black Pug's page layout, so a redesign on their end means an update here.
