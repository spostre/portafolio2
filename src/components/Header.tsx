import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Heart } from 'lucide-react';

const navItems = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Habilidades', href: '#skills' },
  { name: 'Trayectoria', href: '#journey' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Galería', href: '#gallery' },
  { name: 'Contacto', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <nav className={`glass rounded-full px-6 py-3 flex items-center justify-between candy-shadow ${scrolled ? 'bg-white/70' : 'bg-white/40'}`}>
          <motion.a 
            href="#hero"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-xl font-bold rainbow-text"
          >
            <Heart className="text-candy-pink fill-candy-pink" size={24} />
            <span>Mi Portafolio</span>
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href}
                  className="text-sm font-semibold text-gray-600 hover:text-candy-pink transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full px-6 pt-2 md:hidden"
          >
            <div className="glass rounded-3xl p-6 flex flex-col gap-4 candy-shadow">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-candy-pink"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
