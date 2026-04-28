import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  size: number;
  color: string;
}

export default function ClickSparkles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create burst of sparkles
      const newParticles: Particle[] = [];
      const colors = ['#FFD1DC', '#B2E2F2', '#FFF9C4', '#C1E1C1', '#E0BBE4'];
      
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          angle: (Math.PI * 2 * i) / 8 + (Math.random() * 0.5),
          velocity: 2 + Math.random() * 3,
          size: 4 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setParticles(prev => [...prev, ...newParticles]);
      
      // Cleanup
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 1000);
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              scale: 0, 
              opacity: 1,
              rotate: 0 
            }}
            animate={{ 
              x: particle.x + Math.cos(particle.angle) * 100 * particle.velocity,
              y: particle.y + Math.sin(particle.angle) * 100 * particle.velocity,
              scale: 1.5,
              opacity: 0,
              rotate: 180
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute"
            style={{ color: particle.color }}
          >
            <Sparkles size={particle.size} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
