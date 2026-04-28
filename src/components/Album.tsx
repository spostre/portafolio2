import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Play, Maximize2, X, ChevronRight, Eye, EyeOff } from 'lucide-react';

const photos = [
  { id: 1, url: 'images/WhatsApp Image 2026-04-28 at 3.01.26 PM.jpeg', title: 'Momentos 1' },
  { id: 2, url: 'images/WhatsApp Image 2026-04-28 at 3.01.28 PM.jpeg', title: 'Momentos 2' },
  { id: 3, url: 'images/WhatsApp Image 2026-04-28 at 3.01.29 PM(1).jpeg', title: 'Momentos 3' },
  { id: 4, url: 'images/WhatsApp Image 2026-04-28 at 3.01.29 PM.jpeg', title: 'Momentos 4' },
];

export default function Album() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Photos Section */}
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-2xl font-bold text-gray-700">Mis Fotos (Click para cambiar)</h3>
        
        <div className="relative w-full max-w-md aspect-[3/4] h-[500px] flex items-center justify-center cursor-pointer" onClick={nextPhoto}>
          {photos.map((photo, index) => {
            // Calculate position in the stack
            const isCurrent = index === currentPhotoIndex;
            const position = (index - currentPhotoIndex + photos.length) % photos.length;
            
            // Only show top 3-4 cards for performance and look
            if (position > 3) return null;

            return (
              <motion.div
                key={photo.id}
                initial={false}
                animate={{
                  scale: 1 - position * 0.05,
                  y: position * -20,
                  rotate: position * 5,
                  zIndex: photos.length - position,
                  opacity: 1 - position * 0.2,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden candy-shadow bg-white border-8 border-white origin-bottom"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isCurrent && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                    <h4 className="font-bold text-2xl">{photo.title}</h4>
                    <p className="text-white/80 text-sm">Foto {index + 1} de {photos.length}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Section */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => setShowVideo(!showVideo)}
          className={`flex items-center gap-2 font-bold py-4 px-8 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 ${
            showVideo ? 'bg-white text-candy-pink border-2 border-candy-pink' : 'bg-candy-pink text-white'
          }`}
        >
          {showVideo ? (
            <>
              Ocultar Video <EyeOff size={20} />
            </>
          ) : (
            <>
              Ver Video <Eye size={20} />
            </>
          )}
        </button>

        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              className="w-full max-w-sm overflow-hidden"
            >
              <div className="aspect-[9/16] rounded-[3rem] overflow-hidden bg-black candy-shadow border-8 border-white relative">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src="video/WhatsApp Video 2026-04-28 at 2.18.33 PM.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
