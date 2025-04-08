import React from 'react';
import MenuItem from '../MenuItem/index';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './style.css';

const MenuList = ({ items }) => {
  useScrollAnimation();

  return (
    <section className="menu-container">
      <div className="menu-grid">
        {items.map(item => (
          <MenuItem 
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            category={item.category}
            tags={item.tags}
            abv={item.abv}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuList;