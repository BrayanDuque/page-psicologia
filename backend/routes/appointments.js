const express = require('express');
const router = express.Router();
const Joi = require('joi');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conectar a la base de datos
const dbPath = path.join(__dirname, '../database/psicologia.db');
const db = new sqlite3.Database(dbPath);

// Crear tabla de citas si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service_type TEXT NOT NULL,
      preferred_date TEXT NOT NULL,
      preferred_time TEXT NOT NULL,
      message TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Validación del esquema de citas
const appointmentSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
  service_type: Joi.string().valid('individual', 'couple', 'stress', 'anxiety').required(),
  preferred_date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  preferred_time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  message: Joi.string().max(1000).optional()
});

// POST /api/appointments - Crear nueva cita
router.post('/', (req, res) => {
  try {
    const { error, value } = appointmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Datos de entrada inválidos',
        details: error.details[0].message
      });
    }

    const { name, email, phone, service_type, preferred_date, preferred_time, message } = value;

    // Verificar si ya existe una cita en esa fecha y hora
    db.get(
      'SELECT id FROM appointments WHERE preferred_date = ? AND preferred_time = ? AND status != "cancelled"',
      [preferred_date, preferred_time],
      (err, row) => {
        if (err) {
          console.error('Error al verificar cita existente:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (row) {
          return res.status(409).json({
            error: 'Horario no disponible',
            message: 'Ya existe una cita programada para este horario. Por favor, selecciona otro horario.'
          });
        }

        // Insertar nueva cita
        const stmt = db.prepare(`
          INSERT INTO appointments (name, email, phone, service_type, preferred_date, preferred_time, message)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run([name, email, phone, service_type, preferred_date, preferred_time, message], function(err) {
          if (err) {
            console.error('Error al crear cita:', err);
            return res.status(500).json({ error: 'Error al crear la cita' });
          }

          res.status(201).json({
            success: true,
            message: 'Cita solicitada correctamente. Recibirás una confirmación por email.',
            appointmentId: this.lastID,
            appointment: {
              id: this.lastID,
              name,
              email,
              service_type,
              preferred_date,
              preferred_time,
              status: 'pending'
            }
          });
        });

        stmt.finalize();
      }
    );

  } catch (error) {
    console.error('Error en POST /appointments:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/appointments - Obtener citas (solo para admin)
router.get('/', (req, res) => {
  // En un entorno real, aquí iría autenticación
  const { date, status } = req.query;

  let query = 'SELECT * FROM appointments';
  let params = [];

  if (date || status) {
    query += ' WHERE';
    if (date) {
      query += ' preferred_date = ?';
      params.push(date);
    }
    if (status) {
      if (date) query += ' AND';
      query += ' status = ?';
      params.push(status);
    }
  }

  query += ' ORDER BY preferred_date DESC, preferred_time DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error al obtener citas:', err);
      return res.status(500).json({ error: 'Error al obtener citas' });
    }

    res.json({
      appointments: rows,
      total: rows.length
    });
  });
});

// GET /api/appointments/:id - Obtener cita específica
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM appointments WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error al obtener cita:', err);
      return res.status(500).json({ error: 'Error al obtener cita' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    res.json({ appointment: row });
  });
});

// PUT /api/appointments/:id - Actualizar cita
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Estado requerido' });
  }

  db.run(
    'UPDATE appointments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        console.error('Error al actualizar cita:', err);
        return res.status(500).json({ error: 'Error al actualizar cita' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }

      res.json({
        success: true,
        message: 'Cita actualizada correctamente'
      });
    }
  );
});

// DELETE /api/appointments/:id - Cancelar cita
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run(
    'UPDATE appointments SET status = "cancelled", updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [id],
    function(err) {
      if (err) {
        console.error('Error al cancelar cita:', err);
        return res.status(500).json({ error: 'Error al cancelar cita' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }

      res.json({
        success: true,
        message: 'Cita cancelada correctamente'
      });
    }
  );
});

// GET /api/appointments/available/:date - Obtener horarios disponibles para una fecha
router.get('/available/:date', (req, res) => {
  const { date } = req.params;

  // Horarios de trabajo: 9:00 AM - 6:00 PM
  const workingHours = [];
  for (let hour = 9; hour < 18; hour++) {
    workingHours.push(`${hour.toString().padStart(2, '0')}:00`);
    workingHours.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  db.all(
    'SELECT preferred_time FROM appointments WHERE preferred_date = ? AND status != "cancelled"',
    [date],
    (err, rows) => {
      if (err) {
        console.error('Error al obtener horarios ocupados:', err);
        return res.status(500).json({ error: 'Error al obtener horarios disponibles' });
      }

      const occupiedTimes = rows.map(row => row.preferred_time);
      const availableTimes = workingHours.filter(time => !occupiedTimes.includes(time));

      res.json({
        date,
        availableTimes,
        occupiedTimes
      });
    }
  );
});

module.exports = router;