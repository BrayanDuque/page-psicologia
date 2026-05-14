const express = require('express');
const router = express.Router();

// GET /api/services - Obtener todos los servicios
router.get('/', (req, res) => {
  const services = [
    {
      id: 1,
      title: 'Terapia Individual',
      slug: 'individual',
      description: 'Sesiones personalizadas para abordar tus preocupaciones específicas y trabajar en tu crecimiento personal.',
      duration: '50 minutos',
      price: 'Consultar',
      features: [
        'Evaluación inicial completa',
        'Plan de tratamiento personalizado',
        'Técnicas cognitivo-conductuales',
        'Seguimiento del progreso',
        'Apoyo emocional continuo'
      ],
      icon: '🧑'
    },
    {
      id: 2,
      title: 'Terapia de Pareja',
      slug: 'couple',
      description: 'Ayuda para mejorar la comunicación y resolver conflictos en las relaciones de pareja.',
      duration: '60 minutos',
      price: 'Consultar',
      features: [
        'Análisis de la dinámica de pareja',
        'Mejora de la comunicación',
        'Resolución de conflictos',
        'Fortalecimiento del vínculo',
        'Consejos para el día a día'
      ],
      icon: '👫'
    },
    {
      id: 3,
      title: 'Manejo del Estrés',
      slug: 'stress',
      description: 'Técnicas y estrategias para manejar el estrés diario y mejorar tu bienestar emocional.',
      duration: '45 minutos',
      price: 'Consultar',
      features: [
        'Identificación de fuentes de estrés',
        'Técnicas de relajación',
        'Gestión del tiempo',
        'Mindfulness y meditación',
        'Estrategias de coping'
      ],
      icon: '🧘'
    },
    {
      id: 4,
      title: 'Tratamiento de Ansiedad',
      slug: 'anxiety',
      description: 'Enfoque especializado en el tratamiento de trastornos de ansiedad y ataques de pánico.',
      duration: '50 minutos',
      price: 'Consultar',
      features: [
        'Diagnóstico preciso',
        'Terapia cognitivo-conductual',
        'Técnicas de exposición gradual',
        'Manejo de síntomas físicos',
        'Prevención de recaídas'
      ],
      icon: '😰'
    },
    {
      id: 5,
      title: 'Terapia para Adolescentes',
      slug: 'adolescent',
      description: 'Apoyo especializado para adolescentes que enfrentan desafíos emocionales y de desarrollo.',
      duration: '45 minutos',
      price: 'Consultar',
      features: [
        'Apoyo en la identidad',
        'Manejo de emociones',
        'Presión social y bullying',
        'Problemas familiares',
        'Desarrollo personal'
      ],
      icon: '👦'
    },
    {
      id: 6,
      title: 'Terapia Online',
      slug: 'online',
      description: 'Sesiones de terapia cómodas desde tu hogar a través de videollamada segura.',
      duration: '50 minutos',
      price: 'Consultar',
      features: [
        'Comodidad desde casa',
        'Videollamada segura',
        'Misma calidad de atención',
        'Flexibilidad de horarios',
        'Acceso desde cualquier lugar'
      ],
      icon: '💻'
    }
  ];

  res.json({
    services,
    total: services.length
  });
});

// GET /api/services/:slug - Obtener servicio específico
router.get('/:slug', (req, res) => {
  const { slug } = req.params;

  const services = [
    {
      id: 1,
      title: 'Terapia Individual',
      slug: 'individual',
      description: 'Sesiones personalizadas para abordar tus preocupaciones específicas y trabajar en tu crecimiento personal.',
      duration: '50 minutos',
      price: 'Consultar',
      features: [
        'Evaluación inicial completa',
        'Plan de tratamiento personalizado',
        'Técnicas cognitivo-conductuales',
        'Seguimiento del progreso',
        'Apoyo emocional continuo'
      ],
      detailedDescription: `
        La terapia individual es un espacio seguro y confidencial donde puedes explorar tus pensamientos,
        emociones y comportamientos. Juntos trabajaremos para identificar patrones, desarrollar nuevas
        perspectivas y adquirir herramientas prácticas para enfrentar los desafíos de la vida.

        Mi enfoque se basa en la terapia cognitivo-conductual (TCC), que ha demostrado ser altamente
        efectiva para tratar una amplia variedad de dificultades emocionales y psicológicas.
      `,
      benefits: [
        'Mejor comprensión de ti mismo',
        'Desarrollo de habilidades de afrontamiento',
        'Reducción de síntomas de ansiedad y depresión',
        'Mejora en las relaciones interpersonales',
        'Mayor confianza y autoestima'
      ],
      process: [
        'Sesión inicial de evaluación (90 minutos)',
        'Desarrollo de plan de tratamiento',
        'Sesiones semanales de terapia',
        'Seguimiento y ajustes según progreso',
        'Cierre y planificación de mantenimiento'
      ],
      icon: '🧑'
    },
    {
      id: 2,
      title: 'Terapia de Pareja',
      slug: 'couple',
      description: 'Ayuda para mejorar la comunicación y resolver conflictos en las relaciones de pareja.',
      duration: '60 minutos',
      price: 'Consultar',
      features: [
        'Análisis de la dinámica de pareja',
        'Mejora de la comunicación',
        'Resolución de conflictos',
        'Fortalecimiento del vínculo',
        'Consejos para el día a día'
      ],
      detailedDescription: `
        La terapia de pareja es una herramienta poderosa para fortalecer las relaciones y resolver
        conflictos de manera constructiva. A través de un enfoque sistémico, exploramos los patrones
        de interacción, mejoramos la comunicación y desarrollamos estrategias para construir una
        relación más saludable y satisfactoria.
      `,
      benefits: [
        'Mejora en la comunicación',
        'Resolución efectiva de conflictos',
        'Fortalecimiento del vínculo emocional',
        'Mayor comprensión mutua',
        'Desarrollo de herramientas para el día a día'
      ],
      process: [
        'Sesión inicial conjunta (90 minutos)',
        'Evaluación de la dinámica de pareja',
        'Sesiones semanales o quincenales',
        'Tareas y ejercicios para casa',
        'Seguimiento del progreso'
      ],
      icon: '👫'
    },
    {
      id: 3,
      title: 'Manejo del Estrés',
      slug: 'stress',
      description: 'Técnicas y estrategias para manejar el estrés diario y mejorar tu bienestar emocional.',
      duration: '45 minutos',
      price: 'Consultar',
      features: [
        'Identificación de fuentes de estrés',
        'Técnicas de relajación',
        'Gestión del tiempo',
        'Mindfulness y meditación',
        'Estrategias de coping'
      ],
      detailedDescription: `
        El estrés crónico puede afectar significativamente nuestra salud física y mental. En estas
        sesiones aprenderás a identificar las fuentes de estrés en tu vida, desarrollar técnicas
        efectivas de relajación y adquirir herramientas prácticas para manejar situaciones
        desafiantes de manera más saludable.
      `,
      benefits: [
        'Reducción significativa del estrés',
        'Mejora en la concentración y productividad',
        'Mejor calidad del sueño',
        'Mayor resiliencia emocional',
        'Prevención de problemas de salud'
      ],
      process: [
        'Evaluación del nivel de estrés',
        'Identificación de factores estresantes',
        'Aprendizaje de técnicas de relajación',
        'Desarrollo de plan de manejo del estrés',
        'Seguimiento y refuerzo'
      ],
      icon: '🧘'
    },
    {
      id: 4,
      title: 'Tratamiento de Ansiedad',
      slug: 'anxiety',
      description: 'Enfoque especializado en el tratamiento de trastornos de ansiedad y ataques de pánico.',
      duration: '50 minutos',
      price: 'Consultar',
      features: [
        'Diagnóstico preciso',
        'Terapia cognitivo-conductual',
        'Técnicas de exposición gradual',
        'Manejo de síntomas físicos',
        'Prevención de recaídas'
      ],
      detailedDescription: `
        Los trastornos de ansiedad pueden ser incapacitantes, pero son altamente tratables.
        Utilizando un enfoque basado en evidencia científica, te ayudaré a comprender los
        mecanismos de la ansiedad y desarrollar estrategias efectivas para manejarla.
      `,
      benefits: [
        'Reducción significativa de síntomas de ansiedad',
        'Mejor control sobre ataques de pánico',
        'Mayor confianza en situaciones desafiantes',
        'Mejora en la calidad de vida',
        'Habilidades para prevenir recaídas'
      ],
      process: [
        'Evaluación completa y diagnóstico',
        'Educación sobre la ansiedad',
        'Desarrollo de plan de tratamiento',
        'Técnicas de exposición gradual',
        'Manejo de síntomas físicos'
      ],
      icon: '😰'
    }
  ];

  const service = services.find(s => s.slug === slug);

  if (!service) {
    return res.status(404).json({
      error: 'Servicio no encontrado',
      message: `No se encontró el servicio con slug: ${slug}`
    });
  }

  res.json({ service });
});

// GET /api/services/categories - Obtener categorías de servicios
router.get('/categories/list', (req, res) => {
  const categories = [
    {
      id: 1,
      name: 'Terapia Individual',
      slug: 'individual',
      description: 'Sesiones personalizadas uno a uno'
    },
    {
      id: 2,
      name: 'Terapia de Pareja',
      slug: 'couple',
      description: 'Trabajo con parejas y relaciones'
    },
    {
      id: 3,
      name: 'Manejo Emocional',
      slug: 'emotional',
      description: 'Estrés, ansiedad y bienestar emocional'
    },
    {
      id: 4,
      name: 'Terapia Especializada',
      slug: 'specialized',
      description: 'Enfoques específicos para necesidades particulares'
    }
  ];

  res.json({ categories });
});

module.exports = router;