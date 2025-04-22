import React, { useState } from 'react';
import Header from './components/Header/index';
import MenuList from './components/MenuList/index';
import Footer from './components/Footer/index';
import Cart from './components/Cart/index';
import { menuItems } from './data/menu-item';
import Navbar from './components/Navbar/index';

import './styles/global.css';
import './styles/animations.css';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (itemId, quantity) => {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === itemId);

      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...prevItems, { ...item, quantity }];
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      <Navbar cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)} />
      <Header
      />
      <main className="main-content">
        <MenuList
          items={menuItems}
          onAddToCart={handleAddToCart}
        />
      </main>
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;