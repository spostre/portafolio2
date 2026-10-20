import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';

const photos = [
  { id: 1, url: '/images/WhatsApp Image 2026-04-28 at 3.01.26 PM.jpeg', title: 'Momentos 1' },
  { id: 2, url: '/images/WhatsApp Image 2026-04-28 at 3.01.28 PM.jpeg', title: 'Momentos 2' },
  { id: 3, url: '/images/WhatsApp Image 2026-04-28 at 3.01.29 PM(1).jpeg', title: 'Momentos 3' },
  { id: 4, url: '/images/WhatsApp Image 2026-04-28 at 3.01.29 PM.jpeg', title: 'Momentos 4' },
];

export default function Album() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 items-start">
      {/* Fotos */}
      <div className="flex flex-col gap-8">
        <h3 className="text-2xl">Mis Fotos (Click para cambiar)</h3>

        <button
          type="button"
          onClick={nextPhoto}
          aria-label={`Foto ${currentPhotoIndex + 1} de ${photos.length}. Siguiente foto`}
          className="relative w-[86%] sm:w-full max-w-md aspect-[3/4] mx-auto lg:mx-0 mt-6 cursor-pointer rounded-[3px]"
        >
          {photos.map((photo, index) => {
            const isCurrent = index === currentPhotoIndex;
            const position = (index - currentPhotoIndex + photos.length) % photos.length;

            // Solo las 3 primeras de la pila
            if (position > 2) return null;

            return (
              <motion.div
                key={photo.id}
                initial={false}
                animate={{
                  scale: 1 - position * 0.05,
                  y: position * -18,
                  rotate: position * 3,
                  zIndex: photos.length - position,
                  opacity: 1 - position * 0.25,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                className="absolute inset-0 rounded-[3px] overflow-hidden bg-ink-850 border border-white/10 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] origin-bottom"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {isCurrent && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent flex items-end justify-between p-6 text-left">
                    <span className="text-2xl font-medium tracking-tight">{photo.title}</span>
                    <span className="eyebrow text-white/70">Foto {index + 1} de {photos.length}</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </button>

        <div className="flex gap-2 justify-center lg:justify-start max-w-md" aria-hidden="true">
          {photos.map((photo, index) => (
            <span
              key={photo.id}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                index === currentPhotoIndex ? 'bg-blue-300' : 'bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="flex flex-col items-center lg:items-start gap-8 lg:pt-14">
        <button
          type="button"
          onClick={() => setShowVideo(!showVideo)}
          aria-expanded={showVideo}
          className={`btn ${showVideo ? 'btn-ghost' : 'btn-primary'}`}
        >
          {showVideo ? (
            <>
              Ocultar Video <EyeOff size={18} />
            </>
          ) : (
            <>
              Ver Video <Eye size={18} />
            </>
          )}
        </button>

        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              className="w-full max-w-sm"
            >
              <div className="mac-window">
                <div className="mac-window__bar" aria-hidden="true"><span /><span /><span /></div>
                <div className="aspect-[9/16] bg-black">
                  <video className="w-full h-full object-cover" controls autoPlay muted loop playsInline>
                    <source src="/video/WhatsApp Video 2026-04-28 at 2.18.33 PM.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
