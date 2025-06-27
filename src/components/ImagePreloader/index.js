import React, { useEffect } from 'react';

const ImagePreloader = ({ images }) => {
  useEffect(() => {
    // Pré-carregar as imagens mais importantes
    const preloadImages = () => {
      images.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
      });
    };

    // Aguardar um pouco para não bloquear o carregamento inicial
    const timer = setTimeout(preloadImages, 1000);

    return () => clearTimeout(timer);
  }, [images]);

  return null; // Componente invisível
};

export default ImagePreloader; 