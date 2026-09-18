export interface Project {
  slug: string;
  title: string;
  description: string;
  overview: string;
  challenge: string;
  approach: string;
  outcome: string;
  image?: string;
  domains: string[];
  tech: string[];
  contributors: string[];
  links?: {
    github?: string;
    live?: string;
    detail?: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'codex-26',
    title: 'OpenAI Codex Hackathon',
    description:
      'A rapid AI build shaped around a clear problem, a working prototype, and a presentation that made the technical idea easy to understand. Earned first place.',
    overview:
      'OpenAI Codex Hackathon was a fast-paced product build in which Team Byte translated an AI-focused brief into a working prototype and a clear story for the judges. The project balanced the technical work with a deliberately simple user journey, so the value of the idea could be understood in a live demonstration rather than only in a pitch.',
    challenge:
      'The central challenge was making strong product decisions with very little time. The team needed to identify a meaningful problem, keep the first version narrow enough to finish, and communicate how the AI component improved the experience without turning the demo into a black box.',
    approach:
      'Using Python and the OpenAI API, the team iterated from a focused problem statement to a testable prototype. Short feedback loops guided the build: define the smallest useful interaction, validate the output, refine the flow, and prepare the explanation alongside the product.',
    outcome:
      'The final prototype earned first place. Beyond the result, it gave Team Byte a repeatable playbook for building AI products under pressure: scope tightly, make the system demonstrable, and explain the technology in terms of the person using it.',
    image: '/assets/codex_26.webp',
    domains: ['AI/ML', 'Hackathon'],
    tech: ['Python', 'OpenAI API'],
    contributors: ['Team Byte'],
    links: {
      detail: '/projects/codex-26',
      github: 'https://github.com/bytemait',
    },
  },
  {
    slug: 'ezcrack',
    title: 'EZCrack',
    description:
      'A development project built around making a complicated workflow feel direct, legible, and useful from the first interaction.',
    overview:
      'EZCrack is a study-support project designed to make exam preparation more deliberate. It brings high-impact study material, topic weightage, and frequently repeated questions into a clearer workflow, helping students decide what deserves attention instead of piecing that information together on their own.',
    challenge:
      'Exam preparation often becomes overwhelming when useful material is scattered and priorities are unclear. The product needed to reduce that friction without adding another complicated dashboard or hiding the information students need most.',
    approach:
      'The team used JavaScript and Node.js to build around the smallest complete study path: find the relevant material, understand its importance, and act on it. The interface and supporting logic were refined to keep context visible and make the experience easy to return to during a busy semester.',
    outcome:
      'EZCrack establishes a focused foundation for a practical student tool. Its value is in converting a broad, stressful workflow into a sequence of understandable choices that can grow as more learning resources and insights are added.',
    image: '/assets/ezcrack.webp',
    domains: ['Development'],
    tech: ['JavaScript', 'Node.js'],
    contributors: ['Team Byte'],
    links: {
      detail: '/projects/ezcrack',
      github: 'https://github.com/bytemait',
    },
  },
  {
    slug: 'lam-research-26',
    title: 'Lam Research Hackathon',
    description:
      'A first-place mechatronics prototype combining physical systems, fast iteration, and a practical response to the challenge brief.',
    overview:
      'For the Lam Research Hackathon, Team Byte developed a first-place mechatronics prototype that brought mechanical design, electronics, and embedded control together as one demonstrable system. The work was shaped around a practical response to the competition brief rather than a purely conceptual solution.',
    challenge:
      'The team had to make components from different disciplines behave reliably together on a compressed timeline. A promising design was only useful if it could be assembled, tested, adjusted, and demonstrated consistently in the real world.',
    approach:
      'The prototype combined CAD for physical design with Arduino and C++ for control. Mechanical, electrical, and software choices were iterated in parallel, with each change evaluated against the end-to-end behaviour of the system and the needs of the final demonstration.',
    outcome:
      'The finished prototype won first place. It demonstrated the team’s ability to connect disciplines, make trade-offs quickly, and turn an engineering brief into a working physical build.',
    image: '/assets/lam_research_26.webp',
    domains: ['Mechatronics', 'Hackathon'],
    tech: ['Arduino', 'C++', 'CAD'],
    contributors: ['Team Byte'],
    links: {
      detail: '/projects/lam-research-26',
      github: 'https://github.com/bytemait',
    },
  },
  {
    slug: 'hopoff',
    title: 'HopOff!',
    description:
      'Helps Delhi Metro riders avoid missing their stops with customizable location alerts, sound, and haptics.',
    overview:
      'HopOff! is a mobile companion for Delhi Metro riders who want a reliable reminder before their destination. A rider sets an intended stop and receives a timely alert through configurable notifications, sound, and haptics—useful when a commute includes crowds, fatigue, or a moment of distraction.',
    challenge:
      'Missing a stop is a small but familiar commuter problem, and the solution has to be simple enough to configure quickly. The experience needed to make its purpose obvious while giving riders control over how they are notified.',
    approach:
      'Built with React Native and TypeScript, HopOff! focuses on a cross-platform, mobile-first flow: set the destination, choose notification preferences, and receive the alert at the right moment. The team kept the interaction model concise so it supports a commute rather than competing for attention.',
    outcome:
      'HopOff! turns a common travel worry into a focused utility. It shows how a small, well-scoped mobile experience can make everyday transit feel more predictable for its users.',
    image: '/assets/hopoff.webp',
    domains: ['Development', 'Mobile'],
    tech: ['React Native', 'TypeScript'],
    contributors: ['Team Byte'],
    links: {
      detail: '/projects/hopoff',
      github: 'https://github.com/bytemait',
    },
  },
  {
    slug: 'bunkmait',
    title: 'BunkMAIT',
    description:
      'Turns a recurring student need into a straightforward digital tool designed for the rhythms of campus life.',
    overview:
      'BunkMAIT is a free attendance calculator for students. It loads a timetable, tracks attended classes, and helps students understand how many classes they can safely miss while staying aligned with their attendance requirements.',
    challenge:
      'Attendance planning is repetitive and easy to get wrong when timetables, past attendance, and changing class schedules are kept separately. The project needed to turn those moving parts into an answer students could understand at a glance.',
    approach:
      'The team built BunkMAIT with React and Node.js around the information students check most often: their timetable, current attendance position, and the practical effect of attending or missing a class. The design prioritises quick scanning and a structure that remains usable on smaller screens.',
    outcome:
      'BunkMAIT makes a routine campus calculation more transparent and actionable. It is an example of Team Byte building for a specific community need with software that is direct, useful, and easy to revisit.',
    image: '/assets/bunkmait.webp',
    domains: ['Development'],
    tech: ['React', 'Node.js'],
    contributors: ['Team Byte'],
    links: {
      detail: '/projects/bunkmait',
      github: 'https://github.com/bytemait',
    },
  },
  {
    slug: 'scrape2sim',
    title: 'Scrape2Sim',
    description:
      'Explores how collected data can be cleaned, interpreted, and turned into inputs for useful simulation workflows.',
    overview:
      'Scrape2Sim explores an end-to-end workflow for turning web-collected data into useful simulation inputs. It connects collection, cleaning, interpretation, and modelling so that a raw external dataset can become something structured enough to inspect and experiment with.',
    challenge:
      'Data collected from the web is rarely ready for modelling. The team needed to account for inconsistent inputs, make the assumptions in the pipeline visible, and ensure that the simulation remained connected to the quality of the data feeding it.',
    approach:
      'Using Python, Scrapy, and TensorFlow, the project treats collection, processing, and simulation as connected stages. Each stage is designed to make weak inputs easier to spot and correct before they distort the resulting model or experiment.',
    outcome:
      'Scrape2Sim provides a practical base for experiments at the intersection of web data, machine learning, and simulation. Its emphasis on traceable stages makes it easier to refine the system as better data and modelling ideas emerge.',
    image: '/assets/scrape2sim.webp',
    domains: ['AI/ML', 'Development'],
    tech: ['Python', 'TensorFlow', 'Scrapy'],
    contributors: ['Team Byte'],
    links: {
      detail: '/projects/scrape2sim',
      github: 'https://github.com/bytemait',
    },
  },
  {
    slug: 'hack-iitk',
    title: 'Hack IIT Kanpur',
    description:
      'Team Byte won first place in the cybersecurity solution track at HACK IITK 2025, held at IIT Kanpur.',
    overview:
      'At HACK IITK 2025, held at IIT Kanpur, Team Byte built a cybersecurity solution for the competition’s security track. The project was developed as a response to a live hackathon brief, where investigation, a defensible technical approach, and a clear demonstration all mattered.',
    challenge:
      'Cybersecurity problems demand both careful reasoning and fast delivery. The team had to understand the challenge, decide where a prototype could create the most value, and present the solution in a way that made its security contribution clear to evaluators.',
    approach:
      'Working with Python and networking concepts, the team combined investigation with rapid prototyping. The build was continually tested against the challenge requirements, while the final presentation focused on explaining the problem, the solution’s behaviour, and the reasoning behind it.',
    outcome:
      'Team Byte won first place in the cybersecurity solution track. The result highlights the team’s ability to turn a difficult security brief into a practical, explainable solution under hackathon conditions.',
    image: '/assets/hack-iitk.webp',
    domains: ['Cybersecurity', 'Hackathon'],
    tech: ['Python', 'Networking'],
    contributors: ['Team Byte'],
    links: {
      detail: '/projects/hack-iitk',
      github: 'https://github.com/bytemait',
    },
  },
];

/** Get all unique values for a given tag field across all projects. */
export function getUniqueTags(field: 'domains' | 'tech'): string[] {
  const set = new Set<string>();
  for (const project of projects) {
    for (const tag of project[field]) {
      set.add(tag);
    }
  }
  return [...set].sort();
}
