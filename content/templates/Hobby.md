<%*
// Names the note, files it in hobbies/, and gives it a stable URL slug.
// Works from "Create new note from template" (Alt+N) or from a new note made inside hobbies/.
const folder = "hobbies";
let name = tp.file.title;
if (name.startsWith("Untitled")) name = (await tp.system.prompt("Hobby")) || name;
const slug = name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
if (tp.file.folder(true) !== folder || tp.file.title !== name) await tp.file.move(`${folder}/${name}`);
-%>
---
title: <% JSON.stringify(name) %>
slug: <% slug %>
draft: true
since: 
summary: 
tags: []
---
<% tp.file.cursor() %>
