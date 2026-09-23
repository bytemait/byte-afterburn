---
title: Scrape2Sim
description: Explores how collected data can be cleaned, interpreted, and turned into inputs for useful simulation workflows.
order: 3
links:
  github: https://github.com/bytemait
images:
  - /assets/works/scrape-2-sim/scrape-2-sim.jpeg
stack:
  - Python
  - TensorFlow
  - Scrapy
domains:
  - AI/ML
  - Development
contributors:
  - Team Byte
---

## Overview

Scrape2Sim explores an end-to-end workflow for turning web-collected data into useful simulation inputs. It connects collection, cleaning, interpretation, and modelling so that a raw external dataset can become something structured enough to inspect and experiment with.

## Challenge

Data collected from the web is rarely ready for modelling. The team needed to account for inconsistent inputs, make the assumptions in the pipeline visible, and ensure that the simulation remained connected to the quality of the data feeding it.

## Approach

Using Python, Scrapy, and TensorFlow, the project treats collection, processing, and simulation as connected stages. Each stage is designed to make weak inputs easier to spot and correct before they distort the resulting model or experiment.

## Outcome

Scrape2Sim provides a practical base for experiments at the intersection of web data, machine learning, and simulation. Its emphasis on traceable stages makes it easier to refine the system as better data and modelling ideas emerge.
