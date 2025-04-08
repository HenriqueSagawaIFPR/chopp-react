import React from 'react';
import Header from './components/Header/index';
import MenuList from './components/MenuList/index';
import Footer from './components/Footer/index';
import { menuItems } from './data/menu-item';

import './styles/global.css';
import './styles/animations.css';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <MenuList items={menuItems} />
      </main>
      <Footer />
    </div>
  );
}

export default App;