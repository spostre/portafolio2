import { useState, FormEvent } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('https://formspree.io/f/jovennegociante@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error(error);
      alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      setStatus('idle');
    }
  };

  return (
    <div className="glass p-8 md:p-12 rounded-[3rem] candy-shadow w-full border-4 border-white">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">¡Mensaje Enviado!</h3>
            <p className="text-gray-600">Gracias por contactarme. Te responderé lo más pronto posible.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase px-2">Nombre</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-white/80 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-candy-pink/30 outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-500 uppercase px-2">Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-white/80 border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-candy-pink/30 outline-none transition-all"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-500 uppercase px-2">Mensaje</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="bg-white/80 border-none rounded-3xl px-6 py-4 focus:ring-4 focus:ring-candy-pink/30 outline-none transition-all resize-none"
                placeholder="Cuéntame algo dulce..."
              />
            </div>
            <button
              disabled={status === 'sending'}
              className="bg-candy-pink text-white font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'sending' ? 'Enviando...' : (
                <>
                  Enviar Mensaje <Send size={20} />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
