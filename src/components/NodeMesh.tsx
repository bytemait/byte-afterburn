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
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    const surface = canvas.closest('main')!;
    const titleCanvas = titleCanvasRef.current!;
    const titleNetwork = createTitleNetwork(surface, titleCanvas);
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
      const reach = width < 700 ? 155 : 190;
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
        const activity = pointer.active ? Math.max(0, 1 - Math.hypot(a.x - pointer.x, a.y - pointer.y) / radius) : 0;
        // Keep the center calm while giving the margins a more visible web.
        const edge = 0.5 + Math.abs(a.x / width - 0.5);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > reach) continue;
          const strength = 1 - distance / reach;
          ctx!.strokeStyle = `rgba(68, 185, 132, ${strength * (0.32 * edge + activity * 0.36)})`;
          ctx!.lineWidth = 0.7;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
          // A few travelling signals reveal the graph's connectivity.
          if (i % 11 === 0 && j % 3 === 0 && distance > 55) {
            const progress = (elapsed * 0.15 + a.phase / (Math.PI * 2)) % 1;
            ctx!.fillStyle = `rgba(125, 234, 187, ${strength * 0.65})`;
            ctx!.beginPath();
            ctx!.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 1.25, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
        ctx!.fillStyle = `rgba(105, 220, 168, ${(0.28 + a.depth * 0.34 + activity * 0.35) * edge})`;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, 0.8 + a.depth * 1.25 + activity, 0, Math.PI * 2);
        ctx!.fill();
        if (i % 9 === 0) {
          ctx!.strokeStyle = `rgba(82, 224, 166, ${0.15 * edge + activity * 0.25})`;
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
      titleNetwork.draw(ctx!, nodes, step, pointer, scrollEnergy, !finePointer.matches, !motion.matches);
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
      if (motion.matches) titleNetwork.reset();
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
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(surface);
    resize();
    preference();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', preference);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      titleNetwork.dispose();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      window.removeEventListener('scroll', scroll);
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', preference);
    };
  }, []);

  return <>
    <canvas ref={canvasRef} className="node-mesh" aria-hidden="true" />
    <canvas ref={titleCanvasRef} className="title-network" aria-hidden="true" />
  </>;
}
