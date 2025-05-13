import React from 'react';
import './style.css';

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Happy Hour Especial',
      date: 'Toda Sexta-feira',
      time: '18h - 21h',
      description: 'Descontos especiais em chopps e petiscos',
      image: '/images/evento1.webp'
    },
    {
      id: 2,
      title: 'Degustação de Cervejas',
      date: 'Último Sábado do Mês',
      time: '19h - 22h',
      description: 'Experimente nossas novas cervejas artesanais',
      image: '/images/evento2.webp'
    },
    {
      id: 3,
      title: 'Música ao Vivo',
      date: 'Todo Sábado',
      time: '20h - 23h',
      description: 'Banda local tocando os maiores sucessos',
      image: '/images/evento3.webp'
    }
  ];

  return (
    <section className="events" id="events">
      <div className="events-content">
        <h2 className="events-title">Eventos</h2>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-details">
                  <div className="event-date">
                    <svg className="event-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="event-time">
                    <svg className="event-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                </div>
                <p className="event-description">{event.description}</p>
                <button className="event-button">Saiba Mais</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events; 