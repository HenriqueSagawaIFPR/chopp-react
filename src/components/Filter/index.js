import React from 'react';
import './style.css';

export const Filter = ({ filterCriteria, onFilterChange }) => {
  const handleSearchChange = (e) => {
    onFilterChange({ ...filterCriteria, search: e.target.value });
  };

  const handleCategoryChange = (e) => {
    onFilterChange({ ...filterCriteria, category: e.target.value });
  };

  const handlePriceRangeChange = (e) => {
    onFilterChange({ ...filterCriteria, priceRange: e.target.value });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filterCriteria, sort: e.target.value });
  };

  return (
    <div className="filter-container">
      <div className="filter-section">
        <h3>Filtros</h3>
        <div className="filter-group">
          <label htmlFor="search">Buscar</label>
          <input
            type="text"
            id="search"
            value={filterCriteria.search}
            onChange={handleSearchChange}
            placeholder="Buscar por nome..."
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={filterCriteria.category}
            onChange={handleCategoryChange}
          >
            <option value="">Todas</option>
            <option value="cervejas">Cervejas</option>
            <option value="chopps">Chopps</option>
            <option value="petiscos">Petiscos</option>
            <option value="bebidas">Bebidas</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priceRange">Faixa de Preço</label>
          <select
            id="priceRange"
            value={filterCriteria.priceRange}
            onChange={handlePriceRangeChange}
          >
            <option value="">Todos</option>
            <option value="0-10">Até R$ 10,00</option>
            <option value="10-20">R$ 10,00 - R$ 20,00</option>
            <option value="20-30">R$ 20,00 - R$ 30,00</option>
            <option value="30+">Acima de R$ 30,00</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Ordenar por</label>
          <select
            id="sort"
            value={filterCriteria.sort}
            onChange={handleSortChange}
          >
            <option value="name-asc">Nome (A-Z)</option>
            <option value="name-desc">Nome (Z-A)</option>
            <option value="price-asc">Preço (Menor-Maior)</option>
            <option value="price-desc">Preço (Maior-Menor)</option>
          </select>
        </div>
      </div>
    </div>
  );
}; 