import React from 'react';
import './style.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-animation">
        <div className="bubbles-left"></div>
        <div className="bubbles-right"></div>
      </div>
      <div className="header-content">
        <h1 className="header-title">Choperia Artesanal</h1>
        <p className="header-subtitle">Sabores autênticos, produção artesanal, experiência única</p>
        <div className="header-info">
          <div className="header-info-item">
            <svg className="header-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>Rua das Cervejas, 123</span>
          </div>
          <div className="header-info-item">
            <svg className="header-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>(11) 9999-9999</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;