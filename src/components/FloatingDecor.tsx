import { motion } from 'motion/react';
import { Sparkles, Star, Circle, Heart, Code2, Palette } from 'lucide-react';

const icons = [
  { Icon: Sparkles, color: 'text-candy-pink' },
  { Icon: Star, color: 'text-candy-yellow' },
  { Icon: Circle, color: 'text-candy-blue' },
  { Icon: Heart, color: 'text-candy-green' },
  { Icon: Code2, color: 'text-candy-purple' },
  { Icon: Palette, color: 'text-candy-orange' },
];

export default function FloatingDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(15)].map((_, i) => {
        const { Icon, color } = icons[i % icons.length];
        const size = 20 + Math.random() * 40;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className={`absolute ${color} opacity-20`}
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}
    </div>
  );
}
