'use client';

import { useEffect, useRef } from 'react';

const NODE_COUNT  = 18;
const MOBILE_NODE_COUNT = 10;
const BOUNDS      = 36;
const DEPTH       = 18;
const CONNECT_DIST = 16;
const MAX_CONN    = 45;

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;
    let animId = 0;
    let resizeId = 0;
    let scrollY = window.scrollY;
    let lastFrame = 0;
    let isVisible = !document.hidden;
    let isActive = true;
    let doCleanup: (() => void) | null = null;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
    const frameInterval = reduceMotion ? 1000 / 12 : coarsePointer ? 1000 / 30 : 1000 / 60;
    const maxPixelRatio = coarsePointer ? 1.15 : 1.5;

    const getViewportSize = () => {
      const viewport = window.visualViewport;
      return {
        width: Math.max(1, Math.round(viewport?.width ?? window.innerWidth)),
        height: Math.max(1, Math.round(viewport?.height ?? window.innerHeight)),
      };
    };

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    import('three').then((THREE) => {
      if (!mounted || !container) return;

      const scene  = new THREE.Scene();
      const { width: w, height: h } = getViewportSize();
      const nodeCount = coarsePointer || w < 768 ? MOBILE_NODE_COUNT : NODE_COUNT;

      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
      camera.position.z = 52;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
      renderer.setSize(w, h, false);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.transform = 'translate3d(0,0,0)';
      renderer.domElement.style.backgroundColor = '#080810';
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const nodeGeom = new THREE.SphereGeometry(0.1, 4, 4);
      const nodeMat  = new THREE.MeshBasicMaterial({
        color: 0x8B5CF6, transparent: true, opacity: 0.28,
      });

      type NodeData = {
        pos: InstanceType<typeof THREE.Vector3>;
        vel: InstanceType<typeof THREE.Vector3>;
        mesh: InstanceType<typeof THREE.Mesh>;
      };
      const nodes: NodeData[] = [];

      for (let i = 0; i < nodeCount; i++) {
        const mesh = new THREE.Mesh(nodeGeom, nodeMat);
        const pos  = new THREE.Vector3(
          (Math.random() - 0.5) * BOUNDS * 2,
          (Math.random() - 0.5) * BOUNDS * 2,
          (Math.random() - 0.5) * DEPTH  * 2,
        );
        mesh.position.copy(pos);
        group.add(mesh);
        nodes.push({
          pos,
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.009,
            (Math.random() - 0.5) * 0.009,
            (Math.random() - 0.5) * 0.004,
          ),
          mesh,
        });
      }

      const lineBuf  = new Float32Array(MAX_CONN * 6);
      const lineGeom = new THREE.BufferGeometry();
      const posAttr  = new THREE.BufferAttribute(lineBuf, 3);
      lineGeom.setAttribute('position', posAttr);
      const lineMat  = new THREE.LineBasicMaterial({
        color: 0x8B5CF6, transparent: true, opacity: 0.07,
      });
      const lineSegs = new THREE.LineSegments(lineGeom, lineMat);
      group.add(lineSegs);

      const onResize = () => {
        if (!mounted) return;
        if (resizeId) return;
        resizeId = window.requestAnimationFrame(() => {
          resizeId = 0;
          const { width: nw, height: nh } = getViewportSize();
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
          renderer.setSize(nw, nh, false);
        });
      };
      window.addEventListener('resize', onResize, { passive: true });
      window.visualViewport?.addEventListener('resize', onResize, { passive: true });
      window.visualViewport?.addEventListener('scroll', onResize, { passive: true });

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            isActive = !document.hidden && !reduceMotion;
            if (isActive && !animId) {
              lastFrame = 0;
              animId = requestAnimationFrame(animate);
            }
          } else {
            isActive = false;
            if (animId) {
              cancelAnimationFrame(animId);
              animId = 0;
            }
          }
        },
        { threshold: 0.01 },
      );
      intersectionObserver.observe(container);

      const syncActivity = () => {
        const shouldRun = isVisible && !document.hidden && !reduceMotion;
        if (shouldRun === isActive) return;
        isActive = shouldRun;
        if (isActive && !animId) {
          lastFrame = 0;
          animId = requestAnimationFrame(animate);
        } else if (!isActive && animId) {
          cancelAnimationFrame(animId);
          animId = 0;
        }
      };

      const onVisibilityChange = () => {
        syncActivity();
      };
      document.addEventListener('visibilitychange', onVisibilityChange);

      /* Scroll parallax — gently shift group.position.y */
      let prevScroll = scrollY;

      const animate = (now: number) => {
        if (!isActive || document.hidden || reduceMotion) return;
        animId = requestAnimationFrame(animate);

        if (now - lastFrame < frameInterval) return;
        lastFrame = now;

        const delta = scrollY - prevScroll;
        prevScroll  = scrollY;
        group.position.y += delta * -0.0018;
        /* Drift back toward 0 so it doesn't scroll off forever */
        group.position.y *= 0.998;

        group.rotation.y += 0.0003;

        for (let i = 0; i < nodeCount; i++) {
          const { pos, vel, mesh } = nodes[i];
          pos.x += vel.x; pos.y += vel.y; pos.z += vel.z;
          if (Math.abs(pos.x) > BOUNDS) vel.x *= -1;
          if (Math.abs(pos.y) > BOUNDS) vel.y *= -1;
          if (Math.abs(pos.z) > DEPTH)  vel.z *= -1;
          mesh.position.copy(pos);
        }

        let c = 0;
        for (let i = 0; i < nodeCount && c < MAX_CONN; i++) {
          for (let j = i + 1; j < nodeCount && c < MAX_CONN; j++) {
            const dx = nodes[i].pos.x - nodes[j].pos.x;
            const dy = nodes[i].pos.y - nodes[j].pos.y;
            const dz = nodes[i].pos.z - nodes[j].pos.z;
            if (Math.sqrt(dx*dx + dy*dy + dz*dz) < CONNECT_DIST) {
              const b = c * 6;
              lineBuf[b]   = nodes[i].pos.x; lineBuf[b+1] = nodes[i].pos.y; lineBuf[b+2] = nodes[i].pos.z;
              lineBuf[b+3] = nodes[j].pos.x; lineBuf[b+4] = nodes[j].pos.y; lineBuf[b+5] = nodes[j].pos.z;
              c++;
            }
          }
        }
        lineGeom.setDrawRange(0, c * 2);
        (lineGeom.attributes.position as InstanceType<typeof THREE.BufferAttribute>).needsUpdate = true;

        renderer.render(scene, camera);
      };
      onResize();
      animId = requestAnimationFrame(animate);

      doCleanup = () => {
        intersectionObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('resize', onResize);
        window.visualViewport?.removeEventListener('resize', onResize);
        window.visualViewport?.removeEventListener('scroll', onResize);
        cancelAnimationFrame(animId);
        if (resizeId) cancelAnimationFrame(resizeId);
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        nodeGeom.dispose(); nodeMat.dispose();
        lineGeom.dispose(); lineMat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      mounted = false;
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', () => undefined);
      cancelAnimationFrame(animId);
      if (resizeId) cancelAnimationFrame(resizeId);
      doCleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0,
        zIndex: 0, pointerEvents: 'none',
        transform: 'translate3d(0,0,0)',
        contain: 'layout paint size',
        backgroundColor: '#080810',
      }}
    />
  );
}
