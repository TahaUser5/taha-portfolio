'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '@/data/portfolio';

const NAV_LINKS = [
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#projects',   label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(href.slice(1)); },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-[rgba(139,92,246,0.12)]'
            : 'bg-transparent'
        }`}
        style={scrolled ? { background: 'rgba(3,3,8,0.85)', backdropFilter: 'blur(20px)' } : {}}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-lg tracking-tight text-gradient hover:opacity-80 transition-opacity"
            aria-label="Back to top"
          >
            TT
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = active === href.slice(1);
              return (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className={`relative font-mono text-[11px] tracking-widest uppercase transition-colors duration-200 ${
                      isActive
                        ? 'text-[#00FF94]'
                        : 'text-[#6B7280] hover:text-[#F8F8FF]'
                    }`}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#00FF94] rounded-full" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Hire Me CTA */}
          <a
            href={`mailto:${personal.email}`}
            className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-200"
            style={{
              border: '1px solid rgba(0,255,148,0.3)',
              color: '#00FF94',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,255,148,0.08)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = '';
            }}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] z-[60] relative"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-[#C4B5FD] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-6 h-px bg-[#C4B5FD] transition-all duration-300 ${menuOpen ? 'opacity-0 -translate-x-2' : ''}`} />
            <span className={`block w-6 h-px bg-[#C4B5FD] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center md:hidden"
            style={{ background: 'rgba(3,3,8,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
              className="flex flex-col items-center gap-8"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <motion.li
                  key={href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.35 } },
                  }}
                >
                  <button
                    onClick={() => scrollTo(href)}
                    className="font-display text-3xl font-bold text-[#F8F8FF] hover:text-[#00FF94] transition-colors duration-200"
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12"
            >
              <a
                href={`mailto:${personal.email}`}
                className="font-mono text-xs text-[#00FF94] tracking-wider"
              >
                {personal.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
