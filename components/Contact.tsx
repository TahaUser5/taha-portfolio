'use client';

import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
    </svg>
  );
}

const contacts = [
  { label: 'Email',    handle: personal.email,  href: `mailto:${personal.email}`,  Icon: MailIcon,     sub: 'Say hello or discuss a project' },
  { label: 'LinkedIn', handle: 'tahatanvir',     href: personal.linkedin,            Icon: LinkedInIcon, sub: 'Connect professionally' },
  { label: 'GitHub',   handle: 'TahaUser5',      href: personal.github,              Icon: GithubIcon,   sub: 'Browse projects and code' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-28 relative overflow-hidden z-10">
      <hr className="section-divider" />

      {/* Animated top gradient border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6 30%, #00FF94 50%, #8B5CF6 70%, transparent)' }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Animated bottom gradient border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6 30%, #00FF94 50%, #8B5CF6 70%, transparent)' }}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Large radial violet glow behind heading */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.18), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 pt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Contact</span>
        </motion.div>

        {/* Heading — "build" in electric green */}
        <motion.div
          className="mt-2 mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2
            className="font-display font-bold heading-glow leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            <span className="text-[#F8F8FF]">Let&apos;s </span>
            <span className="electric-glow" style={{ color: '#00FF94' }}>build</span>
            <br />
            <span className="text-gradient">something together.</span>
          </h2>
          <p className="text-[#6B7280] mt-5 max-w-md" style={{ fontSize: '0.95rem' }}>
            Whether it&apos;s a production AI system, a research collaboration, or a freelance
            project — reach out and let&apos;s talk.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          {contacts.map(({ label, handle, href, Icon, sub }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="card-glass p-6 flex flex-col gap-4 group"
            >
              {/* Icon with electric glow on hover */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}
              >
                <div className="text-[#C4B5FD] group-hover:text-[#00FF94] transition-colors duration-300">
                  <Icon />
                </div>
              </div>

              <div>
                <p className="font-display font-semibold text-[#F8F8FF] text-base">{label}</p>
                <p className="font-mono text-xs mt-0.5" style={{ color: '#00FF94' }}>{handle}</p>
                <p className="text-xs mt-2" style={{ color: '#6B7280' }}>{sub}</p>
              </div>

              <div className="mt-auto">
                <span className="font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 inline-flex items-center gap-1"
                  style={{ color: '#6B7280' }}>
                  Open →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-mono text-[10px] mt-20 uppercase tracking-widest"
          style={{ color: '#6B7280' }}
        >
          Taha Tanvir · {new Date().getFullYear()} · Lahore, Pakistan
        </motion.p>
      </div>
    </section>
  );
}
