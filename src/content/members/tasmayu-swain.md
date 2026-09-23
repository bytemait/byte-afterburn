---
name: "Tasmayu Swain"
role: "Member"
group: "aiml"
status: "department"
order: 0

publications:
  - title: DEEPSEEKV3 ARCHITECTURE FROM SCRATCH
    venue: Blog
    url: https://tasmayu1.substack.com/p/deepseekv3-architecture-from-scratch
portfolio: "https://tasmayu.vercel.app"

contributions:
  - title: How Far Does Generalized Symmetry Alignment Reach? Reproducing and Extending Linear Mode Connectivity for Transformers
    description: |-
      Understanding whether independently trained neural networks occupy a shared loss basin,
      rather than isolated ones, matters for how models can be merged, ensembled, and reused
      without retraining from scratch. We conduct a reproducibility study of Generalized Linear
      Mode Connectivity for Transformers (Theus et al., 2025), validating its central claim that
      independently trained Vision Transformers and GPT-2 models can be joined by low or zero
      barrier linear interpolation paths once alignment is performed under a broadened set of
      parameter symmetries, namely permutations, semi-permutations, orthogonal transformations,
      and general invertible maps, rather than permutations alone. Using independently trained
      base models and a from-scratch re-implementation of the paper’s alignment strategies, we
      confirm that full learned matching reaches the zero barrier floor in every vision setting we
      test and remains the strongest evaluated method in language, recovering the original study’s
      method hierarchy throughout. Beyond replication, we test how far this central claim extends
      by probing four assumptions it rests on in turn, the data distribution the endpoints are
      trained on, the architecture of the endpoints themselves, the alignment objective used to
      connect them, and the training regime each endpoint was produced under. Concretely we
      evaluate the method ordering on vision datasets and a code domain the original suite does not
      cover, on endpoints of differing depth by merging a 6-block and a 12-block model rather than
      only differing width, under a closed form regularized variant of the weight matching objective
      costing no additional data or optimization motivated by a gap analysis we also reproduce,
      and across endpoints trained under different objectives by pairing a standard-trained model
      with an adversarially trained one. Taken together these four questions ask not only whether
      the original claim holds but where it stops holding, and our results confirm the robustness of
      the original findings across most of these settings while also surfacing a clear boundary case
      in architecture and several open questions for future work on symmetry based alignment.
linkedin: "https://www.linkedin.com/in/tasmayu-swain-27b886312/"
github: "https://github.com/TASMAYU"
twitter: "https://twitter.com/tasmayu"
---

