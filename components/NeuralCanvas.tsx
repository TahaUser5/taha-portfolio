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
    let doCleanup: (() => void) | null = null;

    import('three').then((THREE) => {
      if (!mounted || !container) return;

      // Scene
      const scene = new THREE.Scene();
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
      camera.position.z = 42;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      // Node group — both meshes and lines live inside so rotation is shared
      const group = new THREE.Group();
      scene.add(group);

      // Geometry / material (shared)
      const nodeGeom = new THREE.SphereGeometry(0.18, 6, 6);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed });

      type NodeData = {
        pos: THREE.Vector3;
        vel: THREE.Vector3;
        mesh: THREE.Mesh;
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

      // Mouse parallax (subtle)
      let mx = 0;
      let my = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouse);

      const onResize = () => {
        if (!container) return;
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener('resize', onResize);

      const animate = () => {
        animId = requestAnimationFrame(animate);

        // Slow rotation
        group.rotation.y += 0.0007;
        group.rotation.x += 0.0002;

        // Camera parallax
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
        (lineGeom.attributes.position as THREE.BufferAttribute).needsUpdate = true;

        renderer.render(scene, camera);
      };

      animate();

      doCleanup = () => {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
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
      cancelAnimationFrame(animId);
      doCleanup?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
