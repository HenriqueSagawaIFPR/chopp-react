import React from 'react';
import './style.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <div className="about-text">
          <h2 className="about-title">Nossa História</h2>
          <p className="about-description">
            Fundada em 2010, a Chopp Benteo's nasceu da paixão por cervejas artesanais e da vontade de oferecer experiências únicas aos amantes da boa cerveja. Nossa missão é produzir cervejas de alta qualidade, utilizando ingredientes selecionados e técnicas tradicionais aliadas à inovação.
          </p>
          <div className="about-features">
            <div className="feature">
              <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Ingredientes selecionados</span>
            </div>
            <div className="feature">
              <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Produção artesanal</span>
            </div>
            <div className="feature">
              <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Ambiente acolhedor</span>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img src="/images/sobrenos.webp" alt="Chopp Benteo's" loading='lazy' />
        </div>
      </div>
    </section>
  );
};

export default About; 