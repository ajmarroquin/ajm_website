<%*
// Names the note, files it in posts/, and gives it a stable URL slug.
// Works from "Create new note from template" (Alt+N) or from a new note made inside posts/.
const folder = "posts";
let name = tp.file.title;
if (name.startsWith("Untitled")) name = (await tp.system.prompt("Post title")) || name;
const slug = name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
if (tp.file.folder(true) !== folder || tp.file.title !== name) await tp.file.move(`${folder}/${name}`);
-%>
---
title: <% JSON.stringify(name) %>
slug: <% slug %>
draft: true
date: <% tp.date.now("YYYY-MM-DD") %>
summary: 
tags: []
---
<% tp.file.cursor() %>
