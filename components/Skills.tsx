'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { skillGroups } from '@/data/portfolio';

const SkillOrb = dynamic(() => import('./SkillOrb'), { ssr: false });

const cardVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 relative z-10">
      <hr className="section-divider" />

      <div className="max-w-6xl mx-auto px-6 pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Skills</span>
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
            Technical Expertise
          </h2>
          <p className="text-[#6B7280] mt-3 max-w-lg" style={{ fontSize: '0.95rem' }}>
            A breadth of tools across the full AI/ML stack — from model training to production deployment.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className="card-glass overflow-hidden"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: gi * 0.07, ease: 'easeOut' }}
              whileHover={{ y: -2 }}
            >
              {/* Card header with violet left border */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: '1px solid rgba(139,92,246,0.15)', borderLeft: '3px solid #8B5CF6' }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-lg leading-none electric-glow"
                    style={{ color: '#00FF94' }}
                    aria-hidden="true"
                  >
                    {group.icon}
                  </span>
                  <h3 className="font-display font-semibold text-[#F8F8FF]" style={{ fontSize: '1rem' }}>
                    {group.category}
                  </h3>
                </div>
                <SkillOrb />
              </div>

              {/* Pills with stagger */}
              <motion.div
                className="flex flex-wrap gap-2 p-5"
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
              >
                {group.skills.map(skill => (
                  <motion.span
                    key={skill}
                    variants={pillVariants}
                    className="skill-pill"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
