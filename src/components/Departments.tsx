import React, { useEffect, useRef, useState } from 'react';

interface Department {
  id: string;
  name: string;
  sub1: string;
  sub2?: string;
  link: string;
}

const DEPARTMENTS: Department[] = [
  {
    id: 'development',
    name: 'DEVELOPMENT',
    sub1: 'Web & Mobile',
    sub2: 'Software Systems',
    link: '/members'
  },
  {
    id: 'aiml',
    name: 'AI/ML',
    sub1: 'Machine Learning',
    sub2: 'Intelligent Systems',
    link: '/members'
  },
  {
    id: 'mechatronics',
    name: 'MECHATRONICS',
    sub1: 'Robotics & Hardware',
    link: '/members'
  },
  {
    id: 'cybersecurity',
    name: 'CYBERSECURITY',
    sub1: 'Network Security',
    sub2: 'Infrastructure & Audits',
    link: '/members'
  },
  {
    id: 'outreach',
    name: 'OUTREACH',
    sub1: 'Creative & Community',
    link: '/members'
  }
];

interface ImagePosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  src: string;
}

const STAGE_WIDTH = 1296;
const STAGE_HEIGHT = 869;
const px = (value?: string) => Number.parseFloat(value ?? '0') || 0;
const coordinate = (value: string | undefined, axis: 'x' | 'y', width: number, height: number) => {
  if (!value) return axis === 'x' ? 0 : 0;
  if (value.startsWith('calc(')) {
    const match = value.match(/([\d.]+)%\s*-\s*([\d.]+)px/);
    return match ? (Number(match[1]) / 100) * (axis === 'x' ? STAGE_WIDTH : STAGE_HEIGHT) - Number(match[2]) : 0;
  }
  return px(value);
};
const imageStyle = (image: ImagePosition): React.CSSProperties => {
  const width = px(image.width);
  const height = px(image.height);
  const left = image.left ? coordinate(image.left, 'x', width, height) : STAGE_WIDTH - px(image.right) - width;
  const top = image.top ? coordinate(image.top, 'y', width, height) : STAGE_HEIGHT - px(image.bottom) - height;
  return { left: `${Math.max(0, left)}px`, top: `${Math.max(0, top)}px`, width: `${width}px`, height: `${height}px` };
};

const VARIANT_IMAGES: Record<string, ImagePosition[]> = {
  aiml: [
    { left: '220px', top: '68px', width: '220px', height: '152px', src: 'https://framerusercontent.com/images/Te0KZO8vu8nZAiqQWZqQ1eMg.png' },
    { left: '0px', top: '366px', width: '220px', height: '152px', src: 'https://framerusercontent.com/images/Aqbu7kPIEdd41hwrARS5mPe8Ta8.png' },
    { right: '127px', top: '238px', width: '179px', height: '124px', src: 'https://framerusercontent.com/images/aGsDjoLwW8jT2bmM2uK86UpTBKo.png' },
    { left: 'calc(49.3% - 139px)', bottom: '74px', width: '279px', height: '193px', src: 'https://framerusercontent.com/images/Qy1hTtXWXmM1yNP30LPkmQ0q6Hc.png' }
  ],
  development: [
    { right: '456px', top: '0px', width: '180px', height: '124px', src: 'https://framerusercontent.com/images/CC8McVzzO0R7udDOSECyPEPGsE0.png' },
    { left: '0px', top: '118px', width: '220px', height: '152px', src: 'https://framerusercontent.com/images/SqvXFHpY99P8W4osLxWdgK1w.png' },
    { left: '110px', top: '371px', width: '279px', height: '193px', src: 'https://framerusercontent.com/images/AWyWbUhQemVzFi2HWkUsj8kuos4.png' },
    { right: '0px', top: '225px', width: '180px', height: '124px', src: 'https://framerusercontent.com/images/xCsAD6OiFbRdZcIasNtRgmHqoZM.png' }
  ],
  mechatronics: [
    { right: '308px', top: '141px', width: '279px', height: '193px', src: 'https://framerusercontent.com/images/EprXwjKEBoRM8KRGGEcIr7YBDdw.png' },
    { left: 'calc(6.8% - 89px)', top: '418px', width: '179px', height: '124px', src: 'https://framerusercontent.com/images/qD74yJN0mtCfqzLiyeeVdjj30.png' },
    { right: '660px', top: '604px', width: '220px', height: '152px', src: 'https://framerusercontent.com/images/L28eSLKreJT4IFWi9VMzoc7TI.png' },
    { right: '39px', top: '258px', width: '179px', height: '124px', src: 'https://framerusercontent.com/images/mTFmtxmygqdvpVJYlTH4uXV2otA.png' }
  ],
  cybersecurity: [
    { right: '0px', top: '389px', width: '279px', height: '193px', src: 'https://framerusercontent.com/images/jJFlftiHE3hSOQ1JIc5El1MAQnw.png' },
    { left: 'calc(30.4% - 89px)', top: '294px', width: '179px', height: '124px', src: 'https://framerusercontent.com/images/mTFmtxmygqdvpVJYlTH4uXV2otA.png' },
    { right: '1076px', top: '617px', width: '220px', height: '152px', src: 'https://framerusercontent.com/images/SjmtAi2v2tz7hZs4HMTJOr2NlXQ.png' },
    { left: 'calc(76.3% - 110px)', top: '717px', width: '220px', height: '152px', src: 'https://framerusercontent.com/images/ZjZDRYMPHpxcGY3jymUBP8h2yBg.png' }
  ],
  outreach: [
    { left: '160px', top: '180px', width: '240px', height: '160px', src: 'https://framerusercontent.com/images/CC8McVzzO0R7udDOSECyPEPGsE0.png' },
    { right: '200px', top: '100px', width: '260px', height: '170px', src: 'https://framerusercontent.com/images/EprXwjKEBoRM8KRGGEcIr7YBDdw.png' },
    { left: '260px', bottom: '120px', width: '220px', height: '150px', src: 'https://framerusercontent.com/images/AWyWbUhQemVzFi2HWkUsj8kuos4.png' },
    { right: '120px', bottom: '80px', width: '250px', height: '165px', src: 'https://framerusercontent.com/images/Qy1hTtXWXmM1yNP30LPkmQ0q6Hc.png' }
  ]
};

export default function DepartmentsSection() {
  const [activeDept, setActiveDept] = useState<string>('aiml');
  const [displayImages, setDisplayImages] = useState<ImagePosition[]>(VARIANT_IMAGES.aiml);
  const [isChanging, setIsChanging] = useState(false);

  const currentImages = VARIANT_IMAGES[activeDept] || VARIANT_IMAGES.aiml;

  // Animated Numbers Counter for Facts
  const factsRef = useRef<HTMLDivElement>(null);
  const [stat1, setStat1] = useState<number>(30);
  const [stat2, setStat2] = useState<number>(100);
  const [stat3, setStat3] = useState<number>(10);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  useEffect(() => {
    if (displayImages === currentImages) return;
    setIsChanging(true);
    const swap = window.setTimeout(() => {
      setDisplayImages(currentImages);
      window.setTimeout(() => setIsChanging(false), 120);
    }, 430);
    return () => window.clearTimeout(swap);
  }, [activeDept, currentImages, displayImages]);

  // Count-up animation when facts section enters view
  useEffect(() => {
    const el = factsRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1800; // 1.8s
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setStat1(Math.round(30 + (54 - 30) * ease));
            setStat2(Math.round(100 + (132 - 100) * ease));
            setStat3(Math.round(10 + (25 - 10) * ease));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="departments-section" id="departments">
      <div className="departments-container">
        {/* Department Words Column */}
        <div className="departments-content">
          {DEPARTMENTS.map((dept) => {
            const isActive = activeDept === dept.id;
            return (
              <a
                key={dept.id}
                href={dept.link}
                className={`department-row ${isActive ? 'active' : ''}`}
                data-scroll-hover
                onMouseEnter={() => setActiveDept(dept.id)}
                onClick={() => setActiveDept(dept.id)}
              >
                <div className="department-text-left">
                  <p className="subtext">{dept.sub1}</p>
                  {dept.sub2 && <p className="subtext">{dept.sub2}</p>}
                </div>
                <h2 className="department-title">{dept.name}</h2>
              </a>
            );
          })}
        </div>

        {/* Floating Responsive Preview Images */}
        <div className="departments-images-stage">
          {currentImages.map((img, idx) => (
            <div
              key={idx}
              className={`floating-preview-image${isChanging ? ' is-changing' : ''}`}
              style={imageStyle(img)}
            >
              <img
                src={displayImages[idx]?.src || img.src}
                alt="Department preview"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 1:1 Replicated Facts & Stats Row */}
      <div className="departments-facts-row" ref={factsRef}>
        {/* Stat 1 */}
        <div className="fact-item">
          <div className="fact-text-bar">
            <p className="fact-label">ACTIVE BYTE MEMBERS</p>
            <p className="fact-slash" aria-hidden="true">//</p>
          </div>
          <div className="fact-number-box">
            <h1 className="fact-number">{stat1}+</h1>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="fact-item">
          <div className="fact-text-bar">
            <p className="fact-label">PROJECTS &amp; PROTOTYPES</p>
            <p className="fact-slash" aria-hidden="true">//</p>
          </div>
          <div className="fact-number-box">
            <h1 className="fact-number">{stat2}+</h1>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="fact-item">
          <div className="fact-text-bar">
            <p className="fact-label">EVENTS &amp; WORKSHOPS HOSTED</p>
            <p className="fact-slash" aria-hidden="true">//</p>
          </div>
          <div className="fact-number-box">
            <h1 className="fact-number">{stat3}</h1>
          </div>
        </div>
      </div>

      <style>{`
        @font-face {
          font-family: 'Clash Display';
          src: url('/portx/original/clash-600.woff2') format('woff2');
          font-style: normal;
          font-weight: 600;
          font-display: swap;
        }

        .departments-section {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 120px 72px 160px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          background: transparent;
          gap: 160px; /* Exact gap from Framer source */
        }

        .departments-container {
          width: 100%;
          max-width: 1296px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          min-height: 870px;
        }

        .departments-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          width: 100%;
          max-width: 893px;
          z-index: 2;
          position: relative;
        }

        .department-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          width: 100%;
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .department-row:hover,
        .department-row.is-scroll-hover {
          transform: scale(1.02);
        }

        .department-text-left {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          min-width: 160px;
        }

        .department-text-left .subtext {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 18px;
          color: var(--token-5777202a-0ea6-448f-b785-3c665721a4a8, #666);
          transition: color 0.4s ease;
          white-space: pre;
        }

        .department-row.active .department-text-left .subtext,
        .department-row:hover .department-text-left .subtext,
        .department-row.is-scroll-hover .department-text-left .subtext {
          color: var(--byte-accent-bright, #52e0a6);
        }

        .department-title {
          margin: 0;
          font-family: 'Clash Display', sans-serif;
          font-weight: 600;
          font-size: clamp(56px, 8.33vw, 120px);
          line-height: 1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #333333;
          transition: color 0.4s ease;
        }

        .department-row.active .department-title,
        .department-row:hover .department-title,
        .department-row.is-scroll-hover .department-title {
          color: var(--byte-accent-bright, #52e0a6);
        }

        /* Floating images stage */
        .departments-images-stage {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .floating-preview-image {
          position: absolute;
          overflow: hidden;
          border-radius: 12px;
          transition: top 0.6s cubic-bezier(0.75, 0.05, 0, 1.03),
                      left 0.6s cubic-bezier(0.75, 0.05, 0, 1.03),
                      width 0.6s cubic-bezier(0.75, 0.05, 0, 1.03),
                      height 0.6s cubic-bezier(0.75, 0.05, 0, 1.03),
                      opacity 0.25s ease;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .floating-preview-image.is-changing img {
          opacity: 0.82;
        }

        .floating-preview-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: fill;
        }

        /* 1:1 Replicated Facts & Stats Row */
        .departments-facts-row {
          width: 100%;
          max-width: 1296px;
          display: grid;
          grid-template-columns: repeat(3, minmax(50px, 1fr));
          gap: 24px;
          box-sizing: border-box;
          position: relative;
        }

        .fact-item {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .fact-text-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgb(51, 51, 51);
          width: 100%;
          box-sizing: border-box;
        }

        .fact-label {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 18px;
          color: rgb(128, 128, 128);
          text-transform: uppercase;
          letter-spacing: 0px;
        }

        .fact-slash {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 18px;
          color: var(--byte-accent, #22c579);
          text-align: right;
        }

        .fact-number-box {
          width: 100%;
          margin-top: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 120px;
        }

        .fact-number {
          margin: 0;
          font-family: 'Clash Display', 'Clash Display Placeholder', sans-serif;
          font-feature-settings: 'zero' on, 'tnum' on, 'cv06' on, 'cv13' on, 'cv07' on, 'cv05' on, 'cv10' on, 'cv12' on, 'cv08' on, 'cv11' on, 'cv04' on, 'cv03' on, 'cv02' on, 'cv09' on;
          font-size: 120px;
          font-weight: 600;
          line-height: 100px;
          letter-spacing: 0px;
          color: var(--byte-accent-bright, #52e0a6);
          text-align: center;
          user-select: auto;
          font-variant-numeric: tabular-nums;
        }

        /* Responsive Breakpoints matching Framer source */
        @media (min-width: 810px) and (max-width: 1439.98px) {
          .departments-section {
            padding: 100px 40px 140px;
            gap: 120px;
          }
          .departments-container {
            min-height: 700px;
          }
          .floating-preview-image {
            opacity: 0.6;
          }
          .departments-facts-row {
            grid-template-columns: repeat(2, minmax(50px, 1fr));
            gap: 48px 24px;
          }
          .fact-item:nth-child(3) {
            grid-column: span 2;
          }
          .fact-number {
            font-size: 100px;
            line-height: 90px;
          }
        }

        @media (max-width: 809.98px) {
          .departments-section {
            padding: 80px 20px 100px;
            gap: 80px;
          }
          .departments-container {
            min-height: auto;
          }
          .department-row {
            flex-direction: column;
            gap: 8px;
          }
          /* Touch browsers can retain :hover after a tap. The scroll-hover
             coordinator is the single visible active state on small screens. */
          .department-row.active:not(.is-scroll-hover),
          .department-row:hover:not(.is-scroll-hover) {
            transform: none;
          }
          .department-row.active:not(.is-scroll-hover) .department-text-left .subtext,
          .department-row:hover:not(.is-scroll-hover) .department-text-left .subtext {
            color: var(--token-5777202a-0ea6-448f-b785-3c665721a4a8, #666);
          }
          .department-row.active:not(.is-scroll-hover) .department-title,
          .department-row:hover:not(.is-scroll-hover) .department-title {
            color: #333333;
          }
          .department-text-left {
            align-items: center;
            min-width: auto;
          }
          .department-title {
            font-size: 40px;
          }
          .departments-images-stage {
            display: none;
          }
          .departments-facts-row {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .fact-item:nth-child(3) {
            grid-column: span 1;
          }
          .fact-number {
            font-size: 72px;
            line-height: 70px;
          }
          .fact-label {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
}
