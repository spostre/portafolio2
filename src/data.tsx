import { ReactNode } from 'react';

/* Contenido del portafolio. Para cambiar un texto, edítalo aquí. */

export const techs = ['JavaScript', 'HTML', 'CSS', 'C#', 'Python', 'MySQL', 'n8n', 'Git', 'Node.js', 'Linux'];

export const journey = [
  { year: '2024', title: 'Estudio autónomo', company: 'Principios de programación', desc: 'Aprendizaje de las bases y lógica fundamental del desarrollo.' },
  { year: '2025', title: 'Estudio en Campuslands', company: 'Campuslands', desc: 'Formación técnica avanzada y proyectos colaborativos.' },
  { year: '2026', title: 'Graduación en Campuslands', company: 'Campuslands', desc: 'Finalización del programa de entrenamiento intensivo.' },
];

/* Símbolo de cada proyecto (trazos en un lienzo de 200 × 200) */
const SYMBOLS: Record<string, ReactNode> = {
  // Hotel: edificio con ventanas y puerta
  hotel: (
    <>
      <path d="M36 186V40l64-26 64 26v146" />
      <path d="M16 186h168" />
      <path d="M62 64h20v20H62zM118 64h20v20h-20zM62 104h20v20H62zM118 104h20v20h-20z" />
      <path d="M86 186v-36a14 14 0 0 1 28 0v36" />
    </>
  ),
  // Películas: carrete de cine
  movies: (
    <>
      <circle cx="100" cy="100" r="86" />
      <circle cx="100" cy="100" r="14" />
      <circle cx="100" cy="52" r="20" />
      <circle cx="100" cy="148" r="20" />
      <circle cx="52" cy="100" r="20" />
      <circle cx="148" cy="100" r="20" />
      <path d="M186 100v86h-86" />
    </>
  ),
  // Telegram: avión de papel con el recorrido del mensaje
  telegram: (
    <>
      <path d="M18 98 182 26l-34 150-52-46Z" />
      <path d="m96 130 86-104M96 130v48l24-26" />
      <path d="M18 160c22-6 38-2 52 10" strokeDasharray="6 8" />
    </>
  ),
};

export const projects = [
  { key: 'hotel', category: 'Página web', title: 'Hotel el Carmen', desc: 'Pagina web realizada en JavaScript para la reserva de habitaciones simulada.', tags: ['JavaScript', 'HTML', 'CSS'], link: 'https://github.com/spostre/Proyecto-Java-Script' },
  { key: 'movies', category: 'Programa en consola', title: 'Librería de Películas', desc: 'Programa en consola creado desde Python para la gestión de películas favoritas y almacenamiento de datos en JSON.', tags: ['Python', 'JSON'], link: 'https://github.com/spostre/pelicode' },
  { key: 'telegram', category: 'Automatización', title: 'Respondedor Automático Telegram', desc: 'Flujo realizado en n8n para crear un contestador automático basado en un menú numérico.', tags: ['n8n', 'Automation'], link: 'https://github.com/spostre/Proyecto-N8N' },
].map((p) => ({ ...p, symbol: SYMBOLS[p.key] }));

export const goals = [
  'Trabajar en un cargo que requiera mis habilidades y tener un gran equipo de trabajo.',
  'Conseguir mas equipamiento que me ayude a expandir mis habilidades tecnicas',
  'Empezar mi propio proyecto que genere ingresos',
];

export const improving = [
  'Estoy mejorando mis habilidades logicas para resolver problemas de manera mas eficiente y robusta',
  'Estoy practicando mi memorizacion para no olvidar ningun detalle a al hora de escuchar al cliente',
  'Estoy poniendo a prueba mi concentracion usando metodos de trabajo flexibles que me ayuden a estar enfocado',
];

export const pad = (n: number) => String(n + 1).padStart(2, '0');
