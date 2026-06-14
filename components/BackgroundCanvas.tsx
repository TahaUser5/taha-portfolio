'use client';

import { useEffect, useRef } from 'react';
// Statically import only the types for TypeScript's compiler
import type { Vector3, Mesh, BufferAttribute } from 'three';

/* 30% of NeuralCanvas intensity — 18 nodes (vs 55), lower opacity lines */
const NODE_COUNT  = 18;
const BOUNDS      = 36;
const DEPTH       = 18;
const CONNECT_DIST = 16;
const MAX_CONN    = 45;

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted   = true;
    let animId    = 0;
    let scrollY   = 0;
    let doCleanup: (() => void) | null = null;

    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    import('three').then((THREE) => {
      if (!mounted || !container) return;

      const scene  = new THREE.Scene();
      const w = window.innerWidth;
      const h = window.innerHeight;

      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
      camera.position.z = 52;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const nodeGeom = new THREE.SphereGeometry(0.1, 4, 4);
      const nodeMat  = new THREE.MeshBasicMaterial({
        color: 0x8B5CF6, transparent: true, opacity: 0.28,
      });

      // Fixed: Using the statically imported Type shapes cleanly here
      type NodeData = {
        pos: Vector3;
        vel: Vector3;
        mesh: Mesh;
      };
      const nodes: NodeData[] = [];

      for (let i = 0; i < NODE_COUNT; i++) {
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
        const nw = window.innerWidth, nh = window.innerHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener('resize', onResize);

      /* Scroll parallax — gently shift group.position.y */
      let prevScroll = scrollY;

      const animate = () => {
        animId = requestAnimationFrame(animate);

        const delta = scrollY - prevScroll;
        prevScroll  = scrollY;
        group.position.y += delta * -0.0018;
        /* Drift back toward 0 so it doesn't scroll off forever */
        group.position.y *= 0.998;

        group.rotation.y += 0.0003;

        for (let i = 0; i < NODE_COUNT; i++) {
          const { pos, vel, mesh } = nodes[i];
          pos.x += vel.x; pos.y += vel.y; pos.z += vel.z;
          if (Math.abs(pos.x) > BOUNDS) vel.x *= -1;
          if (Math.abs(pos.y) > BOUNDS) vel.y *= -1;
          if (Math.abs(pos.z) > DEPTH)  vel.z *= -1;
          mesh.position.copy(pos);
        }

        let c = 0;
        for (let i = 0; i < NODE_COUNT && c < MAX_CONN; i++) {
          for (let j = i + 1; j < NODE_COUNT && c < MAX_CONN; j++) {
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
        // Fixed: Simplified type casting using static type import
        (lineGeom.attributes.position as BufferAttribute).needsUpdate = true;

        renderer.render(scene, camera);
      };
      animate();

      doCleanup = () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animId);
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
        nodeGeom.dispose(); nodeMat.dispose();
        lineGeom.dispose(); lineMat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      mounted = false;
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
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
      }}
    />
  );
}