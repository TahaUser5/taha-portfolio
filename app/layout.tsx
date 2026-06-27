import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Syne, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import './globals.css';

const BackgroundCanvas = dynamic(() => import('@/components/BackgroundCanvas'), {
  ssr: false,
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const mono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Taha Tanvir — AI Engineer',
  description:
    'AI Engineer with a full-stack background. MPhil in Artificial Intelligence at PUCIT. Building ML pipelines, LLMs, and production-ready AI applications from research to deployment.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'LLMs',
    'RAG',
    'Deep Learning',
    'Lahore',
    'Pakistan',
    'PyTorch',
    'HuggingFace',
  ],
  authors: [{ name: 'Taha Tanvir', url: 'https://github.com/TahaUser5' }],
  openGraph: {
    title: 'Taha Tanvir — AI Engineer',
    description:
      'Building ML pipelines, LLMs, and production-ready AI systems from research to deployment.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#080810',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" style={{ backgroundColor: '#080810' }}>
      <body
        className={`${syne.variable} ${jakarta.variable} ${mono.variable} bg-[#080810] text-[#F8F8FF] antialiased font-sans`}
        style={{ backgroundColor: '#080810', position: 'relative' }}
      >
        <BackgroundCanvas />
        {/* Fix 8: Global fixed glow accents — passive depth on every section */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', top: '-100px', right: '-100px',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'fixed', bottom: '-80px', left: '-80px',
            width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,255,148,0.04) 0%, transparent 65%)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
