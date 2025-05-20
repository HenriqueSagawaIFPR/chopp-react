import React, { useState } from 'react';
import './style.css';

const MenuItem = ({ id, name, description, price, image, category, tags, abv, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(id, quantity);
    
    // Reset after animation
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 1000);
  };

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
          loading='lazy'
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
        <div className="menu-item-actions">
          <div className="quantity-control">
            <button 
              className="quantity-btn" 
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity-value">{quantity}</span>
            <button 
              className="quantity-btn" 
              onClick={() => setQuantity(prev => prev + 1)}
            >
              +
            </button>
          </div>
          <button 
            className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <span className="added-text">Adicionado!</span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Adicionar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;