import React from 'react';
import './style.css';

const Statistics = () => {
  return (
    <section className="statistics" id="statistics">
      <div className="statistics-content">
        <h2 className="statistics-title">Nossos Números</h2>
        <div className="statistics-grid">
          <div className="statistic-item">
            <span className="statistic-number">50+</span>
            <span className="statistic-text">Cervejas Artesanais</span>
          </div>
          <div className="statistic-item">
            <span className="statistic-number">10+</span>
            <span className="statistic-text">Anos de Experiência</span>
          </div>
          <div className="statistic-item">
            <span className="statistic-number">100%</span>
            <span className="statistic-text">Satisfação</span>
          </div>
          <div className="statistic-item">
            <span className="statistic-number">1000+</span>
            <span className="statistic-text">Clientes Felizes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics; 