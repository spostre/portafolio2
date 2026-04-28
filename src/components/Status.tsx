import { Circle, MapPin, Calendar, Sparkles } from 'lucide-react';

/**
 * CONFIGURACIÓN DE TU ESTADO
 * Cambia los valores de abajo para actualizar tu estado en la web.
 */
const MY_STATUS = 'busy'; // Opciones: 'available' (Verde) | 'busy' (Rojo)
const MY_MESSAGE = 'Hola, estoy mejorando mis habilidades y pronto estare listo para la accion';
const MY_LOCATION = 'Floridablanca, Colombia';
const MY_ACTIVITY = 'Estudiando';

export default function Status() {
  const isAvailable = MY_STATUS === 'busy';

  return (
    <div className="glass p-8 rounded-[3rem] candy-shadow w-full border-4 border-white bg-white/40">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black text-gray-700 tracking-tight flex items-center gap-2">
          Mi Estado <Sparkles className="text-candy-yellow" size={20} />
        </h3>
        <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 border-2 ${isAvailable ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'}`}>
          <Circle size={12} className={`fill-current ${isAvailable ? 'animate-pulse' : ''}`} />
          <span className="text-xs font-black uppercase tracking-widest">
            {isAvailable ? 'Disponible' : 'Ocupado'}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Mensaje Principal */}
        <div className="bg-white/80 p-6 rounded-[2rem] border-2 border-white candy-shadow shadow-inner">
          <p className="text-gray-600 italic text-lg leading-relaxed">
            "{MY_MESSAGE}"
          </p>
        </div>

        {/* Detalles Adicionales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-white/50 p-4 rounded-2xl border border-white/50">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-candy-blue shadow-sm">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ubicación</p>
              <p className="text-sm font-bold text-gray-700">{MY_LOCATION}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/50 p-4 rounded-2xl border border-white/50">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-candy-purple shadow-sm">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Actividad</p>
              <p className="text-sm font-bold text-gray-700">{MY_ACTIVITY}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
