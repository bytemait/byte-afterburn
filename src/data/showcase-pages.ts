export interface ShowcaseMetaItem {
  value: string;
  label: string;
}

export interface ShowcaseSection {
  title: string;
  paragraphs: string[];
}

export interface ShowcaseImage {
  src: string;
  alt: string;
  position?: string;
}

export interface ShowcaseFaq {
  question: string;
  answer: string;
}

export interface ShowcasePageData {
  slug: string;
  kind: 'work' | 'service';
  title: string;
  meta: [ShowcaseMetaItem, ShowcaseMetaItem];
  hero: ShowcaseImage;
  sections: [ShowcaseSection, ShowcaseSection, ShowcaseSection];
  gallery: [ShowcaseImage, ShowcaseImage];
  closingImage?: ShowcaseImage;
  ctaTitle?: string;
  ctaBody?: string;
  faqs?: ShowcaseFaq[];
}

const workImage = (name: string, alt: string, position = 'center'): ShowcaseImage => ({
  src: `/portx/original/${name}.webp`,
  alt,
  position,
});

const work = (
  slug: string,
  title: string,
  focus: string,
  distinction: string,
  summary: string,
  method: string,
  outcome: string,
): ShowcasePageData => {
  const image = workImage(slug, `${title} project preview`);
  return {
    slug,
    kind: 'work',
    title,
    meta: [
      { value: distinction, label: 'Project distinction' },
      { value: focus, label: 'Project focus' },
    ],
    hero: image,
    sections: [
      { title: 'The build', paragraphs: [summary] },
      { title: 'How we worked', paragraphs: [method] },
      { title: 'What it unlocked', paragraphs: [outcome] },
    ],
    gallery: [
      { ...image, alt: `${title} interface detail`, position: 'left center' },
      { ...image, alt: `${title} system detail`, position: 'right center' },
    ],
    closingImage: { ...image, alt: `${title} final overview` },
  };
};

export const workPages: ShowcasePageData[] = [
  work(
    'agencify',
    'OPENAI CODEX HACKATHON',
    'Hackathon, Artificial Intelligence',
    'First place',
    'A rapid AI build shaped around a clear problem, a working prototype, and a presentation that made the technical idea easy to understand.',
    'The team compressed research, product decisions, implementation, and testing into the hackathon window. Small feedback loops kept the idea focused while Codex accelerated the path from intent to a demonstrable system.',
    'The project earned first place and gave the team a repeatable way to move from an ambitious prompt to a convincing, tested prototype under pressure.',
  ),
  work(
    'antony',
    'EZCRACK',
    'Project, Development',
    'Member project',
    'EZCrack is a development project built around making a complicated workflow feel direct, legible, and useful from the first interaction.',
    'The build started with the smallest complete user path. The team then tightened the interface, separated reusable pieces, and tested the points where a user could lose context.',
    'The result is a focused product foundation that can grow without losing the clarity of its original flow.',
  ),
  work(
    'zcf',
    'LAM RESEARCH HACKATHON',
    'Hackathon, Mechatronics',
    'First place',
    'A first-place mechatronics prototype combining physical systems, fast iteration, and a practical response to the challenge brief.',
    'Mechanical, electronic, and software decisions were developed together so the prototype behaved as one system. Each iteration was judged by what could be demonstrated reliably.',
    'The finished prototype won first place and showed how Byte teams connect disciplines when the deadline is short and the build has to work in the real world.',
  ),
  work(
    'candreva',
    'CLICKPIC',
    'Project, Development',
    'Member project',
    'ClickPic explores an image-first product flow where capture, selection, and action stay quick and visually clear.',
    'The team reduced the experience to a small set of confident interactions, then refined feedback, responsive behavior, and the transitions between each step.',
    'The project became a compact example of how thoughtful interface work can make a familiar action feel faster and more deliberate.',
  ),
  work(
    'sotto',
    'BUNKMAIT',
    'Project, Development',
    'Member project',
    'BunkMAIT turns a recurring student need into a straightforward digital tool designed for the rhythms of campus life.',
    'The build focused on the information students need at a glance, with a structure that stays usable on small screens and remains easy to maintain as requirements change.',
    'It demonstrates Byte’s preference for useful software: specific, understandable, and close to the people it is made for.',
  ),
  work(
    'tesla',
    'SCRAPE2SIM',
    'Machine Learning, Project',
    'Member project',
    'Scrape2Sim explores how collected data can be cleaned, interpreted, and turned into inputs for useful simulation workflows.',
    'The team treated data collection, model assumptions, and simulation output as one pipeline. Each stage exposed enough information to inspect results and correct weak inputs.',
    'The project provides a practical base for experiments that connect web data, machine learning, and simulation.',
  ),
  work(
    'bruno',
    'DRONE AHH',
    'Project, Mechatronics',
    'Member project',
    'Drone ahh is a hands-on mechatronics build that brings together a physical airframe, electronics, control logic, and repeated flight testing.',
    'The team developed the system through short build-and-test cycles, using each run to isolate instability and improve the next mechanical or software decision.',
    'The result captures the practical side of Byte: learning happens through a machine that has to leave the desk and perform.',
  ),
];

const service = (
  slug: string,
  title: string,
  imageName: string,
  capabilities: string,
  intro: string,
  practice: string,
  takeaways: string,
): ShowcasePageData => {
  const image = workImage(imageName, `${title} department preview`);
  return {
    slug,
    kind: 'service',
    title,
    meta: [
      { value: 'Open to curious builders', label: 'Who it is for' },
      { value: capabilities, label: 'What we explore' },
    ],
    hero: image,
    sections: [
      { title: 'The department', paragraphs: [intro] },
      { title: 'How we learn', paragraphs: [practice] },
      { title: 'What you leave with', paragraphs: [takeaways] },
    ],
    gallery: [
      { ...image, alt: `${title} workshop detail`, position: 'left center' },
      { ...image, alt: `${title} project detail`, position: 'right center' },
    ],
    closingImage: { ...image, alt: `${title} department overview` },
    ctaTitle: 'BUILD WITH BYTE',
    ctaBody: 'Bring your curiosity. We’ll help you find the people, tools, and first task that get your idea moving.',
  };
};

export const servicePages: ShowcasePageData[] = [
  service('branding', 'OUTREACH', 'service-brand', 'Community, identity, communication', 'Outreach gives Byte a clear public voice and turns technical work into stories, events, and invitations people can connect with.', 'Members learn by planning campaigns, shaping visual systems, documenting projects, and working alongside every technical department.', 'A stronger eye for communication, a body of real creative work, and experience helping a technical community grow.'),
  service('ui-ux', 'UI/UX', 'service-ui', 'Research, interfaces, prototypes', 'UI/UX brings structure and clarity to the products Byte builds. The department studies real users, maps flows, and gives complex systems an interface people can trust.', 'Work moves from questions and rough wireframes to interactive prototypes and tested visual systems. Critique is part of the process, so decisions stay explainable.', 'Practical product thinking, stronger visual judgment, and interfaces ready to hand to a development team.'),
  service('framer', 'DEVELOPMENT', 'service-framer', 'Web, mobile, software systems', 'Development is where ideas become dependable software. Members work across web, mobile, tooling, and the systems that hold a product together.', 'Projects are broken into small, reviewable pieces. Members pair up, read each other’s code, ship often, and learn how product choices affect technical structure.', 'Working software, stronger engineering habits, and experience collaborating through the full life of a build.'),
  service('animation', 'AI/ML', 'service-motion', 'Models, data, intelligent systems', 'AI/ML explores how data and models can solve useful problems while keeping assumptions, limitations, and outcomes visible.', 'Members learn through experiments: prepare data, establish a baseline, evaluate results, and turn the promising parts into a product or research prototype.', 'A grounded machine-learning workflow, sharper evaluation skills, and projects that connect models to real use cases.'),
];

export const defaultFaqs: ShowcaseFaq[] = [
  { question: 'Do I need experience before I join?', answer: 'No. Byte is built for learning in public. Start with what you know, choose a small task, and work alongside members who can help you move forward.' },
  { question: 'How do I get involved in a project?', answer: 'Join a department session or contact the team. We match new members with an active build, a useful first task, and someone who can review the work.' },
  { question: 'Can I work across departments?', answer: 'Yes. Many Byte projects need software, design, hardware, AI, and communication at the same time. Members are encouraged to cross those boundaries.' },
  { question: 'How much time should I expect to give?', answer: 'It depends on the build. Teams agree on a realistic rhythm before work begins, and most tasks are scoped so progress stays visible alongside classes.' },
  { question: 'Can I propose my own idea?', answer: 'Yes. Bring the problem, the people it matters to, and the smallest version worth testing. Byte can help shape the idea and find collaborators.' },
  { question: 'How can an organization collaborate with Byte?', answer: 'Use the contact page to share the challenge, timeline, and kind of support you need. The team will reply with a practical next step.' },
];

