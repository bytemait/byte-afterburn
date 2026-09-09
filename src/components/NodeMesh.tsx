import { useEffect, useRef } from 'react';
import { createTitleNetwork } from './title-network';

/** A viewport-sized network: no React renders in the animation loop. */
export default function NodeMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;
    document.documentElement.classList.add('has-node-mesh');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    const titleCanvas = titleCanvasRef.current!;
    const findSurface = () => document.querySelector<HTMLElement>('.recreation-page, .showcase-page, main') ?? document.body;
    let surface = findSurface();
    let titleNetwork = createTitleNetwork(surface, titleCanvas);
    type Node = { x: number; y: number; vx: number; vy: number; phase: number; depth: number };
    type Point = { x: number; y: number };
    type FrameAssignment = { node: number; target: number };
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let inView = true;
    let scrollY = window.scrollY;
    let scrollEnergy = 0;
    let frameElement: HTMLElement | null = null;
    let frameTargets: Point[] = [];
    let frameAssignments: FrameAssignment[] = [];
    let frameReveal = 0;
    let navOpen = document.documentElement.classList.contains('mobile-nav-open');
    let navReveal = navOpen ? 1 : 0;
    const loaderStartedAt = performance.now();
    const loaderDuration = 900;
    const previousOverflow = document.body.style.overflow;
    let loaderComplete = false;
    let readyTimer = 0;
    const pointer = { x: -1000, y: -1000, active: false };
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    function pointsAround(element: HTMLElement) {
      const rect = element.getBoundingClientRect();
      const pad = 14;
      const left = clamp(rect.left - pad, 8, width - 8);
      const right = clamp(rect.right + pad, 8, width - 8);
      const top = clamp(rect.top - pad, 8, height - 8);
      const bottom = clamp(rect.bottom + pad, 8, height - 8);
      const horizontal = Math.max(2, Math.ceil((right - left) / 54));
      const vertical = Math.max(2, Math.ceil((bottom - top) / 46));
      const points: Point[] = [];
      for (let i = 0; i <= horizontal; i++) points.push({ x: left + (right - left) * i / horizontal, y: top });
      for (let i = 1; i <= vertical; i++) points.push({ x: right, y: top + (bottom - top) * i / vertical });
      for (let i = 1; i <= horizontal; i++) points.push({ x: right - (right - left) * i / horizontal, y: bottom });
      for (let i = 1; i < vertical; i++) points.push({ x: left, y: bottom - (bottom - top) * i / vertical });
      return points;
    }

    function assignFrame(element: HTMLElement) {
      frameTargets = pointsAround(element);
      const available = new Set(nodes.map((_, index) => index));
      frameAssignments = frameTargets.map((target, targetIndex) => {
        let nearest = -1;
        let nearestDistance = Infinity;
        available.forEach(nodeIndex => {
          const node = nodes[nodeIndex];
          const distance = Math.hypot(node.x - target.x, node.y - target.y);
          if (distance < nearestDistance) { nearest = nodeIndex; nearestDistance = distance; }
        });
        if (nearest >= 0) available.delete(nearest);
        return { node: nearest, target: targetIndex };
      }).filter(assignment => assignment.node >= 0);
    }

    function achievementFrame(step: number) {
      const active = width >= 1440 && finePointer.matches
        ? surface.querySelector<HTMLElement>('[data-achievement-card]:hover [data-mesh-frame], [data-achievement-card]:focus-visible [data-mesh-frame]')
        : null;
      if (active && active !== frameElement) {
        frameElement = active;
        assignFrame(active);
      } else if (!active) {
        frameElement = null;
      }
      if (active) frameTargets = pointsAround(active);
      const targetReveal = active ? 1 : 0;
      const rate = targetReveal ? 0.12 : 0.2;
      frameReveal += (targetReveal - frameReveal) * (1 - Math.exp(-step * rate));
      if (!active && frameReveal < 0.005) {
        frameReveal = 0;
        frameTargets = [];
        frameAssignments = [];
      }
      return new Map(frameAssignments.map(assignment => [assignment.node, frameTargets[assignment.target]]));
    }

    function resize() {
      frameElement = null;
      frameTargets = [];
      frameAssignments = [];
      frameReveal = 0;
      const oldWidth = width;
      const oldHeight = height;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      titleCanvas.width = Math.round(width * dpr);
      titleCanvas.height = Math.round(height * dpr);
      titleCanvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
      titleNetwork.resize();
      // Evenly seeded, jittered cells keep the network connected without dense clumps.
      const spacing = width < 700 ? 100 : 125;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const count = Math.min(150, cols * rows);
      if (nodes.length !== count) {
        nodes = Array.from({ length: count }, (_, i) => ({
          x: ((i % cols) + (Math.random() - 0.5) * 0.85) * width / (cols - 1),
          y: (Math.floor(i / cols) + (Math.random() - 0.5) * 0.85) * height / (rows - 1),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
          depth: 0.35 + Math.random() * 0.65,
        }));
      } else if (oldWidth && oldHeight) {
        nodes.forEach(node => { node.x *= width / oldWidth; node.y *= height / oldHeight; });
      }
      draw(0);
    }

    function draw(step: number) {
      ctx!.clearRect(0, 0, width, height);
      const loaderProgress = loaderComplete
        ? 1
        : clamp((performance.now() - loaderStartedAt) / loaderDuration, 0, 1);
      const navGoal = navOpen ? 1 : 0;
      navReveal += (navGoal - navReveal) * (step ? 1 - Math.exp(-step * 0.14) : 1);
      const reach = (width < 700 ? 155 : 190) + navReveal * 34;
      const radius = width < 700 ? 160 : 240;
      elapsed += step * 0.008;
      scrollEnergy *= Math.pow(0.92, step);
      const frameTargetByNode = achievementFrame(step);

      for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        const node = nodes[nodeIndex];
        if (step) {
          // Correlated random acceleration gives Brownian drift without frame-to-frame jitter.
          node.vx += ((Math.random() - 0.5) * 0.035 + Math.sin(elapsed + node.phase) * 0.006) * step;
          node.vy += ((Math.random() - 0.5) * 0.035 + Math.cos(elapsed * 0.7 + node.phase) * 0.006) * step;
          if (pointer.active) {
            const dx = node.x - pointer.x;
            const dy = node.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < radius && distance > 1) {
              const force = (1 - distance / radius) ** 2 * 0.22;
              node.vx += dx / distance * force * step;
              node.vy += dy / distance * force * step;
            }
          }
          node.vx *= Math.pow(0.985, step);
          node.vy *= Math.pow(0.985, step);
          node.x += clamp(node.vx, -1.5, 1.5) * step;
          node.y += (clamp(node.vy, -1.5, 1.5) - scrollEnergy * node.depth * 0.13) * step;
          const frameTarget = frameTargetByNode.get(nodeIndex);
          if (frameTarget) {
            const settle = (1 - Math.exp(-step * 0.14)) * frameReveal;
            node.x += (frameTarget.x - node.x) * settle;
            node.y += (frameTarget.y - node.y) * settle;
            node.vx *= 1 - settle * 0.72;
            node.vy *= 1 - settle * 0.72;
          }
          // Soft boundary forces preserve continuity; no teleporting edge connections.
          if (node.x < 0) node.vx += 0.025 * step;
          if (node.x > width) node.vx -= 0.025 * step;
          if (node.y < 0) node.vy += 0.025 * step;
          if (node.y > height) node.vy -= 0.025 * step;
          node.x = clamp(node.x, -30, width + 30);
          node.y = clamp(node.y, -30, height + 30);
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const nodeReveal = clamp(loaderProgress * 1.55 - (i / Math.max(1, nodes.length - 1)) * 0.55, 0, 1);
        const activity = pointer.active ? Math.max(0, 1 - Math.hypot(a.x - pointer.x, a.y - pointer.y) / radius) : 0;
        // Keep the center calm while giving the margins a more visible web.
        const edge = 0.5 + Math.abs(a.x / width - 0.5);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > reach) continue;
          const strength = 1 - distance / reach;
          const edgeOrder = ((i * 17 + j * 13) % Math.max(1, nodes.length)) / Math.max(1, nodes.length);
          const connectionReveal = clamp((loaderProgress - 0.2 - edgeOrder * 0.28) / 0.48, 0, 1);
          if (connectionReveal <= 0) continue;
          const easedConnection = 1 - Math.pow(1 - connectionReveal, 3);
          ctx!.strokeStyle = `rgba(${68 + navReveal * 18}, ${185 + navReveal * 35}, ${132 + navReveal * 25}, ${strength * (0.32 * edge + activity * 0.36 + navReveal * 0.42) * easedConnection})`;
          ctx!.lineWidth = 0.7 + navReveal * 0.24;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(a.x + (b.x - a.x) * easedConnection, a.y + (b.y - a.y) * easedConnection);
          ctx!.stroke();
          // A few travelling signals reveal the graph's connectivity.
          if (loaderProgress >= 1 && i % 11 === 0 && j % 3 === 0 && distance > 55) {
            const progress = (elapsed * 0.15 + a.phase / (Math.PI * 2)) % 1;
            ctx!.fillStyle = `rgba(125, 234, 187, ${strength * (0.65 + navReveal * 0.3)})`;
            ctx!.beginPath();
            ctx!.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 1.25 + navReveal * 0.65, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
        ctx!.fillStyle = `rgba(105, 220, 168, ${(0.28 + a.depth * 0.34 + activity * 0.35 + navReveal * 0.45) * edge * nodeReveal})`;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, 0.8 + a.depth * 1.25 + activity + navReveal * 0.55, 0, Math.PI * 2);
        ctx!.fill();
        if (i % 9 === 0 && nodeReveal > 0) {
          ctx!.strokeStyle = `rgba(82, 224, 166, ${(0.15 * edge + activity * 0.25 + navReveal * 0.2) * nodeReveal})`;
          ctx!.beginPath();
          ctx!.arc(a.x, a.y, 5 + a.depth * 2, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }
      if (frameReveal > 0.01 && frameAssignments.length > 2) {
        ctx!.strokeStyle = `rgba(82, 224, 166, ${frameReveal * 0.82})`;
        ctx!.lineWidth = 0.9;
        ctx!.beginPath();
        frameAssignments.forEach((assignment, index) => {
          const node = nodes[assignment.node];
          if (index === 0) ctx!.moveTo(node.x, node.y);
          else ctx!.lineTo(node.x, node.y);
        });
        ctx!.closePath();
        ctx!.stroke();
        frameAssignments.forEach(assignment => {
          const node = nodes[assignment.node];
          ctx!.fillStyle = `rgba(145, 249, 196, ${0.38 + frameReveal * 0.62})`;
          ctx!.beginPath();
          ctx!.arc(node.x, node.y, 1.3 + frameReveal * 0.8, 0, Math.PI * 2);
          ctx!.fill();
        });
      }
      if (loaderProgress >= 1) {
        if (!loaderComplete) {
          loaderComplete = true;
          titleNetwork.triggerPulse(26);
          readyTimer = window.setTimeout(() => {
            document.documentElement.classList.add('byte-page-ready');
            window.dispatchEvent(new CustomEvent('byte:page-ready'));
            document.body.style.overflow = previousOverflow;
          }, 180);
        }
        titleNetwork.draw(ctx!, nodes, step, pointer, scrollEnergy, !finePointer.matches, !motion.matches);
      }
    }

    function tick(time: number) {
      const step = previous ? Math.min((time - previous) / 16.667, 2) : 1;
      previous = time;
      draw(step);
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!motion.matches && !document.hidden && inView) {
        frame = requestAnimationFrame(tick);
      }
    }
    function preference() {
      if (motion.matches) {
        titleNetwork.reset();
        loaderComplete = true;
        document.documentElement.classList.add('byte-page-ready');
        window.dispatchEvent(new CustomEvent('byte:page-ready'));
        document.body.style.overflow = previousOverflow;
      }
      sync();
    }
    function move(event: PointerEvent) {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }
    function leave() { pointer.active = false; }
    function scroll() {
      if (!motion.matches && inView) {
        scrollEnergy = clamp(scrollEnergy + (window.scrollY - scrollY) * 0.18, -20, 20);
      }
      scrollY = window.scrollY;
    }
    function navState(event: Event) {
      navOpen = Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open);
      if (motion.matches) draw(0);
    }
    function refreshRouteSurface() {
      // Astro replaces the route content while preserving this canvas. Rebind
      // the title/achievement integrations to the newly swapped page DOM.
      document.documentElement.classList.add('has-node-mesh');
      if (loaderComplete) document.documentElement.classList.add('byte-page-ready');
      titleNetwork.dispose();
      surface = findSurface();
      titleNetwork = createTitleNetwork(surface, titleCanvas);
      frameElement = null;
      frameTargets = [];
      frameAssignments = [];
      frameReveal = 0;
      titleNetwork.resize();
      if (motion.matches) draw(0);
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(canvas);
    document.documentElement.classList.remove('byte-page-ready');
    document.body.style.overflow = 'hidden';
    resize();
    preference();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('byte:nav-state', navState);
    document.addEventListener('visibilitychange', sync);
    document.addEventListener('astro:after-swap', refreshRouteSurface);
    motion.addEventListener('change', preference);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(readyTimer);
      document.body.style.overflow = previousOverflow;
      observer.disconnect();
      titleNetwork.dispose();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('byte:nav-state', navState);
      document.removeEventListener('visibilitychange', sync);
      document.removeEventListener('astro:after-swap', refreshRouteSurface);
      motion.removeEventListener('change', preference);
      document.documentElement.classList.remove('has-node-mesh');
    };
  }, []);

  return <>
    <canvas ref={canvasRef} className="node-mesh" aria-hidden="true" />
    <canvas ref={titleCanvasRef} className="title-network" aria-hidden="true" />
  </>;
}
