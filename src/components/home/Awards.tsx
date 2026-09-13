import React from 'react';

type Award = {
  organization: string;
  recognition: string;
  project: string;
  image: string;
  href?: string;
};

const AWARDS: Award[] = [
  {
    organization: 'BYTE EVENT',
    recognition: 'CODE SPRINT',
    project: 'OpenAI Codex Hackathon',
    image: 'https://framerusercontent.com/images/uUKYhUgBYFVMIYb0oOAX8sBls4.jpg?width=2672&height=112',
  },
  {
    organization: 'BYTE WORKSHOP',
    recognition: 'BUILD LAB',
    project: 'AI & Machine Learning',
    image: 'https://framerusercontent.com/images/KYLMw4mXJWgNZfUZZWIUgDy08Wg.jpg?width=2672&height=112',
  },
  {
    organization: 'BYTE MEETUP',
    recognition: 'DEMO NIGHT',
    project: 'Member Projects',
    image: 'https://framerusercontent.com/images/xF5y7ik9XpvK5cdKYiNO7H93tiE.jpg?width=2672&height=112',
  },
  {
    organization: 'BYTE SESSION',
    recognition: 'TECH TALK',
    project: 'Tools, Systems & Ideas',
    image: 'https://framerusercontent.com/images/lQA0cL8JAB45ec2izKEWeoitrM.jpg?width=2672&height=112',
  },
  {
    organization: 'BYTE COMMUNITY',
    recognition: 'OPEN BUILD',
    project: 'Ideas Into Prototypes',
    image: 'https://framerusercontent.com/images/4AfUgovkqN3hl7roJxqlMvjLV8.jpg?width=2672&height=112',
  },
];

/** Recreates the Framer awards stack: a hinged 3D face exposes its image strip on interaction. */
export default function Awards() {
  return (
    <section className="awards-section" aria-labelledby="events-title">
      <div className="awards-container">
        <div className="awards-header-bar">
          <span aria-hidden="true">//</span>
          <h2 id="events-title">EVENTS</h2>
          <span aria-hidden="true">//</span>
        </div>

        <p className="awards-intro">
          Byte events are where ideas find collaborators, prototypes get tested, and members learn by making. Drop into a session, bring a question, or start a build with us.
        </p>

        <div className="awards-list">
          {AWARDS.map((award) => (
            <a
              className="award-card"
              data-scroll-hover
              href={award.href}
              key={`${award.organization}-${award.recognition}`}
              rel={award.href ? 'noreferrer' : undefined}
              tabIndex={0}
              target={award.href ? '_blank' : undefined}
            >
              <div className="award-card-content">
                <div className="award-card-peek" aria-hidden="true">
                  <img alt="" src={award.image} />
                </div>
                <span className="award-organization">{award.organization}</span>
                <strong>{award.recognition}</strong>
                <span className="award-project">{award.project}</span>
              </div>
            </a>
          ))}
        </div>

        <p className="awards-footnote">
          From quick workshops to ambitious hackathons, every event is an open invitation to build something new.
        </p>
      </div>

      <style>{`
        .awards-section {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          padding: 0 72px 120px;
          color: #fff;
          position: relative;
        }

        .awards-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 96px;
        }

        .awards-header-bar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgb(51, 51, 51);
        }

        .awards-header-bar h2 {
          margin: 0;
          color: var(--byte-accent-bright, #52e0a6);
          font-family: 'Clash Display', sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 24px;
        }

        .awards-header-bar span {
          color: var(--byte-accent, #22c579);
          font-family: 'Inter', sans-serif;
          font-size: 18px;
        }

        .awards-intro,
        .awards-footnote {
          max-width: 636px;
          margin: 0;
          color: #d9e5df;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.45;
          text-align: center;
        }

        .awards-list {
          width: min(100%, 1296px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          perspective: 1200px;
        }

        .award-card {
          display: block;
          height: 96px;
          color: inherit;
          cursor: pointer;
          outline: none;
          position: relative;
          text-decoration: none;
          transform-style: preserve-3d;
        }

        .award-card-content {
          height: 100%;
          display: grid;
          grid-template-columns: 180px 1fr 180px;
          align-items: center;
          gap: 16px;
          padding: 0 32px;
          background: #1b1b1b;
          position: relative;
          transform-origin: center bottom;
          transform-style: preserve-3d;
          transition: transform 560ms cubic-bezier(0.16, 1, 0.3, 1), background-color 260ms ease;
        }

        .award-card-peek {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
          opacity: 0;
          transform: rotateX(-90deg);
          transform-origin: center top;
          transform-style: preserve-3d;
          transition: opacity 100ms linear;
        }

        .award-card-peek img {
          width: 100%;
          height: 112px;
          display: block;
          object-fit: cover;
          transform: rotateX(180deg);
          transform-origin: center;
        }

        .award-organization,
        .award-project,
        .award-card strong {
          position: relative;
          z-index: 2;
          transition: color 240ms ease;
        }

        .award-organization,
        .award-project {
          color: #8b8b8b;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.2;
        }

        .award-project { text-align: right; }

        .award-card strong {
          color: #8b8b8b;
          font-family: 'Clash Display', sans-serif;
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1;
          text-align: center;
        }

        .award-card:hover .award-card-content,
        .award-card:focus-visible .award-card-content,
        .award-card.is-scroll-hover .award-card-content {
          background: #202320;
          transform: rotateX(-45deg);
        }

        .award-card:hover .award-card-peek,
        .award-card:focus-visible .award-card-peek,
        .award-card.is-scroll-hover .award-card-peek { opacity: 1; }

        .award-card:hover .award-organization,
        .award-card:hover .award-project,
        .award-card:hover strong,
        .award-card:focus-visible .award-organization,
        .award-card:focus-visible .award-project,
        .award-card:focus-visible strong,
        .award-card.is-scroll-hover .award-organization,
        .award-card.is-scroll-hover .award-project,
        .award-card.is-scroll-hover strong {
          color: #fff;
        }

        .award-card:focus-visible { outline: 2px solid var(--byte-accent-bright, #52e0a6); outline-offset: 6px; }

        .awards-footnote { color: #9ab0a4; }

        @media (min-width: 810px) and (max-width: 1439.98px) {
          .awards-section { padding: 0 40px 100px; }
        }

        @media (max-width: 809.98px) {
          .awards-section { padding: 0 20px 80px; }
          .awards-container { gap: 60px; }
          .awards-intro { font-size: 13px; }
          .award-card-content { grid-template-columns: 1fr 1.65fr; padding: 0 10px; }
          .award-project { display: none; }
          .award-card strong { font-size: 19px; text-align: right; }
          .award-organization { font-size: 14px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .award-card-content { transition: background-color 120ms linear; }
          .award-card-peek { display: none; }
          .award-card:hover .award-card-content,
          .award-card:focus-visible .award-card-content,
          .award-card.is-scroll-hover .award-card-content { transform: none; background: #202320; }
        }
      `}</style>
    </section>
  );
}
