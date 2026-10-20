import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Marca en el menú la sección que ocupa el centro de la pantalla
  useEffect(() => {
    const ids = ['hero', 'skills', 'journey', 'projects', 'growth', 'gallery', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id === 'growth' ? 'projects' : entry.target.id;
          setActive(`#${id}`);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300 ${
        scrolled || isOpen ? 'bg-ink-950 border-white/10' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container-x h-[72px] flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 text-white font-semibold tracking-tight">
          <span className="text-lg">Mi <span className="accent !text-blue-300 text-xl">Portafolio</span></span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 font-nav text-[0.85rem]">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? 'true' : undefined}
                  className={`relative px-3 py-2 transition-colors ${
                    active === item.href ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-px bg-blue-300 origin-left transition-transform duration-300 ${
                      active === item.href ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="md:hidden p-2 -mr-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <nav id="mobile-menu" aria-label="Principal" className="md:hidden border-t border-white/10">
          <ul className="container-x py-4 flex flex-col font-nav">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 border-b border-white/5 ${active === item.href ? 'text-white' : 'text-white/70'}`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
