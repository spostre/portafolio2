/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CSSProperties } from 'react';
import { motion, MotionConfig, useScroll, useSpring } from 'motion/react';
import {
  ArrowUpRight,
  Clock,
  Github,
  Heart,
  Linkedin,
  MessageCircle,
  Rocket,
  TrendingUp,
  Users,
} from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import Section, { Accent, Reveal } from './components/Section';
import Starfield from './components/Starfield';
import Status from './components/Status';
import Album from './components/Album';
import ContactForm from './components/ContactForm';
import { goals, improving, journey, pad, projects, techs } from './data';

const socials = [
  { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/spostre' },
  { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/spostre' },
  { icon: <MessageCircle size={20} />, label: 'WhatsApp', href: 'https://wa.me/573167168440' },
];

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <MotionConfig reducedMotion="user">
      <Header />

      {/* Barra de progreso de lectura */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-blue-300 z-[60] origin-left" style={{ scaleX }} />

      <main>
        <Hero />

        {/* Habilidades */}
        <Section id="skills" index="01" eyebrow="Habilidades" title="Mis *Habilidades*" tone="light" overlay="lines">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            <Reveal className="md:col-span-2 md:row-span-2">
              <article className="group relative h-full overflow-hidden rounded-[2px] bg-blue-700 text-white p-8 md:p-11 flex flex-col min-h-[320px] md:min-h-[440px]">
                <span className="eyebrow text-white/70">01 · Principal</span>
                <Clock
                  className="absolute -right-16 -top-16 w-56 h-56 md:-right-20 md:-top-20 md:w-[340px] md:h-[340px] text-white/20 transition-transform duration-700 group-hover:rotate-12"
                  size={340}
                  strokeWidth={0.6}
                  aria-hidden="true"
                />
                <div className="relative mt-auto">
                  <h3 className="text-4xl md:text-5xl mb-5">Puntualidad</h3>
                  <p className="text-lg text-white/80 leading-relaxed max-w-md">
                    Compromiso total con los plazos de entrega, asegurando resultados impecables siempre a tiempo.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.08} className="md:col-span-2">
              <article className="h-full rounded-[2px] bg-ink-900 text-white p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="w-14 h-14 border border-white/15 text-blue-300 rounded-[3px] grid place-items-center shrink-0">
                  <Heart size={24} />
                </div>
                <div>
                  <span className="eyebrow text-blue-300">02</span>
                  <h3 className="text-2xl mt-1 mb-2">Amabilidad</h3>
                  <p className="text-[#b9bfca]">Trato cercano y empático para construir relaciones profesionales sólidas.</p>
                </div>
              </article>
            </Reveal>

            {[
              { Icon: Rocket, title: 'Velocidad' },
              { Icon: Users, title: 'Trabajo en equipo' },
            ].map(({ Icon, title }, i) => (
              <Reveal key={title} delay={0.16 + i * 0.08}>
                <article className="group h-full bg-white border border-[rgb(15_18_24/0.18)] rounded-[2px] p-8 flex flex-col justify-between gap-10 min-h-[180px] transition-colors hover:border-blue-600">
                  <div className="flex items-center justify-between">
                    <Icon className="text-blue-600 transition-transform duration-300 group-hover:-translate-y-1" size={28} />
                    <span className="eyebrow text-gray-500">{pad(i + 2)}</span>
                  </div>
                  <h3 className="text-xl">{title}</h3>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Tecnologías como tabla de celdas numeradas */}
          <Reveal delay={0.1} className="mt-14">
            <p className="eyebrow text-blue-600 mb-4">Tecnologías</p>
            <ul className="grid grid-cols-2 sm:grid-cols-5 border-t border-l border-[rgb(15_18_24/0.14)] bg-white">
              {techs.map((tech, i) => (
                <li
                  key={i}
                  className="group flex items-baseline gap-3 px-5 py-4 border-r border-b border-[rgb(15_18_24/0.14)] transition-colors hover:bg-ink-950 hover:text-white"
                >
                  <span className="font-nav text-[0.65rem] font-semibold text-blue-600 group-hover:text-blue-300">{pad(i)}</span>
                  <span className="font-medium">{tech}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* Trayectoria */}
        <Section id="journey" index="02" eyebrow="Trayectoria" title="Mi *Trayectoria*" tone="dark" stars>
          <ol className="pf-ladder">
            {journey.map((item, i) => (
              <li key={i} style={{ '--h': i } as CSSProperties}>
                <Reveal delay={i * 0.12} className="flex flex-1 flex-col">
                  <div className="pf-ladder__step" style={{ '--h': i } as CSSProperties}>
                    <span className="pf-ladder__year">{item.year}</span>
                    <div className="pf-ladder__body">
                      <p className="eyebrow text-blue-300 mb-3">{item.company}</p>
                      <h3 className="text-2xl mb-3">{item.title}</h3>
                      <p className="text-[#a3a9b4] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Section>

        {/* Proyectos */}
        <Section id="projects" index="03" eyebrow="Proyectos" title="Experiencias y *Proyectos*" tone="light" overlay="grid">
          <div className="grid gap-5 md:gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.key}>
                <article id={`proyecto-${project.key}`} className="pf-panel">
                  <div className="pf-panel__brand">
                    <span className="pf-panel__label">{pad(i)} · {project.category}</span>
                    <h3 className="pf-panel__name">{project.title}</h3>
                    <span className="pf-panel__badge">GitHub</span>
                    <svg className="pf-panel__symbol" viewBox="0 0 200 200" aria-hidden="true">
                      {project.symbol}
                    </svg>
                  </div>

                  <div className="pf-panel__detail">
                    <p className="pf-panel__text">{project.desc}</p>

                    <ul className="pf-panel__features">
                      {project.tags.map((tag, t) => (
                        <li key={tag}>
                          <span>{pad(t)}</span>
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="pf-panel__cta">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
                        Ver Proyecto
                        <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Crecimiento */}
        <Section id="growth" index="04" eyebrow="Crecimiento" title="Crecimiento y *Objetivos*" tone="blue" overlay="blue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { heading: 'Objetivos a Futuro', items: goals, Icon: Rocket, dark: true },
              { heading: 'Cosas que estoy mejorando', items: improving, Icon: TrendingUp, dark: false },
            ].map(({ heading, items, Icon, dark }, col) => (
              <Reveal key={heading} delay={col * 0.1} className="h-full">
                <div className={`h-full rounded-[2px] p-8 md:p-10 ${dark ? 'bg-ink-950' : 'bg-white/[0.08] border border-white/20'}`}>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl">{heading}</h3>
                    <Icon size={22} className={dark ? 'text-blue-300' : 'text-blue-100'} aria-hidden="true" />
                  </div>
                  <ol className="border-t border-white/15">
                    {items.map((item, i) => (
                      <li key={i} className="flex gap-5 py-5 border-b border-white/15">
                        <span className={`eyebrow pt-1 shrink-0 ${dark ? 'text-blue-300' : 'text-blue-100'}`} aria-hidden="true">{pad(i)}</span>
                        <span className="text-[1.05rem] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Álbum */}
        <Section id="gallery" index="05" eyebrow="Galería" title="Álbum *Dinámico*" tone="dark" stars>
          <Reveal>
            <Album />
          </Reveal>
        </Section>

        {/* Contacto y estado */}
        <Section id="contact" index="06" eyebrow="Contacto" title="Contacto y *Estado*" tone="light" overlay="lines">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <h3 className="text-2xl mb-6">Mi Estado Actual</h3>
              <Status />
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-2xl mb-6">Envíame un Mensaje</h3>
              <ContactForm />
            </Reveal>
          </div>
        </Section>
      </main>

      {/* Pie de página */}
      <footer className="surface-dark has-stars bg-ink-950 text-white py-20 border-t border-white/5">
        <Starfield origin="bottom" density={0.6} />
        <div className="container-x flex flex-col md:flex-row justify-between md:items-end gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-[clamp(2.2rem,5vw,3.4rem)] mb-5">
              <Accent text="¡Sigamos en *contacto*!" />
            </h2>
            <p className="text-[#a3a9b4] max-w-md mx-auto md:mx-0 leading-relaxed">
              Espero que hayas disfrutado este viaje a traves de mi portafolio. No dudes en escribirme para cualquier colaboración o simplemente para saludar.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <ul className="flex gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-[3px] border border-white/15 grid place-items-center text-[#cfd3da] hover:text-white hover:border-white hover:bg-white/5 transition-colors"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
            <p className="eyebrow text-gray-500">
              © 2026 Santiago Centeno
            </p>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}
