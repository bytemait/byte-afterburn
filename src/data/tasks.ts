/**
 * Global recruitment task countdown & schedule configuration.
 * Update this timestamp and labels to change the reveal schedule across all countdowns and pages.
 */
export const TASK_CONFIG = {
  revealDateIso: '2026-09-25T15:00:00+05:30',
  revealTimestamp: new Date('2026-09-25T15:00:00+05:30').getTime(),
  revealDateFull: '25 SEP 2026 • 15:00 IST',
  revealDateShort: '25 Sep • 3:00 PM IST',
  revealDateDay: '25 Sep',
  submissionDeadline: 'Day 5 at 11:59 PM IST',
  submissionFormUrl: 'https://forms.gle',
  discordUrl: 'https://discord.gg/534RnMEuH',
  submissionOpenIso: '2026-09-29T00:01:00+05:30',
  submissionOpenTimestamp: new Date('2026-09-29T00:01:00+05:30').getTime(),
  submissionOpenFull: '29 SEP 2026 • 00:01 IST',
  submissionOpenShort: '29 Sep • 12:01 AM IST',
};

export const TASK_REVEAL_TIMESTAMP = TASK_CONFIG.revealTimestamp;
export const TASK_REVEAL_DATE_ISO = TASK_CONFIG.revealDateIso;

export interface TaskStage {
  stageNumber: string | number;
  title: string;
  subtitle?: string;
  requirements: string[];
  verificationNote?: string;
  securityNote?: string;
}

export interface TaskMission {
  name: string;
  benefit: string;
}

export interface TaskDetailSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
  code?: string;
  links?: { label: string; url?: string }[];
}

export interface TaskProblemStatement {
  id: string;
  title: string;
  level: 'Starter Track' | 'Advanced Track';
  badgeLabel?: string;
  brief: string;
  concept?: string;
  referenceUrl?: { label: string; url: string };
  stacks?: string[];
  stages?: TaskStage[];
  optionalMissions?: TaskMission[];
  submissionDeliverables?: string[];
  requirements?: string[];
  bonusTasks?: string[];
  starterKitUrl?: string;
  detailSections?: TaskDetailSection[];
  introSections?: { title: string; text: string }[];
}

export interface TaskDepartment {
  slug: string;
  department: string;
  tagline: string;
  description: string;
  image: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  submissionFormat: string;
  evaluationCriteria: string[];
  tasks: TaskProblemStatement[];
}

export interface TimelineStep {
  step: string;
  title: string;
  date: string;
  desc: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface TaskFAQItem {
  q: string;
  a: string;
}

export const taskDepartments: TaskDepartment[] = [
  {
    slug: 'app-dev',
    department: 'App Development',
    tagline: 'Build apps people actually use.',
    description:
      'Work on native and cross-platform mobile apps — from first wireframe to Play Store. Ship real products alongside a team that reviews, iterates, and cares about UX.',
    image: '/assets/tasks/app-dev.png',
    skills: ['Flutter', 'React Native', 'Expo', 'Kotlin / Swift', 'Supabase / Firebase'],
    difficulty: 'Intermediate',
    estimatedTime: '10–14 hours',
    submissionFormat: 'GitHub Repo + APK / Expo Go / TestFlight + Architecture Diagram',
    evaluationCriteria: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
    tasks: [
      {
        id: 'app-starter',
        title: 'Cross-device Personal Inbox',
        level: 'Starter Track',
        brief:
          'Build a mobile app for quickly saving useful notes, links, snippets, and images so they are easy to find again. Choose your own product name—the brief does not prescribe one. This challenge has three stages; you are not expected to complete them all. A polished, reliable Stage 1 is better than a broken Stage 3.',
        concept:
          '“I found something useful and don’t want to lose it.” Start with a dependable single-device inbox, then add private cloud sync and mobile sharing if you are ready.',
        stacks: ['Flutter', 'React Native / Expo', 'Native Android', 'Firebase / Supabase (optional)'],
        stages: [
          {
            stageNumber: 1,
            title: 'Build the local app',
            subtitle: 'A useful single-device inbox; no authentication or backend required',
            requirements: [
              'Save notes, links, and images. Each item should have an ID, type, title, content or URL, tags, created/updated dates, and archived state (or an equivalent model).',
              'Let the user create, view, open, edit, delete, archive, and restore saved items; add tags and search or filter the inbox.',
              'Persist data locally so it survives closing and reopening the app. Use an appropriate option such as SQLite, Room, Core Data, AsyncStorage, Hive, or SharedPreferences.',
              'Include an inbox/home screen and a create/edit screen. Add an item detail screen if your design needs one. Keep the UI understandable and usable; visual polish is secondary.',
              'Handle empty or unusual input reasonably. Test creating notes and links, tagging, searching, editing, archiving/restoring, and relaunching the app.',
            ],
          },
          {
            stageNumber: 2,
            title: 'Make it cross-device',
            subtitle: 'Turn the local app into a private cloud inbox',
            requirements: [
              'Add sign-up and sign-in with simple email/username and password authentication; OAuth is not required.',
              'Store items remotely with an owner ID and support create, read, edit, archive/restore, and delete. Signing in on another device or emulator must show the same account data.',
              'Enforce privacy on the backend—not just by hiding other users’ items in the UI. Changing an item ID, request, URL, route, or deep link must never expose another user’s item.',
              'With Firebase, configure Firestore Security Rules; with Supabase, configure Row Level Security; with a custom backend, check authenticated ownership on the server.',
              'Testing scenario: Account A creates private items; Account B must not be able to read, edit, or delete them, including by directly requesting an item ID.',
              'Handle backend loading, request failures, temporary loss of internet, and incorrect credentials with clear feedback and a way to retry. A sophisticated offline-first sync engine is not required.',
            ],
            securityNote: 'Privacy must be enforced by backend authorization and ownership checks. Client-side filtering alone does not satisfy this requirement.',
          },
          {
            stageNumber: 3,
            title: 'Make it feel like a real product',
            subtitle: 'Complete Share into the app, then choose at least one advanced mission',
            requirements: [
              'Core challenge — Share into the app: receive shared text and URLs through the phone’s normal Share menu. For example, sharing an article from Chrome should open your app with the URL filled in so the user can add a title or tags and save it.',
              'Handle malformed or unsupported shared content without crashing.',
              'After implementing Share into the app, choose at least one advanced mission below.',
            ],
          },
        ],
        optionalMissions: [
          {
            name: 'A — Better sync behaviour',
            benefit: 'Improve unreliable-network behaviour: retry failed saves, cache loaded items, preserve an unsaved draft during refresh, or detect remote edits. Document your conflict policy (for example, most recently updated wins, with a warning before replacing an item being edited). Perfect conflict resolution is not expected.',
          },
          {
            name: 'B — Public read-only sharing',
            benefit: 'Let an owner create a public link to one item. The link must not expose the inbox, other items, account information, or predictable internal IDs. The owner can revoke it; deleted or revoked links show an appropriate unavailable state.',
          },
          {
            name: 'C — Attachment vault',
            benefit: 'Save an image or PDF with an item. For multi-user apps, enforce file ownership through storage permissions; an obscure filename is not security.',
          },
          {
            name: 'D — Resurface an item later',
            benefit: 'Let users schedule a reminder (for example, tomorrow or in 7 days) with a local or push notification. Tapping it opens the item; handle items that have since been deleted.',
          },
          {
            name: 'E — Data ownership',
            benefit: 'Let users export their data and delete their account, including associated items and uploaded files. Briefly explain what happens to their data after account deletion.',
          },
        ],
        submissionDeliverables: [
          'Source code in a repository with a commit history that shows your work over time.',
          'A runnable build: APK, Expo build/link, TestFlight build, or another practical way to run it. If a hosted build is impractical, include clear setup instructions.',
          'A short README covering what you built, the stage reached, tech stack, how to run it, known issues, and important technical decisions.',
          'For Stage 2 or 3, briefly explain how authentication works, where data is stored, and how one user’s data is protected from another user.',
          'A simple architecture diagram. Stage 1 can be Mobile App → Local Storage; Stage 2 can be Mobile App → Authentication → Backend / Database. Extend it for Stage 3 features as needed.',
          'You may use libraries, documentation, tutorials, AI tools, Firebase, Supabase, and other tools, but be prepared to explain your code and architecture. A smaller app you understand is better than a large app you cannot explain.',
        ],
      },
    ],
  },
  {
    slug: 'web-dev',
    department: 'Web Development',
    tagline: 'Ship it. Then ship it faster.',
    description:
      'Full-stack web projects — marketing sites, dashboards, tools, APIs. We care about performance, accessibility, and code that the next person can read.',
    image: '/assets/tasks/web-dev.png',
    skills: ['React', 'Astro', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    difficulty: 'Beginner',
    estimatedTime: '6–10 hours',
    submissionFormat: 'GitHub Repo + Deployed Live Link (Vercel / Netlify / Cloudflare)',
    evaluationCriteria: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
    tasks: [
      {
        id: 'web-debugging',
        title: 'Task 1 — Debugging Stage',
        level: 'Starter Track',
        badgeLabel: 'Mandatory · All candidates',
        brief: 'You will receive a bug log: each entry describes what someone observed, not where the problem lives. Reproduce each assigned bug locally, trace the cause, fix the underlying issue, and document your reasoning.',
        requirements: [
          'Open the Canteen Chaos repository linked above and fork it into your GitHub account. Clone your fork, install dependencies, and run the app locally before changing anything; do all work and commits in your fork.',
          'For every assigned bug, reproduce it on your own machine before making changes.',
          'Trace the root cause, which may be in a different file from where the symptom appears. Fix the cause, not just the visible symptom; hiding a button is not the same as fixing a rule.',
          'In LOG.md, in your own words, document how you reproduced the bug, what was actually wrong, and what you changed and why that was the right place to fix it.',
          'Commit as you work so the history shows your debugging and progress.',
        ],
        optionalMissions: [
          {
            name: 'X-factor — Find an unreported bug',
            benefit: 'There are problems in the app that are not in the bug log. Find one, prove it, document how you noticed it, reproduce it, and explain the cause and fix in LOG.md.',
          },
          {
            name: 'X-factor — Add a regression test',
            benefit: 'Add a test, script, or check that fails before your fix and passes after it.',
          },
          {
            name: 'X-factor — Honest engineering note',
            benefit: 'Describe something you noticed but could not fix, or a fix you are unsure about. Explain the uncertainty clearly. This is more valuable than staying silent.',
          },
        ],
        detailSections: [
          {
            title: 'Submission',
            items: [
              'Submit the public URL of your forked repository, including your fixes and LOG.md with reproduction steps, root-cause analysis, and explanations for every assigned bug.',
              'Brownie-point fixes must not break anything else. A regression costs marks rather than earning a bonus.',
            ],
          },
        ],
      },
      {
        id: 'web-gym-booking',
        title: 'Task 2 — Gym Slot Booking: Build as Much as You Can',
        level: 'Advanced Track',
        badgeLabel: 'Build as much as you can',
        brief: 'A gym runs hourly sessions with twenty mats each. Members book and cancel online; staff check members in at the door. Build as much of the system as you can—full completion is not expected.',
        badgeLabel: 'Build as much as you can',
        introSections: [
          {
            title: 'Task 02 · Build',
            text: 'Gym Slot Booking — from an empty repo.',
          },
          {
            title: 'The booking flow',
            text: 'The gym runs hourly sessions, twenty mats each. You book one. Mats left, you are in and you get a code. Full, you join the waitlist and you can see your position. Somebody cancels, the next person in the queue is booked automatically — nobody refreshes anything. At the door you show the code and staff check you in.',
          },
          {
            title: 'Your decisions',
            text: 'That is the whole app. What it is built with, how the data is shaped and where the rules live are your call — deciding that is the task, so we are not telling you.\n\nTwo things to hold on to. Twenty mats means never twenty-one, and the server decides, never the browser.',
          },
          {
            title: 'Build thoughtfully',
            text: 'Half of it working beats none of it submitted. We would rather see the booking flow done properly than all five features half-wired.\n\nNo AI. You will walk us through your own code at the end.',
          },
          {
            title: 'Full specification',
            text: 'Everything else — the rules, the full spec, what counts — is in the brief.',
          },
        ],
        stacks: [],
        requirements: [],
        detailSections: [],
      },
    ],
  },
  {
    slug: 'ml-research',
    department: 'ML Research',
    tagline: 'Models that solve real problems.',
    description:
      'Data pipelines, model training, evaluation, and deployment. Work on projects where machine learning meets a genuine use case — not just a notebook.',
    image: '/assets/tasks/ml_research.jpeg',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Pandas', 'OpenCV'],
    difficulty: 'Intermediate',
    estimatedTime: '10–14 hours',
    submissionFormat: 'GitHub Repo + Jupyter Notebook + FastAPI / Streamlit Demo',
    evaluationCriteria: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
    tasks: [
      {
        id: 'ml-paper-craft',
        title: 'Paper Craft',
        level: 'Starter Track',
        brief:
          'Choose exactly one paper from the approved list, read it in full, and complete every section of the Paper Craft Reading Template in your own words. You will discuss the paper in your interview, including its claim, surprising findings, and structural choices.',
        concept:
          'The template is meant to capture your own reading. Do not use an LLM to fill it in blindly—we want to hear your understanding and reasoning.',
        requirements: [
          'Choose exactly one paper from the options below or select a published paper of your own choice.',
          'Read the selected paper in full and complete every section of the Paper Craft Reading Template in your own words.',
          'Be ready to explain the paper’s central claim, what surprised you, and why the authors made their key structural choices.',
        ],
        detailSections: [
          {
            title: 'Paper options — choose exactly one',
            items: [
              'General: An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale',
              'General: MiniLLM: On-Policy Distillation of Large Language Models',
              'General: DeepSeek-V3 Technical Report',
              'General: GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints',
              'General: Direct Preference Optimization: Your Language Model is Secretly a Reward Model',
              'RL Domain — Policy Gradient Algorithms: Trust Region Policy Optimization',
              'RL Domain — Policy Gradient Algorithms: DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
            ],
          },
        ],
      },
      {
        id: 'ml-falsification-challenge',
        title: 'The Falsification Challenge',
        level: 'Advanced Track',
        brief:
          'Act as a skeptical researcher and investigate the claim that neural networks preferentially learn simpler predictive features. Design a small, controlled study that could falsify, weaken, or qualify the claim—not simply reproduce it. The main deliverable is a rigorous experimental research proposal; running experiments is optional and earns additional credit when it meaningfully strengthens the investigation.',
        concept:
          'Ask when simplicity bias might fail, what “simple” means, and whether observed preferences come from feature simplicity, data correlations, architecture, or optimization. Conclusions should match the evidence; you are not expected to disprove the claim.',
        requirements: [
          'State a specific research question, a falsifiable hypothesis, an appropriate null hypothesis, and at least one alternative explanation.',
          'Propose an implementable experiment suite: describe the dataset or synthetic data, controlled features and variables, what changes and what stays fixed, model architecture, training procedure, and evaluation.',
          'Include controls and baselines that distinguish simplicity from competing explanations such as predictive strength or ease of optimization.',
          'Discuss multiple possible outcomes and their interpretations, plus limitations, confounders, and what the study cannot establish.',
          'Implementation is optional. If feasible, a small, carefully controlled experiment is encouraged; do not add complexity just to produce graphs.',
          'Write the proposal and any README yourself. Explain your reasoning and keep conclusions proportional to the evidence.',
        ],
        detailSections: [
          {
            title: 'Full challenge brief',
            paragraphs: [
              'The full research brief includes background and recommended literature, detailed study-design guidance, expected-outcome examples, a suggested proposal structure, and the evaluation criteria.',
            ],
            links: [
              { label: 'Read the full Falsification Challenge brief (Google Doc)', url: 'https://docs.google.com/document/d/1graf8SrI6j39DQIX5RNIR3eTS4YnliyC/edit?usp=sharing&ouid=108242014463214711938&rtpof=true&sd=true' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'applied-ml',
    department: 'Applied ML',
    tagline: 'Build systems that reason and take action.',
    description:
      'Choose either of these independent tracks. Both are optional—pick the one that fits your interests and experience.',
    image: '/assets/tasks/agentic.jpeg',
    skills: ['Python', 'LLMs', 'Open-weight models', 'Data analysis', 'Computer vision'],
    difficulty: 'Intermediate',
    estimatedTime: 'Choose your track',
    submissionFormat: 'Repository + README + track-specific outputs',
    evaluationCriteria: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
    tasks: [
      {
        id: 'agentic-basic',
        title: 'The Agentic Task [Basic]',
        level: 'Starter Track',
        brief:
          'Optional track. Build a data-analysis agent that accepts a tabular dataset and natural-language questions, then uses its own tools to analyse the data and answer accurately. We are interested in how you learn, experiment, build something that works, and explain your decisions—not a perfect product. External resources and LLMs are fine; clearly describe your own contribution.',
        concept:
          'Choose any suitable tabular dataset and demonstrate real analysis. The system should not be hard-coded for one dataset; evaluators may try their own data and questions.',
        stacks: ['Any reasonable APIs, open models, and development stack'],
        requirements: [
          'Provide at least five genuinely different tools for the agent. Five wrappers around the same operation do not count; choose tools that perform distinct, useful kinds of analysis.',
          'Show the agent using its tools to answer questions about a tabular dataset, rather than returning generic model-generated responses.',
          'Make the system work with suitable datasets beyond one hard-coded example. Be ready to demonstrate it with new data and questions.',
          'You may use APIs, open models, or any stack that makes sense. Clearly identify exactly what you used.',
        ],
        optionalMissions: [
          {
            name: 'Brownie points — Persistent memory',
            benefit: 'Add useful memory across sessions. Do not simply save every chat message or dump whole datasets into a database. Memory should retain useful facts, retrieve them when relevant, and change the agent’s future responses. For example, remember what a metric or column means, a corrected fact, a preference for weekly rather than daily summaries, or a reusable named filter. If a user says “active customers” excludes cancelled accounts, the agent should remember and apply that definition next time. Thoughtful memory can decide what is worth keeping, update stale or incorrect facts, handle conflicts, and let users inspect or control what is remembered.',
          },
        ],
        detailSections: [
          {
            title: 'What to submit',
            items: [
              'A public GitHub repository containing your code.',
              'A README with setup instructions and a short explanation of the tools you built and, if attempted, your memory design.',
              'A short demo video and/or deployed link is optional, but very much preferred.',
            ],
          },
          {
            title: 'What we will look for',
            items: [
              'Whether the agent actually analyses data.',
              'Whether the tools are genuinely different and used sensibly.',
              'If you attempt memory: whether it persists, is retrieved when relevant, and affects later work.',
              'Whether you can run and explain your implementation.',
            ],
          },
          {
            title: 'A note on generic wrappers',
            paragraphs: [
              'Please do not submit a generic Gemini wrapper. There is plenty of room for exploration and creativity, especially in persistent memory. We are looking forward to seeing what you build.',
            ],
          },
          {
            title: 'New to agents? Start here',
            paragraphs: [
              'These beginner-friendly articles can help you get familiar with agents and tools. They are starting points, not required frameworks; explore and build with the libraries, models, tools, or combinations that interest you.',
            ],
            links: [
              { label: 'What is an Agent? — Hugging Face', url: 'https://huggingface.co/blog/agents' },
              { label: 'What are Tools? — Hugging Face', url: 'https://huggingface.co/docs/smolagents/tutorials/tools' },
              { label: 'Agents — LangChain', url: 'https://python.langchain.com/docs/concepts/agents/' },
            ],
          },
        ],
      },
      {
        id: 'manga-advanced',
        title: 'The Manga Task [Advanced]',
        level: 'Advanced Track',
        brief:
          'Optional track. Build a system that reads three consecutive English manga pages, extracts the story text in reading order, and identifies who spoke each line. Keep character labels consistent across all three pages in a sequence. Real character names are not required—labels such as char1, tomato2, or tungtungsahur are fine. Labels may restart or change for the next sequence.',
        concept:
          'There are 80 labelled development sequences and 15 unlabelled test sequences. Each sequence has three consecutive pages. Use sequences.json to identify the page triplets, and keep each complete sequence together when creating your own train/validation split.',
        stacks: ['Open-weight models', 'Open-source tools', 'Your choice of pipeline'],
        requirements: [
          'Use open-weight models and open-source tools. Hosted AI inference APIs are strictly not allowed to produce training targets or test predictions.',
          'Adapt at least one learned part of your system using data: train, fine-tune, build a harness, or otherwise adapt it. An unmodified model call is a useful baseline, but not sufficient by itself.',
          'Generate test output automatically from the supplied images. Do not manually edit predictions or use answers obtained for test images.',
          'You may use one model or several, OCR plus another model, external data, or external code. Cite external sources and explain your own contribution.',
          'Panel boxes, character images, real names, text boxes, and panel assignments are not required output fields; use them internally if useful.',
        ],
        detailSections: [
          {
            title: 'What counts as story text',
            paragraphs: ['Include dialogue, internal thoughts, narration, clear spoken screams/grunts/other vocalisations, and punctuation-only speech or thought balloons such as ..., ?! or !.'],
            items: [
              'Exclude visual sound effects and their translated captions; unclear tiny breath/reaction text on the art; titles, logos, credits, page numbers, ads, watermarks, character introduction labels, editor or scanlator notes, and writing on signs, clothes, or objects.',
              'Exclude text inside letters, diaries, phone messages, news pages, or other documents and interfaces.',
              'Read pages in their intended visual order. Manga is usually right-to-left, but follow panel layout and balloon connections when they indicate otherwise.',
              'Preserve stutters, repeats, and meaningful punctuation. Do not preserve simple printed line wrapping.',
              'Assign thoughts to the thinking character. Use the exact speaker label NARRATION only for narrator text.',
            ],
          },
          {
            title: 'Required output',
            paragraphs: ['Submit one JSON object per sequence in a JSONL file: one object on each line. The first, second, and third page lists correspond to the first, second, and third images for that sequence. Keep lines within each page list in reading order; an empty list means that page has no included text.'],
            code: '{"sequence_id":"seq_001","pages":[\n  [{"speaker":"tomato1","text":"Where are you going?"},{"speaker":"tomato2","text":"Home."}],\n  [{"speaker":"tomato1","text":"Wait for me!"}],\n  []\n]}',
          },
          {
            title: 'Dataset and scoring',
            paragraphs: ['dataset/development/labels.jsonl uses the same format for the development sequences. dataset/sample_submission.jsonl contains the 15 test sequence IDs in the required format; fill its empty page lists with your predictions.'],
            code: 'python dataset/score.py --references dataset/development/labels.jsonl --predictions your_predictions.jsonl --output scores.json',
            items: [
              'The scorer accepts normal case and whitespace differences; it does not use one harsh exact-string match. Treat it as a guide, not the only thing to optimise.',
              'The main scores are text_order_score (text recovery in reading order) and balanced_joint_f1 (speaker/text recovery and identity consistency), both from 0 to 1.',
              'Character labels are checked for consistency across all three pages, but do not need to match the development annotation labels.',
              'Correctly empty pages do not boost the overall text score; invented text on an empty page loses points.',
              'speaker_accuracy_on_matched can look high when little text was recovered. Use the full set of metrics; the score is not the entire selection rubric.',
            ],
          },
          {
            title: 'What to submit',
            items: [
              'Training and experimentation code, with relevant logs or results.',
              'Inference code that generated the test JSONL.',
              'Test predictions in the required JSONL format.',
              'Trained weights/adapters, or working download links where relevant.',
              'A short README written by you: explain your approach, experiments and comparisons, what worked or failed, and what you would try next. Do not submit AI-generated slop.',
            ],
          },
          {
            title: 'How it will be evaluated',
            paragraphs: ['We will look at transcription, reading order, and speaker consistency, as well as experimentation, critical thinking, reproducibility, and your understanding of your own work.'],
          },
          {
            title: 'Beginner resources',
            paragraphs: ['These are starting points for vision-language models and fine-tuning. You are encouraged to explore other open-weight models, training methods, supporting tools, and pipeline designs.'],
            links: [
              { label: 'Introduction to Vision Language Models — Hugging Face', url: 'https://huggingface.co/blog/vlms' },
              { label: 'Fine-Tuning Vision Language Models — Hugging Face', url: 'https://huggingface.co/docs/trl/main/en/training_vlm' },
              { label: 'LoRA — Hugging Face PEFT', url: 'https://huggingface.co/docs/peft/en/conceptual_guides/lora' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'cad',
    department: 'CAD',
    tagline: 'Design it. Assemble it. Make it work.',
    description:
      'Create printable CAD models and a constrained mechanism assembly. Task 1 is required for shortlisting; Task 2 is optional bonus work.',
    image: '/assets/tasks/cad.jpeg',
    skills: ['3D CAD', '3D-printable design', 'Assembly joints / mates'],
    difficulty: 'Intermediate',
    estimatedTime: 'Task 1 required · Task 2 optional',
    submissionFormat: 'One public Google Drive folder link submitted through the website upload form',
    evaluationCriteria: [],
    tasks: [
      {
        id: 'cad-task-1',
        title: 'Task 1 — Nano + MPU6050 Enclosure with Custom Lid',
        level: 'Starter Track',
        brief:
          'Design a 3D-printable enclosure for a Nano and MPU6050, including a custom lid. This is the required CAD task for shortlisting.',
        concept:
          'Use only the official component drawings provided with the task brief. The model should be printable in principle: avoid unsupported overhangs and maintain reasonable wall thickness. You do not need to print it.',
        requirements: [
          'Include either Task1.stl or Task1.step in the Task1 folder.',
          'Include Design_rationale.docx (150–250 words) explaining the board arrangement, standoff heights, wall height, lid mechanism choice and why, and tradeoffs made to fit the envelope.',
        ],
        detailSections: [
          {
            title: 'Rationale checklist',
            items: [
              'Describe how you arranged the Nano and MPU6050 boards.',
              'Explain your standoff heights and enclosure wall height.',
              'Describe the lid mechanism you chose and why.',
              'Discuss tradeoffs made to fit the required envelope.',
            ],
          },
        ],
      },
      {
        id: 'cad-task-2',
        title: 'Task 2 — Slider-Crank Mechanism',
        level: 'Advanced Track',
        brief:
          'Model a slider-crank mechanism as a constrained assembly and demonstrate that it moves through its full range without interference or binding. This task is optional and adds bonus weight.',
        concept:
          'Task 2 is not required for shortlisting. If you attempt it, preserve the assembly joints/mates in your STEP export so the mechanism constraints remain available for evaluation.',
        requirements: [
          'Include Task2.step with joints/mates preserved. STEP is strongly preferred over STL because it retains the mechanism constraints.',
          'Include a short Demo.mp4 or Demo.gif showing movement at crank angles 0°, 90°, 180°, and 270°, with no interference or binding.',
          'If video/GIF is not possible, include labeled screenshots named Demo_0deg.png, Demo_90deg.png, Demo_180deg.png, and Demo_270deg.png.',
          'Include Design_rationale.docx (150–250 words) explaining your crank radius and rod length choices, how you defined the joints, and what interference issues you checked.',
        ],
        detailSections: [
          {
            title: 'Rationale checklist',
            items: [
              'Explain your crank radius and connecting-rod length choices.',
              'Describe how the joints/mates were defined.',
              'Explain how you checked for interference throughout the range of motion.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'electronics',
    department: 'Electronics',
    tagline: 'Sense, respond, and build reliable circuits.',
    description:
      'Three hands-on electronics tasks: a required sensor-voting challenge, a second core task, and an optional KiCad bonus.',
    image: '/assets/tasks/electronics.jpeg',
    skills: ['Arduino', 'Wokwi', 'KiCad', 'Sensors'],
    difficulty: 'Intermediate',
    estimatedTime: 'Tasks 1–2 core · Task 3 bonus',
    submissionFormat: 'One Electronics-only Google Drive folder link submitted through the website upload form',
    evaluationCriteria: [],
    tasks: [
      {
        id: 'electronics-task-1',
        title: 'Task 1 — Redundant Sensor Voting',
        level: 'Starter Track',
        badgeLabel: 'Required · All years',
        brief: 'Build an Arduino system that reads two potentiometers as redundant sensors and decides the output position reliably, including when the readings disagree or reach a boundary.',
        concept: 'Electronics Task 1 is mandatory for shortlisting. You may use Wokwi; its Automation Scenarios can drive both potentiometers programmatically for testing.',
        stacks: ['Arduino', 'Wokwi (public / unlisted link)', 'Code.txt'],
        requirements: [
          'Submit a public/unlisted Wokwi project URL in Link.txt containing only the raw URL. If using physical hardware, submit Demo.mp4 instead.',
          'Submit the complete Arduino sketch as plain text in a file named Code.txt (not .ino).',
          'Include Design_rationale.docx, 150–250 words, explaining your threshold value and why, how “hold last position” works, and how you prevent flicker at the boundary.',
        ],
        detailSections: [
          {
            title: 'Rationale should explain',
            items: ['Your disagreement threshold and why you chose it.', 'How the system holds the last valid position when readings disagree.', 'How you prevent rapid switching/flicker near the decision boundary.'],
          },
        ],
      },
      {
        id: 'electronics-task-2',
        title: 'Task 2 — Simon Says with Heartbeat',
        level: 'Advanced Track',
        badgeLabel: 'Required · Second year',
        brief: 'Build a Simon Says game with a heartbeat LED. Make the game’s speed increase with a clear ramp, while keeping the heartbeat indicator independent of game state.',
        concept: 'Task 2 carries additional weight. Under the year-based criteria, second-years must attempt it in addition to Task 1.',
        stacks: ['Arduino', 'Wokwi (public / unlisted link)', 'Code.txt'],
        requirements: [
          'Submit a public/unlisted Wokwi URL in Link.txt containing only the raw URL. If using physical hardware, submit Demo.mp4 instead.',
          'Submit the complete Arduino sketch as plain text in a file named Code.txt (not .ino).',
          'Include Design_rationale.docx, 150–250 words, explaining your speed-ramp formula and how the heartbeat LED remains independent of game state.',
        ],
        detailSections: [
          {
            title: 'Rationale should explain',
            items: ['Your speed-ramp formula and how it changes the game over time.', 'How the heartbeat LED timing remains independent from the game logic/state.'],
          },
        ],
      },
      {
        id: 'electronics-task-3',
        title: 'Task 3 — MPU6050 KiCad Schematic',
        level: 'Advanced Track',
        badgeLabel: 'X-factor · Optional',
        brief: 'Create an MPU6050 KiCad schematic. PCB layout may be included if attempted. This is an optional bonus-on-bonus task and is not required for shortlisting.',
        concept: 'The submitted archive must be produced using KiCad’s own “Archive Project” (or equivalent zip-project) function. Do not manually zip a folder: KiCad’s built-in archive preserves file references so the project opens without path errors.',
        stacks: ['KiCad', 'Native project archive'],
        requirements: [
          'If attempted, include a Task3/ folder containing MPU6050.zip, generated by KiCad’s native project-archive function, and Design_rationale.docx.',
          'Include any PCB layout in the same native project archive.',
          'Write a 200–350 word rationale covering your decoupling and pull-up value choices and why you tied AD0 the way you did.',
          'Omit the entire Task3/ folder if you did not attempt this bonus.',
        ],
        detailSections: [
          {
            title: 'Rationale should explain',
            items: ['Why you selected your decoupling and pull-up values.', 'How you connected AD0 and the reasoning behind that choice.', 'Any relevant schematic or PCB design tradeoffs.'],
          },
        ],
      },
    ],
  },
  {
    slug: 'ros',
    department: 'ROS',
    tagline: 'Robot Operating System',
    description:
      'Build and demonstrate an autonomous TurtleBot patrol with obstacle avoidance and an emergency-stop service.',
    image: '/assets/tasks/mechatronics.png',
    skills: ['ROS', 'TurtleBot', 'Obstacle avoidance', 'Services'],
    difficulty: 'Advanced',
    estimatedTime: 'One mandatory task',
    submissionFormat: 'One separate ROS-only Google Drive folder link submitted through the website upload form',
    evaluationCriteria: [],
    tasks: [
      {
        id: 'ros-turtlebot-patrol',
        title: 'Task 1 — Autonomous TurtleBot Patrol & Obstacle Avoidance',
        level: 'Starter Track',
        badgeLabel: 'Mandatory task',
        brief: 'Create a complete turtlebot_patrol package that autonomously patrols and avoids obstacles, with an emergency-stop service that can be triggered and reset.',
        concept: 'ROS Task 1 is mandatory for this domain. Submit the complete GitHub repository, a demonstration recording, and a copy of your README in the shared submission folder.',
        stacks: ['ROS', 'TurtleBot', 'GitHub repository'],
        requirements: [
          'Provide Link.txt containing only the raw GitHub repository URL. The repo must be public and contain the complete turtlebot_patrol package: source code, config, launch files, and README.',
          'Include Demo.mp4: a one-minute screen recording demonstrating patrol, obstacle avoidance, and the emergency-stop service being triggered and reset.',
          'Include README.md, copied from the repository for quick reference. It must explain setup, build, launch, and usage/testing, and include at least three images.',
        ],
      },
    ],
  },
  {
    slug: 'cybersecurity',
    department: 'Cybersecurity',
    tagline: 'Break things. Then figure out why.',
    description:
      'Three concise challenges across cryptography, steganography, and binary exploitation.',
    image: '/assets/tasks/cybersecurity.png',
    skills: ['Cryptography', 'Steganography', 'Binary exploitation'],
    difficulty: 'Intermediate',
    estimatedTime: 'Three challenges',
    submissionFormat: 'Public GitHub repository + public Google Doc',
    evaluationCriteria: [],
    tasks: [
      {
        id: 'sec-cryptography',
        title: 'Task 1 — Cryptography',
        level: 'Starter Track',
        brief: 'The challenge is a simple cipher challenge that has the flag in the format BYTE{...}.',
        concept: 'QkFJTntiQTczX1E4Ul9BcmhIQ19YNHlHY0R9',
      },
      {
        id: 'sec-steganography',
        title: 'Task 2 — Steganography',
        level: 'Starter Track',
        brief: 'The challenge is a PNG file that has been corrupted. Find the flag in the format flag{...}.',
        referenceUrl: {
          label: 'Open the steganography challenge file',
          url: 'https://drive.google.com/file/d/1ELLQDWkqsSL-PM_xQcids8axmntXUiOL/view?usp=sharing',
        },
      },
      {
        id: 'sec-binary-exploitation',
        title: 'Task 3 — Binary Exploitation',
        level: 'Advanced Track',
        brief: 'This challenge uses an insecure memory buffer, also known as a buffer overflow. Exploit it to reach the part of the program that contains the flag in the format BYTE{...}. The flag in the provided dummy binary is fake. The actual challenge runs as a remote service; connect with Netcat (nc) using the supplied host and port.',
        concept: 'nc cybersub.bytesoc.dev 9999',
        requirements: [
          'Download the provided ZIP and extract it. Keep all extracted files in the same folder.',
          'Run chall.sh to start the local challenge. Analyze the dummy binary to find and understand the insecure buffer and how the vulnerability is triggered.',
          'The flag in the local dummy binary is fake. After analyzing it, connect to the remote instance at nc cybersub.bytesoc.dev 9999 or solve it with a script you wrote.',
          'Submit your solution as part of the Cyber Security submission.',
        ],
      },
    ],
  },
  {
    slug: 'graphic-design',
    department: 'Graphic Design',
    tagline: 'Make BYTE impossible to scroll past.',
    description: 'Create a first impression for BYTE and design an original piece of campus merchandise.',
    image: '/assets/tasks/graphic_design.jpeg',
    skills: ['Visual design', 'Typography', 'Brand identity', 'Social media'],
    difficulty: 'Beginner',
    estimatedTime: 'Two design tasks',
    submissionFormat: 'Public Google Drive links to final design files',
    evaluationCriteria: [],
    tasks: [
      {
        id: 'graphic-design-poster',
        title: 'Task 1 — BYTE Freshers Poster',
        level: 'Starter Track',
        badgeLabel: 'Poster design',
        brief: 'Create the first impression of BYTE for incoming MAIT freshers. Design a freshers-facing promotional poster introducing BYTE as a technical society and making a first-year student want to learn more and join.',
        requirements: [
          'At a glance, communicate who BYTE is, what it does, what it has done, what a fresher can gain, and how to join.',
          'Use the supplied BYTE logo, official information, selected past-event names and photographs, WhatsApp community QR code, and official social handles/contact information as your primary source material.',
          'Do not fabricate events, achievements, statistics, testimonials, or other factual claims. Keep any additional copy consistent with the content pack.',
          'Create a modern, youthful, technically relevant, energetic, professional, cohesive design. Prioritise communication and hierarchy instead of forcing every detail onto the poster.',
          'Primary format: 1080 × 1350 px (4:5 portrait), suitable for Instagram and digital campus promotion. Keep it readable on mobile and make the QR code visible and scannable.',
          'Use high-resolution imagery, avoid unnecessary compression, use the BYTE logo correctly, and keep the final layout clean and professionally aligned.',
        ],
        detailSections: [
          {
            title: 'Official content pack',
            paragraphs: ['The pack includes the BYTE logo, official information about BYTE and its purpose, selected past-event details and photos, the official WhatsApp community QR code, and official social/contact information where applicable.'],
            links: [{ label: 'Open the BYTE freshers poster content pack', url: 'https://drive.google.com/drive/folders/1UW5E5ZzuGT7-GrafMBvQgPhwdlDhAuEg?usp=sharing' }],
          },
          {
            title: 'Creative freedom and restrictions',
            items: [
              'You may create original graphic elements, illustrations, textures, compositions, typography treatments, and image treatments.',
              'Do not replace the supplied event photographs with AI-generated representations, and do not use a pre-made template as the primary design.',
            ],
          },
        ],
      },
      {
        id: 'graphic-design-merch',
        title: 'Task 2 — BYTE T-shirt Merchandise',
        level: 'Starter Track',
        badgeLabel: 'Merch concept',
        brief: 'Design an original T-shirt merchandise concept for BYTE MAIT that represents a tech, coding, and creative community. Make it modern, youthful, tech-inspired, visually strong, and suitable for actual college merchandise.',
        requirements: [
          'Create a front and/or back T-shirt design. You may experiment with typography, illustrations, coding/tech elements, abstract graphics, patterns, symbols, and short creative phrases.',
          'Use the BYTE Society logo as the primary brand reference. The design should feel like BYTE even without relying heavily on the logo.',
          'Last year’s BYTE merchandise is for reference only. Do not copy it; make your concept, graphics, typography, and composition original.',
        ],
        detailSections: [
          {
            title: 'Brand references',
            links: [
              { label: 'BYTE Society logo', url: 'https://drive.google.com/file/d/1vYrIaAsOh4psMuNjNyX7LoK4wwwB0AWx/view?usp=sharing' },
              { label: 'Last year’s BYTE merchandise (reference only)', url: 'https://drive.google.com/file/d/1z_abqaDsHT8b2mJbsn7KUm6-5DzdkERc/view?usp=sharing' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'video-editing',
    department: 'Video Editing',
    tagline: 'Turn raw footage into a story.',
    description: 'Shape BYTE’s Algo Trading Sprint footage into a short, intentional vertical event recap.',
    image: '/assets/tasks/video_editing.jpeg',
    skills: ['Editing', 'Pacing', 'Sound design', 'Visual storytelling'],
    difficulty: 'Intermediate',
    estimatedTime: 'One 45–60 second edit',
    submissionFormat: 'Public Google Drive link to final MP4',
    evaluationCriteria: [],
    tasks: [
      {
        id: 'video-editing-recap',
        title: 'Algo Trading Sprint — Event Recap',
        level: 'Starter Track',
        badgeLabel: 'Video edit',
        brief: 'Turn raw footage from BYTE’s Algo Trading Sprint into a polished 45–60-second vertical event recap. Make deliberate editorial decisions about what matters, what to cut, what to emphasise, how the edit flows, and what feeling viewers should leave with.',
        requirements: [
          'Create a compelling visual narrative by selecting, structuring, and pacing footage—not merely assembling clips.',
          'Use music, sound design, typography, and visual treatment to strengthen the story. Keep the result professional and suitable for BYTE social media.',
          'The supplied event footage must remain the primary visual source. External footage must not replace it. Supporting royalty-free music, sound effects, fonts, textures, and official BYTE/Algo Trading Sprint assets are allowed.',
          'Duration: 45–60 seconds. Format: vertical 9:16. Recommended export: MP4 at 1080 × 1920 or higher.',
          'Keep on-screen text purposeful and readable, use BYTE branding without overpowering the footage, and use transitions only when they help the rhythm or narrative.',
          'Do not use a pre-made video template as the main structure of the edit.',
        ],
        detailSections: [
          {
            title: 'Source footage',
            paragraphs: ['Use the raw footage captured during BYTE’s Algo Trading Sprint.'],
            links: [{ label: 'Open the Algo Trading Sprint footage', url: 'https://drive.google.com/drive/folders/1MticD9zm5yy9MgohLxhra1RvbtMbGStR?usp=drive_link' }],
          },
          {
            title: 'Deliverables and submission',
            items: [
              'Submit a publicly accessible Google Drive link to the final video in MP4 format, named Name_Branch_VideoEdit.mp4.',
              'State the software/video-editing apps used.',
              'Add a creative note of no more than 50 words explaining the concept or approach.',
              'Keep the export at original quality; do not submit a compressed WhatsApp/Instagram version.',
              'Set Drive access to Anyone with the link — Viewer.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'outreach',
    department: 'Outreach',
    tagline: 'Read the room. Make the ask.',
    description: 'A practical outreach simulation: write with precision, handle rejection and silence, and identify realistic sponsors.',
    image: '/assets/tasks/outreach.png',
    skills: ['Written communication', 'Partnerships', 'Judgement', 'Research'],
    difficulty: 'Intermediate',
    estimatedTime: 'Six written responses + sponsor research',
    submissionFormat: 'One public Google Drive link to a PDF or document',
    evaluationCriteria: [],
    tasks: [
      {
        id: 'outreach-simulation',
        title: 'Outreach Simulation',
        level: 'Starter Track',
        badgeLabel: 'One submission',
        brief: 'This is not a writing-polish test. Show that you can read the room, handle a “no,” and work well when deadlines are minutes away. Write your own responses and be ready to defend them.',
        requirements: [
          'Do not contact any real business or person using BYTE’s name. This is a simulation; submit one response per person.',
          'Word and character limits are strict. Going over costs marks; going substantially over costs more.',
          'If you used an LLM, disclose where in one line at the end. You may be asked to defend every line.',
        ],
        detailSections: [
          {
            title: 'Part 1 — Review and outreach messages',
            items: [
              '1. Review this speaker request: “heyy!! we\'re doing a coding event, wanted to ask if u\'d like to come as speaker, it\'ll be so much fun and great exposure for you!! lmk asap”. Name five things wrong with it, one line each.',
              '2a. For BYTE Hackathon on AI Agents, 25–26 October at MAIT, expecting about 150 students, write a message (maximum 150 words) to a nearby print/stationery shop asking it to sponsor goodie-bag printing. It has sponsored other societies before and was unimpressed by turnout. You have no budget, only visibility and footfall data.',
              '2b. Write a message (maximum 120 words) to an alum working as a SWE/PM at a startup asking for a 40-minute tech talk. They work 9–6 and receive many such requests. Add one line naming the platform you would use and why.',
              '2c. Write a mass broadcast announcing registration for the hackathon on college-wide WhatsApp and Instagram (maximum 280 characters). Include what it is, the dates, one reason to attend, and where to register. Do not use “excited,” “amazing,” “don’t miss out,” or 🔥; use no more than one emoji.',
            ],
          },
          {
            title: 'Part 2 — Replies and sponsor research',
            items: [
              '3. The print shop says: “We did this for XXX club last year. Nobody redeemed the coupons. Not doing it again.” Write a reply (maximum 70 words). How would you get them to agree?',
              '4. The alum has not replied after six days. Write a follow-up (maximum 60 words), or describe another idea for moving forward.',
              '5. The alum says: “I can do it, but I need to know at least 60 people will actually show up, not just RSVP.” You cannot guarantee attendance. Write a reply (maximum 70 words).',
              '6. Find three real entities BYTE could realistically approach for the hackathon (companies, local shops, alumni-run startups, ed-tech tools, etc.). For each, provide its name and what it does; why it fits this event (maximum two lines); a concrete offer beyond generic visibility; and an exact contact point (a person, role, or form—not “check their website”). Present Question 6 as a table. Fabricated or copy-pasted entries are an instant reject; entries are checked.',
            ],
          },
          {
            title: 'Submission',
            items: [
              'Submit one PDF or document, in task order, named FullName_Branch_Outreach.',
              'Upload it to Google Drive and submit the link. Set access to Anyone with the link — Viewer and verify it is publicly accessible.',
              'Part 1 is approximately 35% of the weight; Part 2 is approximately 65%. Part 2 and the interview are the main filters.',
            ],
          },
        ],
      },
    ],
  },
];

export function getDepartmentBySlug(slug: string): TaskDepartment | undefined {
  return taskDepartments.find((d) => d.slug === slug);
}

export const timelineSteps: TimelineStep[] = [
  { step: '01', title: 'Orientation Headstart', date: '25 Sep', desc: 'Orientation headstart complete', status: 'completed' },
  { step: '02', title: 'Task Release', date: '27 Sep', desc: 'Tasks go live — start building', status: 'current' },
  { step: '03', title: 'Submission', date: '29 Sep – 13 Oct', desc: 'Submission portal is open', status: 'upcoming' },
  { step: '04', title: 'Interviews', date: 'After submissions', desc: 'Shortlisted candidate interviews', status: 'upcoming' },
];

export const taskFaqs: TaskFAQItem[] = [
  {
    q: 'Can I apply for more than one department?',
    a: 'Yes! You can attempt tasks for up to two departments if you are interested in multiple domains. Each submission will be evaluated independently by domain leads.',
  },
  {
    q: 'Do I need prior experience to attempt starter tasks?',
    a: 'No prior experience required. Our starter tasks are designed to assess problem-solving mindset, curiosity, and execution rather than pre-existing mastery.',
  },
  {
    q: 'What if I get stuck or have questions during the task?',
    a: 'Join our Discord server and post in the #recruitment-help channel. Our domain leads and seniors are available to clarify requirements and unblock you.',
  },
  {
    q: 'How will my submission be evaluated?',
    a: 'We evaluate code quality, problem breakdown, creativity, edge-case thinking, and clean documentation. Finishing 80% with thoughtful architecture beats rushed completion.',
  },
  {
    q: 'What happens after I submit?',
    a: 'Submissions are reviewed within a week after the deadline. Shortlisted candidates receive an invite for a brief walkthrough discussion with domain leads.',
  },
];

export const difficultyColor: Record<string, string> = {
  Beginner: '#52e0a6',
  Intermediate: '#e0c752',
  Advanced: '#e05252',
};
