'use client';

import { useEffect, useRef } from 'react';

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float w1 = sin(vUv.x * 5.0 + uTime * 0.35) * 0.5 + 0.5;
    float w2 = cos(vUv.y * 4.0 + uTime * 0.28) * 0.5 + 0.5;
    float w3 = sin((vUv.x + vUv.y) * 3.0 + uTime * 0.42) * 0.5 + 0.5;
    float blend = w1 * 0.4 + w2 * 0.35 + w3 * 0.25;

    vec3 violet = vec3(0.545, 0.361, 0.965);
    vec3 green  = vec3(0.0,   1.0,   0.580);
    vec3 dark   = vec3(0.031, 0.031, 0.063);

    vec3 col = mix(dark, mix(violet * 0.18, green * 0.08, blend * 0.4), blend * 0.18);
    gl_FragColor = vec4(col, blend * 0.3 + 0.07);
  }
`;

export default function ProjectMesh() {
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
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      // updateStyle=false: let CSS control visual size; we control render resolution only
      renderer.setSize(2, 2, false);
      renderer.setClearColor(0x000000, 0);

      // Make the canvas fill the container via CSS
      const cvs = renderer.domElement;
      cvs.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border-radius:12px;';
      container.appendChild(cvs);

      const uniforms = { uTime: { value: 0 } };
      const geom = new THREE.PlaneGeometry(2, 2);
      const mat  = new THREE.ShaderMaterial({
        uniforms,
        vertexShader:   VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite:  false,
      });
      scene.add(new THREE.Mesh(geom, mat));

      // Update render resolution when container resizes
      const ro = new ResizeObserver((entries) => {
        const rect = entries[0]?.contentRect;
        if (!rect || rect.width === 0 || rect.height === 0) return;
        renderer.setSize(
          Math.max(1, Math.round(rect.width  * 0.45)),
          Math.max(1, Math.round(rect.height * 0.45)),
          false, // don't touch CSS
        );
      });
      ro.observe(container);

      const start = performance.now();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        uniforms.uTime.value = (performance.now() - start) * 0.001;
        renderer.render(scene, camera);
      };
      animate();

      doCleanup = () => {
        ro.disconnect();
        cancelAnimationFrame(animId);
        if (container.contains(cvs)) container.removeChild(cvs);
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
      style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        borderRadius: 12,
        overflow: 'hidden',
      }}
    />
  );
}
