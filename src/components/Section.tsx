import { ReactNode } from 'react';
import { motion } from 'motion/react';
import Starfield from './Starfield';

type Tone = 'light' | 'paper' | 'dark' | 'blue';
type Overlay = 'lines' | 'grid' | 'blue';

const TONES: Record<Tone, string> = {
  light: 'bg-white text-ink-900',
  paper: 'bg-paper text-ink-900',
  dark: 'surface-dark bg-ink-950 text-white',
  blue: 'surface-blue bg-blue-700 text-white',
};

const EYEBROW: Record<Tone, string> = {
  light: 'text-blue-600',
  paper: 'text-blue-600',
  dark: 'text-blue-300',
  blue: 'text-blue-100',
};

const OVERLAYS: Record<Overlay, string> = {
  lines: 'overlay-lines',
  grid: 'overlay-grid',
  blue: 'overlay-blue',
};

interface SectionProps {
  id: string;
  index?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: Tone;
  stars?: boolean;
  overlay?: Overlay;
  children: ReactNode;
  className?: string;
}

/* Convierte "Mis *Habilidades*" en texto con la palabra entre asteriscos destacada */
export function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith('*') ? (
          <span key={i} className="accent">{part.slice(1, -1)}</span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/* Aparece una sola vez al entrar en pantalla (solo opacidad y desplazamiento) */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Section({ id, index, eyebrow, title, intro, tone = 'light', stars = false, overlay, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${TONES[tone]} ${stars ? 'has-stars' : ''} ${overlay ? OVERLAYS[overlay] : ''} ${className}`}
    >
      {stars && <Starfield origin="top-right" density={0.8} />}
      <div className="container-x">
        {title && (
          <Reveal className="mb-14 md:mb-16 max-w-3xl">
            {(index || eyebrow) && (
              <p className={`eyebrow mb-5 flex items-center gap-3 ${EYEBROW[tone]}`}>
                {index && <span aria-hidden="true">{index}</span>}
                <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
                {eyebrow && <span>{eyebrow}</span>}
              </p>
            )}
            <h2 className="text-[clamp(2.1rem,5vw,3.6rem)]">
              <Accent text={title} />
            </h2>
            {intro && <p className={`mt-5 text-lg leading-relaxed max-w-2xl ${tone === 'light' || tone === 'paper' ? 'text-gray-600' : 'text-[#b9bfca]'}`}>{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
