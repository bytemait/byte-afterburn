import React from 'react';

export interface ProjectItem {
  id: string;
  name: string;
  tags: string[];
  description: string;
  descriptionSide: 'left' | 'right';
  imageSrc: string;
  cardWidth: number;   // exact desktop card width in px
  cardHeight: number;  // exact desktop total card height in px
  mediaHeight: number; // exact desktop image box height in px
  link?: string;
}

const PROJECTS: ProjectItem[] = [
  // Row 1
  {
    id: 'openai-codex-hackathon',
    name: 'OpenAI Codex Hackathon, 1st Place',
    tags: ['Hackathon', 'AI'],
    description: 'A first-place AI hackathon project built with Codex.',
    descriptionSide: 'right',
    imageSrc: '/portx/original/agencify.webp',
    cardWidth: 648,
    cardHeight: 598,
    mediaHeight: 480,
    link: '/members'
  },
  {
    id: 'ezcrack',
    name: 'EZCrack',
    tags: ['Project', 'Development'],
    description: 'A development project shaped around a clear, useful product experience.',
    descriptionSide: 'left',
    imageSrc: '/portx/original/antony.webp',
    cardWidth: 311,
    cardHeight: 424,
    mediaHeight: 306,
    link: '/members'
  },
  // Row 2
  {
    id: 'lam-research-hackathon',
    name: 'LAM Research Hackathon, 1st Place',
    tags: ['Hackathon', 'Mechatronics'],
    description: 'A first-place mechatronics hackathon project for LAM Research.',
    descriptionSide: 'left',
    imageSrc: '/portx/original/zcf.webp',
    cardWidth: 972,
    cardHeight: 847,
    mediaHeight: 729,
    link: '/members'
  },
  // Row 3
  {
    id: 'clickpic',
    name: 'ClickPic',
    tags: ['Project', 'Development'],
    description: 'A development project exploring image-first interaction and product flow.',
    descriptionSide: 'right',
    imageSrc: '/portx/original/candreva.webp',
    cardWidth: 635,
    cardHeight: 598,
    mediaHeight: 480,
    link: '/members'
  },
  // Row 4
  {
    id: 'bunkmait',
    name: 'BunkMAIT',
    tags: ['Project', 'Development'],
    description: 'A development project built for the BunkMAIT initiative.',
    descriptionSide: 'right',
    imageSrc: '/portx/original/sotto.webp',
    cardWidth: 311,
    cardHeight: 424,
    mediaHeight: 306,
    link: '/members'
  },
  {
    id: 'scrape2sim',
    name: 'Scrape2Sim',
    tags: ['Machine Learning', 'Project'],
    description: 'A machine learning project built around turning data into useful simulation workflows.',
    descriptionSide: 'left',
    imageSrc: '/portx/original/tesla.webp',
    cardWidth: 635,
    cardHeight: 598,
    mediaHeight: 480,
    link: '/members'
  },
  // Row 5
  {
    id: 'drone-ahh',
    name: 'Drone ahh',
    tags: ['Project', 'Mechatronics'],
    description: 'A mechatronics project built around a drone-focused physical system.',
    descriptionSide: 'right',
    imageSrc: '/portx/original/bruno.webp',
    cardWidth: 972,
    cardHeight: 847,
    mediaHeight: 729,
    link: '/members'
  }
];

export default function Achievements() {
  return (
    <section className="achievements-section" aria-labelledby="achievements-title">
      <div className="achievements-container">
        {/* Top Header Bar */}
        <div className="achievements-header-bar">
          <span className="bracket" aria-hidden="true">//</span>
          <h6 id="achievements-title">OUR ACHIEVEMENTS</h6>
          <span className="bracket" aria-hidden="true">//</span>
        </div>

        {/* Subtitle */}
        <p className="achievements-subtitle">
          A snapshot of the ideas, experiments, and builds our members have brought to life<br className="desktop-br" />
          through collaboration, curiosity, and hands-on learning.
        </p>

        {/* 1:1 Framer Row Stream */}
        <div className="achievements-cards-stream">
          {/* Row 1: OpenAI Codex Hackathon (648px) + EZCrack (311px) space-between */}
          <div className="achievements-row row-1">
            <div className="slot-agencify">
              <ProjectCard project={PROJECTS[0]} />
            </div>
            <div className="slot-antony">
              <ProjectCard project={PROJECTS[1]} />
            </div>
          </div>

          {/* Row 2: LAM Research Hackathon (972px) aligned right */}
          <div className="achievements-row row-2">
            <div className="slot-zcf">
              <ProjectCard project={PROJECTS[2]} />
            </div>
          </div>

          {/* Row 3: ClickPic (635px) aligned center/left */}
          <div className="achievements-row row-3">
            <div className="slot-candreva">
              <ProjectCard project={PROJECTS[3]} />
            </div>
          </div>

          {/* Row 4: BunkMAIT (311px) + Scrape2Sim (635px) space-between */}
          <div className="achievements-row row-4">
            <div className="slot-sotto">
              <ProjectCard project={PROJECTS[4]} />
            </div>
            <div className="slot-tesla">
              <ProjectCard project={PROJECTS[5]} />
            </div>
          </div>

          {/* Row 5: Drone ahh (972px) aligned left */}
          <div className="achievements-row row-5">
            <div className="slot-bruno">
              <ProjectCard project={PROJECTS[6]} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @font-face {
          font-family: 'Clash Display';
          src: url('/portx/original/clash-600.woff2') format('woff2');
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }

        .achievements-section {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px 72px 120px;
          box-sizing: border-box;
          background: transparent;
          color: #ffffff;
          position: relative;
        }

        .achievements-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 96px;
          position: relative;
        }

        /* Top Header Bar */
        .achievements-header-bar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgb(51, 51, 51);
        }

        .achievements-header-bar h6 {
          margin: 0;
          font-family: 'Clash Display', 'Clash Display Placeholder', sans-serif;
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          color: var(--byte-accent-bright, #52e0a6);
          text-transform: uppercase;
        }

        .achievements-header-bar .bracket {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          color: var(--byte-accent, #22c579);
        }

        /* Subtitle */
        .achievements-subtitle {
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: #ffffff;
          text-align: center;
          max-width: 480px;
        }

        /* Stream Rows */
        .achievements-cards-stream {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 96px;
        }

        .achievements-row {
          width: 100%;
          display: flex;
          align-items: flex-start;
          position: relative;
        }

        .row-1 {
          justify-content: space-between;
        }

        .slot-agencify {
          width: 648px;
          flex: none;
        }

        .slot-antony {
          width: 311px;
          flex: none;
        }

        .row-2 {
          justify-content: flex-end;
        }

        .slot-zcf {
          width: 972px;
          flex: none;
        }

        .row-3 {
          justify-content: center;
        }

        .slot-candreva {
          width: 635px;
          flex: none;
        }

        .row-4 {
          justify-content: space-between;
        }

        .slot-sotto {
          width: 311px;
          flex: none;
        }

        .slot-tesla {
          width: 635px;
          flex: none;
        }

        .row-5 {
          justify-content: flex-start;
        }

        .slot-bruno {
          width: 972px;
          flex: none;
        }

        /* 1:1 Framer Work Card (n9gWCtj_B / framer-1vl1olx) */
        .framer-work-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 40px; /* Exact gap from Framer source */
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          position: relative;
          overflow: visible;
        }

        .achievement-description {
          display: none;
        }

        /* Top Media Box (framer-nmv76k) */
        .framer-card-top-media {
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: #181818;
          position: relative;
          will-change: transform;
        }

        /* Image (framer-1toigiv img) with exact scale: 1.2 on hover */
        .framer-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1);
          transform-origin: center center;
          /* Framer spring: damping 50, stiffness 300, mass 1 */
          transition: transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
          will-change: transform;
        }

        .framer-work-card:hover .framer-card-img,
        .framer-work-card.is-scroll-hover .framer-card-img {
          transform: scale(1.2); /* Exact zoom from Framer source variants */
        }

        /* Bottom Row (framer-jzwnh1) */
        .framer-card-bottom-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .framer-card-left-info {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .framer-card-title {
          margin: 0;
          font-family: 'Clash Display', 'Clash Display Placeholder', sans-serif;
          font-size: 24px;
          font-weight: 600;
          line-height: 1.2;
          color: #ffffff;
          text-transform: uppercase;
        }

        .framer-card-tags {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        /* Exact Framer Tag Pill (framer-ujVVB) */
        .framer-tag-pill {
          padding: 4px 10px;
          border-radius: 40px;
          border: 1px solid color-mix(in srgb, var(--byte-accent, #22c579) 46%, #333333);
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 400;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1;
        }

        /* Exact Framer Button (framer-16k7tse) */
        .framer-card-action-btn {
          width: 46px;
          height: 34px;
          padding: 11px 20px;
          box-sizing: border-box;
          border-radius: 64px;
          border: 1px solid var(--byte-accent, #22c579);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          transition: background-color 0.25s ease;
        }

        .framer-arrow-svg {
          width: 11px;
          height: 18px;
          fill: #ffffff;
          flex-shrink: 0;
          transition: fill 0.25s ease;
        }

        .framer-work-card:hover .framer-card-action-btn,
        .framer-work-card.is-scroll-hover .framer-card-action-btn {
          background-color: var(--byte-accent, #22c579);
        }

        .framer-work-card:hover .framer-arrow-svg,
        .framer-work-card.is-scroll-hover .framer-arrow-svg {
          fill: #060907;
        }

        /* Tablet Breakpoint (810px to 1439.98px) */
        @media (min-width: 810px) and (max-width: 1439.98px) {
          .achievements-section {
            padding: 0px 40px 100px;
          }
          .achievements-cards-stream {
            gap: 60px;
          }
          .achievements-row {
            flex-direction: column;
            gap: 60px;
          }
          .slot-agencify,
          .slot-antony,
          .slot-zcf,
          .slot-candreva,
          .slot-sotto,
          .slot-tesla,
          .slot-bruno {
            width: 100%;
          }
          .framer-card-top-media {
            height: 520px !important;
          }
        }

        @media (min-width: 1440px) {
          .achievement-description {
            display: block;
            position: absolute;
            top: var(--description-top);
            width: 250px;
            margin: 0;
            color: #c6d4cd;
            font-family: 'Inter', sans-serif;
            font-size: 17px;
            font-weight: 400;
            line-height: 1.48;
            letter-spacing: -0.01em;
            opacity: 0;
            filter: blur(7px);
            pointer-events: none;
            transition:
              opacity 320ms cubic-bezier(0.16, 1, 0.3, 1),
              filter 380ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .achievement-description[data-side='right'] {
            left: calc(100% + 48px);
            transform: translate(-14px, -50%);
          }

          .achievement-description[data-side='left'] {
            right: calc(100% + 48px);
            transform: translate(14px, -50%);
          }

          .framer-work-card:hover .achievement-description,
          .framer-work-card:focus-visible .achievement-description {
            opacity: 1;
            filter: blur(0);
            transform: translate(0, -50%);
          }
        }

        /* Mobile Breakpoint (<= 809.98px) */
        @media (max-width: 809.98px) {
          .achievements-section {
            padding: 0px 20px 80px;
          }
          .achievements-container {
            gap: 60px;
          }
          .achievements-cards-stream {
            gap: 60px;
          }
          .achievements-row {
            flex-direction: column;
            gap: 60px;
          }
          .slot-agencify,
          .slot-antony,
          .slot-zcf,
          .slot-candreva,
          .slot-sotto,
          .slot-tesla,
          .slot-bruno {
            width: 100%;
          }
          .framer-card-top-media {
            height: 340px !important;
          }
          .framer-card-title {
            font-size: 20px;
          }
          .desktop-br {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .framer-card-img {
            transition: none !important;
          }

          .achievement-description {
            filter: none !important;
            transition: opacity 120ms linear !important;
            transform: translate(0, -50%) !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <a
      href={project.link || '#'}
      className="framer-work-card"
      data-scroll-hover
      data-achievement-card
      style={{ height: `${project.cardHeight}px` }}
      aria-label={`View ${project.name} project`}
      aria-describedby={`${project.id}-description`}
    >
      {/* Top Image Media with exact height */}
      <div className="framer-card-top-media" style={{ height: `${project.mediaHeight}px` }}>
        <img
          src={project.imageSrc}
          alt={`${project.name} project preview`}
          className="framer-card-img"
          loading="lazy"
        />
      </div>

      {/* Bottom Info Row with exact gap: 40px from media */}
      <div className="framer-card-bottom-row">
        <div className="framer-card-left-info">
          <h4 className="framer-card-title">{project.name}</h4>
          <div className="framer-card-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="framer-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="framer-card-action-btn" aria-hidden="true">
          <svg className="framer-arrow-svg" viewBox="0 0 11 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M 1.727 0.211 L 0.648 1.289 L 8.359 9 L 0.648 16.711 L 1.727 17.789 L 9.977 9.539 L 10.492 9 L 9.977 8.461 Z" />
          </svg>
        </div>
      </div>

      <p
        id={`${project.id}-description`}
        className="achievement-description"
        data-mesh-frame
        data-side={project.descriptionSide}
        style={{ '--description-top': `${project.mediaHeight / 2}px` } as React.CSSProperties}
      >
        {project.description}
      </p>
    </a>
  );
}
