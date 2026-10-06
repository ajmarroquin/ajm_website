<%*
// Names the note, files it in people/, and gives it a stable URL slug.
// Works from "Create new note from template" (Alt+N) or from a new note made inside people/.
const folder = "people";
let name = tp.file.title;
if (name.startsWith("Untitled")) name = (await tp.system.prompt("Mentee note name. Use their real name only if they have agreed to be on the site; otherwise a label like 'Support engineer, 2023'.")) || name;
const slug = name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const roles = app.vault.getMarkdownFiles().filter((f) => f.path.startsWith("work/") && f.name !== "README.md").map((f) => f.basename);
const role = roles.length ? await tp.system.suggester(roles, roles, false, "Which role were you in when you mentored them?") : null;
if (tp.file.folder(true) !== folder || tp.file.title !== name) await tp.file.move(`${folder}/${name}`);
-%>
---
title: <% JSON.stringify(name) %>
slug: <% slug %>
draft: true
consent: false
summary: 
role_then: 
role_now: 
mentored_during: <% role ? `"[[${role}]]"` : "" %>
how: 
outcomes: []
links: []
tags:
  - mentoring
---
<!-- Nothing here is published until draft is false AND consent is true. -->
<!-- The repo is public: even unpublished notes are readable on GitHub, so only use a real name in the title once they've said yes. -->

## Where they started

<% tp.file.cursor() %>

## How I helped

## What they've done since
