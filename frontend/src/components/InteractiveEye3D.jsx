import React, { useEffect, useRef, useState } from 'react';

export default function InteractiveEye3D() {
  const containerRef = useRef(null);
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance normalized from -1 to 1
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp between -1 and 1
      const clampedX = Math.max(-1, Math.min(1, deltaX));
      const clampedY = Math.max(-1, Math.min(1, deltaY));

      setTargetPos({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp movement loop for natural eye tracking
  useEffect(() => {
    let animFrame;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      setCurrentPos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.08),
        y: lerp(prev.y, targetPos.y, 0.08),
      }));
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [targetPos]);

  // Transform offsets for layered 3D depth
  const rotateX = -currentPos.y * 18;
  const rotateY = currentPos.x * 22;
  const pupilTranslateX = currentPos.x * 14;
  const pupilTranslateY = currentPos.y * 14;
  const highlightTranslateX = currentPos.x * 20;
  const highlightTranslateY = currentPos.y * 20;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: '1000px' }}
    >
      {/* Outer Holographic Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-teal-500/10 to-emerald-500/20 blur-2xl animate-pulse-glow" />

      {/* 3D Eyeball Container */}
      <div
        className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex items-center justify-center overflow-hidden transition-transform duration-100 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Retinal Vasculature Background Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
          viewBox="0 0 200 200"
        >
          <path
            d="M 100 100 Q 140 60 170 40 M 100 100 Q 60 130 30 160 M 100 100 Q 150 140 180 150 M 100 100 Q 50 70 20 50"
            stroke="#06b6d4"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 4"
          />
          <circle cx="100" cy="100" r="85" stroke="#10b981" strokeWidth="0.8" fill="none" opacity="0.4" />
          <circle cx="100" cy="100" r="70" stroke="#06b6d4" strokeWidth="0.5" fill="none" opacity="0.3" />
        </svg>

        {/* Outer Sclera / Optic Ring */}
        <div className="absolute inset-4 rounded-full border border-cyan-400/30 flex items-center justify-center">
          
          {/* Iris Container (Middle Layer) */}
          <div
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-cyan-900 via-cyan-600 to-teal-400 p-1 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `translate3d(${pupilTranslateX * 0.6}px, ${pupilTranslateY * 0.6}px, 20px)`,
            }}
          >
            {/* Iris Fibers / Texture */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_transparent_30%,_rgba(6,182,212,0.8)_70%)] opacity-80" />
            <div className="absolute inset-1 rounded-full border border-teal-300/40 border-dashed animate-spin-slow" />

            {/* Central Pupil (Deep Layer) */}
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950 border border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.8)] flex items-center justify-center transition-transform duration-75"
              style={{
                transform: `translate3d(${pupilTranslateX * 0.5}px, ${pupilTranslateY * 0.5}px, 30px)`,
              }}
            >
              {/* Core Pupil Micro Scanner Dot */}
              <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#10b981]" />
            </div>

            {/* Cornea Lens Reflection Highlight */}
            <div
              className="absolute top-4 left-6 w-8 h-8 rounded-full bg-white/40 blur-[1px] pointer-events-none"
              style={{
                transform: `translate3d(${highlightTranslateX * 0.3}px, ${highlightTranslateY * 0.3}px, 40px)`,
              }}
            />
            <div
              className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-cyan-300/30 blur-[1px] pointer-events-none"
            />

          </div>

        </div>

        {/* Laser Scanner Beam Line Across Pupil */}
        <div className="absolute inset-x-2 h-0.5 scanner-beam animate-scan-line pointer-events-none" />

        {/* Corner HUD Indicators */}
        <div className="absolute top-3 left-4 text-[9px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
          AI OPTIC SENSOR
        </div>
        <div className="absolute bottom-3 right-4 text-[9px] font-mono text-emerald-400 font-bold tracking-widest uppercase">
          {isHovered ? 'TRACKING CURSOR' : 'ACTIVE SCAN'}
        </div>
      </div>
    </div>
  );
}
