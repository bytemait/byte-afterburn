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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
    tasks: [
      {
        id: 'app-starter',
        title: 'Problem Statement 01: [App Dev Title]',
        level: 'Starter Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        concept:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        referenceUrl: {
          label: 'Inspiration: example.com',
          url: 'https://example.com',
        },
        stacks: ['Flutter', 'React Native / Expo', 'Kotlin / Swift', 'Supabase / Firebase'],
        stages: [
          {
            stageNumber: 1,
            title: 'Stage 1: Lorem Ipsum Setup & Auth',
            subtitle: 'Authentication and session integrity',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            ],
            verificationNote:
              'Verification Note: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            stageNumber: 2,
            title: 'Stage 2: Lorem Ipsum Backend & Data',
            subtitle: 'Data isolation and CRUD operations',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
              'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
            ],
            securityNote:
              'Security Rule: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            stageNumber: 3,
            title: 'Stage 3: Lorem Ipsum Sync & Edge Cases',
            subtitle: 'Offline caching and resilient state handling',
            requirements: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
              'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            ],
          },
        ],
        optionalMissions: [
          {
            name: 'Mission Alpha',
            benefit: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            name: 'Mission Beta',
            benefit: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
          },
        ],
        submissionDeliverables: [
          'GitHub repository with clear chronological commit history',
          'Hosted build / APK / Expo Go link / TestFlight / video walkthrough',
          'Architecture & system workflow diagram',
        ],
      },
      {
        id: 'app-advanced',
        title: 'Problem Statement 02: [Advanced Track Title]',
        level: 'Advanced Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        stacks: ['Flutter', 'React Native', 'WebSockets / WebRTC', 'SQLite / Local DB'],
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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    ],
    tasks: [
      {
        id: 'ml-starter',
        title: 'Problem Statement 01: [AI/ML Title]',
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
      },
      {
        id: 'ml-advanced',
        title: 'Problem Statement 02: [Advanced Track Title]',
        level: 'Advanced Track',
        brief:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        stacks: ['PyTorch / YOLO', 'OpenCV', 'CUDA / TensorRT', 'ONNX'],
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
