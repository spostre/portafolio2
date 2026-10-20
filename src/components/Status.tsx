import { MapPin, Calendar } from 'lucide-react';

/**
 * CONFIGURACIÓN DE TU ESTADO
 * Cambia los valores de abajo para actualizar tu estado en la web.
 */
const MY_STATUS = 'busy' as 'available' | 'busy'; //Opciones: 'available' (Verde) | 'busy' (Rojo)
const MY_MESSAGE = 'Hola, estoy mejorando mis habilidades y pronto estare listo para la accion';
const MY_LOCATION = 'Floridablanca, Colombia';
const MY_ACTIVITY = 'Estudiando';

export default function Status() {
  const isAvailable = MY_STATUS === 'available';

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-[#e3e6eb]">
        <h3 className="text-xl">Mi Estado</h3>
        <div
          className={`px-3 py-1 rounded-[3px] flex items-center gap-2 border text-xs font-semibold uppercase tracking-[0.12em] ${
            isAvailable ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <span className="relative flex w-2 h-2">
            {isAvailable && <span className="absolute inset-0 rounded-full bg-green-500 opacity-60 motion-safe:animate-ping" />}
            <span className={`relative w-2 h-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`} />
          </span>
          {isAvailable ? 'Disponible' : 'Ocupado'}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Mensaje principal */}
        <blockquote className="border-l-2 border-blue-600 pl-5 py-1">
          <p className="accent !text-ink-900 text-xl leading-snug">"{MY_MESSAGE}"</p>
        </blockquote>

        {/* Detalles adicionales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { Icon: MapPin, label: 'Ubicación', value: MY_LOCATION },
            { Icon: Calendar, label: 'Actividad', value: MY_ACTIVITY },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 bg-paper p-4 rounded-[3px]">
              <div className="w-10 h-10 rounded-[3px] bg-blue-100 text-blue-700 grid place-items-center shrink-0">
                <Icon size={18} />
              </div>
              <div>
                <p className="eyebrow !text-[0.65rem] text-gray-600">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
