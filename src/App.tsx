/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'motion/react';
import {
  Sparkles,
  Code2,
  User,
  Rocket,
  TrendingUp,
  Camera,
  Github,
  Linkedin,
  MessageCircle,
  Palette,
  Moon,
  Sun,
  Clock,
  Heart,
  Users
} from 'lucide-react';

import Header from './components/Header';
import Section from './components/Section';
import MouseTrail from './components/MouseTrail';
import Status from './components/Status';
import Album from './components/Album';
import ContactForm from './components/ContactForm';
import ClickSparkles from './components/ClickSparkles';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const themes = {
    pastel: {
      hero: 'bg-gradient-to-br from-candy-pink via-white to-candy-blue',
      skills: 'bg-gradient-to-tr from-candy-blue via-white to-candy-green',
      journey: 'bg-gradient-to-br from-candy-green via-white to-candy-purple',
      exp: 'bg-gradient-to-tr from-candy-purple via-white to-candy-yellow',
      growth: 'bg-gradient-to-br from-candy-yellow via-white to-candy-pink',
      album: 'bg-gradient-to-tr from-candy-pink via-white to-candy-blue',
      contact: 'bg-gradient-to-br from-candy-blue via-white to-candy-green',
      footer: 'bg-gray-50',
    },
    vibrant: {
      hero: 'bg-gradient-to-br from-blue-100 via-white to-purple-100',
      skills: 'bg-gradient-to-tr from-purple-100 via-white to-green-100',
      journey: 'bg-gradient-to-br from-green-100 via-white to-yellow-100',
      exp: 'bg-gradient-to-tr from-yellow-100 via-white to-pink-100',
      growth: 'bg-gradient-to-br from-pink-100 via-white to-blue-100',
      album: 'bg-gradient-to-tr from-blue-100 via-white to-purple-100',
      contact: 'bg-gradient-to-br from-purple-100 via-white to-green-100',
      footer: 'bg-gray-100',
    },
    night: {
      hero: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white',
      skills: 'bg-gradient-to-tr from-purple-900 via-emerald-900 to-black text-white',
      journey: 'bg-gradient-to-br from-emerald-900 via-rose-900 to-black text-white',
      exp: 'bg-gradient-to-tr from-rose-900 via-indigo-900 to-black text-white',
      growth: 'bg-gradient-to-br from-indigo-900 via-blue-900 to-black text-white',
      album: 'bg-gradient-to-tr from-blue-900 via-purple-900 to-black text-white',
      contact: 'bg-gradient-to-br from-purple-900 via-emerald-900 to-black text-white',
      footer: 'bg-black text-white',
    },
    sunset: {
      hero: 'bg-gradient-to-br from-orange-100 via-rose-100 to-amber-100',
      skills: 'bg-gradient-to-tr from-amber-100 via-orange-100 to-rose-100',
      journey: 'bg-gradient-to-br from-rose-100 via-amber-100 to-orange-100',
      exp: 'bg-gradient-to-tr from-orange-100 via-rose-100 to-amber-100',
      growth: 'bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100',
      album: 'bg-gradient-to-tr from-rose-100 via-amber-100 to-orange-100',
      contact: 'bg-gradient-to-br from-orange-100 via-rose-100 to-amber-100',
      footer: 'bg-orange-50',
    },
    mint: {
      hero: 'bg-gradient-to-br from-teal-100 via-emerald-100 to-cyan-100',
      skills: 'bg-gradient-to-tr from-cyan-100 via-teal-100 to-emerald-100',
      journey: 'bg-gradient-to-br from-emerald-100 via-cyan-100 to-teal-100',
      exp: 'bg-gradient-to-tr from-teal-100 via-emerald-100 to-cyan-100',
      growth: 'bg-gradient-to-br from-cyan-100 via-teal-100 to-emerald-100',
      album: 'bg-gradient-to-tr from-emerald-100 via-cyan-100 to-teal-100',
      contact: 'bg-gradient-to-br from-teal-100 via-emerald-100 to-cyan-100',
      footer: 'bg-teal-50',
    }
  };

  const [theme, setTheme] = useState<keyof typeof themes>('pastel');
  const currentTheme = themes[theme];

  // Refs for scroll tracking
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const journeyRef = useRef(null);
  const projectsRef = useRef(null);
  const growthRef = useRef(null);
  const galleryRef = useRef(null);
  const contactRef = useRef(null);

  const isHeroInView = useInView(heroRef, { amount: 0.3 });
  const isSkillsInView = useInView(skillsRef, { amount: 0.3 });
  const isJourneyInView = useInView(journeyRef, { amount: 0.3 });
  const isProjectsInView = useInView(projectsRef, { amount: 0.3 });
  const isGrowthInView = useInView(growthRef, { amount: 0.3 });
  const isGalleryInView = useInView(galleryRef, { amount: 0.3 });
  const isContactInView = useInView(contactRef, { amount: 0.3 });

  useEffect(() => {
    if (isHeroInView) setTheme('pastel');
    else if (isSkillsInView) setTheme('vibrant');
    else if (isJourneyInView) setTheme('night');
    else if (isProjectsInView) setTheme('sunset');
    else if (isGrowthInView || isGalleryInView || isContactInView) setTheme('mint');
  }, [isHeroInView, isSkillsInView, isJourneyInView, isProjectsInView, isGrowthInView, isGalleryInView, isContactInView]);

  return (
    <div className={`selection:bg-candy-pink selection:text-white transition-colors duration-1000 ${theme === 'night' ? 'dark' : ''}`}>
      <MouseTrail />
      <ClickSparkles />
      <Header />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-candy-pink z-[60] origin-left" style={{ scaleX }} />

      {/* Hero Section */}
      <div ref={heroRef}>
        <Section id="hero" bgColor={currentTheme.hero}>
          <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              <img
                src="/images/33b680c6-04c1-4867-b11d-72b2c3440b62.jpg"
                alt="Mi Foto"
                className="relative w-full h-full object-cover rounded-[3rem] border-8 border-white candy-shadow"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-8xl mb-6 leading-tight"
              >
                ¡Hola! Soy <span className="rainbow-text">Santiago Centeno</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl"
              >
                Bienvenido a mi portafolio. Soy un desarrollador productivo apasionado por crear experiencias digitales dulces y memorables.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4 justify-center md:justify-start"
              >
                <a href="#projects" className="bg-candy-pink text-white font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform">
                  Ver Proyectos
                </a>
                <a href="#contact" className="bg-white text-candy-pink font-bold py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform border-2 border-candy-pink/10">
                  Contactar
                </a>
              </motion.div>
            </div>
          </div>
        </Section>
      </div>

      {/* Habilidades (Bento Grid) */}
      <div ref={skillsRef}>
        <Section id="skills" title="Mis Habilidades" bgColor={currentTheme.skills}>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Main Skill */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 md:row-span-2 glass p-10 rounded-[3rem] flex flex-col justify-center items-center text-center candy-shadow border-4 border-white bg-white/40"
            >
              <div className="w-24 h-24 bg-candy-pink rounded-3xl flex items-center justify-center mb-8 text-white shadow-lg">
                <Clock size={48} />
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tight">Puntualidad</h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Compromiso total con los plazos de entrega, asegurando resultados impecables siempre a tiempo.
              </p>
            </motion.div>

            {/* Secondary Skills */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 glass p-8 rounded-[3rem] flex items-center gap-8 candy-shadow border-4 border-white bg-white/40"
            >
              <div className="w-16 h-16 bg-candy-blue rounded-2xl flex items-center justify-center text-white shadow-md shrink-0">
                <Heart size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Amabilidad</h3>
                <p className="text-gray-600">Trato cercano y empático para construir relaciones profesionales sólidas.</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass p-8 rounded-[3rem] flex flex-col justify-center items-center text-center candy-shadow border-4 border-white bg-white/40"
            >
              <Rocket className="text-candy-purple mb-4" size={32} />
              <h3 className="text-xl font-bold">Velocidad</h3>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass p-8 rounded-[3rem] flex flex-col justify-center items-center text-center candy-shadow border-4 border-white bg-white/40"
            >
              <Users className="text-candy-yellow mb-4" size={32} />
              <h3 className="text-xl font-bold">Trabajo en equipo</h3>
            </motion.div>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            {['JavaScript', 'HTML', 'CSS', 'C#', 'Python', 'MySQL', 'n8n', 'Git', 'Node.js', 'Linux'].map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, backgroundColor: '#fff' }}
                className="bg-white/60 px-6 py-3 rounded-2xl font-bold text-gray-600 candy-shadow border-2 border-white/50 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </Section>
      </div>

      {/* Mi Dulce Trayectoria */}
      <div ref={journeyRef}>
        <Section id="journey" title="Mi Dulce Trayectoria" bgColor={currentTheme.journey}>
          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-white before:to-transparent">
            {[
              { year: '2024', title: 'Estudio autónomo', company: 'Principios de programación', desc: 'Aprendizaje de las bases y lógica fundamental del desarrollo.' },
              { year: '2025', title: 'Estudio en Campuslands', company: 'Campuslands', desc: 'Formación técnica avanzada y proyectos colaborativos.' },
              { year: '2026', title: 'Graduación en Campuslands', company: 'Campuslands', desc: 'Finalización del programa de entrenamiento intensivo.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-candy-pink text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Sparkles size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-8 rounded-[2.5rem] candy-shadow border-4 border-white bg-white/30">
                  <div className="flex items-center justify-between space-x-2 mb-2">
                    <div className="font-black text-candy-pink text-2xl">{item.year}</div>
                    <time className="font-bold text-gray-500 uppercase tracking-widest text-xs">{item.company}</time>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Projects */}
      <div ref={projectsRef}>
        <Section id="projects" title="Experiencias y Proyectos" bgColor={currentTheme.exp}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: 'Hotel el Carmen', desc: 'Pagina web realizada en JavaScript para la reserva de habitaciones simulada.', tags: ['JavaScript', 'HTML', 'CSS'], link: 'https://github.com/spostre/Proyecto-Java-Script' },
              { title: 'Librería de Películas', desc: 'Programa en consola creado desde Python para la gestión de películas favoritas y almacenamiento de datos en JSON.', tags: ['Python', 'JSON'], link: 'https://github.com/spostre/pelicode' },
              { title: 'Respondedor Automático Telegram', desc: 'Flujo realizado en n8n para crear un contestador automático basado en un menú numérico.', tags: ['n8n', 'Automation'], link: 'https://github.com/spostre/Proyecto-N8N' },
            ].map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="glass p-10 rounded-[3rem] candy-shadow border-4 border-white overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-candy-green/20 rounded-bl-full -mr-8 -mt-8" />
                <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{project.desc}</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-white/50 px-4 py-1 rounded-full text-sm font-bold text-gray-500">
                      #{tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-candy-pink text-white font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all"
                >
                  Ver Proyecto <Rocket size={18} />
                </a>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* Growth (Merged) */}
      <div ref={growthRef}>
        <Section id="growth" title="Crecimiento y Objetivos" bgColor={currentTheme.growth}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center md:text-left mb-8">Objetivos a Futuro</h3>
              {[
                'Trabajar en un cargo que requiera mis habilidades y tener un gran equipo de trabajo.',
                'Conseguir mas equipamiento que me ayude a expandir mis habilidades tecnicas',
                'Empezar mi propio proyecto que genere ingresos'
              ].map((goal, i) => (
                <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl border border-white/50">
                  <Rocket className="text-candy-purple shrink-0" />
                  <span className="font-medium">{goal}</span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center md:text-left mb-8">Cosas que estoy mejorando</h3>
              {[
                'Estoy mejorando mis habilidades logicas para resolver problemas de manera mas eficiente y robusta',
                'Estoy practicando mi memorizacion para no olvidar ningun detalle a al hora de escuchar al cliente',
                'Estoy poniendo a prueba mi concentracion usando metodos de trabajo flexibles que me ayuden a estar enfocado'
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-4 bg-white/40 p-4 rounded-2xl border border-white/50">
                  <TrendingUp className="text-candy-orange shrink-0" />
                  <span className="font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Album */}
      <div ref={galleryRef}>
        <Section id="gallery" title="Álbum Dinámico" bgColor={currentTheme.album}>
          <Album />
        </Section>
      </div>

      {/* Contact & Status (Merged) */}
      <div ref={contactRef}>
        <Section id="contact" title="Contacto y Estado" bgColor={currentTheme.contact}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center lg:text-left">Mi Estado Actual</h3>
              <Status />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center lg:text-left">Envíame un Mensaje Dulce</h3>
              <ContactForm />
            </div>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <footer className={`py-20 px-6 transition-colors duration-1000 ${currentTheme.footer}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-4xl rainbow-text mb-4">¡Sigamos en contacto!</h2>
            <p className="text-gray-500 max-w-md">
              Espero que hayas disfrutado este viaje a traves de mi portafolio. No dudes en escribirme para cualquier colaboración o simplemente para saludar.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              {[
                { icon: <Github />, href: 'https://github.com/spostre' },
                { icon: <Linkedin />, href: 'https://www.linkedin.com/in/spostre' },
                { icon: <MessageCircle />, href: 'https://wa.me/573167168440' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-600 hover:text-candy-pink transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              © 2026 Candy World Portfolio
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
