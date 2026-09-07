import React from 'react';

/** A Byte-native replacement for the fixed Framer template badge. */
export default function NewTasksBadge() {
  return (
    <a className="new-tasks-badge" href="#departments" aria-label="Browse new Byte tasks">
      <div className="new-tasks-preview">
        <svg aria-hidden="true" className="new-tasks-network" viewBox="0 0 144 104">
          <path d="M8 80 38 52 66 68 99 28 136 42M38 52 54 18 99 28M66 68 112 82 136 42" />
          <circle cx="8" cy="80" r="2" /><circle cx="38" cy="52" r="2.5" />
          <circle cx="54" cy="18" r="2" /><circle cx="66" cy="68" r="2" />
          <circle cx="99" cy="28" r="2.5" /><circle cx="112" cy="82" r="2" />
          <circle cx="136" cy="42" r="2" />
        </svg>
        <img src="/icon.png" alt="" />
        <span>NEW TASKS</span>
      </div>
      <span className="new-tasks-action">
        <span className="new-tasks-mark" aria-hidden="true"><i /><i /><i /><i /></span>
        HAVE A BYTE
      </span>

      <style>{`
        .new-tasks-badge {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 18;
          display: flex;
          flex-direction: column;
          gap: 7px;
          width: 142px;
          color: #fff;
          text-decoration: none;
          transform: translateZ(0);
        }

        .new-tasks-preview {
          height: 108px;
          overflow: hidden;
          border: 1px solid rgba(82, 224, 166, 0.34);
          border-radius: 12px;
          background: #0a0f0c;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
          position: relative;
          transition: border-color 220ms ease, transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .new-tasks-network {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          fill: #65e9b4;
          stroke: rgba(82, 224, 166, 0.56);
          stroke-width: 0.75;
          transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .new-tasks-preview img {
          position: absolute;
          top: 20px;
          left: 50%;
          width: 44px;
          height: 44px;
          object-fit: contain;
          transform: translateX(-50%);
          filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.42));
          transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .new-tasks-preview > span {
          position: absolute;
          right: 10px;
          bottom: 9px;
          color: #e2f7ec;
          font-family: 'Clash Display', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.01em;
          line-height: 1;
          word-spacing: 2px;
        }

        .new-tasks-action {
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 10px;
          border-radius: 10px;
          background: #52e0a6;
          color: #08110d;
          font-family: 'Clash Display', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.01em;
          line-height: 1;
          word-spacing: 3px;
          transition: background-color 180ms ease, transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .new-tasks-mark {
          width: 13px;
          height: 13px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          transform: rotate(45deg);
        }

        .new-tasks-mark i {
          display: block;
          border-radius: 1px;
          background: currentColor;
        }

        .new-tasks-badge:hover .new-tasks-preview,
        .new-tasks-badge:focus-visible .new-tasks-preview {
          border-color: rgba(125, 255, 196, 0.82);
          transform: translateY(-4px);
        }

        .new-tasks-badge:hover .new-tasks-network,
        .new-tasks-badge:focus-visible .new-tasks-network { transform: scale(1.12) rotate(-4deg); }

        .new-tasks-badge:hover .new-tasks-preview img,
        .new-tasks-badge:focus-visible .new-tasks-preview img { transform: translateX(-50%) translateY(-4px) rotate(-7deg); }

        .new-tasks-badge:hover .new-tasks-action,
        .new-tasks-badge:focus-visible .new-tasks-action {
          background: #7dffc4;
          transform: translateY(-2px);
        }

        .new-tasks-badge:focus-visible { outline: 2px solid #7dffc4; outline-offset: 5px; border-radius: 12px; }

        @media (max-width: 809.98px) {
          .new-tasks-badge { right: 14px; bottom: 14px; width: 122px; }
          .new-tasks-preview { height: 92px; }
          .new-tasks-preview img { top: 16px; width: 38px; height: 38px; }
          .new-tasks-preview > span { font-size: 11px; }
          .new-tasks-action { min-height: 33px; font-size: 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .new-tasks-preview,
          .new-tasks-network,
          .new-tasks-preview img,
          .new-tasks-action { transition: none; }
          .new-tasks-badge:hover .new-tasks-preview,
          .new-tasks-badge:focus-visible .new-tasks-preview,
          .new-tasks-badge:hover .new-tasks-preview img,
          .new-tasks-badge:focus-visible .new-tasks-preview img,
          .new-tasks-badge:hover .new-tasks-network,
          .new-tasks-badge:focus-visible .new-tasks-network,
          .new-tasks-badge:hover .new-tasks-action,
          .new-tasks-badge:focus-visible .new-tasks-action { transform: none; }
        }
      `}</style>
    </a>
  );
}
