'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';

const ROLES = [
  'AI Engineer',
  'ML Researcher',
  'RAG Specialist',
  'Deep Learning Engineer',
];

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];

    if (!deleting && text.length < current.length) {
      const t = setTimeout(() => setText(current.slice(0, text.length + 1)), 85);
      return () => clearTimeout(t);
    }

    if (!deleting && text.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 1900);
      return () => clearTimeout(t);
    }

    if (deleting && text.length > 0) {
      const t = setTimeout(() => setText(current.slice(0, text.length - 1)), 42);
      return () => clearTimeout(t);
    }

    // text is empty, deleting → advance
    setDeleting(false);
    setRoleIdx((i) => (i + 1) % ROLES.length);
  }, [text, deleting, roleIdx]);

  return (
    <section className="relative min-h-[100svh] flex items-start md:items-center justify-center overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28 md:pt-0">
      {/* Grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />

      {/* Mobile-safe dark backdrop so the hero never washes out if the canvas under-renders */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 70% at 50% 18%, rgba(139,92,246,0.18) 0%, rgba(8,8,16,0.92) 48%, rgba(8,8,16,0.98) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Radial violet glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.15) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto pt-2 sm:pt-8 md:pt-20 w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 mb-6 sm:mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-electric shadow-electric animate-pulse-slow" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#9984d4]">
            AI Engineer · MPhil · Lahore, Pakistan
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="font-display font-bold text-gradient leading-none tracking-tight mb-5 sm:mb-6"
          style={{ fontSize: 'clamp(3.4rem, 13vw, 9rem)', letterSpacing: '-0.03em', textShadow: '0 0 80px rgba(139,92,246,0.6)' }}
        >
          Taha Tanvir
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 h-10"
        >
          <span className="text-[#4c2a8a] font-mono text-lg sm:text-xl">—</span>
          <span className="font-mono min-w-[170px] sm:min-w-[200px] text-left" style={{ fontSize: 'clamp(1rem, 4.5vw, 1.5rem)', color: '#00FF94' }}>
            {text}
          </span>
          <span className="inline-block w-0.5 h-6 bg-accent-light animate-cursor ml-1" />
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-sm sm:text-base md:text-lg text-[#9984d4] max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12 px-2 sm:px-0"
        >
          Building ML pipelines, deep learning models, and production-ready AI systems —
          from research prototype to deployed application.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full font-mono text-sm tracking-wide transition-all duration-200"
            style={{ background: '#00FF94', color: '#080810', fontWeight: 700, boxShadow: '0 0 24px rgba(0,255,148,0.35)' }}
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full font-mono text-sm tracking-wide transition-all duration-200 text-accent-light hover:bg-accent/10"
            style={{ border: '1px solid rgba(139,92,246,0.4)' }}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 rounded-full font-mono text-sm tracking-wide transition-all duration-200 text-accent-light hover:bg-accent/10"
            style={{ border: '1px solid rgba(139,92,246,0.4)' }}
          >
            <MailIcon />
            Email Me
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#4c2a8a]">
          scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-accent/40 to-transparent" />
      </motion.div>
    </section>
  );
}
