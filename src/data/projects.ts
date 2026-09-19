export interface Project {
  slug: string;
  title: string;
  description: string;
  overview: string;
  challenge: string;
  approach: string;
  outcome: string;
  /** The first image is used as the project-card preview. */
  images: string[];
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
    images: [
      '/assets/works/ezcrack/ezcrack-1.jpeg',
      '/assets/works/ezcrack/ezcrack-2.jpeg',
      '/assets/works/ezcrack/ezcrack-3.jpeg',
    ],
    domains: ['Development'],
    tech: ['JavaScript', 'Node.js'],
    contributors: ['Team Byte'],
    links: {
      detail: '/projects/ezcrack',
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
    images: ['/assets/works/hopoff/WhatsApp%20Image%202026-09-13%20at%2019.49.10.jpeg'],
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
    images: [
      '/assets/works/bunkmait/bunkmait-1.jpeg',
      '/assets/works/bunkmait/bunkmait-mobile.jpeg',
    ],
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
    images: ['/assets/works/scrape-2-sim/scrape-2-sim.jpeg'],
    domains: ['AI/ML', 'Development'],
    tech: ['Python', 'TensorFlow', 'Scrapy'],
    contributors: ['Team Byte'],
    links: {
      detail: '/projects/scrape2sim',
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
