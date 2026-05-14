const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear conexión a la base de datos
const dbPath = path.join(__dirname, 'database', 'psicologia.db');
const db = new sqlite3.Database(dbPath);

console.log('🚀 Inicializando base de datos...');

// Crear tablas
db.serialize(() => {
  // Tabla de citas
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
  `, (err) => {
    if (err) {
      console.error('❌ Error creando tabla appointments:', err);
    } else {
      console.log('✅ Tabla appointments creada/verificada');
    }
  });

  // Tabla de mensajes de contacto
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error creando tabla contact_messages:', err);
    } else {
      console.log('✅ Tabla contact_messages creada/verificada');
    }
  });

  // Insertar algunos datos de ejemplo
  const sampleAppointments = [
    {
      name: 'María García',
      email: 'maria@example.com',
      phone: '555-0123',
      service_type: 'individual',
      preferred_date: '2024-01-15',
      preferred_time: '10:00',
      message: 'Me gustaría comenzar terapia para manejo de ansiedad',
      status: 'confirmed'
    },
    {
      name: 'Carlos Rodríguez',
      email: 'carlos@example.com',
      phone: '555-0456',
      service_type: 'couple',
      preferred_date: '2024-01-20',
      preferred_time: '15:30',
      message: 'Sesión de pareja para mejorar comunicación',
      status: 'pending'
    }
  ];

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO appointments
    (name, email, phone, service_type, preferred_date, preferred_time, message, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  sampleAppointments.forEach(appointment => {
    stmt.run([
      appointment.name,
      appointment.email,
      appointment.phone,
      appointment.service_type,
      appointment.preferred_date,
      appointment.preferred_time,
      appointment.message,
      appointment.status
    ]);
  });

  stmt.finalize();
  console.log('✅ Datos de ejemplo insertados');

  console.log('🎉 Base de datos inicializada correctamente!');
  console.log(`📍 Ubicación: ${dbPath}`);
});

// Cerrar conexión
db.close((err) => {
  if (err) {
    console.error('❌ Error cerrando conexión:', err);
  } else {
    console.log('🔌 Conexión cerrada correctamente');
  }
});