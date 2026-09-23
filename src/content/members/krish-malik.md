---
name: "Krish Malik"
short: "KM"
role: "General Secretary"
group: "leadership"
status: "core"
order: 4
photo: "/team_pics/optimized/krish_malik_alpha.webp"
quote: "Asymptote of Success never meets for me"

career:
  - org: iXchange
    title: ML Intern
    period: September 2025 – December 2025
  - org: Google Summer of Code 2025 — ML4Sci / Symba Lab
    title: Contributor
    period: May 2025 – Sep 2025
  - org: Research Collaboration — University of Alabama / ML4Sci
    title: Research Intern
    period: Jan 2026 – Apr 2026
  - org: Lexsi Labs (Remote, Paris Team)
    title: AI Research Intern
    period: April 2026 – May 2026
  - org: Google Summer of Code 2026 — ML4Sci / CERN E2E CMS
    title: Contributor
    period: May 2026 – Sep 2026
portfolio: "https://www.linkedin.com/in/krish-malik-0933822b3/"

contributions:
  - title: DepthVit - Parameter Efficient ViTs for Physics based image datasets
    description: |-
      Standard ViTs sum across image channels at the embedding layer, an assumption that holds for RGB natural images but breaks down for calorimeter data: the ECAL and HCAL channels here are two physically separate subdetectors, at different radii, built to capture different particle types. Summing them away throws out exactly the structure that makes jet classification possible.

      DepthViT addresses this by embedding each channel independently and computing attention across channels rather than across spatial patches. The channel-wise attention mechanism is adapted from an unsupervised anomaly-detection architecture (Julson et al., Cerium Laboratories / University of Alabama / CMS HCAL Collaboration) into a fully supervised, five-class jet classifier — a substantial change in kind, not just domain. Only the depth-wise embedding and channel-attention operators are carried over from the original; the classification head, and the mechanism to recover cross-patch spatial communication (Hierarchical Attention Pooling, or HAP), are new to this project.
    url: https://github.com/ML4SCI/CMS/tree/main/E2E/E2E_DepthViT_Krish_Malik
linkedin: "https://www.linkedin.com/in/krish-malik-0933822b3/"
github: "https://github.com/krishoncloud"
---

