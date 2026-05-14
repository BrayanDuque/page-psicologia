# Backend API - Página de Psicología

Este es el backend de la aplicación web de psicología, construido con Node.js, Express y SQLite.

## 🚀 Características

- **API RESTful** completa para gestión de citas, contacto y servicios
- **Base de datos SQLite** para almacenamiento local
- **Validación de datos** con Joi
- **Envío de emails** con Nodemailer
- **Middleware de seguridad** (Helmet, CORS, Rate Limiting)
- **Logging** con Morgan
- **Gestión de errores** robusta

## 📋 Requisitos

- Node.js v16 o superior
- npm o yarn

## 🛠️ Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Copia el archivo `.env.example` a `.env` y configura tus valores:
   ```bash
   cp .env.example .env
   ```

   Variables importantes:
   - `EMAIL_USER`: Tu email para envío de correos
   - `EMAIL_PASS`: Contraseña de aplicación de Gmail
   - `FRONTEND_URL`: URL de tu frontend (http://localhost:5173 para desarrollo)

3. **Configurar Gmail para envío de emails:**
   - Ve a [Google Account Settings](https://myaccount.google.com/)
   - Activa la autenticación de 2 factores
   - Genera una "contraseña de aplicación"
   - Usa esa contraseña en `EMAIL_PASS`

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000` por defecto.

## 📚 API Endpoints

### Contacto
- `POST /api/contact` - Enviar mensaje de contacto
- `GET /api/contact` - Obtener información de contacto

### Citas
- `POST /api/appointments` - Solicitar nueva cita
- `GET /api/appointments` - Obtener todas las citas (admin)
- `GET /api/appointments/:id` - Obtener cita específica
- `PUT /api/appointments/:id` - Actualizar cita
- `DELETE /api/appointments/:id` - Cancelar cita
- `GET /api/appointments/available/:date` - Horarios disponibles

### Servicios
- `GET /api/services` - Obtener todos los servicios
- `GET /api/services/:slug` - Obtener servicio específico
- `GET /api/services/categories/list` - Obtener categorías

### Información
- `GET /api/info` - Información general del sitio
- `GET /api/info/testimonials` - Testimonios de clientes
- `GET /api/info/faq` - Preguntas frecuentes
- `GET /api/info/blog` - Artículos del blog

### Salud del Sistema
- `GET /api/health` - Estado del servidor

## 📊 Base de Datos

La aplicación utiliza SQLite para almacenamiento local. La base de datos se crea automáticamente en `database/psicologia.db`.

### Tablas
- `appointments` - Gestión de citas

## 🔒 Seguridad

- **Rate Limiting**: Máximo 100 requests por 15 minutos por IP
- **Helmet**: Headers de seguridad HTTP
- **CORS**: Control de origen cruzado
- **Validación**: Todos los inputs son validados con Joi
- **Logging**: Todas las requests son registradas

## 📧 Email

El sistema envía emails automáticamente para:
- Confirmación de recepción de mensajes de contacto
- Confirmación de citas solicitadas
- Recordatorios (funcionalidad futura)

## 🧪 Testing

Para probar la API, puedes usar herramientas como:
- Postman
- Insomnia
- Thunder Client (extensión de VS Code)

### Ejemplo de request para contact:

```json
POST /api/contact
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "subject": "Consulta sobre terapia",
  "message": "Me gustaría agendar una cita para terapia individual."
}
```

## 🚀 Despliegue

### Variables de Producción
Asegúrate de configurar estas variables para producción:
- `NODE_ENV=production`
- `FRONTEND_URL=https://tu-dominio.com`
- Configurar email con proveedor real (SendGrid, Mailgun, etc.)

### Usando PM2
```bash
npm install -g pm2
pm2 start app.js --name "psicologia-api"
```

## 📝 Notas de Desarrollo

- La base de datos SQLite es ideal para desarrollo y pequeña escala
- Para producción, considera migrar a PostgreSQL o MySQL
- Los emails se envían de forma síncrona - considera usar colas para alta carga
- Implementa autenticación JWT para endpoints de admin

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Soporte

Para soporte técnico, contacta al equipo de desarrollo.