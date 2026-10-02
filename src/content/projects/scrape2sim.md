---
title: Scrape2Sim
description: Turns public robot-component product pages into an evidence-backed 3D assembly and a reproducible MuJoCo physics simulation.
order: 3
links:
  github: https://github.com/icyzh/lumi
images:
  - /assets/works/scrape-2-sim/scrape-2-sim.webp
stack:
  - Python
  - FastAPI
  - MuJoCo
  - Next.js
  - TypeScript
  - React Three Fiber
  - Bright Data
  - OpenAI
domains:
  - AI/ML
  - Development
contributors:
  - Team Byte
---

## Overview

Scrape2Sim turns public robot-component product pages into an evidence-backed 3D assembly and, when the required physics data exists, a reproducible MuJoCo run. Paste a growing list of product URLs and it builds a parts library, arranges the parts into a robot, and plays the simulated trajectory back in the browser.

## Challenge

Product pages are inconsistent, and simulation needs trustworthy numbers. The team had to keep scraped evidence separate from guesses, stop an AI from inventing parts or physics values, and still stay useful when one URL fails or a spec is missing.

## Approach

Bright Data Scraper Studio collects structured product records into a local parts library. GPT proposes a topology from the selected catalog parts, a human confirms it, and a compatibility gate validates it before it is compiled to MJCF. MuJoCo is the authority for physics. Missing simulation inputs appear as visibly labelled estimates, never as source evidence. A FastAPI backend and a Next.js and React Three Fiber frontend handle the API and 3D playback. Drone, rover and humanoid families have deterministic MuJoCo adapters, and other projects stay editable assemblies with compatibility findings instead of fake simulation. Reference ESP32 firmware adds a guarded hardware link.

## Outcome

Scrape2Sim goes from product URLs to an inspectable, simulated build, with every part traceable to its source page.
