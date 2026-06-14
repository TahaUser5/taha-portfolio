'use client';

import { motion } from 'framer-motion';
import { timeline } from '@/data/portfolio';
import type { TimelineItem } from '@/data/portfolio';

/* ── Sub-components ─────────────────────────────────────────── */
function Dot() {
  return (
    <div className="relative z-10 shrink-0 w-5 h-5 rounded-full flex items-center justify-center animate-pulse-ring"
      style={{ border: '2px solid #8B5CF6', background: '#080810' }}>
      <div className="w-2 h-2 rounded-full" style={{ background: '#00FF94' }} />
    </div>
  );
}

function GradientLine() {
  return (
    <div className="w-px flex-1 mt-1 min-h-[60px]"
      style={{ background: 'linear-gradient(to bottom, #8B5CF6, #00FF94)' }} />
  );
}

function typeLabel(type: TimelineItem['type']): string {
  if (type === 'education')    return 'Education';
  if (type === 'experience')   return 'Experience';
  return 'Certification';
}

function typeIcon(type: TimelineItem['type']): string {
  if (type === 'education')    return '◎';
  if (type === 'experience')   return '◈';
  return '✦';
}

function Card({ item }: { item: TimelineItem }) {
  return (
    <div className="card-glass p-6">
      {/* Meta */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full"
          style={{ background: 'rgba(139,92,246,0.15)', color: '#C4B5FD', border: '1px solid rgba(139,92,246,0.3)' }}>
          {typeIcon(item.type)} {typeLabel(item.type)}
        </span>
        {/* Date badge — Space Mono, electric green */}
        <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full"
          style={{ background: 'rgba(0,255,148,0.1)', color: '#00FF94', border: '1px solid rgba(0,255,148,0.3)' }}>
          {item.period}
        </span>
      </div>

      <h3 className="font-display font-bold text-[#F8F8FF] text-lg leading-snug mb-1">
        {item.title}
      </h3>
      <p className="font-mono text-xs mb-3" style={{ color: '#00FF94' }}>
        {item.org} · {item.location}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
        {item.description}
      </p>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function Timeline() {
  return (
    <section id="experience" className="py-16 md:py-24 relative z-10">
      <hr className="section-divider" />

      <div className="max-w-6xl mx-auto px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Journey</span>
        </motion.div>

        <motion.div
          className="mt-2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h2
            className="font-display font-bold text-gradient heading-glow leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
          >
            Experience &amp; Education
          </h2>
          <p className="text-[#6B7280] mt-3 max-w-lg" style={{ fontSize: '0.95rem' }}>
            Academic research and professional engineering — from Lahore to Switzerland.
          </p>
        </motion.div>

        <div className="space-y-0">
          {timeline.map((item, i) => {
            const isRight = i % 2 === 0; // even → right col on desktop

            return (
              <div key={i}>
                {/* ── MOBILE: dot left, card right ── */}
                <div className="md:hidden flex gap-6 mb-8">
                  <div className="flex flex-col items-center shrink-0">
                    <Dot />
                    {i < timeline.length - 1 && <GradientLine />}
                  </div>
                  <motion.div
                    className="flex-1 pb-2"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <Card item={item} />
                  </motion.div>
                </div>

                {/* ── DESKTOP: alternating 3-column grid ── */}
                <div className="hidden md:grid grid-cols-[1fr_56px_1fr] mb-8">
                  {/* Left column */}
                  <div className="pr-8 flex items-start">
                    {!isRight && (
                      <motion.div
                        className="w-full"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                      >
                        <Card item={item} />
                      </motion.div>
                    )}
                  </div>

                  {/* Center: dot + gradient line */}
                  <div className="flex flex-col items-center pt-3">
                    <Dot />
                    {i < timeline.length - 1 && <GradientLine />}
                  </div>

                  {/* Right column */}
                  <div className="pl-8 flex items-start">
                    {isRight && (
                      <motion.div
                        className="w-full"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                      >
                        <Card item={item} />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
