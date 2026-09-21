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
      'Row Level Security (RLS) and server-side authorization enforcement',
      'Seamless OS share sheet ingestion and background handling',
      'Resilient offline-first persistence and conflict mitigation strategy',
      'Clean state architecture, modular code, and comprehensive README documentation',
    ],
    tasks: [
      {
        id: 'app-relay',
        title: 'Relay — Personal Cross-Device Dropbox',
        level: 'Starter Track',
        brief:
          'Build Relay, a private, cross-device mobile inbox where students can instantly capture things they encounter across mobile apps (links, notes, files, snippets) and access them from any signed-in device.',
        concept:
          '“I saw something useful in WhatsApp / Discord / Chrome. I want to save it now and find it on my laptop or another phone later.” Think of a fast, minimalist personal knowledge capture tool similar to mymind.com.',
        referenceUrl: {
          label: 'Inspiration: mymind.com',
          url: 'https://mymind.com/',
        },
        stacks: ['Flutter', 'React Native / Expo', 'Native Android', 'Native iOS', 'Supabase / Firebase / BaaS'],
        stages: [
          {
            stageNumber: 1,
            title: 'Identity — Sign In Properly',
            subtitle: 'OAuth authentication & session integrity',
            requirements: [
              'OAuth sign-in and sign-out via Google or GitHub',
              'Sensible loading, cancellation, and error handling states',
              'Secure session persistence after app restart',
              'Profile screen displaying the currently signed-in identity',
              'Logged-out users cannot view or access previously synced private data',
            ],
            verificationNote:
              'Verification Question during review: What is stored on the device after OAuth completes? What should never be stored directly in the app?',
          },
          {
            stageNumber: 2,
            title: 'A Real Backend & Private Data',
            subtitle: 'Secure CRUD & strict data isolation',
            requirements: [
              'Data Schema: id, ownerId, type (note | link | file), title, content/URL, tags, createdAt, updatedAt, archivedAt',
              'Full CRUD: Create item, Read only own items, Edit item, Archive/Restore, Delete item',
              'Search and filter items locally or remotely — with your architectural choice documented',
            ],
            securityNote:
              'Non-negotiable Security Rule: A user must not be able to request another user’s data by modifying an ID in the client, URL, request, or deep link. If using Supabase, write correct Row Level Security (RLS) policies. If using Firebase, write strict Firestore Security Rules. If using custom backend, perform server-side authenticated ownership checks.',
            verificationNote:
              'Verification Test: We sign in with Account A and create private items. Then Account B signs in. Account B must NEVER see, edit, delete, or fetch Account A’s items.',
          },
          {
            stageNumber: 3,
            title: 'Capture from the Real World',
            subtitle: 'Mobile OS Share Sheet integration',
            requirements: [
              'Manual creation of a note or link directly inside the app',
              'Receive shared text or URLs from external apps (Chrome, Twitter/X, WhatsApp) via OS Share Sheet',
              'Pre-fill a new Relay item from incoming shared content with tag selection (e.g. #semester-4, #project-idea, #read-later)',
              'Graceful handling for malformed or unsupported shared content payloads',
            ],
          },
          {
            stageNumber: 4,
            title: 'Sync & Unreliable Reality',
            subtitle: 'Offline resiliency & conflict mitigation',
            requirements: [
              'App opens and allows browsing cached notes when offline',
              'Graceful retry UI when a save attempt fails due to poor connectivity',
              'Clear conflict resolution policy (e.g. "Last-write-wins with in-app warning before overwriting remote edits")',
              'Proper handling when opening a deleted item via an old deep link or cached reference',
              'Remote data refreshes without clobbering the user’s active in-progress draft',
            ],
          },
          {
            stageNumber: 5,
            title: 'Share Safely',
            subtitle: 'Scoped public read-only links',
            requirements: [
              'Generate public read-only share link for a specific item (e.g. relay.app/s/7xKpQ9Lm)',
              'Shared URL reveals only the selected item — never exposing user inbox, profile, other notes, or internal user IDs',
              'Item owner can revoke the public share link at any time',
              'Shared link gracefully displays an empty/expired state if the underlying item is deleted',
            ],
          },
        ],
        optionalMissions: [
          {
            name: 'Attachment Vault',
            benefit: 'Upload image/PDF files; ensure private cloud storage with strict ownership verification.',
          },
          {
            name: 'Link Preview Service',
            benefit: 'Server-side scraper fetching title, description, and preview image with timeout handling.',
          },
          {
            name: 'Device-to-Device Live Sync',
            benefit: 'Demonstrate instantaneous live updates across two active devices or emulators simultaneously.',
          },
          {
            name: 'End-to-End Encryption (E2EE) Design',
            benefit: 'Document a credible zero-knowledge encryption architecture preventing servers from reading item content.',
          },
          {
            name: 'Browser Companion / Web View',
            benefit: 'A minimal companion web extension or lightweight web dashboard to save items from desktop.',
          },
          {
            name: 'Scheduled Resurfacing',
            benefit: '“Remind me in 7 days” trigger with local/push notification and direct item deep link.',
          },
          {
            name: 'Data Export & Account Wipe',
            benefit: 'One-click full JSON/ZIP data export and permanent GDPR-compliant account and asset wipe.',
          },
        ],
        submissionDeliverables: [
          'GitHub repository with clear, chronological commit history (no single initial dump)',
          'Hosted build / APK / Expo Go link / TestFlight / screen recording walkthrough',
          'Architecture diagram: App → OAuth Provider → Backend Database → Storage → Public Share route',
        ],
      },
      {
        id: 'app-advanced',
        title: 'Decentralized Note Drop / Peer Sync App',
        level: 'Advanced Track',
        brief:
          'Create a lightweight local peer-to-peer or real-time synchronized study hub allowing classmates on the same Wi-Fi / mesh to exchange notes and markdown snippets instantaneously.',
        requirements: [
          'Real-time data sync using WebSockets, Supabase Realtime, or P2P WebRTC',
          'Markdown preview and syntax highlighting for code snippets',
          'Local encryption for private study notes',
        ],
        bonusTasks: [
          'Background sync when reconnecting to Wi-Fi',
          'Voice memo recording with waveform audio visualizer',
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
    skills: ['React', 'Astro', 'Node.js', 'TypeScript', 'Tailwind'],
    difficulty: 'Beginner',
    estimatedTime: '6–10 hours',
    submissionFormat: 'GitHub Repo + Deployed Live Link (Vercel / Netlify / Cloudflare)',
    evaluationCriteria: [
      'Semantic HTML and high Lighthouse performance scores (90+)',
      'TypeScript type safety with zero runtime `any` escapes',
      'Responsive design adapting flawlessly from 360px mobile to 4K desktop',
      'Thoughtful UX micro-copy, keyboard navigation, and loading skeletons',
    ],
    tasks: [
      {
        id: 'web-starter',
        title: 'DevCollab — Open Source Project Finder',
        level: 'Starter Track',
        brief:
          'Build a fast, interactive web dashboard showcasing open-source projects, bounties, and hackathon teams looking for contributors. Allow filtering by tech stack, difficulty, and society domain.',
        requirements: [
          'Interactive search bar with instant debounced keyword search and tag filtering',
          'Project detail modal or dynamic view with live demo preview link, repository link, and tech stack badges',
          'Bookmarking / Upvoting feature persisted in localStorage or IndexedDB',
          'Full keyboard accessibility (cmd/ctrl + k command bar or focus trap modals)',
        ],
        bonusTasks: [
          'Server-Side Rendering (SSR) or Static Site Generation (SSG) using Astro / Next.js / Remix',
          'GitHub API integration to fetch live star count and latest release commit',
          'Dark / Neon Cyber theme toggle with smooth CSS variable transitions',
        ],
      },
      {
        id: 'web-advanced',
        title: 'Real-Time Interactive Collaborative Canvas',
        level: 'Advanced Track',
        brief:
          'Build a multiplayer whiteboard or terminal playground where multiple users can sketch architecture diagrams, leave sticky comments, and share a room URL.',
        requirements: [
          'HTML5 Canvas / SVG rendering engine with pan and zoom capabilities',
          'Multiplayer live cursor tracking and object synchronization using WebSockets or PartyKit / Liveblocks',
          'Export canvas as PNG / SVG export',
        ],
        bonusTasks: [
          'Undo/Redo history stack with shortcut support (Ctrl+Z / Ctrl+Y)',
          'Code snippet block with monaco/shiki syntax highlighting',
        ],
      },
    ],
  },
  {
    slug: 'ai-ml',
    department: 'AI / ML',
    tagline: 'Models that solve real problems.',
    description:
      'Data pipelines, model training, evaluation, and deployment. Work on projects where machine learning meets a genuine use case — not just a notebook.',
    image: '/assets/tasks/ai-ml.png',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Pandas', 'OpenCV'],
    difficulty: 'Intermediate',
    estimatedTime: '10–14 hours',
    submissionFormat: 'GitHub Repo + Jupyter Notebook + FastAPI / Streamlit Demo',
    evaluationCriteria: [
      'Rigorous EDA (Exploratory Data Analysis) with data preprocessing and cleaning',
      'Model benchmark comparison (baseline vs fine-tuned/custom architecture)',
      'Inference speed vs accuracy tradeoff analysis',
      'Modular Python code with docstrings, type hints, and requirements.txt',
    ],
    tasks: [
      {
        id: 'ml-starter',
        title: 'SmartDocs — RAG Semantic Document Search & QA',
        level: 'Starter Track',
        brief:
          'Build a Retrieval-Augmented Generation (RAG) pipeline that ingests college syllabi, technical documentation, or society notes, embeds the text into a vector store, and answers queries with cited sources.',
        requirements: [
          'Text chunking and vector embedding pipeline using LangChain / LlamaIndex / ChromaDB / FAISS',
          'FastAPI or Streamlit interface allowing users to upload a PDF and ask multi-turn questions',
          'Source citation with page number and confidence score calculation',
          'Evaluation script demonstrating hallucination mitigation strategies',
        ],
        bonusTasks: [
          'Local LLM inference via Ollama (e.g. Llama 3 / Mistral) with zero external API dependencies',
          'Hybrid search combining BM25 keyword search with dense vector similarity',
          'Benchmarking query latency and memory consumption',
        ],
      },
      {
        id: 'ml-advanced',
        title: 'Vision-Based Automated Attendance & Gesture Recognition',
        level: 'Advanced Track',
        brief:
          'Train a computer vision model using OpenCV and PyTorch/YOLO to detect student faces or hand gestures in challenging lighting conditions for automated lab attendance.',
        requirements: [
          'Real-time webcam inference at 30+ FPS',
          'Robust face detection with anti-spoofing / liveness check heuristics',
          'Export pipeline to ONNX / TensorRT for edge deployment',
        ],
        bonusTasks: [
          'Interactive web dashboard displaying attendance metrics and heatmaps',
          'Custom dataset augmentation pipeline with synthetic noise and blurring',
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
    skills: ['Arduino', 'Raspberry Pi', 'ROS', 'PCB Design', 'C/C++'],
    difficulty: 'Intermediate',
    estimatedTime: '10–14 hours',
    submissionFormat: 'GitHub Repo + Wokwi / Gazebo Simulation Link + Circuit Diagrams / Video',
    evaluationCriteria: [
      'Clean, non-blocking firmware (millis() / RTOS tasks over delay())',
      'Accurate sensor calibration and digital filtering algorithms',
      'Clear circuit schematics with proper voltage regulation and decoupling',
      'Detailed video demonstration or interactive simulator link',
    ],
    tasks: [
      {
        id: 'mech-starter',
        title: 'Autonomous Rover with Sensor Fusion & Obstacle Mapping',
        level: 'Starter Track',
        brief:
          'Develop an autonomous 2-wheel / 4-wheel differential drive rover firmware in C/C++ (or ROS2) simulated in Wokwi or Gazebo that maps an unknown corridor and navigates around dynamic obstacles.',
        requirements: [
          'Dual Ultrasonic / LiDAR distance sensor integration with Kalman or moving average filtering',
          'PID controller for smooth velocity ramping and precise 90-degree turning',
          'State machine architecture (IDLE, SCANNING, MAPPING, EVASION, RECOVERY)',
          'Simulation setup link on Wokwi / Webots with full circuit schematic',
        ],
        bonusTasks: [
          'MQTT or ESP32 WebSockets telemetry dashboard broadcasting speed, battery, and proximity radar',
          'KiCad PCB design schematic for a custom motor driver shield',
          'Path planning implementation using A* or Dijkstra algorithm on a 2D grid',
        ],
      },
      {
        id: 'mech-advanced',
        title: 'IoT Weather Station & Smart Plant Telemetry',
        level: 'Advanced Track',
        brief:
          'Design an ultra-low-power environmental sensor station using ESP32 with deep-sleep power budgeting and solar battery charge telemetry.',
        requirements: [
          'Sensor reading (DHT22/BME280, soil moisture, light intensity) with power optimization',
          'Deep sleep cycling sending telemetry bursts over MQTT / HTTP',
          'Watchdog timer and fail-safe sensor reconnection logic',
        ],
        bonusTasks: [
          '3D-printable CAD enclosure in Fusion 360 / Blender with STL files',
          'Automated pump relay control with threshold hysteresis',
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
      'Comprehensive vulnerability identification (OWASP Top 10)',
      'Step-by-step reproducible Proof of Concept (PoC) exploits with screenshots',
      'Defensive remediation patches and secure code rewrites',
      'Professional executive summary and risk scoring (CVSS v3.1)',
    ],
    tasks: [
      {
        id: 'sec-starter',
        title: 'Web Vulnerability Assessment & Hardening Lab',
        level: 'Starter Track',
        brief:
          'Analyze a provided vulnerable target web application (or create a simulated environment like Juice Shop / DVWA). Identify at least 3 distinct vulnerabilities, craft working PoCs, and submit production-ready code patches.',
        requirements: [
          'Identify and document at least 3 vulnerabilities (e.g., SQLi, IDOR, SSRF, JWT Tampering, XSS, Broken Access Control)',
          'Step-by-step reproduction guide using Burp Suite / curl / Python exploit scripts',
          'Security remediation patch: provide exact code diffs that fix the root causes',
          'Defensive hardening guide (WAF rules, CSP headers, rate-limiting configuration)',
        ],
        bonusTasks: [
          'Automated Python/Bash security scanner script to test for the target vulnerabilities in CI/CD',
          'Write a customized Dockerfile with non-root security constraints and read-only filesystem',
          'Network packet capture analysis (.pcap) explaining attack telemetry in Wireshark',
        ],
      },
      {
        id: 'sec-advanced',
        title: 'Binary Analysis & Memory Corruption Research',
        level: 'Advanced Track',
        brief:
          'Reverse engineer a compiled x86/ARM binary using Ghidra / GDB, bypass authentication routines, and document the exploit chain.',
        requirements: [
          'Static and dynamic disassembly report with control-flow graph',
          'Bypass anti-debugging or buffer validation checks',
          'Provide a Python pwntools automation script',
        ],
        bonusTasks: [
          'Bypass ASLR / NX protections with ROP (Return Oriented Programming) chain',
          'Write a YARA rule to detect the malicious binary signature',
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
      'Realistic value proposition and brand positioning for tier-1 tech sponsors',
      'Compelling copywriting, social media hooks, and audience engagement strategy',
      'Detailed budget allocation, contingency planning, and logistics timelines',
      'Visual polish in presentation design, Figma templates, or marketing decks',
    ],
    tasks: [
      {
        id: 'out-starter',
        title: 'Flagship Hackathon Sponsorship & PR Strategy',
        level: 'Starter Track',
        brief:
          'Design a 360-degree outreach strategy for "ByteHacks 2026" — an upcoming 500-hacker national hackathon. Deliver a sponsor pitch deck, a targeted sponsor outreach email pipeline, and a 3-week viral social media launch calendar.',
        requirements: [
          'Sponsor Pitch Deck (8–10 slides): Tiered packages (Title, Platinum, Gold), deliverables, reach metrics, and branding perks',
          'Personalized Cold Outreach Pitch: 3 custom email pitches targeted to Cloud, AI, and FinTech tech companies',
          '3-Week Content Campaign: Calendar of Instagram posts, LinkedIn announcements, Twitter threads, and Discord engagement prompts',
          'Budget & ROI Breakdown: Estimate prize pool, venue logistics, swag budget, and sponsor value delivered',
        ],
        bonusTasks: [
          'High-fidelity Figma / Canva social media teaser post designs and story templates',
          'Proposal for an industry panel keynote speaker lineup with personalized invitation letters',
          'Community onboarding gamification idea to drive 1,000+ Discord members',
        ],
      },
      {
        id: 'out-advanced',
        title: 'Inter-College Campus Ambassador Program Rollout',
        level: 'Advanced Track',
        brief:
          'Structure and launch an ambassador program spanning 25+ regional universities to expand B.Y.T.E.\'s workshop and hackathon reach.',
        requirements: [
          'Incentive structure & gamified leaderboard tiers (Points, Swag, VIP access)',
          'Weekly KPI tracking dashboard framework in Notion / Google Sheets',
          'Ambassador onboarding toolkit and communication guidelines',
        ],
        bonusTasks: [
          'Automated Discord bot command flow for verifying ambassador task submissions',
          'Crisis PR handbook with responses to potential event scheduling / logistics hiccups',
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
