import React, { useState, Suspense, lazy } from 'react';
import Header from './components/Header/index';
import MenuList from './components/MenuList/index';
import Footer from './components/Footer/index';
import Cart from './components/Cart/index';
import Statistics from './components/Statistics/index';
import Navbar from './components/Navbar/index';
import WhatsAppButton from './components/WhatsAppButton';
import { menuItems } from './data/menu-item';
import './styles/global.css';
import './styles/animations.css';
import './App.css';

// Lazy loading dos componentes não críticos
const About = lazy(() => import('./components/About/index'));
const Events = lazy(() => import('./components/Events/index'));
const Contact = lazy(() => import('./components/Contact'));

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

  // Componente de loading para o Suspense
  const LoadingFallback = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
    </div>
  );

  return (
    <div className="app">
      <Navbar cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)} />
      <Header />
      <main className="main-content">
        <MenuList
          items={menuItems}
          onAddToCart={handleAddToCart}
        />
        <Statistics />
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Events />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      <WhatsAppButton />
    </div>
  );
}

export default App;