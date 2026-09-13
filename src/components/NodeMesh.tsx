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
    type TargetGroup = { start: number; count: number; closed: boolean };
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
    let frameMode = '';
    let frameTargets: Point[] = [];
    let frameAssignments: FrameAssignment[] = [];
    let frameGroups: TargetGroup[] = [];
    let frameReveal = 0;
    let founderTheme = 0;
    let founderThemeGoal = 0;
    let founderBurst = 0;
    let founderCenter: Point = { x: 0, y: 0 };
    let navOpen = document.documentElement.classList.contains('mobile-nav-open');
    let navReveal = navOpen ? 1 : 0;
    const loaderStartedAt = performance.now();
    const loaderDuration = 900;
    const previousOverflow = document.body.style.overflow;
    let loaderComplete = false;
    let readyTimer = 0;
    const pointer = { x: -1000, y: -1000, active: false };
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    function pointsAround(element: HTMLElement, pad = 14) {
      const rect = element.getBoundingClientRect();
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

    function pointsOnEllipse(element: HTMLElement, count = 30, pad = 18) {
      const rect = element.getBoundingClientRect();
      const centerX = clamp(rect.left + rect.width / 2, 8, width - 8);
      const centerY = clamp(rect.top + rect.height / 2, 8, height - 8);
      const radiusX = Math.min(width * 0.44, Math.max(70, rect.width / 2 + pad));
      const radiusY = Math.min(height * 0.43, Math.max(70, rect.height / 2 + pad));
      return Array.from({ length: count }, (_, index) => {
        const angle = -Math.PI / 2 + index / count * Math.PI * 2;
        return {
          x: clamp(centerX + Math.cos(angle) * radiusX, 8, width - 8),
          y: clamp(centerY + Math.sin(angle) * radiusY, 8, height - 8),
        };
      });
    }

    function pointsBetween(from: HTMLElement, to: HTMLElement, count = 12) {
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const start = {
        x: clamp(a.left + a.width / 2, 8, width - 8),
        y: clamp(a.top + a.height / 2, 8, height - 8),
      };
      const end = {
        x: clamp(b.left + b.width / 2, 8, width - 8),
        y: clamp(b.top + b.height / 2, 8, height - 8),
      };
      return Array.from({ length: count }, (_, index) => {
        const progress = index / Math.max(1, count - 1);
        const bow = Math.sin(progress * Math.PI) * Math.min(70, Math.abs(end.x - start.x) * 0.12);
        return {
          x: start.x + (end.x - start.x) * progress,
          y: start.y + (end.y - start.y) * progress - bow,
        };
      });
    }

    function assignTargets(targets: Point[], groups: TargetGroup[]) {
      frameTargets = targets;
      frameGroups = groups;
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

    function activeMember(root: HTMLElement) {
      if (finePointer.matches) {
        const hovered = root.querySelector<HTMLElement>('[data-mesh-member]:hover');
        if (hovered) return hovered;
      }
      const focused = document.activeElement instanceof HTMLElement
        ? document.activeElement.closest<HTMLElement>('[data-mesh-member]')
        : null;
      return focused ?? root.querySelector<HTMLElement>('[data-mesh-member].is-mesh-active');
    }

    function targetsForMembers(root: HTMLElement, member: HTMLElement | null, mode: string) {
      const groups: TargetGroup[] = [];
      const targets: Point[] = [];
      const addGroup = (points: Point[], closed: boolean) => {
        groups.push({ start: targets.length, count: points.length, closed });
        targets.push(...points);
      };

      if (mode === 'founders' && member) {
        addGroup(pointsOnEllipse(member, width < 700 ? 18 : 30, width < 700 ? 26 : 46), true);
        addGroup(pointsAround(member, width < 700 ? 14 : 24), true);
      } else if (mode === 'index' && member) {
        const anchor = root.querySelector<HTMLElement>('[data-mesh-anchor]');
        if (anchor) {
          addGroup(pointsBetween(member, anchor), false);
          addGroup(pointsAround(anchor, 10), true);
        } else {
          addGroup(pointsAround(member, 10), true);
        }
      } else if (mode === 'orbit') {
        const stage = root.querySelector<HTMLElement>('[data-mesh-orbit]');
        if (stage) addGroup(pointsOnEllipse(stage, width < 700 ? 20 : 34, width < 700 ? 5 : 22), true);
        if (member && member !== stage) addGroup(pointsAround(member, 9), true);
      } else if (member) {
        addGroup(pointsAround(member, 10), true);
      }

      return { targets, groups };
    }

    function meshInteraction(step: number) {
      const conceptRoot = surface.matches('[data-members-concept]')
        ? surface
        : surface.querySelector<HTMLElement>('[data-members-concept]');
      let active: HTMLElement | null = null;
      let target: HTMLElement | null = null;
      let mode = 'achievement';
      let interactionMode = mode;
      let targetReveal = 0;
      let nextTargets: Point[] = [];
      let nextGroups: TargetGroup[] = [];
      founderThemeGoal = 0;

      if (conceptRoot) {
        mode = conceptRoot.dataset.membersConcept || 'constellation';
        active = activeMember(conceptRoot);
        const orbit = mode === 'orbit' ? conceptRoot.querySelector<HTMLElement>('[data-mesh-orbit]') : null;
        const orbitRect = orbit?.getBoundingClientRect();
        const orbitVisible = Boolean(orbitRect && orbitRect.bottom > 0 && orbitRect.top < height);
        const founder = mode === 'constellation' ? conceptRoot.querySelector<HTMLElement>('[data-alumni-mesh-target]') : null;
        const founderRect = founder?.getBoundingClientRect();
        const founderReveal = Number(founder?.dataset.meshReveal ?? 0);
        const founderVisible = Boolean(founderRect && founderRect.bottom > 0 && founderRect.top < height && founderReveal > 0.01);
        if (founderRect) {
          founderCenter = {
            x: clamp(founderRect.left + founderRect.width / 2, 0, width),
            y: clamp(founderRect.top + founderRect.height / 2, 0, height),
          };
        }
        founderThemeGoal = founderVisible && !motion.matches ? founderReveal : 0;
        target = active ?? (orbitVisible ? orbit : founderVisible ? founder : null);
        interactionMode = target === founder ? 'founders' : mode;
        targetReveal = active ? 1 : orbitVisible ? 0.72 : founderVisible ? founderReveal : 0;
        if (target) ({ targets: nextTargets, groups: nextGroups } = targetsForMembers(conceptRoot, target, interactionMode));
      } else {
        active = width >= 1440 && finePointer.matches
          ? surface.querySelector<HTMLElement>('[data-achievement-card]:hover [data-mesh-frame], [data-achievement-card]:focus-visible [data-mesh-frame]')
          : null;
        target = active;
        targetReveal = active ? 1 : 0;
        if (active) {
          nextTargets = pointsAround(active);
          nextGroups = [{ start: 0, count: nextTargets.length, closed: true }];
        }
      }

      if (target && (target !== frameElement || interactionMode !== frameMode || nextTargets.length !== frameTargets.length)) {
        frameElement = target;
        frameMode = interactionMode;
        assignTargets(nextTargets, nextGroups);
        canvas.dataset.meshResponse = interactionMode;
      } else if (target) {
        frameTargets = nextTargets;
        frameGroups = nextGroups;
      } else {
        frameElement = null;
        frameMode = '';
        delete canvas.dataset.meshResponse;
      }

      const rate = targetReveal ? 0.12 : 0.2;
      frameReveal += (targetReveal - frameReveal) * (1 - Math.exp(-step * rate));
      const previousFounderTheme = founderTheme;
      founderTheme += (founderThemeGoal - founderTheme) * (step ? 1 - Math.exp(-step * 0.085) : 0);
      const themeVelocity = Math.max(0, founderTheme - previousFounderTheme);
      founderBurst = Math.max(founderBurst * Math.pow(0.94, step), Math.min(1, themeVelocity * 38));
      if (founderTheme > 0.01) canvas.dataset.meshTheme = 'origin';
      else delete canvas.dataset.meshTheme;
      if (!target && frameReveal < 0.005) {
        frameReveal = 0;
        frameTargets = [];
        frameAssignments = [];
        frameGroups = [];
      }
      return new Map(frameAssignments.map(assignment => [assignment.node, frameTargets[assignment.target]]));
    }

    function resize() {
      frameElement = null;
      frameMode = '';
      frameTargets = [];
      frameAssignments = [];
      frameGroups = [];
      frameReveal = 0;
      founderTheme = 0;
      founderThemeGoal = 0;
      founderBurst = 0;
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
      const frameTargetByNode = meshInteraction(step);
      const originMix = founderTheme * founderTheme * (3 - 2 * founderTheme);
      const mixChannel = (from: number, to: number) => Math.round(from + (to - from) * originMix);
      const lineColor = [mixChannel(68, 255), mixChannel(185, 184), mixChannel(132, 92)];
      const nodeColor = [mixChannel(105, 255), mixChannel(220, 218), mixChannel(168, 153)];
      const signalColor = [mixChannel(125, 255), mixChannel(234, 240), mixChannel(187, 202)];
      const frameColor = [mixChannel(82, 255), mixChannel(224, 196), mixChannel(166, 116)];
      const frameNodeColor = [mixChannel(145, 255), mixChannel(249, 236), mixChannel(196, 193)];
      const reach = (width < 700 ? 155 : 190) + navReveal * 34 + originMix * 52;
      const radius = width < 700 ? 160 : 240;
      elapsed += step * 0.008;
      scrollEnergy *= Math.pow(0.92, step);

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
          if (founderBurst > 0.002) {
            const dx = node.x - founderCenter.x;
            const dy = node.y - founderCenter.y;
            const distance = Math.hypot(dx, dy);
            const burstReach = Math.max(width, height) * 0.72;
            if (distance > 4 && distance < burstReach) {
              const force = (1 - distance / burstReach) * founderBurst * (0.035 + node.depth * 0.035);
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
          ctx!.strokeStyle = `rgba(${Math.min(255, lineColor[0] + navReveal * 18)}, ${Math.min(255, lineColor[1] + navReveal * 35)}, ${Math.min(255, lineColor[2] + navReveal * 25)}, ${strength * (0.32 * edge + activity * 0.36 + navReveal * 0.42 + originMix * 0.22) * easedConnection})`;
          ctx!.lineWidth = 0.7 + navReveal * 0.24 + originMix * 0.18;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(a.x + (b.x - a.x) * easedConnection, a.y + (b.y - a.y) * easedConnection);
          ctx!.stroke();
          // A few travelling signals reveal the graph's connectivity.
          if (loaderProgress >= 1 && i % 11 === 0 && j % 3 === 0 && distance > 55) {
            const progress = (elapsed * 0.15 + a.phase / (Math.PI * 2)) % 1;
            ctx!.fillStyle = `rgba(${signalColor[0]}, ${signalColor[1]}, ${signalColor[2]}, ${strength * (0.65 + navReveal * 0.3 + originMix * 0.2)})`;
            ctx!.beginPath();
            ctx!.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 1.25 + navReveal * 0.65, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
        ctx!.fillStyle = `rgba(${nodeColor[0]}, ${nodeColor[1]}, ${nodeColor[2]}, ${(0.28 + a.depth * 0.34 + activity * 0.35 + navReveal * 0.45 + originMix * 0.2) * edge * nodeReveal})`;
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, 0.8 + a.depth * 1.25 + activity + navReveal * 0.55, 0, Math.PI * 2);
        ctx!.fill();
        if (i % 9 === 0 && nodeReveal > 0) {
          ctx!.strokeStyle = `rgba(${frameColor[0]}, ${frameColor[1]}, ${frameColor[2]}, ${(0.15 * edge + activity * 0.25 + navReveal * 0.2 + originMix * 0.18) * nodeReveal})`;
          ctx!.beginPath();
          ctx!.arc(a.x, a.y, 5 + a.depth * 2, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }
      if (frameReveal > 0.01 && frameAssignments.length > 2) {
        ctx!.strokeStyle = `rgba(${frameColor[0]}, ${frameColor[1]}, ${frameColor[2]}, ${frameReveal * (0.82 + originMix * 0.14)})`;
        ctx!.lineWidth = 0.9 + originMix * 0.25;
        const nodeByTarget = new Map(frameAssignments.map(assignment => [assignment.target, assignment.node]));
        frameGroups.forEach(group => {
          ctx!.beginPath();
          let started = false;
          for (let targetIndex = group.start; targetIndex < group.start + group.count; targetIndex++) {
            const nodeIndex = nodeByTarget.get(targetIndex);
            if (nodeIndex === undefined) continue;
            const node = nodes[nodeIndex];
            if (!started) {
              ctx!.moveTo(node.x, node.y);
              started = true;
            } else {
              ctx!.lineTo(node.x, node.y);
            }
          }
          if (group.closed && started) ctx!.closePath();
          if (started) ctx!.stroke();
        });
        frameAssignments.forEach(assignment => {
          const node = nodes[assignment.node];
          ctx!.fillStyle = `rgba(${frameNodeColor[0]}, ${frameNodeColor[1]}, ${frameNodeColor[2]}, ${0.38 + frameReveal * 0.62})`;
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
      frameMode = '';
      frameTargets = [];
      frameAssignments = [];
      frameGroups = [];
      frameReveal = 0;
      delete canvas.dataset.meshResponse;
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
