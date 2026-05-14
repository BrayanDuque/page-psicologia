const express = require('express');
const router = express.Router();

// GET /api/info - Obtener información general del sitio
router.get('/', (req, res) => {
  res.json({
    psychologist: {
      name: 'Dra. María González',
      title: 'Psicóloga Clínica',
      experience: '10 años de experiencia',
      specialization: 'Terapia Cognitivo-Conductual',
      education: [
        'Maestría en Psicología Clínica - Universidad Nacional',
        'Especialización en TCC - Instituto de Psicología Cognitiva',
        'Diplomado en Terapia de Pareja - Centro de Estudios Familiares'
      ],
      certifications: [
        'Colegiada del Colegio de Psicólogos',
        'Certificación en Terapia Cognitivo-Conductual',
        'Especialista en Trastornos de Ansiedad'
      ]
    },
    about: {
      title: 'Sobre Mí',
      description: `
        Soy psicóloga clínica con más de 10 años de experiencia ayudando a personas a superar
        sus desafíos emocionales. Mi formación incluye una maestría en Psicología Clínica y
        especialización en Terapia Cognitivo-Conductual.

        Creo en un enfoque humanista y empático, donde cada persona es única y merece ser
        escuchada con respeto. Mi objetivo es proporcionarte las herramientas necesarias para
        que puedas vivir una vida más plena y satisfactoria.

        Estoy comprometida con la formación continua y participo regularmente en congresos
        y talleres para mantener mis conocimientos actualizados.
      `,
      philosophy: `
        Mi filosofía de trabajo se basa en el respeto absoluto por la dignidad de cada persona,
        la confidencialidad total de la información compartida y el compromiso con el bienestar
        integral del individuo. Creo que cada persona tiene el potencial para crecer y cambiar,
        y mi rol es facilitar ese proceso de manera segura y efectiva.
      `,
      approach: 'Terapia Cognitivo-Conductual con enfoque humanista'
    },
    contact: {
      phone: '(123) 456-7890',
      email: 'contacto@psicologa.com',
      address: {
        street: 'Calle Principal 123',
        city: 'Ciudad',
        state: 'Estado',
        zipCode: '12345'
      },
      hours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: 'Cerrado',
        sunday: 'Cerrado'
      },
      emergency: 'Para emergencias psicológicas, contactar servicios de emergencia local'
    },
    location: {
      latitude: -34.6037, // Buenos Aires coordinates as example
      longitude: -58.3816,
      address: 'Calle Principal 123, Ciudad, Estado 12345',
      instructions: 'El consultorio está ubicado en el centro de la ciudad, con fácil acceso al transporte público.'
    },
    social: {
      linkedin: 'https://linkedin.com/in/psicologa-maria-gonzalez',
      website: 'https://psicologa.com',
      blog: 'https://psicologa.com/blog'
    },
    policies: {
      cancellation: 'Se requiere 24 horas de anticipación para cancelar o reprogramar citas',
      payment: 'Se aceptan efectivo, tarjetas de crédito y débito',
      insurance: 'Trabajamos con las principales compañías de seguro',
      confidentiality: 'Toda la información compartida es estrictamente confidencial'
    }
  });
});

// GET /api/info/testimonials - Obtener testimonios
router.get('/testimonials', (req, res) => {
  const testimonials = [
    {
      id: 1,
      name: 'Ana García',
      age: 35,
      service: 'Terapia Individual',
      rating: 5,
      text: 'La Dra. González me ayudó a superar mi ansiedad de una manera que nunca imaginé posible. Su enfoque profesional y empático hizo toda la diferencia.',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      age: 42,
      service: 'Terapia de Pareja',
      rating: 5,
      text: 'Nuestra relación ha mejorado significativamente gracias a las sesiones con la doctora. Nos enseñó a comunicarnos mejor y resolver conflictos de manera constructiva.',
      date: '2024-02-20'
    },
    {
      id: 3,
      name: 'María López',
      age: 28,
      service: 'Manejo del Estrés',
      rating: 5,
      text: 'Las técnicas que aprendí me han cambiado la vida. Ahora manejo el estrés del trabajo mucho mejor y me siento más equilibrada.',
      date: '2024-03-10'
    },
    {
      id: 4,
      name: 'Javier Martínez',
      age: 31,
      service: 'Tratamiento de Ansiedad',
      rating: 5,
      text: 'Después de años luchando con ataques de pánico, finalmente encontré paz. La terapia con la Dra. González fue transformadora.',
      date: '2024-04-05'
    }
  ];

  res.json({
    testimonials,
    total: testimonials.length,
    averageRating: testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  });
});

// GET /api/info/faq - Preguntas frecuentes
router.get('/faq', (req, res) => {
  const faq = [
    {
      id: 1,
      question: '¿Cuánto dura una sesión típica?',
      answer: 'Las sesiones individuales duran aproximadamente 50 minutos. Las sesiones de pareja pueden extenderse a 60 minutos para permitir suficiente tiempo para trabajar en la dinámica de la relación.'
    },
    {
      id: 2,
      question: '¿Cuál es el costo de las sesiones?',
      answer: 'Los precios varían según el tipo de servicio. Te recomiendo contactarme directamente para obtener información actualizada sobre tarifas y opciones de pago.'
    },
    {
      id: 3,
      question: '¿Trabajan con seguros médicos?',
      answer: 'Sí, trabajo con la mayoría de las compañías de seguro médico. Te puedo proporcionar la información necesaria para que verifiques la cobertura con tu proveedor.'
    },
    {
      id: 4,
      question: '¿Qué sucede si necesito cancelar una cita?',
      answer: 'Se requiere al menos 24 horas de anticipación para cancelar o reprogramar una cita. Las cancelaciones con menos tiempo pueden estar sujetas a cargo.'
    },
    {
      id: 5,
      question: '¿Ofrecen terapia online?',
      answer: 'Sí, ofrezco sesiones de terapia a través de videollamada segura. Esta opción es conveniente para quienes tienen dificultades para asistir en persona.'
    },
    {
      id: 6,
      question: '¿Cuántas sesiones necesito?',
      answer: 'El número de sesiones varía según las necesidades individuales. Algunos clientes se benefician de unas pocas sesiones, mientras que otros prefieren un tratamiento más prolongado.'
    },
    {
      id: 7,
      question: '¿La información que comparto es confidencial?',
      answer: 'Absolutamente. La confidencialidad es fundamental en mi práctica. Toda la información compartida durante las sesiones está protegida por el secreto profesional.'
    },
    {
      id: 8,
      question: '¿Qué debo esperar en la primera sesión?',
      answer: 'La primera sesión es una evaluación inicial donde conoceremos tus preocupaciones, objetivos y desarrollaremos un plan de tratamiento. Es un espacio seguro para que expreses lo que te trae.'
    }
  ];

  res.json({ faq });
});

// GET /api/info/blog - Artículos del blog
router.get('/blog', (req, res) => {
  const posts = [
    {
      id: 1,
      title: 'Manejo del Estrés en Tiempos Modernos',
      slug: 'manejo-estres-tiempos-modernos',
      excerpt: 'Estrategias prácticas para manejar el estrés en nuestro ritmo de vida acelerado.',
      content: 'El estrés se ha convertido en un compañero constante en nuestras vidas modernas...',
      author: 'Dra. María González',
      publishedAt: '2024-01-10',
      tags: ['estrés', 'bienestar', 'salud mental'],
      readTime: 5
    },
    {
      id: 2,
      title: 'La Importancia de la Comunicación en las Parejas',
      slug: 'importancia-comunicacion-parejas',
      excerpt: 'Cómo mejorar la comunicación para fortalecer las relaciones de pareja.',
      content: 'La comunicación efectiva es la base de cualquier relación saludable...',
      author: 'Dra. María González',
      publishedAt: '2024-02-15',
      tags: ['parejas', 'comunicación', 'relaciones'],
      readTime: 7
    },
    {
      id: 3,
      title: 'Entendiendo la Ansiedad: Causas y Soluciones',
      slug: 'entendiendo-ansiedad-causas-soluciones',
      excerpt: 'Una guía completa para comprender y manejar los trastornos de ansiedad.',
      content: 'La ansiedad es una respuesta natural del cuerpo ante situaciones de estrés...',
      author: 'Dra. María González',
      publishedAt: '2024-03-20',
      tags: ['ansiedad', 'salud mental', 'terapia'],
      readTime: 8
    }
  ];

  res.json({
    posts,
    total: posts.length
  });
});

module.exports = router;