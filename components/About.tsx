'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { personal } from '@/data/portfolio';

const AboutRing = dynamic(() => import('./AboutRing'), { ssr: false });

/* ── Count-up animation ─────────────────────────────────────── */
function CountUp({ end, duration = 1200 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!inView) return;
    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else setCount(end);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

/* ── Data ────────────────────────────────────────────────────── */
const stats = [
  { value: 2, label: 'Degrees',     sub: 'BS + MPhil AI' },
  { value: 5, label: 'Projects',    sub: 'Research to prod' },
  { value: 1, label: 'Publication', sub: 'Peer-reviewed paper' },
];

const bioLines = [
  personal.summary,
  'Currently pursuing my MPhil in AI at PUCIT while shipping cutting-edge projects spanning generative models, retrieval-augmented generation, and multimodal deep learning.',
  'My background bridges rigorous research and production engineering — from fine-tuning 6B-parameter diffusion models to deploying hybrid RAG pipelines with Docker and FastAPI.',
];

const focusTags = ['LLMs', 'RAG Systems', 'Diffusion Models', 'Transfer Learning', 'FastAPI', 'PyTorch'];

const lineVariant = {
  hidden: { opacity: 0, y: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.13, ease: 'easeOut' },
  }),
};

/* ── Component ───────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 relative z-10">
      <hr className="section-divider mb-0" />

      <div className="max-w-6xl mx-auto px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">About</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 mt-2">
          {/* ── Text column ── */}
          <div className="lg:col-span-3">
            <motion.h2
              className="font-display font-bold text-gradient heading-glow leading-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              Building intelligence
              <br />from research to reality.
            </motion.h2>

            <div className="space-y-4 mb-10">
              {bioLines.map((line, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={lineVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-100px' }}
                  className={`leading-relaxed ${i === 0 ? 'text-[#c4b5fd]' : 'text-[#6B7280]'}`}
                  style={{ lineHeight: 1.8, fontSize: i === 0 ? '1.05rem' : '0.95rem' }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Focus tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {focusTags.map(tag => (
                <span key={tag} className="skill-pill">{tag}</span>
              ))}
            </motion.div>
          </div>

          {/* ── Stats column ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="card-glass p-6"
                style={{ borderBottom: '2px solid rgba(0,255,148,0.35)' }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-end gap-4">
                  {/* Orbiting particle ring behind the number */}
                  <div className="relative flex items-center justify-center" style={{ width: 64, height: 64 }}>
                    <AboutRing />
                    <span
                      className="font-mono leading-none electric-glow relative"
                      style={{ fontSize: '4rem', color: '#00FF94', zIndex: 1 }}
                    >
                      <CountUp end={s.value} />
                    </span>
                  </div>
                  <div className="pb-1">
                    <p className="font-sans font-semibold text-[#F8F8FF] text-lg leading-tight">
                      {s.label}
                    </p>
                    <p className="font-mono text-xs text-[#6B7280] mt-0.5">{s.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="card-glass p-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
              whileHover={{ y: -2 }}
            >
              <p className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider mb-1">
                Based in
              </p>
              <p className="font-display font-semibold text-[#F8F8FF]">{personal.location}</p>
              <p className="font-mono text-xs mt-2" style={{ color: '#00FF94' }}>
                Open to remote opportunities
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
