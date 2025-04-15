import React, { useState } from 'react';
import MenuItem from '../MenuItem/index';
import { Filter } from '../Filter';
import './style.css';

const MenuList = ({ items, onAddToCart }) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [filterCriteria, setFilterCriteria] = useState({
    search: '',
    category: '',
    priceRange: '',
    sort: 'name-asc'
  });

  const handleFilterChange = (newCriteria) => {
    setFilterCriteria(newCriteria);
    
    let filtered = [...items];

    // Aplicar filtro de busca
    if (newCriteria.search) {
      const searchTerm = newCriteria.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }

    // Aplicar filtro de categoria
    if (newCriteria.category) {
      filtered = filtered.filter(item => item.category === newCriteria.category);
    }

    // Aplicar filtro de preço
    if (newCriteria.priceRange) {
      const [min, max] = newCriteria.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(item => item.price >= min && item.price <= max);
      } else {
        filtered = filtered.filter(item => item.price >= min);
      }
    }

    // Aplicar ordenação
    const [sortField, sortOrder] = newCriteria.sort.split('-');
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredItems(filtered);
  };

  return (
    <section className="menu-container">
      <Filter 
        filterCriteria={filterCriteria}
        onFilterChange={handleFilterChange} 
      />
      
      {filteredItems.length === 0 ? (
        <div className="menu-empty">
          <p>Nenhum item encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="menu-grid">
          {filteredItems.map(item => (
            <MenuItem 
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.category}
              tags={item.tags}
              abv={item.abv}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MenuList;