'use client';

import { useEffect, useRef } from 'react';

const NODE_COUNT = 55;
const BOUNDS = 26;
const DEPTH = 15;
const CONNECT_DIST = 11;
const MAX_CONN = 175;

export default function NeuralCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;
    let animId = 0;
    let resizeId = 0;
    let lastFrame = 0;
    let isVisible = !document.hidden;
    let isActive = true;
    let doCleanup: (() => void) | null = null;

    import('three').then((THREE) => {
      if (!mounted || !container) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
      const frameInterval = reduceMotion ? 1000 / 12 : coarsePointer ? 1000 / 30 : 1000 / 60;
      const maxPixelRatio = coarsePointer ? 1.25 : 2;

      const getViewportSize = () => {
        const viewport = window.visualViewport;
        return {
          width: Math.max(1, Math.round(container.clientWidth || viewport?.width || window.innerWidth)),
          height: Math.max(1, Math.round(container.clientHeight || viewport?.height || window.innerHeight)),
        };
      };

      // Scene
      const scene = new THREE.Scene();
      const { width: w, height: h } = getViewportSize();

      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
      camera.position.z = 42;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        depth: false,
        stencil: false,
        powerPreference: 'default',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
      renderer.setSize(w, h, false);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.transform = 'translate3d(0,0,0)';
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Node group — both meshes and lines live inside so rotation is shared
      const group = new THREE.Group();
      scene.add(group);

      // Geometry / material (shared)
      const nodeGeom = new THREE.SphereGeometry(0.18, 6, 6);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed });

      type NodeData = {
        pos: InstanceType<typeof THREE.Vector3>;
        vel: InstanceType<typeof THREE.Vector3>;
        mesh: InstanceType<typeof THREE.Mesh>;
      };

      const nodes: NodeData[] = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        const mesh = new THREE.Mesh(nodeGeom, nodeMat);
        const pos = new THREE.Vector3(
          (Math.random() - 0.5) * BOUNDS * 2,
          (Math.random() - 0.5) * BOUNDS * 2,
          (Math.random() - 0.5) * DEPTH * 2
        );
        mesh.position.copy(pos);
        group.add(mesh);
        nodes.push({
          pos,
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.009
          ),
          mesh,
        });
      }

      // Lines (inside the same group → rotates together)
      const lineBuf = new Float32Array(MAX_CONN * 6);
      const lineGeom = new THREE.BufferGeometry();
      const posAttr = new THREE.BufferAttribute(lineBuf, 3);
      lineGeom.setAttribute('position', posAttr);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x6d28d9,
        transparent: true,
        opacity: 0.22,
      });
      const lineSegs = new THREE.LineSegments(lineGeom, lineMat);
      group.add(lineSegs);

      // Pointer/touch parallax with a mobile-safe fallback.
      let mx = 0;
      let my = 0;
      let targetMx = 0;
      let targetMy = 0;

      const updateTarget = (clientX: number, clientY: number) => {
        const { width, height } = getViewportSize();
        targetMx = (clientX / width - 0.5) * 2;
        targetMy = (clientY / height - 0.5) * 2;
      };

      const onPointerMove = (event: PointerEvent) => {
        updateTarget(event.clientX, event.clientY);
      };

      const onMouse = (event: MouseEvent) => {
        updateTarget(event.clientX, event.clientY);
      };

      const onTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0] ?? event.changedTouches[0];
        if (!touch) return;
        updateTarget(touch.clientX, touch.clientY);
      };

      const supportsPointerEvents = typeof window !== 'undefined' && 'PointerEvent' in window;

      if (supportsPointerEvents) {
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerdown', onPointerMove, { passive: true });
      } else {
        window.addEventListener('mousemove', onMouse, { passive: true });
        window.addEventListener('touchstart', onTouchMove, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
      }

      const onResize = () => {
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
          syncActivity();
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

      const animate = (now: number) => {
        if (!isActive || document.hidden || reduceMotion) return;
        animId = requestAnimationFrame(animate);

        if (now - lastFrame < frameInterval) return;
        lastFrame = now;

        // Slow rotation
        group.rotation.y += 0.0007;
        group.rotation.x += 0.0002;

        // Camera parallax
        mx += (targetMx - mx) * 0.08;
        my += (targetMy - my) * 0.08;
        camera.position.x += (mx * 5 - camera.position.x) * 0.025;
        camera.position.y += (-my * 5 - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);

        // Move nodes
        for (let i = 0; i < NODE_COUNT; i++) {
          const { pos, vel, mesh } = nodes[i];
          pos.x += vel.x;
          pos.y += vel.y;
          pos.z += vel.z;
          if (Math.abs(pos.x) > BOUNDS) vel.x *= -1;
          if (Math.abs(pos.y) > BOUNDS) vel.y *= -1;
          if (Math.abs(pos.z) > DEPTH) vel.z *= -1;
          mesh.position.copy(pos);
        }

        // Build connections
        let c = 0;
        for (let i = 0; i < NODE_COUNT && c < MAX_CONN; i++) {
          for (let j = i + 1; j < NODE_COUNT && c < MAX_CONN; j++) {
            const dx = nodes[i].pos.x - nodes[j].pos.x;
            const dy = nodes[i].pos.y - nodes[j].pos.y;
            const dz = nodes[i].pos.z - nodes[j].pos.z;
            if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECT_DIST) {
              const b = c * 6;
              lineBuf[b] = nodes[i].pos.x;
              lineBuf[b + 1] = nodes[i].pos.y;
              lineBuf[b + 2] = nodes[i].pos.z;
              lineBuf[b + 3] = nodes[j].pos.x;
              lineBuf[b + 4] = nodes[j].pos.y;
              lineBuf[b + 5] = nodes[j].pos.z;
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
        if (supportsPointerEvents) {
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerdown', onPointerMove);
        }
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('touchstart', onTouchMove);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('resize', onResize);
        window.visualViewport?.removeEventListener('resize', onResize);
        window.visualViewport?.removeEventListener('scroll', onResize);
        if (resizeId) cancelAnimationFrame(resizeId);
        cancelAnimationFrame(animId);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        nodeGeom.dispose();
        nodeMat.dispose();
        lineGeom.dispose();
        lineMat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      mounted = false;
      isActive = false;
      if (resizeId) cancelAnimationFrame(resizeId);
      cancelAnimationFrame(animId);
      doCleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 0,
        backgroundColor: '#080810',
      }}
    />
  );
}
