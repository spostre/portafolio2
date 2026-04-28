import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function MouseTrail() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveMouse);
    return () => window.removeEventListener('mousemove', moveMouse);
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* Main Glow */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9999] mix-blend-screen blur-xl bg-white/20"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {[...Array(12)].map((_, i) => (
        <TrailSegment key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </>
  );
}

function TrailSegment({ index, mouseX, mouseY }: any) {
  // Much softer springs for a "ribbon" effect
  const springConfig = { 
    damping: 15 + index * 2, 
    stiffness: 150 - index * 10,
    mass: 0.5 + index * 0.1
  };
  
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const colors = [
    '#FFD1DC', '#FFD1DC', 
    '#B2E2F2', '#B2E2F2', 
    '#FFF9C4', '#FFF9C4', 
    '#C1E1C1', '#C1E1C1', 
    '#E0BBE4', '#E0BBE4'
  ];

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] blur-[2px]"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: 12 - index * 0.8,
        height: 12 - index * 0.8,
        backgroundColor: colors[index % colors.length],
        opacity: 0.6 - index * 0.04,
        scale: 1 - index * 0.05,
      }}
    />
  );
}
