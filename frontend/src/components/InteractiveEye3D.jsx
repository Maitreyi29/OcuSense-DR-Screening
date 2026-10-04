import React, { useEffect, useRef, useState } from 'react';

export default function InteractiveEye3D() {
  const containerRef = useRef(null);
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only mobile devices
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

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

  // Smooth 60fps lerp loop for organic eye movement
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

  // Transform offsets for multi-layered 3D depth
  const rotateX = -currentPos.y * 22;
  const rotateY = currentPos.x * 26;
  const irisTranslateX = currentPos.x * 16;
  const irisTranslateY = currentPos.y * 16;
  const pupilTranslateX = currentPos.x * 22;
  const pupilTranslateY = currentPos.y * 22;
  const highlightTranslateX = -currentPos.x * 14;
  const highlightTranslateY = -currentPos.y * 14;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center cursor-pointer select-none group"
      style={{ perspective: '1200px' }}
    >
      {/* Outer Holographic Ambient Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-teal-500/15 to-emerald-500/20 blur-3xl animate-pulse-glow" />

      {/* 3D Eyeball Outer Spherical Shell */}
      <div
        className={`relative w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 ${
          isHovered ? 'border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.4)]' : 'border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)]'
        } flex items-center justify-center overflow-hidden transition-all duration-300 ${
          isTouchDevice ? 'animate-pulse-slow' : ''
        }`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.03 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Retinal Vasculature & Optic Ring SVG Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35 pointer-events-none"
          viewBox="0 0 200 200"
        >
          <path
            d="M 100 100 Q 145 55 175 35 M 100 100 Q 55 135 25 165 M 100 100 Q 155 145 185 155 M 100 100 Q 45 65 15 45 M 100 100 Q 110 30 120 10 M 100 100 Q 90 170 80 190"
            stroke="#06b6d4"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="4 4"
          />
          <circle cx="100" cy="100" r="88" stroke="#10b981" strokeWidth="0.8" fill="none" opacity="0.5" />
          <circle cx="100" cy="100" r="72" stroke="#06b6d4" strokeWidth="0.6" fill="none" opacity="0.4" />
          <circle cx="100" cy="100" r="54" stroke="#0d9488" strokeWidth="0.5" fill="none" strokeDasharray="3 3" opacity="0.5" />
        </svg>

        {/* Outer Sclera / Optic HUD Ring */}
        <div className="absolute inset-3 rounded-full border border-cyan-400/30 flex items-center justify-center">
          
          {/* Iris Container Layer */}
          <div
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-cyan-950 via-cyan-600 to-teal-400 p-1 shadow-[inset_0_0_35px_rgba(0,0,0,0.85)] flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `translate3d(${irisTranslateX}px, ${irisTranslateY}px, 25px)`,
            }}
          >
            {/* Iris Radial Fiber Texture */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_transparent_30%,_rgba(6,182,212,0.85)_75%)] opacity-90" />
            <div className="absolute inset-1 rounded-full border border-teal-300/50 border-dashed animate-spin-slow" />

            {/* Central Deep Pupil */}
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.9)] flex items-center justify-center transition-transform duration-75"
              style={{
                transform: `translate3d(${pupilTranslateX - irisTranslateX}px, ${pupilTranslateY - irisTranslateY}px, 35px)`,
              }}
            >
              {/* Core Pupil Sensor Dot */}
              <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_14px_#10b981]" />
            </div>

            {/* Dynamic Cornea Lens Glare Highlight */}
            <div
              className="absolute top-4 left-6 w-9 h-9 rounded-full bg-white/45 blur-[1px] pointer-events-none transition-transform duration-75"
              style={{
                transform: `translate3d(${highlightTranslateX}px, ${highlightTranslateY}px, 45px)`,
              }}
            />
            <div
              className="absolute bottom-6 right-8 w-4 h-4 rounded-full bg-cyan-300/40 blur-[1px] pointer-events-none"
            />

          </div>

        </div>

        {/* Retinal Laser Scanning Line */}
        <div className="absolute inset-x-2 h-0.5 scanner-beam animate-scan-line pointer-events-none" />

        {/* HUD Metadata Overlay */}
        <div className="absolute top-3 left-4 text-[9px] font-mono text-cyan-400 font-bold tracking-widest uppercase">
          AI OPTIC SENSOR
        </div>
        <div className="absolute bottom-3 right-4 text-[9px] font-mono text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{isHovered ? 'TRACKING CURSOR' : isTouchDevice ? 'AUTOSCAN' : 'ACTIVE'}</span>
        </div>

      </div>
    </div>
  );
}
