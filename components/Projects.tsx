'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { projects, personal } from '@/data/portfolio';
import type { Project } from '@/data/portfolio';

const ProjectMesh = dynamic(() => import('./ProjectMesh'), { ssr: false });

const TAG_STYLES: Record<string, string> = {
  'RAG':           'bg-violet-500/15 text-violet-300 border-violet-500/25',
  'Generative AI': 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  'ML Research':   'bg-blue-500/15   text-blue-300   border-blue-500/25',
  'Research':      'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  'FYP':           'bg-teal-500/15   text-teal-300   border-teal-500/25',
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
      className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
      aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13L13 3M13 3H7M13 3v6" />
    </svg>
  );
}

function PaperBadge() {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider"
      style={{ background: 'rgba(0,255,148,0.1)', color: '#00FF94', border: '1px solid rgba(0,255,148,0.3)' }}>
      ✦ Published
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tagStyle = TAG_STYLES[project.tag] ?? 'bg-slate-500/15 text-slate-300 border-slate-500/25';

  return (
    <motion.article
      className="card-glass relative overflow-hidden group flex flex-col"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
    >
      {/* Sliding green top border on hover */}
      <span
        className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-10"
        style={{ background: '#00FF94' }}
        aria-hidden="true"
      />

      {/* Animated shader mesh background — replaces static dot-grid */}
      <ProjectMesh />

      <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${tagStyle}`}>
              {project.tag}
            </span>
            {project.hasPaper && <PaperBadge />}
          </div>
          <span className="font-mono text-xs shrink-0" style={{ color: '#6B7280' }}>
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-[#F8F8FF] leading-snug" style={{ fontSize: '1.25rem' }}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#6B7280' }}>
          {project.description}
        </p>

        {/* Metrics */}
        <div className="space-y-1.5">
          {project.metrics.map(m => (
            <div key={m} className="flex items-center gap-2">
              <span className="font-mono text-[10px]" style={{ color: '#00FF94' }}>◆</span>
              <span className="font-mono text-sm electric-glow" style={{ color: '#00FF94' }}>
                {m}
              </span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map(t => (
            <span key={t} className="skill-pill">{t}</span>
          ))}
        </div>

        {/* Footer */}
        <div
          className="pt-3 flex items-center justify-end"
          style={{ borderTop: '1px solid rgba(139,92,246,0.12)' }}
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1.5 font-mono text-xs transition-colors duration-200 relative"
            style={{ color: '#6B7280' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#00FF94')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
            aria-label={`View ${project.title} on GitHub`}
          >
            <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#00FF94] after:transition-all after:duration-200 group-hover/link:after:w-full">
              View on GitHub
            </span>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const featured = projects.filter(p => p.featured);
  const rest     = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-16 md:py-24 relative z-10">
      <hr className="section-divider" />

      <div className="max-w-6xl mx-auto px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Projects</span>
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
            Selected Work
          </h2>
          <p className="text-[#6B7280] mt-3 max-w-lg" style={{ fontSize: '0.95rem' }}>
            Research-driven engineering — production AI systems with measurable outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {featured.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((p, i) => <ProjectCard key={p.title} project={p} index={featured.length + i} />)}
        </div>
      </div>
    </section>
  );
}
