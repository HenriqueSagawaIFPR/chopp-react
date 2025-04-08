import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.menu-item-anim').forEach(item => {
      observer.observe(item);
    });

    return () => {
      document.querySelectorAll('.menu-item-anim').forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);
};

export default useScrollAnimation;