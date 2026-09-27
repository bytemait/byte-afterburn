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
  discordUrl: 'https://discord.gg/HNYhA4Ww5',
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
        id: 'web-starter',
        title: 'Problem Statement 01: [Web Dev Title]',
        level: 'Starter Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        concept:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        referenceUrl: {
          label: 'Inspiration: example.com',
          url: 'https://example.com',
        },
        stacks: ['React / Next.js', 'Astro', 'TypeScript', 'Tailwind CSS'],
        stages: [
          {
            stageNumber: 1,
            title: 'Stage 1: Lorem Ipsum UI & Structure',
            subtitle: 'Component design and responsive layout',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            ],
          },
          {
            stageNumber: 2,
            title: 'Stage 2: Lorem Ipsum State & Data Flow',
            subtitle: 'Interactive search, filtering and API handling',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
              'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
            ],
          },
        ],
        optionalMissions: [
          {
            name: 'Mission Alpha',
            benefit: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
        ],
        submissionDeliverables: [
          'GitHub repository with clear documentation and setup instructions',
          'Live deployed URL on Vercel / Netlify / Cloudflare',
          'Lighthouse audit score report (Performance & Accessibility)',
        ],
      },
      {
        id: 'web-advanced',
        title: 'Problem Statement 02: [Advanced Track Title]',
        level: 'Advanced Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        stacks: ['Next.js / Remix', 'WebSockets / Realtime', 'TypeScript', 'PostgreSQL / Prisma'],
        requirements: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        ],
        bonusTasks: [
          'Lorem ipsum bonus task 01: Consectetur adipiscing elit.',
          'Lorem ipsum bonus task 02: Sed do eiusmod tempor incididunt.',
        ],
      },
    ],
  },
  {
    slug: 'ml-research',
    department: 'ML Research',
    tagline: 'Models that solve real problems.',
    description:
      'Data pipelines, model training, evaluation, and deployment. Work on projects where machine learning meets a genuine use case — not just a notebook.',
    image: '/assets/tasks/ai-ml.png',
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
        id: 'ml-research-task',
        title: 'ML Research Challenge',
        level: 'Starter Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        concept:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        stacks: ['Python', 'PyTorch / TensorFlow', 'Pandas / NumPy', 'FastAPI / Streamlit'],
        stages: [
          {
            stageNumber: 1,
            title: 'Stage 1: Lorem Ipsum Data Ingestion & EDA',
            subtitle: 'Dataset preprocessing and baseline analysis',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            ],
          },
          {
            stageNumber: 2,
            title: 'Stage 2: Lorem Ipsum Model Training & Pipeline',
            subtitle: 'Architecture design, evaluation and inference',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
              'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
            ],
          },
        ],
        submissionDeliverables: [
          'GitHub repository with clean modular Python code and requirements.txt',
          'Interactive demo via FastAPI or Streamlit / video screen recording',
          'Benchmark evaluation comparison report',
        ],
      }
    ],
  },
  {
    slug: 'agentic-ai',
    department: 'Agentic AI',
    tagline: 'Build systems that reason and take action.',
    description:
      'Choose either of these independent tracks. Both are optional—pick the one that fits your interests and experience.',
    image: '/assets/tasks/ai-ml.png',
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
    slug: 'mechatronics',
    department: 'Mechatronics',
    tagline: 'Code meets the physical world.',
    description:
      'Robotics, embedded systems, hardware prototyping. Design circuits, write firmware, and build things that move, sense, and respond.',
    image: '/assets/tasks/mechatronics.png',
    skills: ['Arduino', 'Raspberry Pi', 'ROS / ROS2', 'PCB Design', 'C/C++'],
    difficulty: 'Intermediate',
    estimatedTime: '10–14 hours',
    submissionFormat: 'GitHub Repo + Wokwi / Gazebo Simulation Link + Circuit Diagrams / Video',
    evaluationCriteria: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
    tasks: [
      {
        id: 'mech-starter',
        title: 'Problem Statement 01: [Mechatronics Title]',
        level: 'Starter Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        concept:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        stacks: ['C/C++', 'Arduino / ESP32', 'Wokwi Simulator', 'FreeRTOS'],
        stages: [
          {
            stageNumber: 1,
            title: 'Stage 1: Lorem Ipsum Circuit Schematic & Sensors',
            subtitle: 'Hardware interfacing and wiring setup',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            ],
          },
          {
            stageNumber: 2,
            title: 'Stage 2: Lorem Ipsum Control Logic & Firmware',
            subtitle: 'Non-blocking state machine and sensor algorithms',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
              'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
            ],
          },
        ],
        submissionDeliverables: [
          'GitHub repository with well-commented firmware and schematics',
          'Wokwi simulation link or video demonstration',
          'Technical writeup with circuit diagram and component list',
        ],
      },
      {
        id: 'mech-advanced',
        title: 'Problem Statement 02: [Advanced Track Title]',
        level: 'Advanced Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        stacks: ['ESP32', 'MQTT / WebSockets', 'KiCad', 'Fusion 360'],
        requirements: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        ],
        bonusTasks: [
          'Lorem ipsum bonus task 01: Consectetur adipiscing elit.',
          'Lorem ipsum bonus task 02: Sed do eiusmod tempor incididunt.',
        ],
      },
    ],
  },
  {
    slug: 'cybersecurity',
    department: 'Cybersecurity',
    tagline: 'Break things. Then fix them.',
    description:
      'CTFs, penetration testing, vulnerability research, and secure architecture. Learn offensive and defensive security through hands-on challenges.',
    image: '/assets/tasks/cybersecurity.png',
    skills: ['Linux', 'Networking', 'Burp Suite', 'Wireshark', 'Python'],
    difficulty: 'Intermediate',
    estimatedTime: '8–12 hours',
    submissionFormat: 'GitHub Repo + PDF Vulnerability Assessment & Remediation Report',
    evaluationCriteria: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
    tasks: [
      {
        id: 'sec-starter',
        title: 'Problem Statement 01: [Cybersecurity Title]',
        level: 'Starter Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        concept:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        stacks: ['Linux / Bash', 'Burp Suite', 'Python / Scripting', 'Wireshark'],
        stages: [
          {
            stageNumber: 1,
            title: 'Stage 1: Lorem Ipsum Recon & Assessment',
            subtitle: 'Target inspection and vulnerability mapping',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            ],
          },
          {
            stageNumber: 2,
            title: 'Stage 2: Lorem Ipsum Exploitation & Patching',
            subtitle: 'Proof-of-concept creation and defensive patch',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
              'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
            ],
          },
        ],
        submissionDeliverables: [
          'Vulnerability assessment report (PDF / Markdown)',
          'Reproducible proof-of-concept scripts',
          'Remediation guide with secure code patches',
        ],
      },
      {
        id: 'sec-advanced',
        title: 'Problem Statement 02: [Advanced Track Title]',
        level: 'Advanced Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        stacks: ['Ghidra / GDB', 'x86/ARM Assembly', 'Python / pwntools', 'C'],
        requirements: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        ],
        bonusTasks: [
          'Lorem ipsum bonus task 01: Consectetur adipiscing elit.',
          'Lorem ipsum bonus task 02: Sed do eiusmod tempor incididunt.',
        ],
      },
    ],
  },
  {
    slug: 'outreach',
    department: 'Outreach',
    tagline: 'Connect minds. Build community.',
    description:
      'Sponsorships, event operations, PR, and community growth. Lead society initiatives, forge industry partnerships, and represent Byte to the wider tech ecosystem.',
    image: '/assets/tasks/outreach.png',
    skills: ['Community', 'Event Ops', 'Sponsorships', 'Content Creation', 'PR & Media'],
    difficulty: 'Beginner',
    estimatedTime: '6–8 hours',
    submissionFormat: 'PDF Pitch Deck + Notion Strategy Doc + Social Campaign Assets',
    evaluationCriteria: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
    tasks: [
      {
        id: 'out-starter',
        title: 'Problem Statement 01: [Outreach Title]',
        level: 'Starter Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        concept:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        stacks: ['Notion', 'Figma / Canva', 'Pitch Decks', 'Social Media Analytics'],
        stages: [
          {
            stageNumber: 1,
            title: 'Stage 1: Lorem Ipsum Pitch Deck & Strategy',
            subtitle: 'Partnership tiering and deliverables',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            ],
          },
          {
            stageNumber: 2,
            title: 'Stage 2: Lorem Ipsum Outreach & Engagement',
            subtitle: 'Content calendar and communication pipeline',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
              'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
            ],
          },
        ],
        submissionDeliverables: [
          'PDF sponsor pitch deck or outreach strategy document',
          'Notion / Google Docs campaign calendar and budget model',
          'Social media creative asset templates (Figma / Canva)',
        ],
      },
      {
        id: 'out-advanced',
        title: 'Problem Statement 02: [Advanced Track Title]',
        level: 'Advanced Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        stacks: ['Community Management', 'Discord / Telegram', 'Google Analytics', 'Notion'],
        requirements: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        ],
        bonusTasks: [
          'Lorem ipsum bonus task 01: Consectetur adipiscing elit.',
          'Lorem ipsum bonus task 02: Sed do eiusmod tempor incididunt.',
        ],
      },
    ],
  },
];

export function getDepartmentBySlug(slug: string): TaskDepartment | undefined {
  return taskDepartments.find((d) => d.slug === slug);
}

export const timelineSteps: TimelineStep[] = [
  { step: '01', title: 'Tasks Drop', date: 'Day 1', desc: 'Problem statements live', status: 'current' },
  { step: '02', title: 'Build Sprint', date: 'Days 2–4', desc: 'Hack, test & mentor sync', status: 'upcoming' },
  { step: '03', title: 'Submission Lock', date: 'Day 5', desc: 'Repo & form lock at 11:59 PM', status: 'upcoming' },
  { step: '04', title: 'Walkthroughs', date: 'Days 6–7', desc: '1-on-1 lead discussions', status: 'upcoming' },
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
