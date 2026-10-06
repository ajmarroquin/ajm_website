<%*
// Names the note, files it in projects/, and gives it a stable URL slug.
// Works from "Create new note from template" (Alt+N) or from a new note made inside projects/.
const folder = "projects";
let name = tp.file.title;
if (name.startsWith("Untitled")) name = (await tp.system.prompt("Project name")) || name;
const slug = name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
if (tp.file.folder(true) !== folder || tp.file.title !== name) await tp.file.move(`${folder}/${name}`);
-%>
---
title: <% JSON.stringify(name) %>
slug: <% slug %>
draft: true
status: active
started: <% tp.date.now("YYYY-MM") %>
url: 
repo: 
summary: 
tags: []
---
<!-- status: idea, active, shipped, paused or archived -->

## Why

<% tp.file.cursor() %>

## How it works

## Where it's at
