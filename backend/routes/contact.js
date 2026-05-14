const express = require('express');
const router = express.Router();
const Joi = require('joi');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Validación del esquema de contacto
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(5).max(200).required(),
  message: Joi.string().min(10).max(2000).required()
});

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/contact - Enviar mensaje de contacto
router.post('/', async (req, res) => {
  try {
    // Validar datos de entrada
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: error.details[0].message
      });
    }

    const { name, email, subject, message } = value;

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Enviar al psicólogo
      subject: `Consulta desde sitio web: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Nueva consulta desde el sitio web</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #667eea;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px;">
            Este mensaje fue enviado desde el formulario de contacto del sitio web de psicología.
          </p>
        </div>
      `,
      replyTo: email
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    // También enviar confirmación al usuario
    const confirmationMail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Confirmación de recepción - Consulta Psicológica',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Gracias por contactarnos</h2>
          <p>Hola ${name},</p>
          <p>Hemos recibido tu mensaje y te responderemos lo antes posible, generalmente dentro de 24-48 horas hábiles.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Tu consulta:</h3>
            <p><strong>Asunto:</strong> ${subject}</p>
            <p><strong>Mensaje:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p>Si tienes alguna urgencia, puedes llamarnos directamente.</p>
          <p>Atentamente,<br>Equipo de Psicología</p>
        </div>
      `
    };

    await transporter.sendMail(confirmationMail);

    res.status(200).json({
      success: true,
      message: 'Mensaje enviado correctamente. Te responderemos pronto.'
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({
      error: 'Error al enviar el mensaje',
      message: 'Hubo un problema al procesar tu solicitud. Por favor, intenta más tarde.'
    });
  }
});

// GET /api/contact - Obtener información de contacto
router.get('/', (req, res) => {
  res.json({
    contact: {
      phone: '(123) 456-7890',
      email: 'contacto@psicologa.com',
      address: 'Calle Principal 123, Ciudad',
      hours: 'Lunes a Viernes, 9:00 AM - 6:00 PM',
      emergency: 'Para emergencias, llamar al 911'
    }
  });
});

module.exports = router;