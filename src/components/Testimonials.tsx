import React, { useEffect, useRef, useState } from 'react';

interface TestimonialCardData {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
  logoSrc: string;
  logoWidth?: string;
  border?: string;
  height: string;
}

interface TestimonialsProps {
  spinningText?: string;
}

const CARDS: TestimonialCardData[] = [
  {
    id: 'card-1',
    quote: '"BYTE gave me the space to turn a rough idea into something I could actually demo."',
    name: 'Aarav Menon',
    role: 'MEMBER, DEVELOPMENT',
    avatarSrc: '/portx/original/avatar-1.svg',
    logoSrc: '/portx/original/logo-antony.svg',
    logoWidth: '24px',
    height: '280px'
  },
  {
    id: 'card-2',
    quote: '"The best part is finding people who are as excited to learn as they are to build."',
    name: 'Riya Shah',
    role: 'MEMBER, AI/ML',
    avatarSrc: '/portx/original/avatar-0.svg',
    logoSrc: '/portx/original/logo-agencify.svg',
    logoWidth: '84px',
    height: '292px'
  },
  {
    id: 'card-3',
    quote: '"Every event leaves me with a new tool, a new question, and a new reason to keep experimenting."',
    name: 'Kabir Rao',
    role: 'MEMBER, MECHATRONICS',
    avatarSrc: '/portx/original/avatar-2.svg',
    logoSrc: '/portx/original/logo-bruno.svg',
    logoWidth: '80px',
    height: '220px'
  },
  {
    id: 'card-4',
    quote: '"Byte makes technical work feel collaborative, practical, and genuinely fun."',
    name: 'Ishita Nair',
    role: 'MEMBER, CYBERSECURITY',
    avatarSrc: '/portx/original/avatar-3.svg',
    logoSrc: '/portx/original/logo-axior.svg',
    logoWidth: '84px',
    border: '1px solid rgb(51, 51, 51)',
    height: '196px'
  },
  {
    id: 'card-5',
    quote: '"I came for the projects and stayed for the people who keep pushing each other forward."',
    name: 'Neel Kapoor',
    role: 'MEMBER, OUTREACH',
    avatarSrc: '/portx/original/avatar-4.svg',
    logoSrc: '/portx/original/logo-oglivy.svg',
    logoWidth: '84px',
    height: '268px'
  }
];

export default function Testimonials({
  spinningText = 'BYTE STORIES • BUILT TOGETHER'
}: TestimonialsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const textElRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [pinMode, setPinMode] = useState<'before' | 'pinned' | 'after'>('before');

  // Dynamically calculate repetitions and exact spacing to form a complete, continuous 360deg circle
  useEffect(() => {
    const textPath = textPathRef.current;
    const textEl = textElRef.current;
    if (!textPath || !textEl) return;

    const circumference = 1162.55; // 2 * Math.PI * 185

    let clean = spinningText.trim();
    if (!clean.endsWith('•') && !clean.endsWith('-')) {
      clean = '• ' + clean + ' ';
    } else {
      clean = clean + ' ';
    }

    // Measure single unit without extra spacing
    textEl.style.letterSpacing = '0px';
    textPath.textContent = clean;
    const singleLen = textPath.getComputedTextLength() || 380;

    // Ensure the circle is always completely closed (no gaps, no overlaps)
    let count = Math.ceil(circumference / singleLen);
    if (count < 1) count = 1;
    let repeated = clean.repeat(count);
    textPath.textContent = repeated;

    // Distribute remaining length into exact per-character spacing
    let currentLen = textPath.getComputedTextLength() || singleLen * count;
    let remaining = circumference - currentLen;
    let spacing = remaining / repeated.length;

    textEl.style.letterSpacing = `${spacing.toFixed(4)}px`;
  }, [spinningText]);

  useEffect(() => {
    const track = trackRef.current;
    const orbit = orbitRef.current;
    if (!track || !orbit) return;

    let frameId = 0;

    const update = () => {
      const rect = track.getBoundingClientRect();
      const circleSize = 464;
      const pinTop = 100;
      const releaseAt = -(rect.height - circleSize - pinTop);
      const nextMode: 'before' | 'pinned' | 'after' = rect.top > pinTop
        ? 'before'
        : rect.top < releaseAt
          ? 'after'
          : 'pinned';

      // Framer's recovered effect scales 1 -> .7 and fades 1 -> .6 while cards pass.
      const progress = Math.min(1, Math.max(0, (pinTop - rect.top) / Math.max(1, rect.height - circleSize)));
      orbit.style.transform = `scale(${(1 - progress * 0.3).toFixed(4)})`;
      orbit.style.opacity = (1 - progress * 0.4).toFixed(4);
      setPinMode(current => current === nextMode ? current : nextMode);
      frameId = 0;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    requestUpdate();
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className="framer-testimonials-section" aria-labelledby="testimonials-heading">
      <div className="framer-testimonials-container">
        {/* Section Header */}
        <div className="framer-testimonials-header">
          <div className="framer-header-top-bar">
            <span className="framer-slash">//</span>
            <h6 id="testimonials-heading">MEMBER STORIES</h6>
            <span className="framer-slash">//</span>
          </div>

          <p className="framer-subheading-text">
            Ideas grow faster when we build together.<br />hear from the people making Byte what it is
          </p>
        </div>

        {/* Scroll Track & Sticky Center Circle */}
        <div ref={trackRef} className="framer-testimonials-track">
          {/* Sticky Center Quote Circle */}
          <div className={`framer-sticky-center-circle pin-${pinMode}`} aria-hidden="true">
            <div ref={orbitRef} className="framer-arc-wrapper">
              <svg className="framer-arc-svg" viewBox="0 0 464 464">
                <defs>
                  <path
                    id="framer-arc-circle"
                    d="M 232, 232 m -185, 0 a 185,185 0 1,1 370,0 a 185,185 0 1,1 -370,0"
                  />
                </defs>
                <text ref={textElRef} className="framer-arc-text">
                  <textPath
                    ref={textPathRef}
                    href="#framer-arc-circle"
                    startOffset="0%"
                  >
                    • TESTIMONIALS • TRUSTED BY CLIENTS • TESTIMONIALS • TRUSTED BY CLIENTS • TESTIMONIALS • TRUSTED BY CLIENTS •
                  </textPath>
                </text>
              </svg>

              {/* Exact Quotation Mark Vector */}
              <div className="framer-quote-vector-container">
                <svg
                  viewBox="0 0 200 156"
                  className="framer-quote-vector"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 2.966 35.365 C 2.966 26.366 6.508 18.718 13.592 12.418 C 20.675 5.669 29.024 2.295 38.638 2.295 C 42.686 2.295 46.987 3.195 51.541 4.995 L 50.782 4.32 L 55.336 6.344 L 56.095 6.344 C 57.613 7.244 59.384 8.369 61.407 9.719 C 61.407 10.169 62.166 11.069 63.684 12.418 C 76.334 23.667 81.647 40.539 79.623 63.036 C 77.599 95.431 58.372 124.677 21.941 150.773 C 19.917 152.573 17.64 153.473 15.11 153.473 C 11.062 153.473 7.773 151.898 5.243 148.749 C 0.689 143.349 1.448 138.4 7.52 133.901 C 37.373 112.304 53.565 88.907 56.095 63.711 C 50.529 66.861 44.71 68.435 38.638 68.435 C 29.024 68.435 20.675 65.286 13.592 58.987 C 6.508 52.238 2.966 44.364 2.966 35.365 Z M 120.608 35.365 C 120.608 26.366 124.15 18.718 131.234 12.418 C 138.318 5.669 146.666 2.295 156.28 2.295 C 160.328 2.295 164.629 3.195 169.183 4.995 L 168.424 4.32 C 169.942 4.77 171.46 5.444 172.978 6.344 L 173.737 6.344 C 175.761 7.244 177.532 8.369 179.05 9.719 C 179.05 10.169 179.809 11.069 181.327 12.418 C 193.976 23.667 199.289 40.539 197.265 63.036 C 195.241 95.431 176.014 124.677 139.583 150.773 C 137.559 152.573 135.282 153.473 132.752 153.473 C 128.704 153.473 125.668 151.898 123.644 148.749 C 118.584 143.349 119.09 138.4 125.162 133.901 C 155.015 112.304 171.207 88.907 173.737 63.711 C 168.171 66.861 162.352 68.435 156.28 68.435 C 146.666 68.435 138.318 65.286 131.234 58.987 C 124.15 52.238 120.608 44.364 120.608 35.365 Z"
                    fill="var(--byte-accent, #22c579)"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Cards Vertical Stream flowing past sticky center */}
          <div className="framer-testimonials-cards-stream" style={{ paddingTop: '464px' }}>
            {/* Slot 1: Card 1 (Right, max-width: 1100px) */}
            <div className="framer-slot-row framer-slot-1-2">
              <div className="framer-card-wrapper align-right" style={{ minHeight: CARDS[0].height }}>
                <CardComponent card={CARDS[0]} />
              </div>

              {/* Slot 2: Card 2 (Left, max-width: 100%) */}
              <div className="framer-card-wrapper align-left" style={{ minHeight: CARDS[1].height, marginTop: '28px' }}>
                <CardComponent card={CARDS[1]} />
              </div>
            </div>

            {/* Slot 3: Card 3 (Right, max-width: 100%) */}
            <div className="framer-slot-row framer-slot-3">
              <div className="framer-card-wrapper align-right" style={{ minHeight: CARDS[2].height, marginTop: '28px' }}>
                <CardComponent card={CARDS[2]} />
              </div>
            </div>

            {/* Slot 4 & 5: Card 4 (Left, max-width: 990px) and Card 5 (Right) */}
            <div className="framer-slot-row framer-slot-4-5">
              <div className="framer-card-wrapper align-left" style={{ minHeight: CARDS[3].height, marginTop: '28px' }}>
                <CardComponent card={CARDS[3]} />
              </div>

              <div className="framer-card-wrapper align-right" style={{ minHeight: CARDS[4].height, marginTop: '28px' }}>
                <CardComponent card={CARDS[4]} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Embedded Local Fonts */
        @font-face {
          font-family: 'Clash Display';
          src: url('/portx/original/clash-600.woff2') format('woff2');
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Clash Display';
          src: url('/portx/original/clash-400.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        .framer-testimonials-section {
          align-content: center;
          align-items: center;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 0px;
          height: min-content;
          justify-content: center;
          overflow: visible;
          padding: 0px 72px 160px 72px;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          background: transparent;
        }

        .framer-testimonials-container {
          align-content: center;
          align-items: center;
          display: flex;
          flex: 1 0 0px;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: 96px;
          height: min-content;
          justify-content: flex-start;
          overflow: visible;
          padding: 0px;
          position: relative;
          width: 1px;
          max-width: 1296px;
        }

        /* Header */
        .framer-testimonials-header {
          align-content: center;
          align-items: center;
          display: flex;
          flex: none;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: 96px;
          height: min-content;
          justify-content: center;
          overflow: hidden;
          padding: 0px;
          position: relative;
          width: 100%;
          z-index: 1;
        }

        .framer-header-top-bar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgb(51, 51, 51);
        }

        .framer-header-top-bar h6 {
          margin: 0;
          font-family: 'Clash Display', 'Clash Display Placeholder', sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 24px;
          color: rgb(255, 255, 255);
          text-transform: uppercase;
        }

        .framer-slash {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          color: rgb(102, 102, 102);
        }

        .framer-subheading-text {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: rgb(255, 255, 255);
          text-align: center;
          max-width: 239px;
          word-break: break-word;
        }

        /* Track */
        .framer-testimonials-track {
          width: 100%;
          position: relative;
          min-height: 2280px;
          overflow: visible;
        }

        /* The circle begins in the track, pins at 100px, then returns to the track end.
           Explicit mode switching avoids the browser sticky failure caused by the surrounding island layout. */
        .framer-sticky-center-circle {
          position: absolute;
          top: 0;
          left: 50%;
          width: 464px;
          height: 464px;
          margin-left: -232px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          pointer-events: none;
          z-index: 1;
        }

        .framer-sticky-center-circle.pin-pinned {
          position: fixed;
          top: 100px;
          z-index: 5;
        }

        .framer-sticky-center-circle.pin-after {
          top: auto;
          bottom: 0;
        }

        .framer-arc-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center;
          will-change: transform, opacity;
        }

        .framer-arc-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          animation: framer-spin 25s linear infinite;
        }

        .framer-arc-text {
          font-family: 'Clash Display', 'Clash Display Placeholder', sans-serif;
          font-size: 21px;
          font-weight: 600;
          line-height: 26px;
          fill: var(--byte-accent, #22c579);
          text-transform: uppercase;
        }

        .framer-quote-vector-container {
          position: relative;
          width: 200px;
          height: 156px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .framer-quote-vector {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Cards Stream */
        .framer-testimonials-cards-stream {
          padding-top: 464px;
          align-content: center;
          align-items: center;
          display: flex;
          flex: none;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: 0px;
          height: min-content;
          justify-content: center;
          overflow: hidden;
          padding: 0px;
          position: relative;
          width: 100%;
          z-index: 2;
        }

        .framer-slot-row {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        .framer-slot-1-2 {
          max-width: 1100px;
        }

        .framer-slot-3 {
          max-width: 100%;
        }

        .framer-slot-4-5 {
          max-width: 990px;
        }

        .framer-card-wrapper {
          width: 100%;
          display: flex;
          flex: none;
        }

        .framer-card-wrapper.align-right {
          justify-content: flex-end;
        }

        .framer-card-wrapper.align-left {
          justify-content: flex-start;
        }

        /* 1:1 Framer Card (framer-13gslg6) */
        .framer-card-box {
          align-content: flex-start;
          align-items: flex-start;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: 64px;
          height: min-content;
          justify-content: flex-start;
          overflow: hidden;
          padding: 32px;
          position: relative;
          width: 424px;
          box-sizing: border-box;
          backdrop-filter: blur(36px);
          -webkit-backdrop-filter: blur(36px);
          background-color: rgba(63, 63, 63, 0.25);
          border-radius: 20px;
          box-shadow: none;
          transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .framer-card-box:hover,
        .framer-card-box.is-scroll-hover {
          transform: translateY(-6px);
        }

        .framer-card-quote-text {
          flex: none;
          height: auto;
          max-width: 360px;
          position: relative;
          white-space: pre-wrap;
          width: 100%;
          word-break: break-word;
          word-wrap: break-word;
          margin: 0;
          font-family: 'Clash Display', 'Clash Display Placeholder', sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 24px;
          letter-spacing: normal;
          color: rgb(255, 255, 255);
          text-transform: uppercase;
        }

        .framer-card-user-row {
          align-content: center;
          align-items: center;
          display: flex;
          flex: none;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 0px;
          height: min-content;
          justify-content: center;
          overflow: hidden;
          padding: 0px;
          position: relative;
          width: 100%;
        }

        .framer-user-info-left {
          align-content: center;
          align-items: center;
          display: flex;
          flex: 1 0 0px;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 14px;
          height: min-content;
          justify-content: flex-start;
          overflow: hidden;
          padding: 0px;
          position: relative;
          width: 1px;
        }

        .framer-avatar-frame {
          flex: none;
          height: 44px;
          width: 44px;
          overflow: hidden;
          position: relative;
          border-radius: 50%;
        }

        .framer-avatar-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .framer-name-role-col {
          align-content: center;
          align-items: center;
          display: flex;
          flex: 1 0 0px;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: 0px;
          height: min-content;
          justify-content: flex-start;
          overflow: hidden;
          padding: 0px;
          position: relative;
          width: 1px;
        }

        .framer-name-text {
          flex: none;
          height: auto;
          position: relative;
          white-space: pre-wrap;
          width: 100%;
          word-break: break-word;
          word-wrap: break-word;
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: normal;
          color: rgb(255, 255, 255);
        }

        .framer-role-text {
          flex: none;
          height: auto;
          position: relative;
          white-space: pre-wrap;
          width: 100%;
          word-break: break-word;
          word-wrap: break-word;
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: normal;
          letter-spacing: normal;
          color: rgb(73, 73, 73);
          text-transform: none;
        }

        .framer-brand-logo-frame {
          flex: none;
          gap: 10px;
          height: 24px;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .framer-brand-logo-img {
          display: block;
          max-height: 100%;
          width: auto;
          object-fit: contain;
        }

        @keyframes framer-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive Breakpoints */
        @media (max-width: 1439px) {
          .framer-testimonials-section {
            padding: 0px 40px 160px 40px;
          }
          .framer-slot-1-2, .framer-slot-4-5 {
            gap: 30px;
          }
        }

        @media (max-width: 1024px) {
          .framer-testimonials-track {
            min-height: 2000px;
          }
          .framer-sticky-center-circle {
            width: 380px;
            height: 380px;
          }
        }

        @media (max-width: 809px) {
          .framer-testimonials-section {
            flex-direction: column;
            padding: 0px 20px 0px 20px;
          }
          .framer-testimonials-container {
            flex: none;
            width: 100%;
          }
          .framer-testimonials-track {
            min-height: auto;
          }
          .framer-sticky-center-circle,
          .framer-sticky-center-circle.pin-pinned,
          .framer-sticky-center-circle.pin-after {
            position: relative;
            top: auto;
            bottom: auto;
            left: auto;
            margin: 40px auto;
            width: 280px;
            height: 280px;
          }
          .framer-testimonials-cards-stream {
            padding-top: 0 !important;
          }
          .framer-card-wrapper {
            width: 100% !important;
            justify-content: center !important;
          }
          .framer-card-box {
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

function CardComponent({ card }: { card: TestimonialCardData }) {
  return (
    <div
      className="framer-card-box"
      data-scroll-hover
      style={{
        border: card.border || '0px none rgb(0, 0, 0)'
      }}
    >
      <p className="framer-card-quote-text">{card.quote}</p>
      <div className="framer-card-user-row">
        <div className="framer-user-info-left">
          <div className="framer-avatar-frame">
            <img className="framer-avatar-img" src={card.avatarSrc} alt={card.name} loading="lazy" />
          </div>
          <div className="framer-name-role-col">
            <p className="framer-name-text">{card.name}</p>
            <p className="framer-role-text">{card.role}</p>
          </div>
        </div>
        <div className="framer-brand-logo-frame" style={{ width: card.logoWidth || '84px' }}>
          <img className="framer-brand-logo-img" src={card.logoSrc} alt="brand logo" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
