import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { MenuItem } from '../MenuItem';
import { Filter } from '../Filter';
import './style.css';

export const Menu = () => {
  const { categoryId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    search: '',
    category: '',
    priceRange: '',
    sort: 'name-asc'
  });

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const menuRef = collection(db, 'menu');
        let q = menuRef;

        if (categoryId) {
          q = query(menuRef, where('categoryId', '==', categoryId));
        }

        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMenuItems(items);
        setFilteredItems(items);
      } catch (err) {
        setError('Erro ao carregar o cardápio. Por favor, tente novamente mais tarde.');
        console.error('Erro ao carregar itens do menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [categoryId]);

  useEffect(() => {
    let filtered = [...menuItems];

    // Aplicar filtro de busca
    if (filterCriteria.search) {
      const searchTerm = filterCriteria.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }

    // Aplicar filtro de categoria
    if (filterCriteria.category) {
      filtered = filtered.filter(item => item.categoryId === filterCriteria.category);
    }

    // Aplicar filtro de preço
    if (filterCriteria.priceRange) {
      const [min, max] = filterCriteria.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(item => item.price >= min && item.price <= max);
      } else {
        filtered = filtered.filter(item => item.price >= min);
      }
    }

    // Aplicar ordenação
    const [sortField, sortOrder] = filterCriteria.sort.split('-');
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
  }, [menuItems, filterCriteria]);

  const handleFilterChange = (newCriteria) => {
    setFilterCriteria(newCriteria);
  };

  if (loading) {
    return (
      <div className="menu-loading">
        <div className="loading-spinner"></div>
        <p>Carregando cardápio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="menu-container">
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
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}; 