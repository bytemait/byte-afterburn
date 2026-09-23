---
name: "Parth Garg"
role: "Member"
group: "development"
status: "department"
order: 7
photo: "/team_pics/members/parth_garg.jpg"

career:
  - org: PanScience Innovations LLP
    title: LLM Intern
    period: January 2026 – April 2026
portfolio: "https://www.parthgarg.me"
quote: "Figuring things out"

contributions:
  - title: Voltra - LT Fault Detector
    description: |-
      Smart grid monitoring system using basic ML classification (on SCADA data) to predict LT line faults in real-time
      with 85% accuracy
      • Dual-interface system with admin dashboard, Gemini-powered AI chatbot, and multi-channel alerts (Twilio SMS,
      Nodemailer); reduced fault response time by 60%
      • Applied data analysis techniques on SCADA time-series data for feature engineering and fault pattern identification
      • Built RESTful APIs with Express.js and Flask; designed modular backend for seamless integration of ML inference
      and alert dispatch services
    url: https://github.com/Piyush0000/lt_fault_detection
  - title: Zero Devops
    description: |-
      Zero-DevOps removes the DevOps layer entirely. You connect a
       GitHub App, pick a repository, and the platform handles the
       rest — from immutable, reproducible builds to artifact
       storage.

       The system is built on four deliberate architectural bets:

       - Builds are immutable, not moving targets. Every build is
         keyed to an exact commit SHA resolved at trigger time — the
         worker never builds a shifting branch tip, so every run is
         reproducible and queryable.
       - The queue is the boundary. A Go API server only validates
         and persists; a separate Go worker consumes jobs via
         RabbitMQ. Neither side knows about the other's internals,
         so each can scale, fail, and evolve independently.
       - Contracts are versioned files, not conventions. The
         deploy.jobs V1 message is a JSON Schema both services
         compile against, with conformance tests enforcing the
         contract.
       - Detection replaces configuration. The worker auto-detects
         the framework and package manager and renders a Dockerfile
         from templates — you only ship your own Dockerfile if you
         want to.

       The result: a developer connects a repo, triggers a build,
       and gets a container image artifact in Cloudflare R2 — with
       zero DevOps work in between.

      This is still under development
    url: https://github.com/Parth06102006/Zero-Devops

awards:
  - title: PSI Internal Hackathon
    date: November 2025
    detail: 20000 · 1st
linkedin: "https://www.linkedin.com/in/parth-garg-1761a531b"
github: "https://github.com/Parth06102006"
twitter: "https://twitter.com/ParthGarg2006"
---

