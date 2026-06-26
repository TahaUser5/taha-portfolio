export default function GridBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor: '#080810',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '70vw',
          height: '70vw',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)',
          filter: 'blur(80px)',
          transform: 'translate3d(0,0,0)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 100%)',
        }}
      />
    </div>
  );
}
