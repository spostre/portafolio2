import type { CSSProperties } from 'react';
import { ArrowDown } from 'lucide-react';
import Starfield from './Starfield';
import { projects, techs } from '../data';

/*
 * Portada partida por una diagonal de luz (misma idea que Staffing tecnológico de Campuslands).
 * - Izquierda (negro con estrellas): presentación, botones y cifras.
 * - Derecha (azul): la foto y la vista previa de los proyectos en escalones paralelos a la diagonal.
 * Al cargar (en orden): se dibuja la diagonal → entra el azul → sube el texto → llegan la foto
 * y los proyectos. Todo una sola vez; con "reducir movimiento" aparece directamente.
 */
export default function Hero() {
  const stats = [
    { value: String(techs.length), label: 'Tecnologías' },
    { value: String(projects.length), label: 'Proyectos' },
    { value: '2026', label: 'Graduación' },
  ];

  return (
    <section id="hero" className="pf-hero surface-dark">
      <Starfield origin="top-left" density={0.9} />

      {/* Lado derecho de la diagonal: azul sólido con el símbolo de código de fondo */}
      <div className="pf-hero__side" aria-hidden="true">
        <svg className="pf-hero__symbol" viewBox="0 0 200 200">
          <path d="M64 46 14 100l50 54M136 46l50 54-50 54M114 30 86 170" />
        </svg>
      </div>

      <svg className="pf-hero__line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="64" y1="0" x2="34" y2="100" />
      </svg>

      <div className="container-x pf-hero__grid">
        <div className="pf-hero__copy">
          <span className="eyebrow text-blue-300">Portafolio · Desarrollador</span>
          <h1 className="text-[clamp(2.8rem,6vw,5.2rem)]">
            ¡Hola! Soy <span className="accent">Santiago Centeno</span>
          </h1>
          <p className="pf-hero__text">
            Bienvenido a mi portafolio. Soy un desarrollador productivo apasionado por crear experiencias digitales útiles y memorables.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              Ver Proyectos <ArrowDown size={16} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contactar
            </a>
          </div>
          <dl className="pf-hero__stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="pf-hero__visual">
          <figure className="pf-hero__photo">
            <img
              src="/images/33b680c6-04c1-4867-b11d-72b2c3440b62.jpg"
              alt="Mi Foto"
              width={768}
              height={1024}
              fetchPriority="high"
            />
          </figure>

          <nav className="pf-preview" aria-label="Proyectos destacados">
            <span className="pf-preview__label">Proyectos destacados</span>
            <ul>
              {projects.map((p, i) => (
                <li key={p.key} style={{ '--i': i } as CSSProperties}>
                  <a href={`#proyecto-${p.key}`} className="pf-preview__item">
                    <svg viewBox="0 0 200 200" aria-hidden="true">{p.symbol}</svg>
                    <span>
                      <strong>{p.title}</strong>
                      <small>{p.category}</small>
                    </span>
                    <span className="pf-preview__arrow" aria-hidden="true">↓</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
