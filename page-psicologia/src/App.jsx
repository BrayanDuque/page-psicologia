import { useState } from 'react'
import Navbar from './navbar/navbar.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />

      {/* Sección Hero */}
      <section id="inicio" className="hero">
        <div className="hero-content">
          <h1>Bienvenido a mi Consultorio de Psicología</h1>
          <p>Tu bienestar emocional es mi prioridad. Ofrezco un espacio seguro y confidencial para tu crecimiento personal.</p>
          <a href="#contacto" className="cta-button">Agendar Cita</a>
        </div>
      </section>

      {/* Sección ¿Qué es la Psicología? */}
      <section id="psicologia" className="section">
        <div className="container">
          <h2>¿Qué es la Psicología?</h2>
          <div className="content-grid">
            <div className="content-text">
              <p>La psicología es la ciencia que estudia el comportamiento humano y los procesos mentales. A través de diferentes enfoques terapéuticos, ayudo a las personas a comprender sus emociones, pensamientos y comportamientos para mejorar su calidad de vida.</p>
              <p>Mi enfoque se basa en la terapia cognitivo-conductual, que ha demostrado ser efectiva en el tratamiento de diversos trastornos mentales y en el desarrollo personal.</p>
            </div>
            <div className="content-image">
              <div className="placeholder-image">🧠</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Servicios */}
      <section id="servicios" className="section services">
        <div className="container">
          <h2>Mis Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Terapia Individual</h3>
              <p>Sesiones personalizadas para abordar tus preocupaciones específicas y trabajar en tu crecimiento personal.</p>
            </div>
            <div className="service-card">
              <h3>Terapia de Pareja</h3>
              <p>Ayuda para mejorar la comunicación y resolver conflictos en las relaciones de pareja.</p>
            </div>
            <div className="service-card">
              <h3>Manejo del Estrés</h3>
              <p>Técnicas y estrategias para manejar el estrés diario y mejorar tu bienestar emocional.</p>
            </div>
            <div className="service-card">
              <h3>Tratamiento de Ansiedad</h3>
              <p>Enfoque especializado en el tratamiento de trastornos de ansiedad y ataques de pánico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Sobre Mí */}
      <section id="sobre-mi" className="section about">
        <div className="container">
          <h2>Sobre Mí</h2>
          <div className="content-grid">
            <div className="content-image">
              <div className="placeholder-image">👩‍⚕️</div>
            </div>
            <div className="content-text">
              <p>Soy psicóloga clínica con más de 10 años de experiencia ayudando a personas a superar sus desafíos emocionales. Mi formación incluye una maestría en Psicología Clínica y especialización en Terapia Cognitivo-Conductual.</p>
              <p>Creo en un enfoque humanista y empático, donde cada persona es única y merece ser escuchada con respeto. Mi objetivo es proporcionarte las herramientas necesarias para que puedas vivir una vida más plena y satisfactoria.</p>
              <p>Estoy comprometida con la formación continua y participo regularmente en congresos y talleres para mantener mis conocimientos actualizados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contacto" className="section contact">
        <div className="container">
          <h2>Contacto</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Información de Contacto</h3>
              <p><strong>Teléfono:</strong> (123) 456-7890</p>
              <p><strong>Email:</strong> contacto@psicologa.com</p>
              <p><strong>Dirección:</strong> Calle Principal 123, Ciudad</p>
              <p><strong>Horarios:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
            </div>
            <div className="contact-form">
              <h3>Envíame un Mensaje</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje:</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-button">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Consultorio de Psicología. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

