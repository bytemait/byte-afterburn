import React, { useEffect, useState, useRef } from 'react';

interface TrackItem {
  name: string;
  image: string;
}

const TRACKS: TrackItem[] = [
  { name: 'App Dev', image: '/assets/tasks/app-dev.webp' },
  { name: 'Web Dev', image: '/assets/tasks/web-dev.webp' },
  { name: 'Applied ML', image: '/assets/tasks/agentic.webp' },
  { name: 'ML Research', image: '/assets/tasks/ml_research.webp' },
  { name: 'ROS', image: '/assets/tasks/mechatronics.webp' },
  { name: 'Electronics', image: '/assets/tasks/electronics.webp' },
  { name: 'CAD', image: '/assets/tasks/cad.webp' },
  { name: 'Cybersecurity', image: '/assets/tasks/cybersecurity.webp' },
  { name: 'Graphic Design', image: '/assets/tasks/graphic_design.webp' },
  { name: 'Video Editing', image: '/assets/tasks/video_editing.webp' },
];

export default function NewTasksBadge() {
  const [overFooter, setOverFooter] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Defer appearance until all elements & animations on the page have loaded, then slide in from right
  useEffect(() => {
    let timer: number;
    const triggerEntrance = () => {
      // Small buffer after page-ready so everything else settles first
      timer = window.setTimeout(() => {
        setIsVisible(true);
      }, 700);
    };

    if (document.documentElement.classList.contains('byte-page-ready')) {
      triggerEntrance();
    } else {
      window.addEventListener('byte:page-ready', triggerEntrance, { once: true });
    }

    // Safety fallback in case event doesn't fire
    const fallback = window.setTimeout(() => {
      setIsVisible(true);
    }, 2800);

    return () => {
      window.removeEventListener('byte:page-ready', triggerEntrance);
      clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, []);

  // Footer avoidance observer
  useEffect(() => {
    const footer = document.querySelector('.byte-footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOverFooter(entry.isIntersecting);
      },
      { rootMargin: '0px 0px 90px' }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Preload images
  useEffect(() => {
    TRACKS.forEach((track) => {
      const img = new Image();
      img.src = track.image;
    });
  }, []);

  // 3D vertical roll / flip interval
  useEffect(() => {
    if (isHovered) return;

    intervalRef.current = window.setInterval(() => {
      const upcoming = (currentIndex + 1) % TRACKS.length;
      setNextIndex(upcoming);
      setIsFlipping(true);

      setTimeout(() => {
        setCurrentIndex(upcoming);
        setIsFlipping(false);
      }, 700);
    }, 2800);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, isHovered]);

  const currentTrack = TRACKS[currentIndex];
  const nextTrack = TRACKS[nextIndex];

  return (
    <a
      className={`new-tasks-badge${isVisible ? ' is-visible' : ''}${overFooter ? ' is-over-footer' : ''}`}
      href="/tasks"
      aria-label="We're Recruiting - Explore Byte Tasks"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="new-tasks-preview-stage">
        {/* Subtle Cyber Grid Background */}
        <div className="preview-cyber-grid" aria-hidden="true" />

        {/* 3D Flipping Stage */}
        <div className="flipper-container">
          <div className={`flipper-cube ${isFlipping ? 'is-animating' : ''}`}>
            {/* CURRENT FACE */}
            <div className="face face-current">
              <div className="face-media">
                <img src={currentTrack.image} alt={currentTrack.name} />
                <div className="face-overlay" />
              </div>
              <div className="face-badge-pill">
                <span className="live-dot" />
                <span className="track-title">{currentTrack.name}</span>
              </div>
            </div>

            {/* NEXT FACE (Enters on flip) */}
            <div className="face face-next">
              <div className="face-media">
                <img src={nextTrack.image} alt={nextTrack.name} />
                <div className="face-overlay" />
              </div>
              <div className="face-badge-pill">
                <span className="live-dot" />
                <span className="track-title">{nextTrack.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top-right telemetry tag */}
        <div className="telemetry-tag">
          <span>TASKS LIVE</span>
        </div>
      </div>

      {/* Button CTA */}
      <span className="new-tasks-action">
        <span className="new-tasks-mark" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        WE'RE RECRUITING!
      </span>

      <style>{`
        .new-tasks-badge {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 90;
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 180px;
          color: #fff;
          text-decoration: none;
          opacity: 0;
          transform-origin: right bottom;
          transform: translate3d(calc(100% + 40px), 0, 0);
          pointer-events: none;
          transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease, bottom 420ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .new-tasks-badge.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          pointer-events: auto;
        }

        .new-tasks-badge.is-visible:hover {
          transform: translate3d(0, 0, 0) scale(1.5);
          z-index: 100;
        }

        .new-tasks-badge.is-over-footer {
          bottom: 96px;
        }

        .new-tasks-preview-stage {
          height: 146px;
          overflow: hidden;
          border: 1px solid rgba(82, 224, 166, 0.32);
          border-radius: 16px;
          background: #0d120f;
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.65), 0 0 24px -4px rgba(82, 224, 166, 0.16);
          position: relative;
          perspective: 600px;
          transition: border-color 220ms ease, box-shadow 220ms ease;
        }

        .new-tasks-badge:hover .new-tasks-preview-stage {
          border-color: rgba(82, 224, 166, 0.65);
          box-shadow: 0 20px 42px -6px rgba(0, 0, 0, 0.75), 0 0 28px rgba(82, 224, 166, 0.25);
        }

        /* Cyber grid backdrop */
        .preview-cyber-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(82, 224, 166, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(82, 224, 166, 0.05) 1px, transparent 1px);
          background-size: 14px 14px;
          pointer-events: none;
          z-index: 1;
        }


        /* Telemetry Tag */
        .telemetry-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 5;
          background: rgba(10, 16, 12, 0.85);
          border: 1px solid rgba(82, 224, 166, 0.35);
          border-radius: 4px;
          padding: 2px 6px;
          display: flex;
          align-items: center;
        }

        .telemetry-tag span {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--lime-bright, #52e0a6);
        }

        /* 3D Flipper Box */
        .flipper-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }

        .flipper-cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform-origin: 50% 50% -73px;
        }

        .flipper-cube.is-animating {
          animation: flipCubeVertical 700ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes flipCubeVertical {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-90deg);
          }
        }

        /* Faces */
        .face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 12px;
          box-sizing: border-box;
        }

        .face-current {
          transform: rotateX(0deg) translateZ(0px);
        }

        .face-next {
          transform: rotateX(90deg) translateZ(73px) translateY(-73px);
        }

        .face-media {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .face-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 300ms ease;
        }

        .new-tasks-badge:hover .face-media img {
          transform: scale(1.06);
        }

        .face-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 14, 10, 0.2) 0%, rgba(8, 14, 10, 0.85) 80%, rgba(8, 14, 10, 0.98) 100%);
          z-index: 2;
        }

        /* Track Pill info */
        .face-badge-pill {
          position: relative;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(14, 22, 17, 0.88);
          border: 1px solid rgba(82, 224, 166, 0.35);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 4px 8px;
          border-radius: 6px;
          width: fit-content;
          max-width: 100%;
        }

        .face-badge-pill .live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--lime-bright, #52e0a6);
          box-shadow: 0 0 6px var(--lime-bright, #52e0a6);
          flex-shrink: 0;
          animation: pulseDot 2s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.8); }
        }

        .face-badge-pill .track-title {
          font-family: 'Clash Display', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Bottom button action */
        .new-tasks-action {
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 12px;
          background: #52e0a6;
          color: #08110d;
          font-family: 'Clash Display', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.03em;
          line-height: 1;
          box-shadow: 0 4px 18px rgba(82, 224, 166, 0.3);
          transition: background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
        }

        .new-tasks-mark {
          width: 12px;
          height: 12px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          transform: rotate(45deg);
        }

        .new-tasks-mark i {
          display: block;
          border-radius: 0.5px;
          background: currentColor;
        }

        .new-tasks-badge:hover .new-tasks-action {
          background: #7dffc4;
          box-shadow: 0 6px 20px rgba(82, 224, 166, 0.45);
        }

        @media (max-width: 809.98px) {
          .new-tasks-badge {
            right: 18px;
            bottom: 18px;
            width: 148px;
            gap: 8px;
          }
          .new-tasks-badge.is-over-footer {
            bottom: 86px;
          }
          .new-tasks-preview-stage {
            height: 120px;
          }
          .flipper-cube {
            transform-origin: 50% 50% -60px;
          }
          .face-next {
            transform: rotateX(90deg) translateZ(60px) translateY(-60px);
          }
          .new-tasks-action {
            min-height: 36px;
            font-size: 11px;
            padding: 8px 10px;
          }
          .face-badge-pill .track-title {
            font-size: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .flipper-cube.is-animating {
            animation: none !important;
          }
          .face-badge-pill .live-dot {
            animation: none !important;
          }
          .new-tasks-badge,
          .new-tasks-preview-stage,
          .face-media img,
          .new-tasks-action {
            transition: none !important;
          }
        }
      `}</style>
    </a>
  );
}
