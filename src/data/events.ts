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
  time: string;
  venue: string;
  shortDescription: string;
  description: string;
  agenda: AgendaItem[];
  whoCanAttend: string[];
  ctaLabel?: string;
  isUpcoming?: boolean;
}

export const events: EventItem[] = [
  {
    slug: 'pixel-punk',
    name: 'Pixel Punk Game Jam',
    type: 'Competition',
    date: '15 Mar',
    time: '10:00 AM – 10:00 AM',
    venue: 'Virtual & Campus',
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
  },
  {
    slug: 'robo-soccer',
    name: 'Robo Soccer',
    type: 'Competition',
    date: '10 Feb',
    time: '11:00 AM – 04:00 PM',
    venue: 'Main Ground',
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
  },
  {
    slug: 'ml-workshop-week',
    name: 'ML Workshop Week',
    type: 'Workshop',
    date: '05 Apr',
    time: '04:00 PM – 06:00 PM',
    venue: 'Lab 4, CSE Block',
    shortDescription: '5-day intensive workshop covering LSTM, Transformers, CUDA, and RL.',
    description: 'A comprehensive 5-day deep dive into Machine Learning. We moved beyond the basics to cover LSTMs, the architecture of Transformers, an introduction to GPU programming with CUDA, and the fundamentals of Reinforcement Learning. Highly practical and code-heavy.',
    agenda: [
      { time: 'Day 1', title: 'Introduction & Basics', detail: 'Setting the groundwork.' },
      { time: 'Day 2', title: 'Time Series & LSTMs', detail: 'Handling sequential data.' },
      { time: 'Day 3', title: 'Transformers', detail: 'Attention is all you need.' },
      { time: 'Day 4', title: 'Intro to CUDA', detail: 'Accelerating workloads on the GPU.' },
      { time: 'Day 5', title: 'Reinforcement Learning', detail: 'Teaching agents to play games.' },
    ],
    whoCanAttend: [
      'Students with intermediate Python knowledge.',
      'Those interested in advanced AI/ML topics.',
    ],
    isUpcoming: false,
  },
  {
    slug: 'solana-bootcamp',
    name: 'Solana Bootcamp',
    type: 'Bootcamp',
    date: '22 Apr',
    time: '10:00 AM – 05:00 PM',
    venue: 'Seminar Hall',
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
  },
  {
    slug: 'ui-ux-ai-workshop',
    name: 'UI/UX & AI Workshop',
    type: 'Workshop',
    date: '14 May',
    time: '02:00 PM – 05:00 PM',
    venue: 'Design Studio',
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
  },
  {
    slug: 'algo-trading-sprint',
    name: 'Algo Trading Sprint',
    type: 'Competition',
    date: '28 May',
    time: '09:00 AM – 06:00 PM',
    venue: 'Lab 2',
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
  },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug);
}
