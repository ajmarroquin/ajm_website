<%*
// Names the note, files it in work/, and gives it a stable URL slug.
// Works from "Create new note from template" (Alt+N) or from a new note made inside work/.
const folder = "work";
let name = tp.file.title;
if (name.startsWith("Untitled")) name = (await tp.system.prompt("Role name, e.g. 'Product Owner, AVMS Platform'")) || name;
const slug = name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const org = (await tp.system.prompt("Company / org")) || "";
if (tp.file.folder(true) !== folder || tp.file.title !== name) await tp.file.move(`${folder}/${name}`);
-%>
---
title: <% JSON.stringify(name) %>
slug: <% slug %>
draft: true
org: <% JSON.stringify(org) %>
start: <% tp.date.now("YYYY-MM") %>
end: 
summary: 
tags: []
---
<!-- Write for a hiring manager skimming for 30 seconds: the problem, what you did, what changed. -->

## The job

<% tp.file.cursor() %>

## What I got done

- 

## What I learned
