export interface AgendaItem {
  time: string;
  title: string;
  detail?: string;
}

export interface EventItem {
  slug: string;
  name: string;
  type: string;
  date: string;
  year?: string;
  time: string;
  venue: string;
  shortSummary?: string;
  shortDescription: string;
  description: string;
  agenda: AgendaItem[];
  whoCanAttend: string[];
  ctaLabel?: string;
  isUpcoming?: boolean;
  image?: string;
}

export const events: EventItem[] = [
  {
    slug: 'pixel-punk',
    name: 'Pixel Punk Game Jam',
    type: 'Competition',
    date: '27 Mar',
    year: '2025',
    time: '10:00 AM – 10:00 AM',
    venue: 'Virtual & Campus',
    shortSummary: 'Retro-futurism Meets Gameplay',
    shortDescription: 'Merging retro-futurism with modern gameplay in a high-stakes game jam.',
    description: 'Pixel Punk began as a bold vision to merge retro-futurism with modern gameplay, and quickly evolved into a groundbreaking game jam. With a ₹40,000+ prize pool, developers had full freedom to build with Unity, JavaScript, Unreal, Web3, and AR/VR. Our judging focused on creativity, gameplay, and market potential.',
    agenda: [
      { time: '10:00 AM', title: 'Kickoff & Theme Reveal', detail: 'The theme is announced and teams begin brainstorming.' },
      { time: '02:00 PM', title: 'Mid-Point Check-in', detail: 'Mentors circle around to review core gameplay loops.' },
      { time: '10:00 AM', title: 'Submissions & Playtesting', detail: 'Games are locked in. Judges and attendees playtest.' },
    ],
    whoCanAttend: [
      'Open to all game developers, artists, and sound designers.',
      'Solo entries and teams of up to 4 welcome.',
      'Any game engine or framework is allowed.',
    ],
    isUpcoming: false,
    image: '/assets/events/pixel-punk.webp',
  },
  {
    slug: 'robo-soccer',
    name: 'Robo Soccer',
    type: 'Competition',
    date: '10 Sep',
    year: '2024',
    time: '11:00 AM – 04:00 PM',
    venue: 'Main Ground',
    shortSummary: 'Engineering & Real-time Strategy',
    shortDescription: 'A high-energy showcase of robotics, engineering precision, and strategy.',
    description: 'In a thrilling display of engineering precision and real-time strategy, the BYTE team hosted a one-of-a-kind Robot Soccer Event. With over 400 students gathering to witness the action, this event showcased where creativity meets code, and technology becomes a shared experience.',
    agenda: [
      { time: '11:00 AM', title: 'Bot Weigh-in & Inspection', detail: 'Ensuring all bots meet size and weight specifications.' },
      { time: '12:00 PM', title: 'Qualifiers', detail: 'Initial bracket matches begin.' },
      { time: '03:00 PM', title: 'Finals', detail: 'The top two teams face off for the championship.' },
    ],
    whoCanAttend: [
      'Robotics enthusiasts and teams from any department.',
      'Spectators are highly encouraged to come and cheer.',
    ],
    isUpcoming: false,
    image: '/assets/events/robo-soccer.webp',
  },
  {
    slug: 'ml-workshop-week',
    name: 'ML Workshop Week',
    type: 'Workshop',
    date: '19 Feb',
    year: '2025',
    time: '04:00 PM – 06:00 PM',
    venue: 'Lab 4, CSE Block',
    shortSummary: 'Deep Dive into ML',
    shortDescription: '3-day intensive workshop covering LSTM, Transformers, CUDA, and RL.',
    description: 'A comprehensive deep dive into Machine Learning. We moved beyond the basics to cover LSTMs, the architecture of Transformers, an introduction to GPU programming with CUDA, and the fundamentals of Reinforcement Learning. Highly practical and code-heavy.',
    agenda: [
      { time: 'Day 1', title: 'Introduction & Basics', detail: 'Setting the groundwork.' },
      { time: 'Day 2', title: 'LSTMs & Transformers', detail: 'Handling sequential data and attention.' },
      { time: 'Day 3', title: 'CUDA & Reinforcement Learning', detail: 'Accelerating workloads and teaching agents.' },
    ],
    whoCanAttend: [
      'Students with intermediate Python knowledge.',
      'Those interested in advanced AI/ML topics.',
    ],
    isUpcoming: false,
    image: '/assets/events/ml-workshop.webp',
  },
  {
    slug: 'nba-visit',
    name: 'NBA Visit',
    type: 'Showcase',
    date: '11 Oct',
    year: '2025',
    time: '10:00 AM – 05:00 PM',
    venue: 'MAIT Campus',
    shortSummary: 'Project Showcase for NBA',
    shortDescription: 'BYTE members showcased their projects to the NBA accreditation body during their visit to MAIT.',
    description: 'During the National Board of Accreditation (NBA) visit to MAIT, the BYTE team had the opportunity to showcase their technical projects to the accreditation panel. Members demonstrated a wide range of work spanning software development, robotics, AI/ML, and more — reflecting the depth and breadth of the society\'s output.',
    agenda: [
      { time: '10:00 AM', title: 'Project Showcase', detail: 'BYTE members present their projects to the NBA panel.' },
    ],
    whoCanAttend: [
      'Internal showcase event for the NBA accreditation visit.',
    ],
    isUpcoming: false,
    image: '/assets/events/nba-visit.webp',
  },
  {
    slug: 'solana-bootcamp',
    name: 'Solana Bootcamp',
    type: 'Bootcamp',
    date: '08 Oct',
    year: '2025',
    time: '10:00 AM – 05:00 PM',
    venue: 'Seminar Hall',
    shortSummary: 'Blockchain & Smart Contracts',
    shortDescription: 'Two-day bootcamp diving into blockchain concepts and Rust/Anchor development.',
    description: 'A fast-paced entry into Web3. Day one covered the fundamentals of blockchain technology and provided an overview of the Solana ecosystem. Day two got technical with a hands-on Rust and Anchor bootcamp to build and deploy smart contracts.',
    agenda: [
      { time: 'Day 1', title: 'Blockchain & Ecosystem Overview', detail: 'The theoretical foundation of Solana.' },
      { time: 'Day 2', title: 'Rust & Anchor Bootcamp', detail: 'Writing and deploying smart contracts.' },
    ],
    whoCanAttend: [
      'Developers curious about Web3.',
      'Familiarity with systems programming (C/C++) is a plus but not required.',
    ],
    isUpcoming: false,
    image: '/assets/events/solana.webp',
  },
  {
    slug: 'ui-ux-ai-workshop',
    name: 'UI/UX & AI Workshop',
    type: 'Workshop',
    date: '29 Oct',
    year: '2025',
    time: '02:00 PM – 05:00 PM',
    venue: 'Design Studio',
    shortSummary: 'Human-Centered Design & AI',
    shortDescription: 'Exploring how human-centered design blends with artificial intelligence.',
    description: 'This workshop explored how human-centered design is evolving in the era of artificial intelligence. From intuitive interfaces to experience-led innovation, participants engaged in hands-on discussions and left inspired to design with empathy, intelligence, and clarity.',
    agenda: [
      { time: '02:00 PM', title: 'The Shift in Design', detail: 'How AI is changing the UI landscape.' },
      { time: '03:00 PM', title: 'Experience-led Innovation', detail: 'Case studies and active teardowns.' },
      { time: '04:15 PM', title: 'Hands-on Prototyping', detail: 'Designing an AI-driven interaction.' },
    ],
    whoCanAttend: [
      'Designers, frontend developers, and product managers.',
      'No prior AI knowledge required.',
    ],
    isUpcoming: false,
    image: '/assets/events/ui-ux.webp',
  },
  {
    slug: 'algo-trading-sprint',
    name: 'Algo Trading Sprint',
    type: 'Competition',
    date: '16 Mar',
    year: '2026',
    time: '09:00 AM – 06:00 PM',
    venue: 'Lab 2',
    shortSummary: 'ML Trading Bots',
    shortDescription: 'A two-day sprint to build and deploy ML-based trading bots.',
    description: 'A two-day intensive sprint combining finance and tech. The first day kicked off development of ML-based trading bots. Participants analyzed historical market data to build predictive models. The second day concluded with final project submissions, live simulations, and result declarations.',
    agenda: [
      { time: 'Day 1', title: 'Kickoff & Model Building', detail: 'Data ingestion and initial model training.' },
      { time: 'Day 2', title: 'Simulation & Judging', detail: 'Running bots against unseen historical data.' },
    ],
    whoCanAttend: [
      'Students interested in FinTech, Data Science, or Economics.',
      'Teams of 2-3 are recommended.',
    ],
    isUpcoming: false,
    image: '/assets/events/algo-trading.webp',
  },
  {
    slug: 'ai-safety-ml-awareness',
    name: 'AI Safety & ML Awareness',
    type: 'Tech Talk',
    date: '02 Sep',
    year: '2026',
    time: '01:10 PM - 02:00 PM',
    venue: '11th Block, MAIT',
    shortSummary: 'Responsible AI & Ethics',
    shortDescription: 'Talk on AI safety and machine learning awareness by Mr. Manan Wadhwa with an API prize quiz.',
    description: 'Curious about AI, ML & responsible AI? Join us for an AI Safety & Machine Learning Awareness Session with Mr. Manan Wadhwa and explore how we can make AI safer and more responsible! A quiz will follow the session, based entirely on what is covered, with OpenAI APIs as prizes for the top performers.',
    agenda: [
      { time: '01:10 PM', title: 'Session Begins', detail: 'Exploring AI safety, ML awareness, and responsible AI.' },
      { time: '01:45 PM', title: 'Quiz Time', detail: 'Test your knowledge based entirely on the session content.' },
      { time: '02:00 PM', title: 'Prize Distribution & Closing', detail: 'OpenAI API prizes awarded to top performers.' },
    ],
    whoCanAttend: [
      'All students interested in AI and its societal impact.',
      'Anyone curious to learn and win OpenAI API access.',
    ],
    isUpcoming: false,
    image: '/assets/events/ai-safety.webp',
  },
  {
    slug: 'webcmd-hackathon',
    name: 'WebCMD Hackathon',
    type: 'Competition',
    date: '12 Sep',
    year: '2026',
    time: '09:00 AM – 06:00 PM',
    venue: 'MAIT Campus',
    shortSummary: 'Self-Learning Browser Agents',
    shortDescription: 'A hands-on hackathon hosted by webcmd to build Self-Learning Browser Agents.',
    description: 'Delhi, we’re bringing SLAB to MAIT! Build Browser Agents that can research, test, monitor, book, shop, and complete useful work across real websites. Webcmd is self-learning browser infrastructure for AI agents that explores unfamiliar websites and transforms stable workflows into reliable commands. We’ll begin with a practical Browser Agents 101 walkthrough so everyone can start building quickly. Build responsibly, build solo, and bring your preferred stack (Codex, Claude, Playwright, etc).',
    agenda: [
      { time: '09:00 AM', title: 'Browser Agents 101', detail: 'A practical walkthrough to get everyone building quickly.' },
      { time: '10:00 AM', title: 'Hacking Begins', detail: 'Build an agent that solves a meaningful, real-world browser workflow.' },
      { time: '04:00 PM', title: 'Final Demos', detail: 'Live execution or real screen recordings presented to judges.' },
    ],
    whoCanAttend: [
      'AI-agent builders, developers, students, and automation enthusiasts.',
      'No prior browser-automation experience is required.',
      'Solo builders only.',
    ],
    isUpcoming: false,
    image: '/assets/events/webcmd.webp',
  },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug);
}
