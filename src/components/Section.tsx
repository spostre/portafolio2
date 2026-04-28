import { ReactNode } from 'react';
import { motion } from 'motion/react';
import FloatingDecor from './FloatingDecor';

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  bgColor?: string;
  className?: string;
  showDecor?: boolean;
}

export default function Section({ id, title, children, bgColor = 'bg-white', className = '', showDecor = true }: SectionProps) {
  return (
    <section 
      id={id} 
      className={`relative min-h-screen flex flex-col items-center justify-center py-40 px-6 transition-colors duration-1000 ${bgColor} ${className} overflow-hidden`}
    >
      {showDecor && <FloatingDecor />}
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl w-full z-10"
      >
        {title && (
          <h2 className="text-4xl md:text-7xl text-center mb-20 rainbow-text font-black tracking-tighter">
            {title}
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  );
}
