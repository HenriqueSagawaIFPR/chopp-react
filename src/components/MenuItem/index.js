import React from 'react';
import './style.css';

const MenuItem = ({ name, description, price, image, category, tags, abv }) => {
  return (
    <div className="menu-item-anim menu-item">
      <div className="menu-item-image-container">
        <img 
          src={image} 
          alt={name} 
          className="menu-item-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder-beer.jpg';
          }}
        />
        <div className="menu-item-abv">
          {abv}
        </div>
      </div>
      <div className="menu-item-content">
        <div className="menu-item-header">
          <h3 className="menu-item-name">{name}</h3>
          <p className="menu-item-price">R$ {price.toFixed(2)}</p>
        </div>
        <p className="menu-item-description">{description}</p>
        <div className="menu-item-footer">
          <span className="menu-item-category">
            {category}
          </span>
          <div className="menu-item-tags">
            {tags && tags.length > 0 && tags.map((tag, index) => (
              <span key={index} className="menu-item-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;