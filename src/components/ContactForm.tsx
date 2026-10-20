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
    <div className="card p-6 md:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
            role="status"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-[3px] grid place-items-center mx-auto mb-6">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-3xl mb-2">¡Mensaje Enviado!</h3>
            <p className="text-gray-600">Gracias por contactarme. Te responderé lo más pronto posible.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="cf-name" className="eyebrow !text-[0.7rem] text-gray-600">Nombre</label>
                <input
                  id="cf-name"
                  required
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="field"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="cf-email" className="eyebrow !text-[0.7rem] text-gray-600">Email</label>
                <input
                  id="cf-email"
                  required
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="field"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="cf-message" className="eyebrow !text-[0.7rem] text-gray-600">Mensaje</label>
              <textarea
                id="cf-message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="field resize-none"
                placeholder="Cuéntame sobre tu idea o proyecto..."
              />
            </div>
            <button
              disabled={status === 'sending'}
              className="btn btn-primary w-full sm:w-auto sm:self-start disabled:opacity-50"
            >
              {status === 'sending' ? 'Enviando...' : (
                <>
                  Enviar Mensaje <Send size={18} />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
