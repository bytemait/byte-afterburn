import React, { useEffect, useRef } from 'react';

const TAGS = ['DEVELOPMENT', 'AI/ML', 'MECHATRONICS', 'CYBERSECURITY', 'OUTREACH'];

export default function WhoAreWe() {
  const sectionRef = useRef<HTMLElement>(null);
  const labStageRef = useRef<HTMLDivElement>(null);

  const updateLabReveal = (clientX: number, clientY: number) => {
    const labStage = labStageRef.current;
    if (!labStage) return;

    const rect = labStage.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    labStage.style.setProperty('--lab-x', `${x}px`);
    labStage.style.setProperty('--lab-y', `${y}px`);
    labStage.classList.add('is-hovering');
  };

  useEffect(() => {
    const section = sectionRef.current;
    const labStage = labStageRef.current;
    if (!section || !labStage) return;

    let targetY = 240;
    let currentY = 240;
    let animId: number;

    const computeTarget = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Section starts entering when rect.top = vh
      // Section is well engaged when rect.top <= 0
      const totalDistance = vh + rect.height * 0.5;
      const scrolledPast = vh - rect.top;
      const progress = Math.min(1, Math.max(0, scrolledPast / totalDistance));

      // 240px at start (progress = 0) down to 0px (progress = 1)
      targetY = 240 * (1 - progress);
    };

    const loop = () => {
      // Critically damped spring simulation matching Framer physics (stiffness: 300, damping: 60)
      currentY += (targetY - currentY) * 0.12;
      labStage.style.transform = `translateY(${currentY.toFixed(2)}px)`;
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
    const labStage = labStageRef.current;
    if (!labStage) return;

    const mobileQuery = window.matchMedia('(max-width: 809.98px)');
    let frameId = 0;

    const update = () => {
      const isMobile = mobileQuery.matches;
      if (!isMobile) {
        labStage.style.removeProperty('--mobile-reveal');
        return;
      }

      const rect = labStage.getBoundingClientRect();
      const revealDistance = Math.min(rect.height, window.innerHeight) * 0.9;
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - rect.top) / revealDistance));
      labStage.style.setProperty('--mobile-reveal', `${(progress * 100).toFixed(2)}%`);
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(() => {
          frameId = 0;
          update();
        });
      }
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    mobileQuery.addEventListener('change', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      mobileQuery.removeEventListener('change', requestUpdate);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="whoarewe-section" aria-labelledby="whoarewe-heading">
      <div className="whoarewe-inner">
        <div className="whoarewe-heading-bar">
          <span aria-hidden="true">//</span>
          <h2 id="whoarewe-heading">WHO ARE WE</h2>
          <span aria-hidden="true">//</span>
        </div>

        <div
          className="whoarewe-content"
          onPointerEnter={(event) => updateLabReveal(event.clientX, event.clientY)}
          onPointerMove={(event) => updateLabReveal(event.clientX, event.clientY)}
          onPointerLeave={() => labStageRef.current?.classList.remove('is-hovering')}
        >
          <div className="whoarewe-top">
            <div className="whoarewe-top-copy">
              <h3>B.Y.T.E.<br />SOCIETY</h3>
              <div className="whoarewe-tags">
                {TAGS.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <img className="whoarewe-globe" src="/portx/original/about-globe.svg" alt="" width="88" height="88" />
          </div>

          <div className="whoarewe-bottom">
            <h3 className="whoarewe-role">BUILD. CONNECT.<br />CREATE & IMPACT.</h3>
            <div className="whoarewe-description">
              <h3>STUDENT-LED<br />TECH SOCIETY</h3>
              <p>B.Y.T.E. is a community of innovators, thinkers, and doers. We organize events, build projects, and collaborate to create meaningful impact.</p>
            </div>
          </div>

          <div className="whoarewe-portrait-stage" aria-hidden="true">
            <div
              ref={labStageRef}
              className="whoarewe-lab-art"
            >
              <img className="whoarewe-lab-frame" src="/byte-assets/lab_frame.png" alt="" width="2380" height="1792" />
              <img className="whoarewe-lab-outer" src="/byte-assets/lab_outer.png" alt="Byte Tech Society laboratory" width="2380" height="1792" />
              <img className="whoarewe-lab-reveal" src="/byte-assets/lab_frame.png" alt="" width="2380" height="1792" />
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

        .whoarewe-section {
          width: 100%;
          max-width: 1920px;
          margin: 0 auto;
          padding: 0 72px 120px;
          display: flex;
          justify-content: center;
          overflow: hidden;
          background: #101010;
          color: #fff;
          box-sizing: border-box;
          position: relative;
        }

        .whoarewe-inner {
          width: 100%;
          display: flex;
          flex: 1 0 0;
          flex-direction: column;
          align-items: flex-start;
          gap: 120px;
          overflow: hidden;
          position: relative;
        }

        .whoarewe-heading-bar {
          width: 100%;
          min-height: 72px;
          padding-top: 18px;
          border-top: 1px solid #333;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          color: #494949;
        }

        .whoarewe-heading-bar h2 {
          margin: 0;
          color: #fff;
          font: 600 24px/32px 'Clash Display', sans-serif;
          text-transform: uppercase;
        }

        .whoarewe-heading-bar span {
          color: var(--byte-accent, #22c579);
          font: 400 14px/18px Inter, sans-serif;
        }

        .whoarewe-content {
          width: 100%;
          min-height: 1149px;
          padding-top: 72px;
          display: flex;
          flex-direction: column;
          gap: 227px;
          position: relative;
          overflow: hidden;
        }

        .whoarewe-top {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 96px;
          position: relative;
          z-index: 1;
        }

        .whoarewe-top-copy {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .whoarewe-top-copy h3,
        .whoarewe-role,
        .whoarewe-description h3 {
          margin: 0;
          color: #fff;
          font-family: 'Clash Display', sans-serif;
          font-size: 120px;
          font-weight: 600;
          line-height: 100px;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .whoarewe-tags {
          width: 100%;
          max-width: 525px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .whoarewe-tags span {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 24px;
          padding: 11px 24px;
          border: 1px solid var(--byte-accent, #22c579);
          border-radius: 64px;
          color: var(--byte-accent-bright, #52e0a6);
          font: 600 20px/24px 'Clash Display', sans-serif;
          white-space: nowrap;
          text-transform: uppercase;
        }

        .whoarewe-globe {
          width: 86px;
          height: 86px;
          object-fit: contain;
          display: block;
        }

        .whoarewe-bottom {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 32px;
          position: relative;
          z-index: 1;
        }

        .whoarewe-role {
          width: 100%;
          text-align: right;
        }

        .whoarewe-description {
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .whoarewe-description h3 {
          max-width: 525px;
        }

        .whoarewe-description p {
          width: 416px;
          margin: 0;
          color: #fff;
          font: 400 16px/24px Inter, sans-serif;
        }

        .whoarewe-portrait-stage {
          position: absolute;
          inset: -10px 0 auto;
          height: 1149px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 0;
        }

        .whoarewe-lab-art {
          --lab-x: 50%;
          --lab-y: 50%;
          width: 1296px;
          max-width: none;
          aspect-ratio: 2380 / 1792;
          flex: none;
          transform: translateY(240px);
          will-change: transform;
          position: relative;
          isolation: isolate;
          cursor: crosshair;
        }

        .whoarewe-lab-art img {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
        }

        .whoarewe-lab-frame {
          z-index: 1;
          opacity: 1;
        }

        .whoarewe-lab-outer {
          z-index: 2;
          opacity: 0.94;
          filter: saturate(0.76) contrast(1.08) brightness(0.62);
          transition: opacity 500ms ease, filter 500ms ease;
        }

        .whoarewe-lab-reveal {
          position: absolute;
          inset: 0;
          z-index: 3;
          opacity: 0;
          mix-blend-mode: screen;
          clip-path: circle(0 at var(--lab-x) var(--lab-y));
          transition: opacity 120ms ease;
        }

        .whoarewe-lab-art:hover .whoarewe-lab-outer,
        .whoarewe-lab-art.is-hovering .whoarewe-lab-outer {
          opacity: 0.84;
          filter: saturate(0.84) contrast(1.1) brightness(0.7);
        }

        .whoarewe-lab-art:hover .whoarewe-lab-reveal,
        .whoarewe-lab-art.is-hovering .whoarewe-lab-reveal {
          opacity: 0.92;
          clip-path: circle(170px at var(--lab-x) var(--lab-y));
        }

        @media (min-width: 810px) and (max-width: 1439.98px) {
          .whoarewe-section { padding: 0 40px 120px; }
          .whoarewe-content { gap: 24px; }
          .whoarewe-top-copy h3,
          .whoarewe-role,
          .whoarewe-description h3 { font-size: 86px; line-height: 90px; }
          .whoarewe-bottom { align-items: flex-start; gap: 24px; }
          .whoarewe-role { text-align: left; }
          .whoarewe-description { flex-direction: column; align-items: flex-start; gap: 24px; }
          .whoarewe-lab-art { width: 1296px; }
        }

        @media (max-width: 809.98px) {
          .whoarewe-section { padding: 0 20px 120px; }
          .whoarewe-inner { width: 100%; gap: 24px; }
          .whoarewe-heading-bar { min-height: 72px; }
          .whoarewe-heading-bar h2 { font-size: 20px; line-height: 32px; }
          .whoarewe-content { min-height: 1149px; padding-top: 24px; gap: 24px; }
          .whoarewe-top { gap: 96px; }
          .whoarewe-top-copy { gap: 40px; }
          .whoarewe-top-copy h3,
          .whoarewe-role,
          .whoarewe-description h3 { font-size: 40px; line-height: 40px; }
          .whoarewe-tags { max-width: 100%; }
          .whoarewe-tags span { padding: 11px 24px; font-size: 20px; line-height: 24px; }
          .whoarewe-bottom { align-items: flex-start; gap: 0; }
          .whoarewe-role { text-align: left; }
          .whoarewe-description { flex-direction: column; align-items: flex-start; gap: 24px; }
          .whoarewe-description p { width: 100%; font-size: 16px; line-height: 24px; }
          .whoarewe-portrait-stage { top: -10px; min-height: 1149px; }
          .whoarewe-lab-art { width: 1296px; }
          .whoarewe-lab-outer {
            opacity: 0.9;
            filter: saturate(0.84) contrast(1.1) brightness(0.7);
            clip-path: inset(0 0 calc(100% - var(--mobile-reveal, 0%)) 0);
            transition: opacity 320ms ease, filter 320ms ease;
          }
          .whoarewe-lab-reveal { display: none; }
        }


        @media (prefers-reduced-motion: reduce) {
          .whoarewe-lab-art { transform: translateY(0) !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
