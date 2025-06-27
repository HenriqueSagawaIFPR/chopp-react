import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const MenuItem = ({ id, name, description, price, image, category, tags, abv, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef(null);

  // Gerar srcSet para imagens responsivas
  const generateSrcSet = (baseImage) => {
    const basePath = baseImage.replace('/images/optimized/', '/images/responsive/');
    const baseName = basePath.replace('.webp', '');
    
    return [
      `${baseName}-small.webp 300w`,
      `${baseName}-medium.webp 400w`,
      `${baseName}-large.webp 600w`,
      `${baseImage} 800w`
    ].join(', ');
  };

  // Intersection Observer para lazy loading mais eficiente
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageRef.current) {
            // Definir srcSet e src
            imageRef.current.srcSet = generateSrcSet(image);
            imageRef.current.src = image;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [image]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

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
        {/* Placeholder de carregamento */}
        {!imageLoaded && (
          <div className="image-placeholder">
            <div className="placeholder-spinner"></div>
          </div>
        )}
        
        <img 
          ref={imageRef}
          alt={`${name} - Chopp artesanal ${category}`} 
          className={`menu-item-image ${imageLoaded ? 'loaded' : ''}`}
          width="400"
          height="300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
        
        {/* Fallback para erro de carregamento */}
        {imageError && (
          <div className="image-error">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
            <span>Imagem não disponível</span>
          </div>
        )}
        
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