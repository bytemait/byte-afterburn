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
}

export const events: EventItem[] = [
  {
    slug: 'web-dev-workshop-2026',
    name: 'Web Dev Workshop 2026',
    type: 'Workshop',
    date: '12 Sep',
    time: '06:00 PM – 08:00 PM',
    venue: 'Seminar Hall, CSE Block',
    shortDescription: 'Hands-on workshop on modern web development technologies and best practices.',
    description: "A hands-on evening workshop covering modern web development — from responsive layouts to building and shipping a small project with today's tooling. Whether you've never written a line of HTML or you're already comfortable with the basics, you'll leave with a working project and a clear next step for going further.",
    agenda: [
      { time: '06:00 PM', title: 'Welcome & setup check', detail: 'Quick intros and making sure everyone has their editor and tools ready.' },
      { time: '06:15 PM', title: 'HTML, CSS & layout fundamentals', detail: 'Building a responsive page from scratch using modern CSS.' },
      { time: '07:00 PM', title: 'Adding interactivity with JavaScript', detail: 'DOM basics, events, and a small interactive component.' },
      { time: '07:40 PM', title: 'Build-along project & wrap-up', detail: 'Putting it together, Q&A, and resources to keep learning.' },
    ],
    whoCanAttend: [
      'Open to all years and branches — no prior web development experience required.',
      'Bring your own laptop with a code editor (VS Code recommended) installed.',
      'Best suited for beginners and anyone looking to refresh the fundamentals.',
    ],
  },
  {
    slug: 'hack-the-future-hackathon',
    name: 'Hack The Future Hackathon',
    type: 'Competition',
    date: '20 Sep',
    time: '09:00 AM – 06:00 PM',
    venue: 'Auditorium, Main Block',
    shortDescription: '24-hour hackathon to build innovative solutions for real-world problems.',
    description: 'A full-day hackathon where teams design, build and pitch a working prototype that tackles a real-world problem. Expect mentorship drop-ins throughout the day, a stocked hacker lounge, and a live demo session in front of judges and the wider B.Y.T.E. community at the end.',
    agenda: [
      { time: '09:00 AM', title: 'Check-in & team formation', detail: 'Solo? We’ll help you find a team on the spot.' },
      { time: '09:45 AM', title: 'Problem statements reveal', detail: 'Themes announced, hacking officially begins.' },
      { time: '01:00 PM', title: 'Mentor rounds', detail: 'Rotating mentors from the core team check in with every table.' },
      { time: '04:30 PM', title: 'Submissions close', detail: 'Final builds locked, demo prep begins.' },
      { time: '05:00 PM', title: 'Demos & judging', detail: 'Each team gets 3 minutes on stage to pitch.' },
      { time: '06:00 PM', title: 'Results & closing', detail: 'Winners announced, prizes distributed.' },
    ],
    whoCanAttend: [
      'Open to all students — teams of 2 to 4 members (solo entries welcome too).',
      'Any tech stack is fine; come with a laptop and charger.',
      'Some prior coding experience is helpful but not mandatory — beginners are paired with mentors.',
    ],
  },
  {
    slug: 'ai-ml-hands-on-session',
    name: 'AI/ML Hands-on Session',
    type: 'Workshop',
    date: '04 Oct',
    time: '04:00 PM – 07:00 PM',
    venue: 'Lab 3, CSE Block',
    shortDescription: 'Practical session to get started with AI/ML models and real-world applications.',
    description: 'A practical, lab-based session on getting started with machine learning — from cleaning a dataset to training and evaluating your first model. The focus is on intuition and hands-on practice over heavy theory, using free, beginner-friendly tools you can keep using afterwards.',
    agenda: [
      { time: '04:00 PM', title: 'ML in plain terms', detail: 'A quick, jargon-free tour of what machine learning actually does.' },
      { time: '04:30 PM', title: 'Working with a real dataset', detail: 'Cleaning and exploring data before modelling.' },
      { time: '05:15 PM', title: 'Training your first model', detail: 'Hands-on notebook walkthrough, step by step.' },
      { time: '06:15 PM', title: 'Evaluating & improving results', detail: 'Reading metrics and simple ways to do better.' },
      { time: '06:45 PM', title: 'Where to go next', detail: 'Project ideas and resources for continued learning.' },
    ],
    whoCanAttend: [
      'Open to all years — basic Python familiarity is recommended but not required.',
      'Laptops will be available in the lab; bring your own if you prefer your own setup.',
      'Great for beginners curious about AI/ML as well as those wanting a practical refresher.',
    ],
  },
  {
    slug: 'tech-talk-future-of-technology',
    name: 'Tech Talk: Future of Technology',
    type: 'Tech Talk',
    date: '18 Oct',
    time: '11:00 AM – 01:00 PM',
    venue: 'Seminar Hall, CSE Block',
    shortDescription: 'Expert talk and discussion on upcoming technologies and career opportunities.',
    description: 'An open talk and discussion on where technology is heading next — covering emerging tools, shifting career paths, and what to focus on as a student trying to stay ahead of the curve. The second half opens up into an informal Q&A, so bring your questions.',
    agenda: [
      { time: '11:00 AM', title: 'Opening talk', detail: 'Where the industry is moving and why it matters for students.' },
      { time: '11:45 AM', title: 'Career paths panel', detail: 'A grounded look at different routes into tech careers.' },
      { time: '12:20 PM', title: 'Open Q&A', detail: 'Ask anything — career, technology, or getting started.' },
      { time: '12:50 PM', title: 'Networking & closing', detail: 'Informal conversation over refreshments.' },
    ],
    whoCanAttend: [
      'Open to all students, regardless of branch or year.',
      'No technical background required — the talk is aimed at a general student audience.',
      'Especially useful for those exploring career directions in tech.',
    ],
  },
];

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((event) => event.slug === slug);
}
