import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  titleTop?: string;
  titleBottom?: string;
  introTitle?: string;
  introBody?: string;
}

const RIBBON_ITEMS = [
  'BUILD WITH BYTE',
  'LEARN • SHIP • SHARE',
  'PROJECT TEAMS FORMING',
];

export default function Hero({
  titleTop = 'BYTE',
  titleBottom = '.DEVS',
  introTitle = 'STUDENT INNOVATION & TECHNICAL SOCIETY',
  introBody = 'A student-led community where builders, designers, and researchers turn bold ideas into working technology.',
}: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const zoomFrameRef = useRef<HTMLDivElement>(null);
  const tickerTrackRef = useRef<HTMLUListElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mount appearance animation
    const raf = requestAnimationFrame(() => setIsLoaded(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Smooth scroll-driven zoom out: 1.25 -> 1.0
    const frame = zoomFrameRef.current;
    if (!frame) return;

    let targetScale = 1.25;
    let currentScale = 1.25;
    let animId: number;

    const computeTarget = () => {
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress 0 when image is below viewport, 1 when well in view
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.75)));
      targetScale = 1.25 - progress * 0.25;
    };

    const loop = () => {
      // Damped spring simulation (stiffness: 400, damping: 60)
      currentScale += (targetScale - currentScale) * 0.12;
      frame.style.setProperty('--zoom-scale', currentScale.toFixed(4));
      animId = requestAnimationFrame(loop);
    };

    computeTarget();
    animId = requestAnimationFrame(loop);

    window.addEventListener('scroll', computeTarget, { passive: true });
    window.addEventListener('resize', computeTarget, { passive: true });

    return () => {
      window.removeEventListener('scroll', computeTarget);
      window.removeEventListener('resize', computeTarget);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    // Smooth infinite horizontal ribbon animation
    const track = tickerTrackRef.current;
    if (!track) return;

    let offset = 0;
    let animId: number;
    let singleWidth = 0;

    const measure = () => {
      // Width of one full 3-item sequence
      const items = track.querySelectorAll('.ticker-item');
      if (items.length >= 3) {
        const first = items[0].getBoundingClientRect();
        const third = items[2].getBoundingClientRect();
        singleWidth = third.right - first.left + 115;
      }
    };

    measure();
    window.addEventListener('resize', measure);

    const speed = 0.83; // matches ~50px/sec from recovered ticker
    const tick = () => {
      offset += speed;
      if (singleWidth > 0 && offset >= singleWidth) {
        offset = offset % singleWidth;
      }
      track.style.transform = `translateX(-${offset.toFixed(2)}px)`;
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section ref={rootRef} className={`hero-section ${isLoaded ? 'is-mounted' : ''}`}>
      <div className="hero-container">
        {/* Top Text Cluster */}
        <div className="hero-top-grid">
          {/* Main Display Title */}
          <div className="hero-title-top">
            <h1 className="hero-h1"><span data-mesh-title>{titleTop}</span></h1>
          </div>

          <div className="hero-title-bottom-row">
            <h2 className="hero-h2"><span data-mesh-title>{titleBottom.startsWith('.') ? <><span data-mesh-dot>.</span>{titleBottom.slice(1)}</> : titleBottom}</span></h2>

            {/* Intro column */}
            <div className="hero-intro-column">
              <div className="hero-globe-wrapper">
                <img
                  src="/portx/original/globe.svg"
                  alt=""
                  width="88"
                  height="61"
                  className="hero-globe-icon"
                />
              </div>
              <div className="hero-intro-text">
                <p className="hero-intro-heading">{introTitle}</p>
                <p className="hero-intro-desc">{introBody}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Zoom Collage Image */}
        <div ref={zoomFrameRef} className="hero-zoom-frame">
          <div className="hero-zoom-scaler">
            <img
              src="/portx/original/hero.webp"
              alt="Byte member projects collage"
              width="1944"
              height="915"
              className="hero-zoom-image"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* Infinite Looping Ribbon */}
      <div className="hero-ribbon-wrapper">
        <ul ref={tickerTrackRef} className="hero-ticker-track">
          {/* 4 sets of 3 items to ensure seamless infinite looping */}
          {[0, 1, 2, 3].flatMap((round) =>
            RIBBON_ITEMS.map((item, idx) => (
              <li key={`${round}-${idx}`} className="ticker-item">
                <div className="ticker-dot" aria-hidden="true" />
                <span className="ticker-text">{item}</span>
              </li>
            ))
          )}
        </ul>
      </div>

      <style>{`
        @font-face {
          font-family: 'Clash Display';
          src: url('/portx/original/clash-600.woff2') format('woff2');
          font-weight: 600;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Clash Display';
          src: url('/portx/original/clash-700.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        .hero-section {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          background: #101010;
          color: #ffffff;
          overflow: hidden;
          padding: 64px 72px 0;
          box-sizing: border-box;
        }

        .hero-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 209px;
          position: relative;
        }

        /* Top Grid */
        .hero-top-grid {
          width: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .hero-h1 {
          margin: 0;
          font-family: 'Clash Display', sans-serif;
          font-weight: 700;
          font-size: 290px;
          line-height: 216px;
          letter-spacing: -8.7px;
          color: #ffffff;
          text-transform: uppercase;
          opacity: 0.001;
          transform: translateY(-80px);
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease;
        }

        .hero-title-bottom-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
        }

        .hero-h2 {
          margin: 0;
          font-family: 'Clash Display', sans-serif;
          font-weight: 700;
          font-size: 290px;
          line-height: 216px;
          letter-spacing: -8.7px;
          color: #ffffff;
          text-transform: uppercase;
          opacity: 0.001;
          transform: translateY(-80px);
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, opacity 0.8s ease 0.1s;
        }

        .hero-intro-column {
          width: 416px;
          display: flex;
          flex-direction: column;
          gap: 48px;
          padding-top: 40px;
          opacity: 0.001;
          transform: translateY(30px);
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, opacity 0.8s ease 0.25s;
        }

        .is-mounted .hero-h1,
        .is-mounted .hero-h2,
        .is-mounted .hero-intro-column {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-globe-wrapper {
          display: flex;
        }

        .hero-globe-icon {
          width: 86px;
          height: 59px;
          display: block;
        }

        .hero-intro-text {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hero-intro-heading {
          margin: 0;
          font-family: 'Clash Display', sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 24px;
          color: #ffffff;
          text-transform: uppercase;
        }

        .hero-intro-desc {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: rgb(153, 153, 153);
        }

        /* Zoom Image Frame */
        .hero-zoom-frame {
          width: 100%;
          height: 610px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          z-index: 1;
          --zoom-scale: 1.25;
        }

        .hero-zoom-scaler {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(var(--zoom-scale));
          transform-origin: center center;
          will-change: transform;
        }

        .hero-zoom-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Infinite Ribbon Ticker */
        .hero-ribbon-wrapper {
          width: 100vw;
          position: relative;
          align-self: flex-start;
          left: calc(50% - 50vw);
          right: auto;
          margin-left: 0;
          margin-right: 0;
          height: 114px;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 0 72px;
          box-sizing: border-box;
          margin-top: 20px;
        }

        .hero-ticker-track {
          display: flex;
          align-items: center;
          gap: 115px;
          list-style: none;
          margin: 0;
          padding: 0;
          white-space: nowrap;
          will-change: transform;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 115px;
          flex-shrink: 0;
        }

        .ticker-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--byte-accent, #22c579);
          flex-shrink: 0;
        }

        .ticker-text {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 18px;
          color: var(--byte-accent-bright, #52e0a6);
          letter-spacing: 0px;
          text-transform: uppercase;
        }

        /* Breakpoints matching portx.framer.ai exactly */
        @media (min-width: 810px) and (max-width: 1439.98px) {
          .hero-section {
            padding: 64px 40px 0;
          }
          .hero-ribbon-wrapper {
            padding: 0 40px;
          }
          .hero-h1,
          .hero-h2 {
            font-size: 170px;
            line-height: 138px;
          }
          .hero-title-bottom-row {
            flex-direction: column;
          }
          .hero-intro-column {
            width: 100%;
            padding-top: 60px;
          }
          .hero-zoom-frame {
            height: 510px;
          }
        }

        @media (max-width: 809.98px) {
          .hero-section {
            padding: 64px 20px 0;
          }
          .hero-ribbon-wrapper {
            padding: 0 20px;
          }
          .hero-container {
            gap: 139px;
          }
          .hero-h1 {
            /* BYTE fills the available mobile measure without clipping its glyphs. */
            font-size: min(140px, calc((100vw - 40px) / 2.55));
            line-height: 0.8;
            letter-spacing: -0.04em;
            font-weight: 600;
          }
          .hero-h2 {
            /* The longer .DEVS line receives its own full-width measure. */
            font-size: min(124px, calc((100vw - 40px) / 2.85));
            line-height: 0.88;
            letter-spacing: -0.04em;
            font-weight: 600;
          }
          .hero-title-bottom-row {
            flex-direction: column;
          }
          .hero-intro-column {
            width: 100%;
            padding-top: 60px;
          }
          .hero-zoom-frame {
            height: 300px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-h1,
          .hero-h2,
          .hero-intro-column {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .hero-zoom-scaler {
            transform: scale(1) !important;
          }
          .hero-ticker-track {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
