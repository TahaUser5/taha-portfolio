'use client';

import { useEffect, useRef } from 'react';

export default function SkillOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted   = true;
    let animId    = 0;
    let doCleanup: (() => void) | null = null;

    import('three').then((THREE) => {
      if (!mounted || !container) return;

      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 3;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(40, 40);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const geom = new THREE.IcosahedronGeometry(0.85, 0);
      const mat  = new THREE.MeshBasicMaterial({
        color: 0x8B5CF6,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      });
      const mesh = new THREE.Mesh(geom, mat);
      scene.add(mesh);

      const animate = () => {
        animId = requestAnimationFrame(animate);
        mesh.rotation.x += 0.009;
        mesh.rotation.y += 0.013;
        renderer.render(scene, camera);
      };
      animate();

      doCleanup = () => {
        cancelAnimationFrame(animId);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        geom.dispose();
        mat.dispose();
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
      aria-hidden="true"
      style={{ width: 40, height: 40, flexShrink: 0 }}
    />
  );
}
